// app.factory('Steps', ["Server", function(Server){
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
		undoWorkflow: function(workspace){

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









