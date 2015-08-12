
"use strict";

function workSpace() {
	var firstWorkflow = new Workflow(null, 0, 12, 12, 13, 13);
	this.workflows = [firstWorkflow];
	this.lastWorkflowId = 0;
	this.newWorkflowButtons = this.getNewWorkflowButtons(null);
	this.selectedWorkflow = firstWorkflow;
}

workSpace.prototype.addNewWorkflow = function(newWorkflow){
	this.workflows.push(new Workflow(null,this.lastWorkflowId++,newWorkflow.fx,newWorkflow.fy,newWorkflow.tx,newWorkflow.ty));
};

workSpace.prototype.updateNewWorkflowButtons = function(){
	this.newWorkflowButtons = this.getNewWorkflowButtons(1);
};
workSpace.prototype.getNewWorkflowButtons = function(workFlowIndex) {
	var TempnewWorkflowButtons = [];
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
			checkIndex[ch].check = this.checkNewWorkflowButtons(checkIndex[ch].x,checkIndex[ch].y, TempnewWorkflowButtons);
		}
		for(var j=0; j<checkIndex.length; j++){
			if(checkIndex[j].check == 1){
				TempnewWorkflowButtons.push(new Workflow("newWorkflowButton", this.lastWorkflowId++, checkIndex[j].x, checkIndex[j].y, Number(checkIndex[j].x)+1, Number(checkIndex[j].y)+1))
			}
		}
	}
	return TempnewWorkflowButtons;
};
workSpace.prototype.checkNewWorkflowButtons = function(x,y, TempnewWorkflowButtons){
	var flag = 1;
	for(var i=0; i<TempnewWorkflowButtons.length; i++){
		if(TempnewWorkflowButtons[i].fx == x && TempnewWorkflowButtons[i].fy == y){
			flag = 0;
			break;
		}
	}
	for(var i=0; i<this.workflows.length; i++){
		if(this.workflows[i].fx <= x && this.workflows[i].fy <= y && this.workflows[i].tx > x && this.workflows[i].ty > y ){
			flag = 0;
			break;
		}
	}
	return flag;
};





