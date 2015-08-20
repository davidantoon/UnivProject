app.factory('Workspace', ['Workflow', function(Workflow){
	function Workspace() {
		var firstWorkflow = new Workflow(null, 0, 12, 12, 13, 13);
		this.workflows = [firstWorkflow];
		this.lastWorkflowId = 0;
		this.newWorkflowButtons = this.getNewWorkflowButtons(null);
		this.selectedWorkflow = firstWorkflow;
		this.objectType = "Workspace";
		this.progressLines = [];
		this.colors ={
			
		}
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
		}

	}

	return Workspace;
}]);


