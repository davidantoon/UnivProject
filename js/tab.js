app.factory('Tab', ["$rootScope", 'Content','Globals','Storage', function($rootScope, Content, Globals, Storage){
	
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
			
			this.parentWF = workflow;
			this.ID = tempJson.ID;
			this.title = tempJson.title;
			this.Type = tempJson.Type;
			this.orderTab = tempJson.orderTab;
			this.dataHolding = tempJson.dataHolding;
			this.color = ((tempJson.color != undefined)?tempJson.color:"#0860A8");
			if(tempJson.requestFrom == "restoreStep"){
					if(tempJson.content != null && tempJson.content != null){
						var passThis = this;
						Storage.getElementById(JSON.parse(tempJson.content).id, tempJson.content, /* force last modefied */ true, /* force server pull */ false, function(dataFromStorage){
							passThis.content = dataFromStorage;
							tempJson.callback(passThis, tempJson.passindex, tempJson.passThis, tempJson.passTempJson);
						});
					}else{
						tempJson.callback(this, tempJson.passindex, tempJson.passThis, tempJson.passTempJson);
					}
			}else{
				if(tempJson.content != null && tempJson.content != null){
					var tempData = Globals.get(JSON.parse(tempJson.content).id);
					this.content = ((tempData != undefined)?(new Content(tempJson.content)):null);
				}else{
					this.content = null;
				}
			}

		}else{
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
						"childTab":{"workflowId":null,"tabId":null}
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
						"parentTab":{"workflowId":null,"tabId":null}
					});
					this.addContent(content);
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
		addContent: function(contentObj){
			// pass content to storage function to check if already in cache or add it and return new content
			if(contentObj == null || contentObj == undefined){
				console.error("addContet: conten obj is null or undefined");
			}
			var str = new Storage();
			// check if content exists in storage
			if(str.checkContent(contentObj)){
				this.content = contentObj;
			}else // create new content
			this.content = new Content(contentObj);
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
                "content": ((this.content == null)?null:this.content.toString()),
                "orderTab": this.orderTab,
                "dataHolding": this.dataHolding,
                "color": this.color
            }
            return JSON.stringify(strToReturn);
		},

		addChildToSearch: function(childData){
			// add childData to dataHolding.childTab
		}


	
	}


	return Tab;
}]);
