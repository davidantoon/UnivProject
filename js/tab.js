app.factory('Tab', ['Content','Globals', function(Content, Globals){
	
	// constant static members 
	Tab.NORMAL_TAB = 0;// Search | Create | Edit'
	Tab.SEARCH_TAB = 1;
	Tab.CREATE_TAB = 2;
	Tab.EDIT_TAB = 3;
	Tab.RESULTS_TAB = 4;
	
	function Tab(id, workflow, tempJson, color, isResultTab){
		try{
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
				if(tempJson.color)
					this.color = tempJson.color;
				else
					this.color = "#0860A8";

				console.error("Check if new content passed from Undo, Redo, Server and Create");
				if(tempJson.content != null && tempJson.content != null){
					var tempData = Globals.get(JSON.parse(tempJson.content).id);
					if(tempData == null)
						this.content = new Content(tempJson.content);
					else
						this.content = tempData;
				}
				this.content = null;
				this.orderTab = tempJson.orderTab;
				this.dataHolding = tempJson.dataHolding;
			}else{
				throw "Id or parentWorkflow not specified!";
				return null;
			}
		}catch(e){
			$scope.Toast.show("Error!","There was an error in creating new tab", Toast.LONG, Toast.ERROR);
            console.error("Tab: ", e);
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
		changeType: function(newType){
			try{
				switch (newType){
					case Tab.SEARCH_TAB:
						this.addData({
							"searchText": "",
							"elementsToSearch": 0,
							"searchBy": 0,
							"childTab":{"workflowId":null,"tabId":null}
						});
					break;
					case Tab.CREATE_TAB:
						this.addData({
							"searchText": "",
							"resultsCount": 0,
							"results": [],
							"selectedResult": -1,
							"elementsToSearch": 0,
							"searchBy": 0
						});
					break;
					case Tab.EDIT_TAB:
						
					break;
					case Tab.RESULTS_TAB:
						this.addData({
							"resultsCount": 0,
							"results": [],
							"selectedResult": -1,
							"childTab":{"workflowId":null,"tabId":null},
							"parentTab":{"workflowId":null,"tabId":null}
						});
					break;
					default:
					break;
				}
				this.Type = newType;
			}catch(e){
				$scope.Toast.show("Error!","there was an error in changing tab type", Toast.LONG, Toast.ERROR);
                console.error("changeType: ", e);
			}
		},

		/**
		 * The dataHolding member used to manage current tab state, this function automatically called after changeType.
		 * @param {Object} dataHolding Current tab's data holding state 
		 */
		addData: function(dataHolding){
			try{	
				this.dataHolding = dataHolding;
			}catch{
				$scope.Toast.show("Error!","There was an error in adding data in tab", Toast.LONG, Toast.ERROR);
            	console.error("addData: ", e);
			}
		},

		/**
		 * Get instance or create new Content object and link it to this tab
		 * @param {Content || String} contentObj if the type of passed parameter is Content then will link to this tab.
		 *                    					 if the type is String, will check global cached contents, or get from server.
		 */
		addContent: function(contentObj){
			try{
				// check if exsit

				this.content = contentObj;
			}catch(e){
				$scope.Toast.show("Error!","There was an error in adding content to tab", Toast.LONG, Toast.ERROR);
           		console.error("addContent: ", e);
			}
		},

		addResults: function(contentObj){
			try{
				// check if exsit
				if(contentObj == null){
					this.dataHolding.resultsCount = -1;
					this.dataHolding.results = null;
				}else{
					this.dataHolding.resultsCount = contentObj.length;
					this.dataHolding.results = contentObj;
				}
			}catch(e){
				$scope.Toast.show("Error!","There was an error in adding results in tab", Toast.LONG, Toast.ERROR);
           		console.error("addResults: ", e);
			}
		},

		/**
		 * Get tab XY posistion in the workflow tab bar to manage responsive UI.
		 * @return {Object} Tab Position {'left': LeftPosition, 'top': TopPosition}
		 */
		getTabPos: function(){
			try{
				var parentWFPos = this.parentWF.getPosition();
				var tabPos = {
					"left": (parentWFPos.width / this.parentWF.tabs.length)/2 + parentWFPos.left,
					"top": parentWFPos.top + 15
				};
				return tabPos;
			}catch(e){
				$scope.Toast.show("Error!","There was an error in getting tab position", Toast.LONG, Toast.ERROR);
           		console.error("getTabPos: ", e);
			}
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
		}
	}


	return Tab;
}]);
