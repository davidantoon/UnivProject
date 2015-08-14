app.factory('Tab', ['Content','Globals', function(Content, Globals){
	
	// constant static members 
	Tab.NORMAL_TAB = 0;// Search | Create | Edit'
	Tab.SEARCH_TAB = 1;
	Tab.CREATE_TAB = 2;
	Tab.EDIT_TAB = 3;

	function Tab(id, workflow, tempJson){

		if(id != null && workflow != null){
			this.parentWF = workflow;
			this.ID = id;
			this.title = 'Tab '+id;
			this.Type = Tab.NORMAL_TAB; /*  0 => 'Search/Create/Edit'  ||  1 => 'Search'  ||  2 => 'Create'  ||  3 => 'Edit'  */
			this.content = null;
			this.orderTab = id;
			this.dataHolding = {};
			return this;
		}else if(tempJson){
			
			this.parentWF = workflow;
			this.ID = tempJson.ID;
			this.title = tempJson.title;
			this.Type = tempJson.Type;

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
			switch (newType){
				case Tab.SEARCH_TAB:
					this.addData({
						"searchText": "",
						"resultsCount": 0,
						"results": [],
						"selectedResult": -1
					});
				break;
				case Tab.CREATE_TAB:
					
				break;
				case Tab.EDIT_TAB:
					
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

			// check if exsit

			// this.content = contentObj;
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
                "dataHolding": this.dataHolding
            }
            return JSON.stringify(strToReturn);
		}
	}


	return Tab;
}]);
