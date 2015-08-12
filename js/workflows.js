angular.module('IntelLearner', ['onsen', 'firebase']).factory('Workflow', ['Tab', function(tab){

    function Workflow(tempJson, id, fx, fy, tx, ty){

        if(tempJson && id && fx && fy && tx && ty){
            if (tempJson == null) {
                this.ID = id;
                this.fx = fx;
                this.fy = fy;
                this.tx = tx;
                this.ty = ty;
                this.name = "Workflow" + id;
                this.tabsIds = 1;
                this.tabs = [new Tab(0, this)];
                this.selectedTab = this.tabs[0];
            } else if(tempJson == "newWorkflowButton"){
                this.ID = id;
                this.fx = fx;
                this.fy = fy;
                this.tx = tx;
                this.ty = ty;
                this.tabs = [];
                this.name = "New Workflow";
            }else {
                this.ID = tempJson.ID;
                this.fx = tempJson.fx;
                this.fy = tempJson.fy;
                this.tx = tempJson.tx;
                this.ty = tempJson.ty;
                this.name = tempJson.name;
                this.tabsIds = tempJson.tabsIds;
                this.tabs = [];
                for (var i = 0; i < tempJson.tabs.length; i++) {
                    var tempTab = new Tab(tempJson.tabs[i].ID, this);
                    tempTab.title = tempJson.tabs[i].title;
                    tempTab.Type = tempJson.tabs[i].Type;

                    tempTab.content = tempJson.tabs[i].content;
                    tempTab.orderTab = tempJson.tabs[i].orderTab;
                    if(tempJson.selectedTab.ID == tempJson.tabs[i].ID){
                        this.selectedTab = tempTab;
                    }
                    this.tabs.push(tempTab);
                }

            }
        }else{
            throw "Id or parentWorkflow not specified!";
            return null;
        }
    }

    Workflow.prototype = {
        updateAllParams:  function(tempJson){
            this.ID = tempJson.ID;
            this.fx = tempJson.fx;
            this.fy = tempJson.fy;
            this.tx = tempJson.tx;
            this.ty = tempJson.ty;
            this.name = tempJson.name;
            this.tabs = [];
            for (var i = 0; i < tempJson.tabs.length; i++) {
                var tempTab = new Tab(tempJson.tabs[i].ID, this);
                tempTab.title = tempJson.tabs[i].title;
                tempTab.Type = tempJson.tabs[i].Type;
                tempTab.content = tempJson.tabs[i].content;
                tempTab.orderTab = tempJson.tabs[i].orderTab;
                if(tempJson.selectedTab.ID == tempJson.tabs[i].ID){
                    this.selectedTab = tempTab;
                }
                this.tabs.push(tempTab);

            }
        }
    };

    return Workflow;
}]);



Workflow.prototype.equals = function(obj) {
	return (this.ID == obj.ID);
};


Workflow.prototype.addTab = function() {
    var newTabId = this.tabsIds;
    var newTab = new Tab(newTabId, this);
    this.tabs.push(newTab);
    this.tabsIds++;
    return newTab;
};

Workflow.prototype.scrollTo = function() {
    var wWidth = $(window).width();
    var blockPosL = Number($('#WorkFlowMatrix').css('zoom')) * $('#Workflow' + this.ID).position().left;
    var blockWidth = Number($('#WorkFlowMatrix').css('zoom')) * $('#Workflow' + this.ID).outerWidth(true);
    var sLeft = blockPosL - ((wWidth - blockWidth) / 2);

    var wHeight = $(window).height();
    var blockPosT = Number($('#WorkFlowMatrix').css('zoom')) * $('#Workflow' + this.ID).position().top;
    var blockHeight = Number($('#WorkFlowMatrix').css('zoom')) * $('#Workflow' + this.ID).outerHeight(true);
    var sTop = blockPosT - ((wHeight - blockHeight) / 2);
    $('#BodyRow').animate({ scrollTop: sTop, scrollLeft: sLeft }, 200);

    // $("#BodyRow").animate({
    //     scrollTop: sTop,
    //     scrollLeft: sLeft
    // }, {
    //     duration: 0,
    //     queue: false
    // });
};

Workflow.prototype.getPosition = function() {
    return {
        "left": Number($('#WorkFlowMatrix').css('zoom')) * $('#Workflow' + this.ID).position().left,
        "top": Number($('#WorkFlowMatrix').css('zoom')) * $('#Workflow' + this.ID).position().top,
        "width": Number($('#WorkFlowMatrix').css('zoom')) * $('#Workflow' + this.ID).outerWidth(true),
        "height": Number($('#WorkFlowMatrix').css('zoom')) * $('#Workflow' + this.ID).outerHeight(true)
    };
};


Workflow.prototype.toString = function() {
    var tempJson = {
        "ID": this.ID,
        "fx": this.fx,
        "fy": this.fy,
        "tx": this.tx,
        "ty": this.ty,
        "name": this.name,
        "tabsIds": this.tabsIds,
        "tabs": []
    }
    tempJson.selectedTab = {
        "ID": this.selectedTab.ID
    };
    for (var i = 0; i < this.tabs.length; i++) {
        tempJson.tabs.push({
            "ID": this.tabs[i].ID,
            "title": this.tabs[i].title,
            "Type": this.tabs[i].Type,
            "content": this.tabs[i].content,
            "orderTab": this.tabs[i].orderTab
        });
    }
    return JSON.stringify(tempJson);
};
Workflow.prototype.toJson = function() {
    var tempJson = {
        "ID": this.ID,
        "fx": this.fx,
        "fy": this.fy,
        "tx": this.tx,
        "ty": this.ty,
        "name": this.name,
        "tabsIds": this.tabsIds,
        "tabs": []
    }
    tempJson.selectedTab = {
        "ID": this.selectedTab.ID
    };
    for (var i = 0; i < this.tabs.length; i++) {
        tempJson.tabs.push({
            "ID": this.tabs[i].ID,
            "title": this.tabs[i].title,
            "Type": this.tabs[i].Type,
            "content": this.tabs[i].content,
            "orderTab": this.tabs[i].orderTab
        });
    }
    return tempJson;
};


function getDiffArrays (before,after) {
	return {
		"deleted":(before.filter(function(a) {
	    	var found = false;
	    	for(var i=0; i<after.length ;i++){
	    		if(after[i].ID == a.ID){
	    			found = true;
	    		}
	    	}
			return (!found);
		})),
		"inserted":(after.filter(function(a) {
	    	var found = false;
	    	for(var i=0; i<before.length ;i++){
	    		if(before[i].ID == a.ID){
	    			found = true;
	    		}
	    	}
			return (!found);
		}))
	}
}














