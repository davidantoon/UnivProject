(function(angular) {
    // 'use strict';
    // 
	angular.module('IntelLearner').factory('Steps', ["$rootScope", "Workflow", "Workspace", "Server", "Toast", "Storage", "checkChangesInStepsAffectsOnlyNewData", "Globals", function($rootScope, Workflow, Workspace, Server, Toast, Storage, checkChangesInStepsAffectsOnlyNewData, Globals){

		function Steps(){

			this.last20Steps = [];	
			this.currentUndoOrder = 1;
			this.savedInServer = false;
			this.lastFocusedWorkflow = null;
		}


		Steps.prototype = {

			objectType: "steps",

			loadSteps: function(workspace, callback){

				var passThis1 = this;
				var svr = new Server(this.objectType, $rootScope.currentScope.isDummy);
				svr.getSteps(function(result, error){
					if(error || !result){
						ServerResquestComplete(null, passThis1);
					}else{
						try{
							var x =JSON.parse(strDecompress(result.OBJECT_VALUE));
							if(x.last20Steps.length == 0)
								ServerResquestComplete(null, passThis1);
							else
								ServerResquestComplete(x, passThis1);
						}catch(e){
							ServerResquestComplete(null, passThis1);
						}
					}
				});
				function ServerResquestComplete(serverSteps, passThis){
					try{
						var stor = new Storage();
						stor.getWorkspaceData(false,function(dataFromLocalStorage, error){
							dataFromLocalStorage = ((dataFromLocalStorage)?dataFromLocalStorage.Steps:null);
							if(dataFromLocalStorage != null && dataFromLocalStorage.length == 0)
								dataFromLocalStorage = null;
							// init workspace
							if(serverSteps){
								if(dataFromLocalStorage != null){
									// compare 
									if(Number(serverSteps.lastModified) < dataFromLocalStorage.lastModified){
										passThis.last20Steps = dataFromLocalStorage.last20Steps;
										passThis.currentUndoOrder = dataFromLocalStorage.currentUndoOrder;
										passThis.lastFocusedWorkflow = dataFromLocalStorage.lastFocusedWorkflow;
									}else{
										passThis.last20Steps = serverSteps.last20Steps;
										passThis.currentUndoOrder = serverSteps.currentUndoOrder;
										passThis.lastFocusedWorkflow = serverSteps.lastFocusedWorkflow;
									}
									
								}else{
									// only server steps
									passThis.last20Steps = serverSteps.last20Steps;
									passThis.currentUndoOrder = serverSteps.currentUndoOrder;
									passThis.lastFocusedWorkflow = serverSteps.lastFocusedWorkflow;
								}
							}else{
								// only local steps
								if(dataFromLocalStorage != null){
									passThis.last20Steps = dataFromLocalStorage.last20Steps;
									passThis.currentUndoOrder = dataFromLocalStorage.currentUndoOrder;
									passThis.lastFocusedWorkflow = dataFromLocalStorage.lastFocusedWorkflow;
								}else{
									workspace = new Workspace();
									workspace.selectedWorkflow = workspace.workflows[0];
									passThis.InsertStepToLastSteps(workspace);
									lastFocusedWorkflow = workspace.workflows[0].ID;
								}
							}

							passThis.savedInServer = true;
							// update layout of workspace
							passThis.restoreStep(workspace, function(){
								if(passThis.lastFocusedWorkflow == null || passThis.lastFocusedWorkflow == undefined){
									passThis.lastFocusedWorkflow = workspace.workflows[0].ID;
								}else{
									var indexOfScroll = 0;
				                    for(var i=0; i< workspace.workflows.length; i++){
				                        if(workspace.workflows[i].ID == passThis.lastFocusedWorkflow){
				                            indexOfScroll = i;
				                            break;
				                        }
				                    }
				                    passThis.lastFocusedWorkflow = workspace.workflows[indexOfScroll].ID;
								}
								workspace.updateNewWorkflowButtons();
								workspace.updateLastId();
								callback();
							});
						});
					}catch(e){
			            console.error("ServerResquestComplete: ", e);
			            callback();
					}
				}
			},


			/**
			 * check if there is older step to undo it
			 * @return {Boolean} True if older step exist, else False
			 */
			canUndo: function(){
				try{
					var undoFound = false;
		            this.last20Steps.sort(function(a, b) {
		                return (a.orderSteps - b.orderSteps)
		            });
		            for (var i = 0; i < this.last20Steps.length; i++) {
		                if (this.currentUndoOrder < this.last20Steps[i].orderSteps) {
		                    undoFound = true;
		                    break;
		                }
		            }
		            return undoFound;
		        }catch(e){
		        	$rootScope.currentScope.Toast.show("Error!","There was an error in Undo function", Toast.LONG, Toast.ERROR);
	                console.error("canUndo: ", e);
	                return false;
		        }
			},

			/**
			 * check if there is newer step to undo it
			 * @return {Boolean} True if newer step exist, else False
			 */
			canRedo: function(){
				try{
					var redoFound = false;
		            this.last20Steps.sort(function(a, b) {
		                return (a.orderSteps - b.orderSteps)
		            });
		            for (var i = 0; i < this.last20Steps.length; i++) {
		                if (this.currentUndoOrder > this.last20Steps[i].orderSteps) {
		                    redoFound = true;
		                    break;
		                }
		            }
		            return redoFound;
		        }catch(e){
		        	$rootScope.currentScope.Toast.show("Error!","There was an error in redo function", Toast.LONG, Toast.ERROR);
	                console.error("canRedo: ", e);
	                return false;
		        }
			},

			/**
			 * Restore previous OLD step of workspace properties
			 * @param  {Workspace} workspace current workspace
			 */
			undoWorkflow: function(workspace, callback){
				try{
					// check if can undo
					if(this.canUndo()){
						// sort to insure that last 10 steps sorted from newer to older
						this.last20Steps.sort(function(a,b){return (a.orderSteps - b.orderSteps)});
						
						// locate index of previous step (indexOfPrevStep = IOPS)
						var IOPS = -1;
						for(var i = 0; i <  this.last20Steps.length; i++){
							if(this.currentUndoOrder < this.last20Steps[i].orderSteps){
								IOPS = i;
								break;
							}
						}
						if(IOPS < 0){
							console.log(new Error("Steps: undoWorkflow() cant undo, IOPS = -1"));
							callback(false);
							return;
						}

						// get json object of previous step
						var tempJsonWorkflows =  JSON.parse(this.last20Steps[IOPS].allWorkFlowContents);
						var DiffObjects = Workflow.getDiffArrays(workspace.workflows,tempJsonWorkflows);

						// check deleted workflows
						for(var j1=0; j1<DiffObjects.deleted.length; j1++){
		            		for(var j2=0; j2<workspace.workflows.length; j2++){
		                		if(workspace.workflows[j2].equals(DiffObjects.deleted[j1])){
		                			workspace.workflows.splice(j2,1);
		                		}
		                	}
		            	}

		            	// check inserted workflows
		            	for(var j1=0; j1<DiffObjects.inserted.length; j1++){
		                	workspace.workflows.push(new Workflow(DiffObjects.inserted[j1]));
		                }
		                
		                // update workflow tabs contents
		                for (var i1 = 0; i1 < tempJsonWorkflows.length; i1++) {
		                	for(var i2=0; i2< workspace.workflows.length; i2++){
		                		if(tempJsonWorkflows[i1].ID == workspace.workflows[i2].ID){
		                			workspace.workflows[i2].updateAllParams(tempJsonWorkflows[i1]);
		                		}
		                	}
		                }
		                this.currentUndoOrder++;
		                localStorage.setItem("com.intel.steps.last20Steps", JSON.stringify(this.toJson()));
			            this.savedInServer = false;
		                callback();
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","there was an error in undo function", Toast.LONG, Toast.ERROR);
	                console.error("undoWorkflow: ", e);
	                callback(false);
				}
			},

			/**
			 * Restore previous NEW step of workspace properties
			 * @param  {Workspace} workspace current workspace
			 */
			redoWorkflow: function(workspace, callback){
				try{
					// check if can undo
					if(this.canRedo()){
						// sort to insure that last 10 steps sorted from newer to older
						this.last20Steps.sort(function(a,b){return (a.orderSteps - b.orderSteps)});
						
						// locate index of next step (indexOfNextStep = IONS)
						var IONS = -1;
						for(var i = this.last20Steps.length - 1; i >= 0; i--){
							if(this.currentUndoOrder > this.last20Steps[i].orderSteps){
								IONS = i;
								break;
							}
						}
						if(IONS < 0){
							console.log(new Error("Steps: redoWorkflow() cant redo, IONS = -1"));
							callback(false);
							return;
						}

						// get json object of previous step
						var tempJsonWorkflows =  JSON.parse(this.last20Steps[IONS].allWorkFlowContents);
						var DiffObjects = Workflow.getDiffArrays(workspace.workflows,tempJsonWorkflows);

						// check deleted workflows
						for(var j1=0; j1<DiffObjects.deleted.length; j1++){
		            		for(var j2=0; j2<workspace.workflows.length; j2++){
		                		if(workspace.workflows[j2].equals(DiffObjects.deleted[j1])){
		                			workspace.workflows.splice(j2,1);
		                		}
		                	}
		            	}

		            	// check inserted workflows
		            	for(var j1=0; j1<DiffObjects.inserted.length; j1++){
		                	workspace.workflows.push(new Workflow(DiffObjects.inserted[j1]));
		                }

		                // update workflow tabs contents that if changed
		                for (var i1 = 0; i1 < tempJsonWorkflows.length; i1++) {
		                	for(var i2=0; i2< workspace.workflows.length; i2++){
		                		if(tempJsonWorkflows[i1].ID == workspace.workflows[i2].ID){
		                			workspace.workflows[i2].updateAllParams(tempJsonWorkflows[i1]);
		                		}
		                	}
		                }
		                this.currentUndoOrder--;
		                localStorage.setItem("com.intel.steps.last20Steps", JSON.stringify(this.toJson()));
			            this.savedInServer = false;
		                callback();
					}
				}catch(e){
	                console.error("redoWorkflow: ", e);
	                callback(false);
				}
			},

			/**
			 * Update last steps object to support new steps
			 */
			UpdateLastSteps: function(){
				try{
					this.last20Steps.sort(function(a,b){return (a.orderSteps - b.orderSteps)});
		            if (this.last20Steps.length > 0) {
		                var templast20Steps = [];
		                for (var i = 0; i < this.last20Steps.length; i++) {
		                    this.last20Steps[i].orderSteps -= (this.currentUndoOrder - 1);
		                    if (this.last20Steps[i].orderSteps > 0) {
		                        templast20Steps.push(this.last20Steps[i]);
		                    }
		                }
		                this.last20Steps = templast20Steps;
		            }
		            this.currentUndoOrder = 1;
		        }catch(e){
		        	$rootScope.currentScope.Toast.show("Error!","there was an error in updating last steps", Toast.LONG, Toast.ERROR);
	                console.error("UpdateLastSteps: ", e);
		        }
			},

			/**
			 * Insert new step to last steps object
			 */
			InsertStepToLastSteps: function(workspace, force){
				try{
					this.UpdateLastSteps();
		            var tempWorkflowArray = "[";
		            for (var i = 0; i < workspace.workflows.length; i++) {
		            	if(workspace.workflows.length>1 && i != workspace.workflows.length-1){
		            		tempWorkflowArray += workspace.workflows[i].toString()+",";
		            	}else{
		                    tempWorkflowArray += workspace.workflows[i].toString();
		            	}
		            }
		            tempWorkflowArray += "]";
		            var InsData = {
		                'orderSteps': 0,
		                'allWorkFlowContents': tempWorkflowArray,
		                'allProgressLines': JSON.stringify(workspace.progressLines)
		            }
		            if(this.last20Steps.length > 0){
			            if(tempWorkflowArray == this.last20Steps[0].allWorkFlowContents && !force) 
			            	return;
			            else 
			            	this.last20Steps.unshift(InsData);
		            }
	            	else{
			            this.last20Steps = [InsData];
	            	}
		            this.last20Steps = this.last20Steps.slice(0, 50);
		            for (var i = 0; i < this.last20Steps.length; i++) {
		                this.last20Steps[i].orderSteps = (i + 1);
		            }

		            var passThis = this;
		            var stor = new Storage();
		            stor.setWorkspaceData(this.toJson(), null, null, function(success, error){
		            	if(error || !success){
		            		$rootScope.currentScope.Toast.show("Error!","there was an error in upadting last steps", Toast.LONG, Toast.ERROR);		
		            	}else{
		            		passThis.savedInServer = false;
		            	}
		            });
		        }catch(e){
		        	$rootScope.currentScope.Toast.show("Error!","there was an error in upadting last steps", Toast.LONG, Toast.ERROR);
	                console.error("InsertStepToLastSteps: ", e);
		        }
			},

			restoreStep: function(workspace, callback){
				try{
					// sort to insure that last 10 steps sorted from newer to older
					this.last20Steps.sort(function(a,b){return (a.orderSteps - b.orderSteps)});
					
					// index of restoring point
					var IONS = 0;

					// get json object of previous step
					var tempJsonWorkflows =  JSON.parse(this.last20Steps[IONS].allWorkFlowContents);
					if(tempJsonWorkflows.length == 0){
						callback();
					}else{
						workspace.workflows = [];
						workspace.lastWorkflowId = 0;
						workspace.newWorkflowButtons = [];
						workspace.selectedWorkflow = null;

						var DiffObjects = Workflow.getDiffArrays(workspace.workflows,tempJsonWorkflows);

			        	// check inserted workflows
			        	loopDiffObjects(0, DiffObjects.inserted);
			        	function workflowsReturn(newWorkflow, index, passWorkspace, workflowsToBuild){
			        		passWorkspace.workflows.push(newWorkflow);
			        		loopDiffObjects(index,workflowsToBuild);
			        	}
			        	function loopDiffObjects(index, workflowsToBuild){
			        		if(index < workflowsToBuild.length){
			        			workflowsToBuild[index].requestFrom="restoreStep";
			        			workflowsToBuild[index].callback = workflowsReturn;
			        			workflowsToBuild[index].passindex = index + 1;
			        			workflowsToBuild[index].passWorkspace = workspace;
			        			workflowsToBuild[index].workflowsToBuild = workflowsToBuild;
			        			var tempWorkflow = new Workflow(workflowsToBuild[index]);
			        		}else{
			        			// updateCashedContents();
			        			loopDiffObjectsDone();
			        		}
			        	}
			        	// check new -> if locked by me, take from cashe, else pull from server
			        	function updateCashedContents(){

			        		Globals.getMinimized(function(result){
			        			if(result.length == 0){
			        				loopDiffObjectsDone();
			        			}else{
			        				var svr = new Server();
			        				svr.getFromServer(result, function(success, error){
			        					for(var i=0; i<success.length; i++){
			        						for(var j=0; j< Globals.CashedObjects.length; j++){
			        							if(success[i].id == Globals.CashedObjects[j].id){
			        								if(success[i].type == Globals.CashedObjects[j].type){
			        									Globals.set(success[i]);
			        								}
			        							}
			        						}
			        					}
			        					refreshObjectsInheritence();
			        				});
			        			}
			        		});
			        	}

			        	function refreshObjectsInheritence(){
			        		//loop on cahsed objects 
			        			//if ( del..)
			        			//	loop all arays and get elem..
			        		var str = new Storage();
			        		loopGlobalObjects(0, Globals.CashedObjects);
			        		function loopGlobalObjects(Index, CashedObjects){
			        			if(Index < CashedObjects.length){
				        			switch(Globals.CashedObjects[Index].type){
				        				case "Delivery":
				        					// loop over terms
				        					loopTerms(0, Globals.CashedObjects[Index].terms);
				        					function loopTerms(index, termsArray){
				        						if(index < termsArray.length){
				        							str.getElementById(termsArray[index], false, false, function(result){
				        								loopTerms(Number(index)+1, termsArray);
				        							});
				        						}else{
				        							loopKbitsNeeded(0, Globals.CashedObjects[i].kBitsNeeded);
				        						}
				        					}
				        					// loop over kbits needed
				        					function loopKbitsNeeded(index, KbitsNeededArray){
				        						if(index < KbitsNeededArray.length){
				        							str.getElementById(KbitsNeededArray[index], false, false, function(result){
				        								loopKbitsNeeded(Number(index)+1, KbitsNeededArray);
				        							});
				        						}else{
				        							loopKbitsProvided(0, Globals.CashedObjects[i].kbitProvided);
				        						}
				        					}
				        					// loop over kbits provided
				        					function loopKbitsProvided(index, kbitsProvidedArray){
				        						if(index < kbitsProvidedArray.length){
				        							str.getElementById(kbitsProvidedArray[index], false, false, function(result){
				        								loopKbitsProvided(Number(index)+1, kbitsProvidedArray);
				        							});
				        						}else{
				        							loopGlobalObjects(Number(Index)+1, CashedObjects);
				        						}
				        					}
				        				break;
				        				case "Term":

				        				break;
				        				case "Kbit":
				        					//loop terms
				        					loopTerms(0, Globals.CashedObjects[Index].terms);
				        					function loopTerms(index, termsArray){
				        						if(index < termsArray.length){
				        							str.getElementById(termsArray[index], false, false, function(result){
				        								loopTerms(Number(index)+1, termsArray);
				        							});
				        						}else{
				        							loopGlobalObjects(Number(Index)+1, CashedObjects);
				        						}
				        					}
				        				break;
				        				default:
				        				break;
				        			}
				        		}
			        		}
			        	}
			        	function loopDiffObjectsDone(){
			        		callback();
			        	}
			        }

			        
		        }catch(e){
			        $rootScope.currentScope.Toast.show("Error!","there was an error in restoring steps", Toast.LONG, Toast.ERROR);
	                console.error("restoreStep: ", e);
	                callback();
	            }
			},
			/**
			 * Remove all steps from local and server, and add one step represents current state
			 */
			clearLastSteps: function(workspace){
				try{
					this.last20Steps = [];
					this.currentUndoOrder = 1;
					this.InsertStepToLastSteps(workspace);
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in clearing last steps", Toast.LONG, Toast.ERROR);
	           		console.error("clearLastSteps: ", e);
				}
			},

			/**
			 * Save last steps to server
			 */
			commitSteps: function(workspace, callback){
				try{
					this.InsertStepToLastSteps(workspace);
					if(this.savedInServer == false){
						this.savedInServer = true;
						// locate index of next step (indexOfNextStep = IONS)
						var IONS = -1;
						for(var i = this.last20Steps.length - 1; i >= 0; i--){
							if(this.currentUndoOrder > this.last20Steps[i].orderSteps){
								IONS = (i+1);
								break;
							}
						}
						if(IONS > 0){
							this.last20Steps = this.last20Steps.slice(IONS);
						}

						var svr = new Server("steps", $rootScope.currentScope.isDummy);
						if(typeof callback == "funtion")
							svr.setSteps(this, callback);
						else
							svr.setSteps(this, function(){});
					}else{
						if(typeof callback == "funtion")
							callback(null, {"message": "Steps up to date", "code":""});
					}
				}catch(e){
	                console.error("commitSteps: ", e);
	                callback(null, {"message": e.message, "code":e.code});
				}
			},



			/**
	         * Creates Json 
	         * @return {Object} Json object
	         */
			toJson: function(){
				try{
					return {
						"last20Steps": this.last20Steps,
						"currentUndoOrder": this.currentUndoOrder,
						"lastModified": +(new Date()),
						"lastFocusedWorkflow": this.lastFocusedWorkflow
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","there was an error converting to JSON", Toast.LONG, Toast.ERROR);
	                console.error("toJson: ", e);
					return null;
				}
			},

			removeRelatedSteps: function(content){
				var i=0;
				while(i < this.last20Steps.length - 1){
					if(checkChangesInStepsAffectsOnlyNewData(content, JSON.parse(this.last20Steps[i].allWorkFlowContents),JSON.parse(this.last20Steps[i+1].allWorkFlowContents))){
						this.last20Steps.splice(i, 1);
						console.log(true);
					}else{
						console.log(false);
						i++;
					}
				}
			}


			
		}

		return Steps;
	}]);
})(window.angular);









