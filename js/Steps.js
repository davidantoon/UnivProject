app.factory('Steps', ["Workflow", "Workspace", "Server", function(Workflow, Workspace, Server){

	function Steps(workspace){

		this.last20Steps = [];	
		this.currentUndoOrder = 1;
		this.savedInServer = false;
		this.lastFocusedWorkflow = null;

		var passThis1 = this;
		var svr = new Server(this.objectType);
		svr.getSteps(function(result, error){
			if(error || !result){
				ServerResquestComplete(null, passThis1);
			}else{
				ServerResquestComplete(result, passThis1);
			}
		});

		function ServerResquestComplete(serverSteps, passThis){
			var dataFromLocalStorage = JSON.parse(localStorage.getItem("com.intel.steps.last20Steps"));
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
			passThis.commitSteps();
			passThis.savedInServer = true;
			// update layout of workspace
			passThis.restoreStep(workspace, function(){
				if(passThis.lastFocusedWorkflow == null || passThis.lastFocusedWorkflow == undefined){
					passThis.lastFocusedWorkflow = lastFocusedWorkflow = workspace.workflows[0].ID;
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
			});
		}
	}

	Steps.prototype = {

		objectType: "steps",
		/**
		 * check if there is older step to undo it
		 * @return {Boolean} True if older step exist, else False
		 */
		canUndo: function(){
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
		},

		/**
		 * check if there is newer step to undo it
		 * @return {Boolean} True if newer step exist, else False
		 */
		canRedo: function(){
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
		},

		/**
		 * Restore previous OLD step of workspace properties
		 * @param  {Workspace} workspace current workspace
		 */
		undoWorkflow: function(workspace, callback){
			
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
					console.log(new Error("Steps: undoWorkflow() cannot undo, IOPS = -1"));
					callback(false);
					return;
				}

				// get json object of previous step
				var tempJsonWorkflows =  JSON.parse(this.last20Steps[IOPS].allWorkFlowContents);
				var DiffObjects = getDiffArrays(workspace.workflows,tempJsonWorkflows);

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
		},

		/**
		 * Restore previous NEW step of workspace properties
		 * @param  {Workspace} workspace current workspace
		 */
		redoWorkflow: function(workspace, callback){

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
					console.log(new Error("Steps: redoWorkflow() cannot redo, IONS = -1"));
					callback(false);
					return;
				}

				// get json object of previous step
				var tempJsonWorkflows =  JSON.parse(this.last20Steps[IONS].allWorkFlowContents);
				var DiffObjects = getDiffArrays(workspace.workflows,tempJsonWorkflows);

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
                this.currentUndoOrder--;
                localStorage.setItem("com.intel.steps.last20Steps", JSON.stringify(this.toJson()));
	            this.savedInServer = false;
                callback();
			}
		},

		/**
		 * Update last steps object to support new steps
		 */
		UpdateLastSteps: function(){
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
		},

		/**
		 * Insert new step to last steps object
		 */
		InsertStepToLastSteps: function(workspace){
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
            this.last20Steps.unshift(InsData);
            this.last20Steps = this.last20Steps.slice(0, 20);
            for (var i = 0; i < this.last20Steps.length; i++) {
                this.last20Steps[i].orderSteps = (i + 1);
            }
            localStorage.setItem("com.intel.steps.last20Steps", JSON.stringify(this.toJson()));
            this.savedInServer = false;
		},

		restoreStep: function(workspace, callback){
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

				var DiffObjects = getDiffArrays(workspace.workflows,tempJsonWorkflows);

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
	            callback();
	        }
		},
		/**
		 * Remove all steps from local and server, and add one step represents current state
		 */
		clearLastSteps: function(workspace){
			this.last20Steps = [];
			this.currentUndoOrder = 1;
			this.InsertStepToLastSteps(workspace);
		},

		/**
		 * Save last steps to server
		 */
		commitSteps: function(callback){

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
				var svr = new Server(this.objectType);
				if(typeof callback == "funtion")
					svr.saveElement(this.toJson(), callback);
				else
					svr.saveElement(this.toJson(), function(){});
			}else{
				if(typeof callback == "funtion")
					callback(null, {"message": "Steps up to date", "code":""});
			}
		},



		/**
         * Creates Json 
         * @return {Object} Json object
         */
		toJson: function(){
			return {
				"last20Steps": this.last20Steps,
				"currentUndoOrder": this.currentUndoOrder,
				"lastModified": +(new Date()),
				"lastFocusedWorkflow": this.lastFocusedWorkflow
			}
		}
	}

	return Steps;
}]);









