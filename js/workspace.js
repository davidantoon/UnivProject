(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Workspace', ['$rootScope', 'Workflow', function($rootScope, Workflow){
		function Workspace(scope) {
			try{
				var firstWorkflow = new Workflow(null, 0, 7, 5, 8, 6);
				this.workflows = [firstWorkflow];
				this.coloredWorkflows = [];
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
				this.selectedColors = [];
			}catch(e){
				$rootScope.currentScope.Toast.show("Error!","There was an error in creating workspace", Toast.LONG, Toast.ERROR);
	           	console.error("canUndo: ", e);
			}
		}

		Workspace.prototype = {

			/**
			 * Creates new work flow
			 * @param {[workflow]}
			 */
			addNewWorkflow: function(newWorkflow){
				try{
					var tempWorkflow = new Workflow(null,this.lastWorkflowId++,newWorkflow.fx,newWorkflow.fy,newWorkflow.tx,newWorkflow.ty)
					this.workflows.push(tempWorkflow);
					return tempWorkflow;
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in adding new workflow", Toast.LONG, Toast.ERROR);
	           		console.error("addNewWorkflow: ", e);
	           		return null;
				}
			},

			/**
			 * Updates the new work flow buttons
			 */
			updateNewWorkflowButtons: function(size){
				try{
					size = typeof size !== 'undefined' ? size : 1;
					this.newWorkflowButtons = this.getNewWorkflowButtons(1, size);
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in updating new Workflow buttons", Toast.LONG, Toast.ERROR);
	           		console.error("updateNewWorkflowButtons: ", e);
				}
			},

			/**
			 * Gets the places where to show workflow buttons (add new workflow buttons)
			 * @param  {[int workflow index]}
			 * @return {[Array which contains the new workflow buttons]} 
			 */
			getNewWorkflowButtons: function(workFlowIndex, size){
				try{
					size = typeof size !== 'undefined' ? size : 1;
					var tempNewWorkflowButtons = [];
					for(var i=0; i<this.workflows.length; i++){
						var checkIndex =[];
						for(var xcol = this.workflows[i].fx-size; xcol <= this.workflows[i].tx; xcol++){
							checkIndex.push({x:xcol, y:this.workflows[i].fy-1, check:0});
							checkIndex.push({x:xcol, y:this.workflows[i].ty, check:0});
						}
						for(var ycol = this.workflows[i].fy; ycol < this.workflows[i].ty; ycol++){
							checkIndex.push({x:this.workflows[i].fx-size, y:ycol, check:0});
							checkIndex.push({x:this.workflows[i].tx, y:ycol, check:0});
						}

						for(var ch = 0; ch < checkIndex.length; ch++){
							checkIndex[ch].check = this.checkNewWorkflowButtons(checkIndex[ch].x,checkIndex[ch].y, tempNewWorkflowButtons, size);
						}
						for(var j=0; j<checkIndex.length; j++){
							if(checkIndex[j].check == 1){
								if(size != 1){
									tempNewWorkflowButtons.push(new Workflow("newWorkflowButton", this.lastWorkflowId++, checkIndex[j].x+0.5, checkIndex[j].y, Number(checkIndex[j].x)+(size-0.5), Number(checkIndex[j].y)+1))
								}else{
									tempNewWorkflowButtons.push(new Workflow("newWorkflowButton", this.lastWorkflowId++, checkIndex[j].x, checkIndex[j].y, Number(checkIndex[j].x)+ 1, Number(checkIndex[j].y)+1))
								}
							}
						}
					}
					return tempNewWorkflowButtons;
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in getting new Workflow buttons", Toast.LONG, Toast.ERROR);
	           		console.error("getNewWorkflowButtons: ", e);
	           		return null;
				}
			},

			/**
			 * Checks the surronding area of the workflow to add buttons
			 * @param  {int} x Index x
			 * @param  {int} y Index y
			 * @param  {Array} tempNewWorkflowButtons  New Workflow buttons
			 * @return {Boolean} If its possible to add new Workflow button
			 */
			checkNewWorkflowButtons: function(x, y, tempNewWorkflowButtons, size){
				try{
					var flag = true;
					for(var i=0; i<tempNewWorkflowButtons.length; i++){
						if(tempNewWorkflowButtons[i].fx == x && tempNewWorkflowButtons[i].fy == y){
							flag = false;
							break;
						}
					}
					for(var i=0; i<this.workflows.length; i++){
						if(size == 1){
							if(this.workflows[i].fx <= x && this.workflows[i].fy <= y && this.workflows[i].tx > x  && this.workflows[i].ty > y ){
								flag = false;
								break;
							}
						}else{
							if(this.workflows[i].fy == y){
								if((this.workflows[i].fx >= x && this.workflows[i].fx < (x + size)) || (this.workflows[i].fx <= x && this.workflows[i].tx > x)){
									flag = false;
								}
							}
						}
					}
					return flag;
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in checking new Workflow buttons", Toast.LONG, Toast.ERROR);
	           		console.error("checkNewWorkflowButtons: ", e);
				}
			},

			/**
			 * Updates the ID for the last workflow
			 */
			updateLastId: function(){
				try{
					var maxId = 0;
					for(var i=0; i<this.workflows.length; i++){
						// find the max Id we can use to create new workflow
						maxId = ((Number(this.workflows[i].ID) > maxId)?Number(this.workflows[i].ID):maxId);
					}
					for(var i=0; i<this.newWorkflowButtons.length; i++){
						maxId = ((Number(this.newWorkflowButtons[i].ID) > maxId)?Number(this.newWorkflowButtons[i].ID):maxId);
					}
					maxId++;
					this.lastWorkflowId = maxId;
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in updating last Id", Toast.LONG, Toast.ERROR);
	           		console.error("updateLastId: ", e);
				}
			},

			/**
			 * Scrolls to specific workflow 
			 * @param  {object} Steps Steps object to check workflow
			 */
			scrollToLastWorkflow: function(Steps){
				try{
					debugger;
					var indexOfScroll = 0;
					if(this.selectedColors.length == 0){
						// loop of ID to locate last focused workflow
			            for(var i=0; i< this.workflows.length; i++){
			                if(this.workflows[i].ID == Steps.lastFocusedWorkflow){
			                    indexOfScroll = i;
			                    break;
			                }
			            }
			            // scrolls to the workflow we located
			            this.workflows[indexOfScroll].scrollTo();
			        }else{
			        	// loop of ID to locate last focused workflow
			            for(var i=0; i< this.coloredWorkflows.length; i++){
			                if(this.coloredWorkflows[i].ID == Steps.lastFocusedWorkflow){
			                    indexOfScroll = i;
			                    break;
			                }
			            }
			            // scrolls to the workflow we located
			            this.coloredWorkflows[indexOfScroll].scrollTo();
			        }
		        }catch(e){
	           		console.error("scrollToLastWorkflow: ", e);
		        }
			},

			/**
			 * Updates data in specific tab	
			 * @param  {object} tabHoldingData the workflow and tab id we are going to update
			 * @param  {object} results        the new contet
			 */
			updateDataInTab: function(tabHoldingData, results){
				try{
					// loop over workflows and tabs to locate the specific tab and update its data
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
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in updating fata in tab", Toast.LONG, Toast.ERROR);
	           		console.error("updateDataInTab: ", e);
				}
			},

			/**
			 * Focus on specific tab after doing a search
			 * @param  {object} tabHoldingData the workflow id and the ab id we want to select
			 */
			selectTabAfterSearch: function(tabHoldingData){
				try{
					if(this.selectedColors.length != 0){
						// loop over workflows and tabs and locate selected tab
						for(var i=0; i<this.coloredWorkflows.length; i++){
							if(this.coloredWorkflows[i].ID == tabHoldingData.workflowId){
								for(var j=0; j<this.coloredWorkflows[i].tabs.length; j++){
									if(this.coloredWorkflows[i].tabs[j].ID == tabHoldingData.tabId){
										this.coloredWorkflows[i].selectedTab = this.coloredWorkflows[i].tabs[j];
										break;
									}
								}
								break;
							}
						}
					}
					// loop over workflows and tabs and locate selected tab
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
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in selecting tab after search", Toast.LONG, Toast.ERROR);
	           		console.error("selectTabAfterSearch: ", e);
				}
			},
	     
			/**
			 * Deletes child tab
			 * @param  {Object} tabHoldingData Data holding that contain the Ids
			 * @param  {Boolean} deleteParent  True if we want to update child after deleting it's parent
			 */
			deleteChildTabIds: function(tabHoldingData, deleteParent){
				try{
					// if we want to update child tab after closing / deleting parent
					if(deleteParent){
						for(var i=0; i<this.workflows.length; i++){
							if(this.workflows[i].ID == tabHoldingData.workflowId){
								for(var j=0; j<this.workflows[i].tabs.length; j++){
									if(this.workflows[i].tabs[j].ID == tabHoldingData.tabId){
										this.workflows[i].tabs[j].dataHolding.parentTab = {"workflowId":null,"tabId":null};
										break;
									}
								}
								break;
							}
						}
					}else{
						// updating the parent tab after deleting the child
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
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in deleting relative (child) tab", Toast.LONG, Toast.ERROR);
	           		console.error("deleteChildTabIds: ", e);
				}
			},

			/**
			 * Changes the colors objects to know what colors are in used
			 */
			checkUserColorsInWorkspace: function(){
				try{
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
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in checking colors in workspace", Toast.LONG, Toast.ERROR);
	           		console.error("checkUserColorsInWorkspace: ", e);
				}
			},

			/**
			 * Replaces the contet data in specific child
			 * @param  {object} childHoldingData child data holding
			 * @param  {ibject} content          contect we want to change
			 */
			replaceSearchChildContent: function(childHoldingData, content){
				//loop over workflows to locate specific workflow
				for(var i=0; i<this.workflows.length; i++){
					if(childHoldingData.workflowId == this.workflows[i].ID){
						//loop over tabs to locate specific tab
						for(var j=0; j<this.workflows[i].tabs.length; j++){
							if(childHoldingData.tabId == this.workflows[i].tabs[j].ID){
								this.workflows[i].tabs[j].addContent(content);
								this.workflows[i].tabs[j].title = content.name;
								return;
							}
						}
					}
				}
			}
		}

		return Workspace;
	}]);
})(window.angular);








