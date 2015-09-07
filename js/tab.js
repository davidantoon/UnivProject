(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Tab', ["$rootScope", 'Content','Globals','Storage',"Log", function($rootScope, Content, Globals, Storage, Log){
	
		// constant static members 
		Tab.NORMAL_TAB = 0;// Search | Create | Edit'
		Tab.SEARCH_TAB = 1;
		Tab.CREATE_TAB = 2;
		Tab.EDIT_TAB = 3;
		Tab.RESULTS_TAB = 4;
		Tab.CONTENT_VIEW = 5;

		function Tab(id, workflow, tempJson, color, isResultTab){

			if(color != undefined && color != null){
				this.color = color;
			}else{
				this.color = "#0860A8";
			}
			if(id != null && workflow != null){
				this.parentWF = workflow;
				this.ID = id;
				this.title = 'Tab '+id;
				if(isResultTab != undefined && isResultTab != null)
					this.Type = Tab.RESULTS_TAB;
				else
					this.Type = Tab.NORMAL_TAB; /*  0 => 'Search/Create/Edit'  ||  1 => 'Search'  ||  2 => 'Create'  ||  3 => 'Edit' || 4 => 'Search Results' */
				this.content = null;
				this.orderTab = id;
				this.dataHolding = {};
				return this;
			}else if(tempJson){
				// debugger;
				this.parentWF = workflow;
				this.ID = tempJson.ID;
				this.title = tempJson.title;
				this.Type = tempJson.Type;
				this.orderTab = tempJson.orderTab;
				var passThis = this;
				if(this.Type != 4){
					this.dataHolding = tempJson.dataHolding;
					Continue(passThis);
					return;
				}
				else{
					this.dataHolding = tempJson.dataHolding;
					loopResults(0, this.dataHolding.results, []);
					function loopResults(index, results, dataToReturn){
						if(results && index < results.length){
							var stor = new Storage();
							stor.getElementById(results[index], /* force last modefied */ true, /* force server pull */ false, function(dataFromStorage){
								dataToReturn.push(dataFromStorage);
								loopResults(Number(index)+1, results, dataToReturn);
							});
						}else{
							// debugger;
							passThis.dataHolding.results = dataToReturn;
							Continue(passThis);
							return;
						}
					}
				}
				function Continue(passThis){
					passThis.color = ((tempJson.color != undefined)?tempJson.color:"#0860A8");
					if(tempJson.requestFrom == "restoreStep"){
							if(tempJson.content != null && tempJson.content != undefined){
								
								var stor = new Storage();
								stor.getElementById(tempJson.content, /* force last modefied */ true, /* force server pull */ false, function(dataFromStorage){
									passThis.content = dataFromStorage;
									tempJson.callback(passThis, tempJson.passindex, tempJson.passThis, tempJson.passTempJson);
								});
							}else{
								tempJson.callback(passThis, tempJson.passindex, tempJson.passThis, tempJson.passTempJson);
							}
					}else{
						if(tempJson.content != null && tempJson.content != undefined){
							debugger;
							var stor = new Storage();
							stor.getElementById(tempJson.content, /* force last modefied */ true, /* force server pull */ false, function(dataFromStorage){
								passThis.content = dataFromStorage;
							});
						}else{
							passThis.content = null;
						}
					}
				}

			}else{
				Log.e("tab","Tab", "Id or parentWorkflow not specified!");
				throw "Id or parentWorkflow not specified!";
				return null;
			}
		}

		Tab.prototype = {

			objectType: "Tab",
			/**
			 * ChangTitle will change tab title that displayed at top of workflow.
			 * @param  {String} newTitle String Object
			 */
			changeTitle: function(newTitle){
				this.title = newTitle;
			},

			/**
			 * ChangeType will change the type of tab and his status. Optional tab types:<br> 
			 * 0) NORMAL_TAB
			 * 1) SEARCH_TAB
			 * 2) CREATE_TAB
			 * 3) EDIT_TAB
			 * @param  {String} newType (Tab.NORMAL_TAB || Tab.SEARCH_TAB || Tab.CREATE_TAB || Tab.EDIT_TAB)
			 */
			changeType: function(newType, content){
				switch (newType){
					case Tab.SEARCH_TAB:
						this.addData({
							"searchText": "",
							"elementsToSearch": [0,0,0],
							"searchBy": [0,0,0],
							"childTab":{"workflowId":null,"tabId":null},
							"forceLastModifed":true,
							"forceServerPull":false
						});
					break;
					case Tab.CREATE_TAB:
						this.addData({
							"searchText": "",
							"resultsCount": 0,
							"results": [],
							"selectedResult": -1,
							"elementsToSearch": [1,0,0],
							"searchBy": [1,0,0]
						});
					break;
					case Tab.EDIT_TAB:
						
					break;
					case Tab.RESULTS_TAB:
						this.addData({
							"resultsCount": 0,
							"results": [],
							"childTab":[],
							"parentTab":{"workflowId":null,"tabId":null}
						});
					break;
					case Tab.CONTENT_VIEW:
						this.addData({
							"parentTab":{"workflowId":null,"tabId":null},
							"childTab":{"workflowId":null,"tabId":null}
						});
						this.addContent(content, true);
					break;
					default:
					break;
				}
				this.Type = newType;
			},

			/**
			 * The dataHolding member used to manage current tab state, this function automatically called after changeType.
			 * @param {Object} dataHolding Current tab's data holding state 
			 */
			addData: function(dataHolding){
				this.dataHolding = dataHolding;
			},

			/**
			 * Get instance or create new Content object and link it to this tab
			 * @param {Content || String} contentObj if the type of passed parameter is Content then will link to this tab.
			 *                    					 if the type is String, will check global cached contents, or get from server.
			 */
			addContent: function(contentObj, forceServerPull){
				// pass content to storage function to check if already in cache or add it and return new content
				if(contentObj == null || contentObj == undefined){
					Log.e("tab","addContet","content obj is null or undefined");
				}else{
					var passThis = this;
					var stor = new Storage();
					stor.getElementById(contentObj, /* force last modefied */ true, forceServerPull, function(dataFromStorage){
						passThis.content = dataFromStorage;
					});
				}
			},

			addResults: function(contentObj){

				// check if exsit
				if(contentObj == null){
					this.dataHolding.resultsCount = -1;
					this.dataHolding.results = null;
				}else{
					this.dataHolding.resultsCount = contentObj.length;
					this.dataHolding.results = contentObj;
				}
			},

			/**
			 * Get tab XY posistion in the workflow tab bar to manage responsive UI.
			 * @return {Object} Tab Position {'left': LeftPosition, 'top': TopPosition}
			 */
			getTabPos: function(){
				var parentWFPos = this.parentWF.getPosition();
				var tabPos = {
					"left": (parentWFPos.width / this.parentWF.tabs.length)/2 + parentWFPos.left,
					"top": parentWFPos.top + 15
				};
				return tabPos;
			},

			/**
			 * Override toString default function to return json stringify
			 * @return {String} Json stringify string
			 */
			toString: function(){
				var strToReturn = {
	                "ID": this.ID,
	                "title": this.title,
	                "Type": this.Type,
	                "content": ((this.content == null)?null:this.content.toJson()),
	                "orderTab": this.orderTab,
	                "dataHolding": this.dataHolding,
	                "color": this.color
	            }
	            return JSON.stringify(strToReturn);
			},

			toJson: function(){
				return{
	                "ID": this.ID,
	                "title": this.title,
	                "Type": this.Type,
	                "content": ((this.content == null)?null:this.content.toJson()),
	                "orderTab": this.orderTab,
	                "dataHolding": this.dataHolding,
	                "color": this.color
	            };
			},

			toJsonSteps: function(){
				var tempJson = {
	                "ID": this.ID,
	                "title": this.title,
	                "Type": this.Type,
	                "content": ((this.content == null)?null:this.content.toJsonSteps()),
	                "orderTab": this.orderTab,
	                "color": this.color
	            };
	            if(tempJson.Type == Tab.RESULTS_TAB){
	            	tempJson.dataHolding = {
	            		"resultsCount": this.dataHolding.resultsCount,
						"results": [],
						"childTab": this.dataHolding.childTab,
						"parentTab": this.dataHolding.parentTab
	            	}
	            	for(var i=0; i<this.dataHolding.results.length; i++){
	            		tempJson.dataHolding.results.push({
	            			"id": this.dataHolding.results[i].id,
	            			"type": this.dataHolding.results[i].type
	            		});
	            	}
	            }else{
	            	tempJson.dataHolding = this.dataHolding;
	            }
	            return tempJson;
			},

			addChildToSearch: function(childData){
				// add childData to dataHolding.childTab
			},

			equals: function(tab){
				return (this.ID == tab.ID);
			}


		
		}


		return Tab;
	}]);
})(window.angular);





