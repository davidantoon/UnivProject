(function(angular) {
    // 'use strict';
    // 
	angular.module('IntelLearner').factory('Steps', ["$rootScope", "Workflow", "Workspace", "Server", "Toast", "Storage", "checkChangesInStepsAffectsOnlyNewData", "Globals", "getDiffSteps","Log", function($rootScope, Workflow, Workspace, Server, Toast, Storage, checkChangesInStepsAffectsOnlyNewData, Globals, getDiffSteps, Log){

		function Steps(){

			this.last20Steps = [];	
			this.currentStep = {};
			this.currentUndoOrder = 0;
			this.savedInServer = false;
			this.lastFocusedWorkflow = null;
			this.currentGlobals = [];
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
							strDecompress(result.OBJECT_VALUE, function(stepsDecomp){
								try{
									var x = JSON.parse(stepsDecomp);
									var stor = new Storage();
									if(x.Settings)
										stor.setWorkspaceData(null, x.Settings, null,function(dataFromLocalStorage, error){});
									if(x.steps && x.steps.last20Steps.length == 0)
										ServerResquestComplete(null, passThis1);
									else
										ServerResquestComplete(x.steps, passThis1);
								}catch(e){
									ServerResquestComplete(null, passThis1);		
								}
							});
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
										passThis.currentStep = dataFromLocalStorage.currentStep;
										passThis.currentGlobals = dataFromLocalStorage.currentGlobals;
									}else{
										passThis.last20Steps = serverSteps.last20Steps;
										passThis.currentUndoOrder = serverSteps.currentUndoOrder;
										passThis.lastFocusedWorkflow = serverSteps.lastFocusedWorkflow;
										passThis.currentStep = serverSteps.currentStep;
										passThis.currentGlobals = serverSteps.currentGlobals;
									}
									
								}else{
									// only server steps
									passThis.last20Steps = serverSteps.last20Steps;
									passThis.currentUndoOrder = serverSteps.currentUndoOrder;
									passThis.lastFocusedWorkflow = serverSteps.lastFocusedWorkflow;
									passThis.currentStep = serverSteps.currentStep;
									passThis.currentGlobals = serverSteps.currentGlobals;
								}
							}else{
								// only local steps
								if(dataFromLocalStorage != null){
									passThis.last20Steps = dataFromLocalStorage.last20Steps;
									passThis.currentUndoOrder = dataFromLocalStorage.currentUndoOrder;
									passThis.lastFocusedWorkflow = dataFromLocalStorage.lastFocusedWorkflow;
									passThis.currentStep = dataFromLocalStorage.currentStep;
									passThis.currentGlobals = dataFromLocalStorage.currentGlobals;
								}else{
									workspace = new Workspace();
									workspace.selectedWorkflow = workspace.workflows[0];
									passThis.InsertStepToLastSteps(workspace);
									lastFocusedWorkflow = workspace.workflows[0].ID;
								}
							}


							passThis.savedInServer = true;
							var stor = new Storage();
							stor.setWorkspaceData(passThis, null, null,function(dataFromLocalStorage, error){});
							
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
			            Log.e("Steps","ServerResquestComplete", e);
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
	                Log.e("Steps","canUndo", e);
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
	                Log.e("Steps","canRedo", e);
	                return false;
		        }
			},


			/**
			 * Restore previous OLD step of workspace properties
			 * @param  {Workspace} workspace current workspace
			 */
			/**
			 * Restore previous NEW step of workspace properties
			 * @param  {Workspace} workspace current workspace
			 */
			restorePoint: function(workspace, action, callback){
				try{
					if((action =="undo" && this.canUndo()) || (action =="redo" && this.canRedo())){
						var actionOpIN_DE = ["inserted", "deleted"];
						var actionOpBE_AF = ["before", "after"];
						if(action == "redo"){
							actionOpIN_DE = ["deleted", "inserted"];
							actionOpBE_AF = ["after", "before"];
						}
						// undo of redo
						this.last20Steps.sort(function(a,b){return (a.orderSteps - b.orderSteps)});
						

						// locate index of previous step (indexOfPrevStep = IOPS)
						var IOPS = -1;

						if(action == "undo")
							for(var i = 0; i <  this.last20Steps.length; i++){
								if(this.currentUndoOrder <= this.last20Steps[i].orderSteps){
									IOPS = i;
									break;
								}
							}
						if(action == "redo")
							for(var i = this.last20Steps.length - 1; i >= 0; i--){
								if(this.currentUndoOrder > this.last20Steps[i].orderSteps){
									IOPS = i;
									break;
								}
							}

						if(IOPS < 0){
							Log.d("Steps","restorePoint",new Error("Steps: restorePoint() cant "+ action +", IOPS = -1"));
							callback(false);
							return;
						}


						// get json object of previous step
						var restoringPoint =  JSON.parse(this.last20Steps[IOPS].allWorkFlowContents);

						// Update ADDED or RMEOVED Workflows
						if(restoringPoint.workflows){

							// Loop on inserted workflows
							for(var i=0; i<(restoringPoint.workflows[actionOpIN_DE[0]] && i < restoringPoint.workflows[actionOpIN_DE[0]].length); i++){
								for(var i2=0; i2<workspace.workflows.length; i2++){
			                		if(workspace.workflows[i2].equals(restoringPoint.workflows[actionOpIN_DE[0]][i])){
			                			workspace.workflows.splice(i2,1);
			                			break;
			                		}
			                	}
							}
							// Loop on deleted workflows
							for(var i=0; i<(restoringPoint.workflows[actionOpIN_DE[1]] && i < restoringPoint.workflows[actionOpIN_DE[1]].length); i++){
								workspace.workflows.push(new Workflow(restoringPoint.workflows[actionOpIN_DE[1]][i]));
							}
						}

						// Update Workflows content
						for(var i=0; i<(restoringPoint.workflowsKeys && i < restoringPoint.workflowsKeys.length); i++){

							// Locate updated workflow content
							for(var i2=0; i2<workspace.workflows.length; i2++){
								if(workspace.workflows[i2].ID == restoringPoint.workflowsKeys[i].workflowId){
									
									// Update selected tab
									if(restoringPoint.workflowsKeys[i].selectedTab){
										// Set tab reference
										for(var i3 =0; i3<workspace.workflows[i2].tabs.length; i3++){
											if(workspace.workflows[i2].tabs[i3].ID == restoringPoint.workflowsKeys[i].selectedTab[actionOpBE_AF[0]].ID){
												workspace.workflows[i2].selectedTab = workspace.workflows[i2].tabs[i3];
												break;
											}
										}
									}

									// Update ADDED or REMOVED tabs
									if(restoringPoint.workflowsKeys[i].tabs){
										// Loop on inserted tabs
										for(var i3=0; i3<(restoringPoint.workflowsKeys[i].tabs[actionOpIN_DE[0]] && i3 < restoringPoint.workflowsKeys[i].tabs[actionOpIN_DE[0]].length); i3++){
											for(var i4=0; i4<workspace.workflows[i2].tabs.length; i4++){
						                		if(workspace.workflows[i2].tabs[i4].equals(restoringPoint.workflowsKeys[i].tabs[actionOpIN_DE[0]][i3])){
						                			workspace.workflows[i2].tabs.splice(i4,1);
						                			break;
						                		}
						                	}
										}
										// Loop on deleted tabs
										for(var i3=0; i3<(restoringPoint.workflowsKeys[i].tabs[actionOpIN_DE[1]] && i3 < restoringPoint.workflowsKeys[i].tabs[actionOpIN_DE[1]].length); i3++){
											workspace.workflows.push(new Workflow(restoringPoint.workflowsKeys[i].tabs[actionOpIN_DE[1]][i3]));
										}

									}
									
									// Update Tabs content
									for(var i3 = 0; restoringPoint.workflowsKeys[i].tabsKeys && i3 < restoringPoint.workflowsKeys[i].tabsKeys.length; i3++){
										// Locate updated tab content
										
										for(var i4 = 0; i4< workspace.workflows[i2].tabs.length; i4++){
											if(workspace.workflows[i2].tabs[i4].ID == restoringPoint.workflowsKeys[i].tabsKeys[i3].tabId){

												// Update tab title
												if(restoringPoint.workflowsKeys[i].tabsKeys[i3].title){
													workspace.workflows[i2].tabs[i4].title = restoringPoint.workflowsKeys[i].tabsKeys[i3].title[actionOpBE_AF[0]];
												}
												
												// Update tab Type
												if(restoringPoint.workflowsKeys[i].tabsKeys[i3].Type){
													workspace.workflows[i2].tabs[i4].Type = restoringPoint.workflowsKeys[i].tabsKeys[i3].Type[actionOpBE_AF[0]];
												}
												
												// Update tab orderTab
												if(restoringPoint.workflowsKeys[i].tabsKeys[i3].orderTab){
													workspace.workflows[i2].tabs[i4].orderTab = restoringPoint.workflowsKeys[i].tabsKeys[i3].orderTab[actionOpBE_AF[0]];
												}
												
												// Update tab color
												if(restoringPoint.workflowsKeys[i].tabsKeys[i3].color){
													workspace.workflows[i2].tabs[i4].color = restoringPoint.workflowsKeys[i].tabsKeys[i3].color[actionOpBE_AF[0]];
												}

												// Update tab dataHolding
												if(restoringPoint.workflowsKeys[i].tabsKeys[i3].dataHolding){
													workspace.workflows[i2].tabs[i4].dataHolding = restoringPoint.workflowsKeys[i].tabsKeys[i3].dataHolding[actionOpIN_DE[1]];
													// update Data Holding results content Reference
													
												}													

												// Update tab content
												if(restoringPoint.workflowsKeys[i].tabsKeys[i3].content){
													workspace.workflows[i2].tabs[i4].content = restoringPoint.workflowsKeys[i].tabsKeys[i3].content[actionOpIN_DE[1]];
													workspace.workflows[i2].tabs[i4].content = Globals.get(workspace.workflows[i2].tabs[i4].content.id, workspace.workflows[i2].tabs[i4].content.type);
												}

												// Update tab content keys
												if(restoringPoint.workflowsKeys[i].tabsKeys[i3].contentKeys){
													// Update content newData
													if(restoringPoint.workflowsKeys[i].tabsKeys[i3].contentKeys.newData){
														workspace.workflows[i2].tabs[i4].content.newData = restoringPoint.workflowsKeys[i].tabsKeys[i3].contentKeys.newData[actionOpBE_AF[0]];
													}

													// Update content progressWizard
													if(restoringPoint.workflowsKeys[i].tabsKeys[i3].contentKeys.progressWizard){
														workspace.workflows[i2].tabs[i4].content.progressWizard = restoringPoint.workflowsKeys[i].tabsKeys[i3].contentKeys.progressWizard[actionOpBE_AF[0]];
													}

													// Update content inProgress
													if(restoringPoint.workflowsKeys[i].tabsKeys[i3].contentKeys.inProgress){
														workspace.workflows[i2].tabs[i4].content.inProgress = restoringPoint.workflowsKeys[i].tabsKeys[i3].contentKeys.inProgress[actionOpBE_AF[0]];
														if(workspace.workflows[i2].tabs[i4].content.inProgress == false){
															workspace.workflows[i2].tabs[i4].content.newData = {};
															workspace.workflows[i2].tabs[i4].content.progressWizard = {};
														}
													}
												}
											}
										}
									}
								}
							}
						}

						if(action == "undo")
							this.currentUndoOrder++;
						else
							this.currentUndoOrder--;
						
						this.savedInServer = false;
						callback(true);


					}else{
						Log.e("Steps","restorePoint", "Wrong action " + action);
		                callback(false);	
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","there was an error in "+action+" function", Toast.LONG, Toast.ERROR);
	                Log.e("Steps","restorePoint", e);
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
		            this.currentUndoOrder = 0;
		        }catch(e){
		        	$rootScope.currentScope.Toast.show("Error!","there was an error in updating last steps", Toast.LONG, Toast.ERROR);
	                Log.e("Steps","UpdateLastSteps", e);
		        }
			},

			/**
			 * Insert new step to last steps object
			 */
			InsertStepToLastSteps: function(workspace, force){
				try{
					this.UpdateLastSteps();

					var TNS_newSteps = [];
		            for (var i = 0; i < workspace.workflows.length; i++) {
		            	TNS_newSteps.push(workspace.workflows[i].toJsonSteps());
		            }
		            if($.isEmptyObject(this.currentStep)){
		            	this.currentStep = angular.copy(TNS_newSteps);
		            }
		            var TNS_oldSteps = angular.copy(this.currentStep);
		            var TNS_diffSteps = getDiffSteps(TNS_oldSteps,TNS_newSteps);

		            if(TNS_diffSteps == null && !force)
		            	return;

		            this.currentStep = angular.copy(TNS_newSteps);
		            Globals.updateUsedObjects(workspace);
		            this.currentGlobals = Globals.getAllObjectToJson();
		            this.currentUndoOrder = 0;
		            var InsData = {
		                'orderSteps': 0,
		                'allWorkFlowContents': JSON.stringify(TNS_diffSteps)
		            }
		            if(this.last20Steps.length > 0)
		            	this.last20Steps.unshift(InsData);
	            	else
			            this.last20Steps = [InsData];

		            this.last20Steps = this.last20Steps.slice(0, 50);

		            for (var i = 0; i < this.last20Steps.length; i++) {
		                this.last20Steps[i].orderSteps = i;
		            }
		            this.savedInServer = false;

		        }catch(e){
		        	$rootScope.currentScope.Toast.show("Error!","there was an error in upadting last steps", Toast.LONG, Toast.ERROR);
	                Log.e("Steps","InsertStepToLastSteps", e);
		        }
			},

			restoreStep: function(workspace, callback){
				try{

					// sort to insure that last 10 steps sorted from newer to older
					this.last20Steps.sort(function(a,b){return (a.orderSteps - b.orderSteps)});
					if($.isEmptyObject(this.currentStep)){
						// no undo steps
						callback();
					}
					else{
						workspace.workflows = [];
						workspace.lastWorkflowId = 0;
						workspace.newWorkflowButtons = [];
						workspace.selectedWorkflow = null;

						var TNS_No_Content = [];
			            
			            // restore cahedObjectsData
			            for(var i=0; i<this.currentGlobals.length; i++){
			            	var stor = new Storage();
			            	stor.getElementById(this.currentGlobals[i], false, false, function(){});
			            }

						var DiffObjects = getDiffSteps(TNS_No_Content, this.currentStep);
						var workflowsToBuildCopy = angular.copy(DiffObjects.workflows.inserted);

						// check inserted workflows
						loopDiffObjects(0, workflowsToBuildCopy);

					}

		        	function workflowsReturn(newWorkflow, index, passWorkspace, workflowsToBuild){
		        		passWorkspace.workflows.push(newWorkflow);
		        		loopDiffObjects(index,workflowsToBuild);
		        	}
		        	function loopDiffObjects(index, workflowsToBuild){
		        		if(index < workflowsToBuild.length){
		        			// restoring onjects
		        			// check cotnents
		        			for(var i=0; i<workflowsToBuild[index].tabs.length; i++){
		        				if(workflowsToBuild[index].tabs[i].content){
		        					workflowsToBuild[index].tabs[i].content = Globals.get(workflowsToBuild[index].tabs[i].content.id, workflowsToBuild[index].tabs[i].content.type);
		        				}

		        				if(workflowsToBuild[index].tabs[i].dataHolding && workflowsToBuild[index].tabs[i].dataHolding.results){
		        					var tempResults = [];
		        					for(var i2=0; i2<workflowsToBuild[index].tabs[i].dataHolding.results.length; i2++){
		        						if(workflowsToBuild[index].tabs[i].dataHolding.results)
		        							if(Globals.get(workflowsToBuild[index].tabs[i].dataHolding.results[i2].id, workflowsToBuild[index].tabs[i].dataHolding.results[i2].type))
		        								tempResults.push(Globals.get(workflowsToBuild[index].tabs[i].dataHolding.results[i2].id, workflowsToBuild[index].tabs[i].dataHolding.results[i2].type));
		        					}
		        					workflowsToBuild[index].tabs[i].dataHolding.results = tempResults;
		        					workflowsToBuild[index].tabs[i].dataHolding.resultsCount = tempResults.length;
		        				}
		        			}
		        			// check dataholidng contents
		        			// 
		        			workflowsToBuild[index].requestFrom="restoreStep";
		        			workflowsToBuild[index].callback = workflowsReturn;
		        			workflowsToBuild[index].passindex = index + 1;
		        			workflowsToBuild[index].passWorkspace = workspace;
		        			workflowsToBuild[index].workflowsToBuild = workflowsToBuild;
		        			var tempWorkflow = new Workflow(workflowsToBuild[index]);
		        		}else{
		        			updateCashedContents();
		        		}
		        	}
		        	// check new -> if locked by me, take from cashe, else pull from server
		        	function updateCashedContents(){
		        		Globals.getMinimized(function(result){
		        			if(result.length == 0){
		        				loopDiffObjectsDone();
		        			}else{
		        				var svr = new Server();
		        				svr.getFromServer({objectsArray:result}, function(success, error){
		        					if(error && !success){
		        						loopDiffObjectsDone();
		        					}else{
		        						var stor = new Storage();
		        						loopObjects(0, success);
		        						function loopObjects(index, newObjects){
		        							if(index < newObjects.length){
		        								stor.getElementById(newObjects[index], false, true, function(object){
		        									loopObjects(Number(index)+1, newObjects);
		        								});
		        							}else{
		        								refreshObjectsInheritence();
		        							}
		        						}
			        				}
		        				});
		        			}
		        		});
		        	}

		        	function refreshObjectsInheritence(){

		        		// loopKbits
		        		var Kbits = Globals.getRecentObjects("Kbit");
		        		for(var i=0; i<Kbits.length; i++){
		        			if(Kbits[i].terms){
		        				var tempTerms = [];
		        				for(var i2=0; i2<Kbits[i].terms.length; i2++){
		        					if(Globals.get(Kbits[i].terms[i2].id, Kbits[i].terms[i2].type))
		        						tempTerms.push(Globals.get(Kbits[i].terms[i2].id, Kbits[i].terms[i2].type));
		        				}
		        				Kbits[i].terms = tempTerms;
		        			}
		        		}
		        		// loopDelivery
		        		var Deliveries = Globals.getRecentObjects("Delivery");
		        		for(var i=0; i<Deliveries.length; i++){
		        			if(Deliveries[i].terms){
		        				var tempTerms = [];
		        				for(var i2=0; i2<Deliveries[i].terms.length; i2++){
		        					if(Globals.get(Deliveries[i].terms[i2].id, Deliveries[i].terms[i2].type))
		        						tempTerms.push(Globals.get(Deliveries[i].terms[i2].id, Deliveries[i].terms[i2].type));
		        				}
		        				Deliveries[i].terms = tempTerms;
		        			}
		        			if(Deliveries[i].kBitsNeeded){
		        				var tempTerms = [];
		        				for(var i2=0; i2<Deliveries[i].kBitsNeeded.length; i2++){
		        					if(Globals.get(Deliveries[i].kBitsNeeded[i2].id, Deliveries[i].kBitsNeeded[i2].type))
		        						tempTerms.push(Globals.get(Deliveries[i].kBitsNeeded[i2].id, Deliveries[i].kBitsNeeded[i2].type));
		        				}
		        				Deliveries[i].kBitsNeeded = tempTerms;
		        			}
		        			if(Deliveries[i].kBitsProvided){
		        				var tempTerms = [];
		        				for(var i2=0; i2<Deliveries[i].kBitsProvided.length; i2++){
		        					if(Globals.get(Deliveries[i].kBitsProvided[i2].id, Deliveries[i].kBitsProvided[i2].type))
		        						tempTerms.push(Globals.get(Deliveries[i].kBitsProvided[i2].id, Deliveries[i].kBitsProvided[i2].type));
		        				}
		        				Deliveries[i].kBitsProvided = tempTerms;
		        			}
		        		}
		        		loopDiffObjectsDone();
		        	}
		        	function loopDiffObjectsDone(){
		        		callback();
		        	}
			        
		        }catch(e){
			        $rootScope.currentScope.Toast.show("Error!","there was an error in restoring steps", Toast.LONG, Toast.ERROR);
	                Log.e("Steps","restoreStep", e);
	                callback();
	            }
			},
			/**
			 * Remove all steps from local and server, and add one step represents current state
			 */
			clearLastSteps: function(workspace){
				try{
					this.last20Steps = [];
					this.currentUndoOrder = 0;
					this.InsertStepToLastSteps(workspace);
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in clearing last steps", Toast.LONG, Toast.ERROR);
	           		Log.e("Steps","clearLastSteps", e);
				}
			},

			/**
			 * Save last steps to server
			 */
			commitSteps: function(workspace, callback){
				try{
					if(this.savedInServer == false){
						ngScope.savingStepsToServer = "Saving...";
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

						var passThis = this;
			            var stor = new Storage();
			            stor.setWorkspaceData(this.toJson(), null, null, function(success, error){
			            	if(error || !success){
			            		$rootScope.currentScope.Toast.show("Error!","there was an error in upadting last steps", Toast.LONG, Toast.ERROR);		
			            	}else{
			            		var svr = new Server("steps", $rootScope.currentScope.isDummy);
								if(typeof callback == "funtion")
									svr.setSteps(localStorage["com.intel.userdata"], callback);
								else
									svr.setSteps(localStorage["com.intel.userdata"], function(){});
								ngScope.savingStepsToServer = "Save";
			            	}
			            });
					}else{
						if(typeof callback == "funtion")
							callback(null, {"message": "Steps up to date", "code":""});
					}
				}catch(e){
	                Log.e("Steps","commitSteps", e);
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
						"currentGlobals": this.currentGlobals,
						"currentStep": this.currentStep,
						"last20Steps": this.last20Steps,
						"currentUndoOrder": this.currentUndoOrder,
						"lastModified": +(new Date()),
						"lastFocusedWorkflow": this.lastFocusedWorkflow
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","there was an error converting to JSON", Toast.LONG, Toast.ERROR);
	                Log.e("Steps","toJson", e);
					return null;
				}
			},

			removeRelatedSteps: function(content){
				var i=0;
				while(i < this.last20Steps.length){
					var step = JSON.parse(this.last20Steps[i].allWorkFlowContents);
					if(step.affectsOnlyEditingData && step.affectsOnlyEditingData == true){
						if(step.contentId && step.contentType && step.contentId == content.id &&  step.contentType == content.type){
							this.last20Steps.splice(i,1);
						}else
							i++;
					}else
						i++;
				}
				for (var i = 0; i < this.last20Steps.length; i++) {
	                this.last20Steps[i].orderSteps = i;
	            }
	            this.currentUndoOrder = 0;
			}


			
		}

		return Steps;
	}]);
})(window.angular);









