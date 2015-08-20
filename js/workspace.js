app.factory('Workspace', ['Workflow', function(Workflow){
	function Workspace() {
		var firstWorkflow = new Workflow(null, 0, 12, 12, 13, 13);
		this.workflows = [firstWorkflow];
		this.lastWorkflowId = 0;
		this.newWorkflowButtons = this.getNewWorkflowButtons(null);
		this.selectedWorkflow = firstWorkflow;
		this.objectType = "Workspace";
		this.progressLines = [];
		this.colors = {
			"#ED143D" : false,
			"#7FFF00" : false,
			"#0860A8" : false,
			"#FF8C00" : false,
			"#FF1493" : false,
			"#9400D3" : false,
			"#FFD700" : false,
			"#8B4513" : false,
			"#808080" : false,
			"#000" : false
		};
	}

	Workspace.prototype = {

		/**
		 * Creates new work flow
		 * @param {[workflow]}
		 */
		addNewWorkflow: function(newWorkflow){
			var tempWorkflow = new Workflow(null,this.lastWorkflowId++,newWorkflow.fx,newWorkflow.fy,newWorkflow.tx,newWorkflow.ty)
			this.workflows.push(tempWorkflow);
			return tempWorkflow;
		},

		/**
		 * Updates the new work flow buttons
		 */
		updateNewWorkflowButtons: function(){
			this.newWorkflowButtons = this.getNewWorkflowButtons(1);
		},

		/**
		 * Gets the places where to show workflow buttons (add new workflow buttons)
		 * @param  {[int workflow index]}
		 * @return {[Array which contains the new workflow buttons]} 
		 */
		getNewWorkflowButtons: function(workFlowIndex){
			var tempNewWorkflowButtons = [];
			for(var i=0; i<this.workflows.length; i++){
				var checkIndex =[];
				for(var xcol = this.workflows[i].fx-1; xcol <= this.workflows[i].tx; xcol++){
					checkIndex.push({x:xcol, y:this.workflows[i].fy-1, check:0});
					checkIndex.push({x:xcol, y:this.workflows[i].ty, check:0});
				}
				for(var ycol = this.workflows[i].fy; ycol < this.workflows[i].ty; ycol++){
					checkIndex.push({x:this.workflows[i].fx-1, y:ycol, check:0});
					checkIndex.push({x:this.workflows[i].tx, y:ycol, check:0});
				}

				for(var ch = 0; ch < checkIndex.length; ch++){
					checkIndex[ch].check = this.checkNewWorkflowButtons(checkIndex[ch].x,checkIndex[ch].y, tempNewWorkflowButtons);
				}
				for(var j=0; j<checkIndex.length; j++){
					if(checkIndex[j].check == 1){
						tempNewWorkflowButtons.push(new Workflow("newWorkflowButton", this.lastWorkflowId++, checkIndex[j].x, checkIndex[j].y, Number(checkIndex[j].x)+1, Number(checkIndex[j].y)+1))
					}
				}
			}
			return tempNewWorkflowButtons;
		},

		/**
		 * Checks the surronding area of the workflow to add buttons
		 * @param  {int} x Index x
		 * @param  {int} y Index y
		 * @param  {Array} tempNewWorkflowButtons  New Workflow buttons
		 * @return {Boolean} If its possible to add new Workflow button
		 */
		checkNewWorkflowButtons: function(x, y, tempNewWorkflowButtons){
			var flag = true;
			for(var i=0; i<tempNewWorkflowButtons.length; i++){
				if(tempNewWorkflowButtons[i].fx == x && tempNewWorkflowButtons[i].fy == y){
					flag = false;
					break;
				}
			}
			for(var i=0; i<this.workflows.length; i++){
				if(this.workflows[i].fx <= x && this.workflows[i].fy <= y && this.workflows[i].tx > x && this.workflows[i].ty > y ){
					flag = false;
					break;
				}
			}
			return flag;
		},

		/**
		 * Updates the ID for the last workflow
		 */
		updateLastId: function(){
			var maxId = 0;
			for(var i=0; i<this.workflows.length; i++){
				maxId = ((Number(this.workflows[i].ID) > maxId)?Number(this.workflows[i].ID):maxId);
			}
			for(var i=0; i<this.newWorkflowButtons.length; i++){
				maxId = ((Number(this.newWorkflowButtons[i].ID) > maxId)?Number(this.newWorkflowButtons[i].ID):maxId);
			}
			maxId++;
			this.lastWorkflowId = maxId;
		},

		/**
		 * Scrolls to specific workflow 
		 * @param  {object} Steps Steps object to check workflow
		 */
		scrollToLastWorkflow: function(Steps){
			var indexOfScroll = 0;
            for(var i=0; i< this.workflows.length; i++){
                if(this.workflows[i].ID == Steps.lastFocusedWorkflow){
                    indexOfScroll = i;
                    break;
                }
            }
            this.workflows[indexOfScroll].scrollTo();
		},

		/**
		 * Updates data in specific tab	
		 * @param  {object} tabHoldingData the workflow and tab id we are going to update
		 * @param  {object} results        the new contet
		 */
		updateDataInTab: function(tabHoldingData, results){
			// tabHoldingData = {"workflowId":"111", "tabId":"1223"}
			
			for(var i=0; i<this.workflows.length; i++){
				if(this.workflows[i].ID == tabHoldingData.workflowId){
					for(var j=0; j<this.workflows[i].tabs.length; j++){
						if(this.workflows[i].tabs[j].ID == tabHoldingData.tabId){
							this.workflows[i].tabs[j].addResults(results);
							break;
						}
					}
					break;
				}
			}
		},

		/**
		 * Focus on specific tab after doing a search
		 * @param  {object} tabHoldingData the workflow id and the ab id we want to select
		 */
		selectTabAfterSearch: function(tabHoldingData){
			for(var i=0; i<this.workflows.length; i++){
				if(this.workflows[i].ID == tabHoldingData.workflowId){
					for(var j=0; j<this.workflows[i].tabs.length; j++){
						if(this.workflows[i].tabs[j].ID == tabHoldingData.tabId){
							this.workflows[i].selectedTab = this.workflows[i].tabs[j];
							break;
						}
					}
					break;
				}
			}
		},

		/**
		 * Delets the childs id of specific tab in workflow
		 * @param  {object} tabHoldingData the workflow id and the tab id which we want to delete its childs
		 */
		deleteChildTabIds: function(tabHoldingData){
			for(var i=0; i<this.workflows.length; i++){
				if(this.workflows[i].ID == tabHoldingData.workflowId){
					for(var j=0; j<this.workflows[i].tabs.length; j++){
						if(this.workflows[i].tabs[j].ID == tabHoldingData.tabId){
							this.workflows[i].tabs[j].dataHolding.childTab = {"workflowId":null,"tabId":null};
							break;
						}
					}
					break;
				}
			}
		},

		/**
		 * Changes the colors objects to know what colors are in used
		 */
		checkUserColorsInWorkspace: function(){
			//init the colors object
			var passThis = this;
			$.each(this.colors, function(key, value) {
				passThis.colors[key] = false;
			});

			//for each workflow
			for(var i=0; i < this.workflows.length; i++){
				// for each tab in workflow
				for(var j=0; j< this.workflows[i].tabs.length; j++){
					this.colors[(this.workflows[i].tabs[j].color)] = true;
				}
			}
		}
	}

	return Workspace;
}]);


