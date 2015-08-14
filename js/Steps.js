// app.factory('Steps', ["Server", "Storage", function(Server, Storage){
app.factory('Steps', function(){

	function Steps(){

		this.last10Steps = [];
		this.currentUndoOrder = 1;

		// check if there is saved steps in server side
			// compare with saved steps in localStorage
			// restore the newest saved steps

		// check if there is saved data in Local
			// restore local saved steps
		
		// create new steps object
	}

	Steps.prototype = {

		objectType: "Steps",
		/**
		 * check if there is older step to undo it
		 * @return {Boolean} True if older step exist, else False
		 */
		canUndo: function(){
			var undoFound = false;
            this.last10Steps.sort(function(a, b) {
                return (a.orderSteps - b.orderSteps)
            });
            for (var i = 0; i < this.last10Steps.length; i++) {
                if (this.currentUndoOrder < this.last10Steps[i].orderSteps) {
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
            this.last10Steps.sort(function(a, b) {
                return (a.orderSteps - b.orderSteps)
            });
            for (var i = 0; i < this.last10Steps.length; i++) {
                if (this.currentUndoOrder > this.last10Steps[i].orderSteps) {
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
				this.last10Steps.sort(function(a,b){return (a.orderSteps - b.orderSteps)});
				
				var indexOfPrevStep = -1;
				for(var i = 0; i <  this.last10Steps.length; i++){
					if(this.currentUndoOrder < this.last10Steps)
				}


			}

			var RetData;
            if ($scope.canUndo()) {

                for (var i = 0; i < $scope.last10Steps.length; i++) {
                    if ($scope.currentUndoOrder < $scope.last10Steps[i].orderSteps) {
                        RetData = $scope.last10Steps[i];
                        $timeout(function() {
                            $scope.$apply(function() {
                                tempJsonWorkflows = JSON.parse(RetData.allWorkFlowContents);
                                tempWorkflowArray = [];
                                var DiffObjects = getDiffArrays($scope.Workflow,tempJsonWorkflows);
                            	for(var j1=0; j1<DiffObjects.deleted.length; j1++){
                            		for(var j2=0; j2<$scope.Workflow.length; j2++){
	                            		if($scope.Workflow[j2].equals(DiffObjects.deleted[j1])){
	                            			$scope.Workflow.splice(j2,1);
	                            		}
	                            	}
                            	}
                            	for(var j1=0; j1<DiffObjects.inserted.length; j1++){
	                            	$scope.Workflow.push(new Workflow(DiffObjects.inserted[j1]));
	                            }
                            	$scope.Workflow.sort(function(a,b){ return a-b});
                                for (var i1 = 0; i1 < tempJsonWorkflows.length; i1++) {
                                	for(var i2=0; i2< $scope.Workflow.length; i2++){
                                		if(tempJsonWorkflows[i1].ID == $scope.Workflow[i2].ID){
                                			$scope.Workflow[i2].updateAllParams(tempJsonWorkflows[i1]);
                                		}
                                	}
                                }
                                $scope.progressLines = JSON.parse(RetData.allProgressLines);
                                $scope.updateAllTabName();
                                $scope.updateMatrixLayout();
                                $scope.currentUndoOrder++;
                                $scope.workSpaces.updateNewWorkflowButtons();
                            });
                        }, 1);
                        break;
                    }
                }
            }
		},

		/**
		 * Restore previous NEW step of workspace properties
		 * @param  {Workspace} workspace current workspace
		 */
		redoWorkflow: function(workspace){

		},

		/**
		 * Update last steps object to support new steps
		 */
		UpdateLastSteps: function(){

		},

		/**
		 * Insert new step to last steps object
		 */
		InsertStepToLast10Steps: function(workspace){

		},

		/**
		 * Remove all steps from local and server, and add one step represents current state
		 */
		clearLastSteps: function(workspace){

		},

		/**
		 * Save last steps to server
		 */
		commitSteps: function(){

		}

	}

	return Steps;
});









