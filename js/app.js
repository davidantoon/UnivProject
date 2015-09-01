// FOR Debugging
console.warn("$scope stored in ngScope");
var ngScope;

(function(angular) {
    // 'use strict';
    angular.module('IntelLearner', ['onsen', 'firebase']);
    angular.module('IntelLearner').controller('MainCtrl', ["$rootScope", "$scope",  "$http", "$timeout", "$interval", "$filter", "$window","Workspace", "TypeOf", "Steps","ServerReq","Server","Storage","Globals","Workflow", "Settings", "Toast","User", "$httpR",
        function($rootScope, $scope,  $http, $timeout, $interval, $filter, $window, Workspace, TypeOf, Steps, ServerReq, Server, Storage, Globals, Workflow, Settings, Toast, User, $httpR) {


            // PRIM COLOR = rgb(8,96,168)


            console.warn("Check duplicated steps");
            // David antoon

            /*********************************************************************************
             *                                                                                *
             *  000000000        000      000000000        000      000     000     00000     *
             *  000      00    000 000    000      00    000 000    0000   0000   000   000   *
             *  000      00   000   000   000      00   000   000   00 00 00 00   00          *
             *  000000000    000     000  000000000    000     000  00  000  00    0000000    *
             *  000          00000000000  000 000      00000000000  00   0   00          00   *
             *  000          000     000  000   000    000     000  00       00   000   000   *
             *  000          000     000  000     000  000     000  00       00     00000     *
             *                                                                                *
             *********************************************************************************/

             // FOR Debugging
            var appElement = document.querySelector('[ng-controller=MainCtrl]');
            ngScope = angular.element(appElement).scope();
            $scope.isDummy = false;


            $scope.AppStatus = 0;
            $scope.currentUser = {};
            $scope.Workflow = [];
            $scope.lastZoomIn = $('#ZoomRange').val();
            $scope.holdDoubleClickOnTab = false;
            $scope.selectedWorkflow = 0;
            $scope.workSpaces = {};
            $scope.displayNewWorkflowTabButtons = true;
    		$scope.displayNewWorkflowButtons = false;
            $scope.clickToMaximize = false;


            // new implementaion for steps
            $scope.Steps;
            $scope.Toast;
            $scope.focusingLastWorkflow = true;
            $scope.holdingNewWorkflowData = null;
            $scope.Settings;
            $scope.counterBeforeSave = 0;
            $scope.blurAllWindow = false;
            $scope.handlePickColor = false;
            $scope.holdDoubleClickOnObject = null;
            $scope.bodyScrolling = false;
            $scope.bodyScrollingTimeout = null;


            // $scope.$on('$destroy', function() {
            //     delete $window.onbeforeunload;
            // });
            $window.onbeforeunload = function (event) {
                if(!$scope.Steps.savedInServer || !Globals.allObjectsaved()){
                    return "Are you sure you want to leave this page?";
                }
            };
            


            
            // INIT Dummy Data
            function dummyData(){
                console.warn("Dummy Data Init");
                $.getJSON('./ServerDummyContent/KbitDB.json', function(json, textStatus) {
                    localStorage.setItem("com.intel.Server.Kbits",JSON.stringify(json)); 
                });
                $.getJSON('./ServerDummyContent/deliveryDB.json',{}, function(json, textStatus) {
                    localStorage.setItem("com.intel.Server.delivery",JSON.stringify(json)); 
                });
                $.getJSON('./ServerDummyContent/termsDB.json',{}, function(json, textStatus) {
                    localStorage.setItem("com.intel.Server.terms",JSON.stringify(json)); 
                });
            }
            // dummyData();



            /*******************************************************
             *                                                      *
             *  00000000000  000      00  00000000000  00000000000  *
             *      000      0000     00      000          000      *
             *      000      00 00    00      000          000      *
             *      000      00  000  00      000          000      *
             *      000      00    00 00      000          000      *
             *      000      00     0000      000          000      *
             *  00000000000  00      000  00000000000      000      *
             *                                                      *
             *******************************************************/

            $scope.alert = function(message) {
                ons.notification.alert({
                    message: message
                });
            };

            ons.ready(function() {
                $('#MainDiv').show();
                $timeout(function() {
                    TypeOf.init();
                    var stor = new Storage();
                    stor.getWorkspaceData(false, function(data){
                        if(data.CurrentUser){
                            Globals.CurrentUser = new User(data.CurrentUser);
                            $scope.currentUser = Globals.CurrentUser;
                            $scope.loadUserData();
                        }else{
                            $scope.logout();
                        }
                    });
                }, 500);
                $(function() {
                    $(".TimePicker").mask('99:99');
                    $('.DatePicker').mask('99/99/9999');
                });
            });







            /********************************************************************
             *                                                                   *
             *  000             00000        00000     00000000000  000      00  *
             *  000           000   000    000   000       000      0000     00  *
             *  000          000     000  000              000      00 00    00  *
             *  000          00       00  00   000000      000      00  000  00  *
             *  000          000     000  000     00       000      00    00 00  *
             *  000           000   000    000   000       000      00     0000  *
             *  0000000000      00000        00000     00000000000  00      000  *
             *                                                                   *
             ********************************************************************/
            $scope.logout = function() {
                $('#LoadingScreen').show();

                // LOGOUT

                $scope.clearData();
                $timeout(function() {
                    $scope.$apply(function() {
                        $scope.AppStatus = 1;
                        $('#LoadingScreen').hide();
                    });
                }, 1000);
            }
            $scope.clearData = function() {

                // CLEAR DATA

                // Globals.clear();
                // $scope.Steps.clear();

            }

            $scope.login = function(){
                var username = "rajibaba"; var password = "my_password"; // Jeries Mousa
                var username1 = "antoon91"; var password1 = "1234"; // Antoon Antoon

                User.login(username, password, function(succes, error){
                    if(error || !succes)
                        $scope.logout();
                    else{
                        Globals.CurrentUser = succes;
                        var stor = new Storage();

                        stor.setWorkspaceData(null, null, Globals.CurrentUser, function(){});
                    }
                });
            }


            $scope.loadUserData = function() {
                var loadedAmmount = 0;
                $scope.loadDataFromSRV(function(e) {
                    AllDataLoaded(++loadedAmmount);
                });
                AllDataLoaded(++loadedAmmount);
                function AllDataLoaded(finished) {
                    $('.StatusBarPerc').css('width', ((finished / 2) * 100) + "%");
                    if (finished == 2) {
                        $timeout(function() {
                            $scope.$apply(function() {
                                $scope.AppStatus = 2;
                                $('#LoadingScreen').hide();
                                var waitUntilLoad = setInterval(function(){
                                	if($('#Workflow'+$scope.Steps.lastFocusedWorkflow).position()){
                                		$timeout(function(){
                                            $scope.workSpaces.scrollToLastWorkflow($scope.Steps);
                                            $timeout(function(){
                                                $scope.focusingLastWorkflow = true;
                                            },500);
    	                            	},500);
    	                            	clearInterval(waitUntilLoad);
    	                            }
                                },100);
                            });
                        }, 300);
                    }
                }
            }
            

            /**
             * Loads the dama from the server
             * @param  {Function} callbackFunction callback function
             */
            $scope.loadDataFromSRV = function(callbackFunction) {
                
                // init worksace
                $rootScope.currentScope = $scope;
                $scope.Toast = new Toast();
                $scope.workSpaces = new Workspace();

                $scope.Steps = new Steps();
                $scope.Steps.loadSteps($scope.workSpaces, function(){
                    $scope.Settings = new Settings();
                    $scope.Settings.loadSettings(function(){
                        $scope.Workflow = $scope.workSpaces.workflows;
                        $scope.updateAllTabName();
                        $scope.updateMatrixLayout();
                        $scope.workSpaces.checkUserColorsInWorkspace();
                        
                        $('#WorkFlowMatrix').css('min-width', "10000px").css('min-height', "10000px").css('width', "10000px").css('height', "10000px");

                        callbackFunction(true);
                    });
                });
            }







            /********************************************************************************************************************
             *                                                                                                                   *
             *  000     000  000      00  000000000       00000              000000000    00000000000  000000000       00000     *
             *  000     000  0000     00  000     000   000   000            000      00  000          000     000   000   000   *
             *  000     000  00 00    00  000     000  000     000           000      00  000          000     000  000     000  *
             *  000     000  00  000  00  000     000  00       00           000000000    00000000000  000     000  00       00  *
             *  000     000  00    00 00  000     000  000     000           000 000      000          000     000  000     000  *
             *  000     000  00     0000  000     000   000   000            000   000    000          000     000   000   000   *
             *   000000000   00      000  000000000       00000              000     000  00000000000  000000000       00000     *
             *                                                                                                                   *
             ********************************************************************************************************************/

             /**
              * undo a move
              */
            $scope.UndoWorkflow = function() {
                try{
                    // call for undo in Steps, define the callback funtion to update the layouts and names
                    $scope.Steps.undoWorkflow($scope.workSpaces, function(){
                        $scope.counterBeforeSave = 0;
                        $scope.updateAllTabName();
                        $scope.updateMatrixLayout();
                        $scope.workSpaces.updateNewWorkflowButtons();
                        $timeout(function(){
                            $scope.workSpaces.checkUserColorsInWorkspace();
                        },200);
                    });
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt undo step", Toast.LONG, Toast.ERROR);
                    console.error("UndoWorkflow: ", e);
                }
            }

            /**
             * Redo a move
             */
            $scope.RedoWorkflow = function() {
                try{
                    // call for redo in Steps, define the callback funtion to update the layouts and names
                    $scope.Steps.redoWorkflow($scope.workSpaces, function(){
                        $scope.counterBeforeSave = 0;
                        $scope.updateAllTabName();
                        $scope.updateMatrixLayout();
                        $scope.workSpaces.updateNewWorkflowButtons();
                        $timeout(function(){
                            $scope.workSpaces.checkUserColorsInWorkspace();
                        },200);
                    });
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt redo step", Toast.LONG, Toast.ERROR);
                    console.error("RedoWorkflow: ", e);
                }
            }

            /**
             * Insert the last step to last steps array for undo and redo
             */
            $scope.InsertStepToLast10Steps = function() {
                try{
                    $scope.counterBeforeSave = 0;
                    //insert to last steps it the current workspace
                    $scope.Steps.InsertStepToLastSteps($scope.workSpaces);
                    //updates the colors (if a color is now available or not)
                    $scope.workSpaces.checkUserColorsInWorkspace();
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt insert last step", Toast.LONG, Toast.ERROR);
                    console.error("InsertStepToLast10Steps: ", e);
                }
            }










            /*******************************************************
             *                                                      *
             *  00000000000      000      000000000       00000     *
             *      000        000 000    000     000   000   000   *
             *      000       000   000   000     000   00          *
             *      000      000     000  0000000000     0000000    *
             *      000      00000000000  000     000          00   *
             *      000      000     000  000     000   000   000   *
             *      000      000     000  000000000       00000     *
             *                                                      *
             *******************************************************/

             /**
              * Updates the tab name
              * @param  {Number} workflowId the workflow Id that contains the tab
              * @param  {Number} tabId      the tab Id we want to update its name
              * @param  {Number} inputId    the input Id where we get the new name
              */
            $scope.updateTabName = function(workflowId, tabId, inputId) {
                try{
                    $('#' + inputId).attr('readonly', 'readonly');
                    for (var i = 0; i < $scope.Workflow.length; i++) {
                        if ($scope.Workflow[i].ID == workflowId) {
                            for (var j = 0; j < $scope.Workflow[i].tabs.length; j++) {
                                if ($scope.Workflow[i].tabs[j].ID == tabId) {
                                    $scope.Workflow[i].tabs[j].title = $('#' + inputId).val();
                                    $scope.InsertStepToLast10Steps();
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt update tab name", Toast.LONG, Toast.ERROR);
                    console.error("updateTabName: ", e);
                }
            }
            $scope.blurThis = function(inputId) {
                $('#' + inputId).blur();
            }
            $scope.ConvertTextBos = function(inputId) {

                $timeout(function() {
                    $scope.holdDoubleClickOnTab = false;
                }, 1);
                $('#' + inputId).removeAttr('readonly');
                $('#' + inputId).select();
            }

            /**
             * Selects specific tab in workflow
             * @param  {Object} workflow the workflow we want to update
             * @param  {Object} tab      the tab we want to select
             */
            $scope.selectTab = function(workflow, tab) {
                $scope.holdDoubleClickOnTab = true;
                $timeout(function() {
                    if ($scope.holdDoubleClickOnTab == true) {
                        if(workflow.selectedTab.ID != tab.ID){
                            workflow.selectedTab = tab;
                            $scope.InsertStepToLast10Steps();
                        }
                    }
                }, 200);
                $timeout(function(){
                    $scope.Steps.lastFocusedWorkflow = workflow.ID;
                    $scope.refocusLastWorkflow();
                },100);
            }

            /**
             * Gets the selected tab type
             * @param  {Object} workflow the workflow we want to get the type of its selected tabs
             * @return {string}          the type of the selected tab
             */
            $scope.getSelectedTabType = function(workflow){
                return workflow.selectedTab.Type;
            }
            
            /**
             * check if selected tab is equal to tabId
             * @param  {object} workflow the workflow that contains the tabs
             * @param  {number} tabId    tab id
             * @return {Boolean}         true if the selected tab is tabId
             */
            $scope.getSelectedTab = function(workflow, tabId) {
                return (workflow.selectedTab.ID == tabId);
            }

            /**
             * Updates all tabs name
             */
            $scope.updateAllTabName = function() {
                for (var i = 0; i < $scope.Workflow.length; i++) {
                    for (var j = 0; j < $scope.Workflow[i].tabs.length; j++) {
                        $('#WorkflowId' + $scope.Workflow[i].ID + 'Tab' + $scope.Workflow[i].tabs[j].ID).val($scope.Workflow[i].tabs[j].title);
                    }
                }
            }



            /**
             * Gets the index of selected tab
             * @param  {object} workflow the workflow that contain the tabs
             * @return {number}          index of the tab
             */
            $scope.getSelectedTabIndex = function(workflow){
                for(var i=0; i<workflow.tabs.length; i++){
                    if(workflow.tabs[i].ID == workflow.selectedTab.ID){
                        return i;
                        break;
                    }
                }
            }

            $scope.openFullScreen = function(index) {
                $scope.selectedWorkflow = index;
                $('#FullScreenDiv').fadeIn('fast');
            }
            $scope.closeFullScreen = function() {
                $('#FullScreenDiv').fadeOut('fast', function() {
                    $scope.selectedWorkflow = 0;
                });
            }

            /**
             * Closes specific tab
             * @param  {Object} workflow the workflow that contains the tab we want to close
             */
            $scope.closeTab = function(workflow){
                try{

                    if($scope.workSpaces.selectedColors.length > 0){
                        for(var i=0; i<$scope.workSpaces.workflows.length; i++){
                            if($scope.workSpaces.workflows[i].ID == workflow.ID){
                                $scope.workSpaces.workflows[i].selectedTab = workflow.selectedTab;
                                workflow = $scope.workSpaces.workflows[i];
                                break;
                            }
                        }
                    }

                    //update the parent tab and child tab after closing certan tab
                    var parentTabToDelete = workflow.selectedTab.dataHolding.parentTab;
                    var childTabToDelete = workflow.selectedTab.dataHolding.childTab;
                    //update parent tab that it no longer has a child
                    if(parentTabToDelete != null && parentTabToDelete.workflowId != null && parentTabToDelete.tabId != null){
                        $scope.workSpaces.deleteChildTabIds(workflow.selectedTab.dataHolding.parentTab, false);
                    }
                    // update child tab that it no longer has a parent
                    if(childTabToDelete != null && childTabToDelete.workflowId != null && childTabToDelete.tabId != null){
                        $scope.workSpaces.deleteChildTabIds(workflow.selectedTab.dataHolding.childTab, true);
                    }
                    workflow.tabs.splice($scope.getSelectedTabIndex(workflow),1);
                    //if there is still tab in specific workflow
                    if(workflow.tabs.length > 0){
                        if(parentTabToDelete != null && parentTabToDelete.workflowId != null && parentTabToDelete.tabId != null){
                            // look for parent tab ( if exists ) and focus it, make it selected tab
                            for(var i=0; i<workflow.tabs.length; i++){
                                if(workflow.tabs[i].ID == parentTabToDelete.tabId){
                                    workflow.selectedTab = workflow.tabs[i];
                                    break;
                                }
                            }
                        }

                        workflow.selectedTab = workflow.tabs[0];
                    }else{
                        //if we are closing last tab in workflow, we need to delete it
                        for(var i=0; i<$scope.Workflow.length; i++){
                            if($scope.Workflow[i].ID == workflow.ID){
                                $scope.Workflow.splice(i,1);
                                break;
                            }
                        }
                        // we are closing the only workflow we have ( which has only one tab), create new workflow after closing
                        if($scope.Workflow.length == 0){
                            $scope.Workflow.push(new Workflow(null, 0, 12, 12, 13, 13));
                            $scope.workSpaces.selectedWorkflow = $scope.Workflow[0];
                            $timeout(function(){
                                $scope.Steps.lastFocusedWorkflow = $scope.workSpaces.selectedWorkflow.ID;
                                $scope.refocusLastWorkflow();
                            },300);
                        }
                        $scope.EnableScroll(1);
                    }

                    $scope.updateColorFilterWorkflows();
                    if($scope.workSpaces.coloredWorkflows.length == 0){
                        $scope.selectColorFilter(0);
                    }
                    //updates
                    $scope.updateMatrixLayout();
                    $scope.workSpaces.updateNewWorkflowButtons();
                    $scope.InsertStepToLast10Steps();
                    $scope.workSpaces.checkUserColorsInWorkspace();

                }catch(e){
                    $scope.Toast.show("Error!","Could'nt close tab", Toast.LONG, Toast.ERROR);
                    console.error("closeTab: ", e);
                }
            }
            
            /**
             * Checks if color is used
             * @param  {String}  color the color we want to look for
             * @return {Boolean}       true if the color is used
             */
            $scope.isColorUsed = function(color){
                if($scope.workSpaces != undefined && $scope.workSpaces != null && $scope.workSpaces.colors != undefined &&  $scope.workSpaces.colors != null)
                    return $scope.workSpaces.colors[color];
                else
                    return true;
            }


            $scope.openTabOptions = function(wFlow, header){
                wFlow.selectedTab.tabOption = true;
            }
            $scope.closeOptionTab = function(wFlow){
                wFlow.selectedTab.tabOption = false;
            }

            /**
             * Go back to parent tab
             * @param  {object} dataHolding holding the data of parent tab
             */
            $scope.back = function(dataHolding){
                try{
                    if(dataHolding != null && dataHolding != undefined ){
                        // checks if there is a tab to go back to
                        if(dataHolding.parentTab.workflowId == null){
                            $scope.Toast.show("Note","Parent tab is not found.", Toast.SHORT, Toast.NORMAL);        
                        }else{
                            $scope.workSpaces.selectTabAfterSearch(dataHolding.parentTab);
                            $timeout(function(){
                                $scope.Steps.lastFocusedWorkflow = dataHolding.parentTab.workflowId;
                                $scope.refocusLastWorkflow();
                            },100);
                        }
                    }
                }catch(e){
                    $scope.Toast.show("Error!","There was an error on going back to parent tab", Toast.LONG, Toast.ERROR);
                    console.error("$scope.back: ", e);
                }
            }









            /*********************************************************************************
             *                                                                                *
             *  000     000      000      00000000000  000000000    00000000000  000     000  *
             *  0000   0000    000 000        000      000      00      000       000   000   *
             *  00 00 00 00   000   000       000      000      00      000         00 00     *
             *  00  000  00  000     000      000      000000000        000          000      *
             *  00   0   00  00000000000      000      000 000          000         00 00     *
             *  00       00  000     000      000      000   000        000       000   000   *
             *  00       00  000     000      000      000     000  00000000000  000     000  *
             *                                                                                *
             *********************************************************************************/

            /**
             * Updates the matrix layout
             */
            $scope.updateMatrixLayout = function() {
                try{
                    var w_Width = $(window).width();
                    var w_Height = $(window).height();
                    var blockDims = 400;
                    for (var i = 0; i < $('#WorkFlowMatrix > .WorkFlowBlock').length; i++) {

                        var fromX = $($('#WorkFlowMatrix > .WorkFlowBlock')[i]).attr('fx');
                        var fromY = $($('#WorkFlowMatrix > .WorkFlowBlock')[i]).attr('fy');
                        var toX = $($('#WorkFlowMatrix > .WorkFlowBlock')[i]).attr('tx');
                        var toY = $($('#WorkFlowMatrix > .WorkFlowBlock')[i]).attr('ty');
                        var tempBlockWidth = ((toX - fromX) * blockDims - 7);
                        var tempBlockHeight = ((toY - fromY) * blockDims - 7);
                        var tempBlockLeft = ((fromX * blockDims));
                        var tempBlockTop = ((fromY * blockDims));
                        $($('#WorkFlowMatrix > .WorkFlowBlock')[i]).css('height', tempBlockHeight + "px").css('width', tempBlockWidth + "px");
                        $($('#WorkFlowMatrix > .WorkFlowBlock')[i]).css('left', tempBlockLeft + "px").css('top', tempBlockTop + "px");
                        $($('#WorkFlowMatrix > .WorkFlowBlock')[i]).find('.SelectedTabContent').css('height', (tempBlockHeight-33) + "px");
                    }
                    // if($scope.workSpaces != null)
                        // $scope.workSpaces.updateNewWorkflowButtons();
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt update matrix layout", Toast.LONG, Toast.ERROR);
                    console.error("updateMatrixLayout: ", e);
                }
            }
            










            /***************************************************************************************************************************
            *                                                                                                                          *
            * 00         00 00000000000         000         00000     00000000000  00000000000     00000     000      00     00000     *
            * 00         00 000               000 000     000   000       000          000       000   000   0000     00   000   000   *
            * 00         00 000              000   000   000              000          000      000     000  00 00    00   00          *
            *  00   0   00  00000000000     000     000  00               000          000      00       00  00  000  00    0000000    *
            *  00  000  00  000             00000000000  000              000          000      000     000  00    00 00          00   *
            *  00 00 00 00  000             000     000   000   000       000          000       000   000   00     0000   000   000   *
            *   00     00   000             000     000     00000         000      00000000000     00000     00      000     00000     *
            *                                                                                                                          *
            ***************************************************************************************************************************/


            $scope.MainButtonsPressed = function(workflow, action){
                workflow.selectedTab.changeType(action);
                if(action == 1){

                }else if(action == 2){
                    // workflow.ty = workflow.fy+2;
                    $scope.resizeBlock(1,workflow);
                }else if(action == 3){

                }
                $scope.InsertStepToLast10Steps();
            }
        
            /**
             * Resizes the block
             * @param  {[type]} direction  [description]
             * @param  {[type]} workflowId [description]
             * @return {[type]}            [description]
             */
            $scope.resizeBlock = function(direction, workflowId) {
                try{
                    for(var i=0; i<$scope.workSpaces.workflows.length; i++){


                        switch (direction) {
                            case 1:
                                // Direction of Resize Block{}
                            break;
                            case 2:

                            break;
                            case 3:

                            break;
                            case 4:

                            break;
                            default:
                            break;
                        }
                    }
                    // workflowId.ty = workflowId.fy+2;
                    // $scope.workSpaces.updateNewWorkflowButtons();
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt resize block", Toast.LONG, Toast.ERROR);
                    console.error("resizeBlock: ", e);
                }
            }

            /**
             * Adds new tab to workflow
             * @param {Object} workflow the workflow we want to add to
             */
            $scope.addNewTabToWorkflow = function(workflow){
                try{
                    if($scope.holdingNewWorkflowData == null){
                        // display color picker to open new workflow
                        workflow.selectedTab = workflow.addTab();
                        workflow.selectedTab.color = $scope.colorPicked;
                        $scope.colorPicked = null;
                        $scope.InsertStepToLast10Steps();
                    }else{
                        // update workflow content related to action property
                        switch($scope.holdingNewWorkflowData.Action){
                            case "Search":
                                // initialize new tab
                                workflow.selectedTab = workflow.addTab();
                                workflow.selectedTab.type = 4;
                                workflow.selectedTab.title = $scope.holdingNewWorkflowData.selectedTab.title+" | Search";
                                workflow.selectedTab.color = $scope.holdingNewWorkflowData.selectedTab.color;
                                workflow.selectedTab.changeType(workflow.selectedTab.type);
                                workflow.selectedTab.dataHolding.parentTab.workflowId = $scope.holdingNewWorkflowData.selectedTab.parentWF.ID;
                                workflow.selectedTab.dataHolding.parentTab.tabId = $scope.holdingNewWorkflowData.selectedTab.ID;

                                // modify parent tab
                                $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.workflowId = workflow.ID;
                                $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.tabId = workflow.selectedTab.ID;


                            break;
                            case "DisplaySmallObject":

                                workflow.selectedTab = workflow.addTab();
                                workflow.selectedTab.type = 5;
                                workflow.selectedTab.title = $scope.holdingNewWorkflowData.data.name;
                                workflow.selectedTab.color = $scope.holdingNewWorkflowData.selectedTab.color;
                                workflow.selectedTab.changeType(workflow.selectedTab.type, $scope.holdingNewWorkflowData.data);
                                workflow.selectedTab.dataHolding.parentTab.workflowId = $scope.holdingNewWorkflowData.selectedTab.parentWF.ID;
                                workflow.selectedTab.dataHolding.parentTab.tabId = $scope.holdingNewWorkflowData.selectedTab.ID;

                                if($scope.holdingNewWorkflowData.ActionSearch != true){
                                    // modify parent tab
                                    $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.workflowId = workflow.ID;
                                    $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.tabId = workflow.selectedTab.ID;
                                }
                            break;
                            default:break;
                        }
                        $scope.holdingNewWorkflowData = null;
                    }
                    //updates
                    $scope.displayNewWorkflowButtons = false;
                    $scope.updateAllTabName();
                    $scope.updateMatrixLayout();
                    $scope.workSpaces.updateNewWorkflowButtons();
                    $scope.workSpaces.checkUserColorsInWorkspace();
                    
                    $timeout(function(){
                        $scope.Steps.lastFocusedWorkflow = workflow.ID;
                        $scope.refocusLastWorkflow();
                    },200);
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt add new workflow or tab", Toast.LONG, Toast.ERROR);
                    console.error("addNewTabToWorkflow: ", e);
                }
            }

            /**
             * Creates new workflow with the action needed to display 
             * @param  {object} newWorkflow the new workflow
             */
            $scope.convertToWorkflow = function(newWorkflow){
                try{
                    newWorkflow.fx = Math.floor(newWorkflow.fx);
                    newWorkflow.tx = Math.round(newWorkflow.tx);
                    if($scope.holdingNewWorkflowData == null){
                        // display color picker to open new workflow
                        
                        newWorkflow = $scope.workSpaces.addNewWorkflow(newWorkflow);
                        newWorkflow.selectedTab.color = $scope.colorPicked;
                        $scope.colorPicked = null;
                        $scope.workSpaces.updateNewWorkflowButtons();
                        $scope.InsertStepToLast10Steps();
                    }else{
                        // update workflow content related to action property
                        switch($scope.holdingNewWorkflowData.Action){
                            case "Search":
                                // initialize new tab
                                $scope.workSpaces.updateLastId();
                                newWorkflow.ID = $scope.workSpaces.lastWorkflowId;
                                $scope.workSpaces.updateLastId();
                                newWorkflow.selectedTab = newWorkflow.addTab();
                                newWorkflow.selectedTab.type = 4;
                                newWorkflow.selectedTab.title = $scope.holdingNewWorkflowData.selectedTab.title+" | Search";
                                newWorkflow.selectedTab.color = $scope.holdingNewWorkflowData.selectedTab.color;
                                newWorkflow.selectedTab.changeType(newWorkflow.selectedTab.type);
                                newWorkflow.selectedTab.dataHolding.parentTab.workflowId = $scope.holdingNewWorkflowData.selectedTab.parentWF.ID;
                                newWorkflow.selectedTab.dataHolding.parentTab.tabId = $scope.holdingNewWorkflowData.selectedTab.ID;

                                // modify parent tab
                                $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.workflowId = newWorkflow.ID;
                                $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.tabId = newWorkflow.selectedTab.ID;

                                $scope.workSpaces.workflows.push(newWorkflow);
                            break;
                            case "DisplayObject":
                                $scope.workSpaces.updateLastId();
                                newWorkflow.ID = $scope.workSpaces.lastWorkflowId;
                                $scope.workSpaces.updateLastId();
                                newWorkflow.selectedTab = newWorkflow.addTab();
                                newWorkflow.selectedTab.type = 5;
                                newWorkflow.selectedTab.title = $scope.holdingNewWorkflowData.data.name;
                                newWorkflow.selectedTab.color = $scope.holdingNewWorkflowData.selectedTab.color;
                                newWorkflow.selectedTab.changeType(newWorkflow.selectedTab.type, $scope.holdingNewWorkflowData.data);
                                newWorkflow.selectedTab.dataHolding.parentTab.workflowId = $scope.holdingNewWorkflowData.selectedTab.parentWF.ID;
                                newWorkflow.selectedTab.dataHolding.parentTab.tabId = $scope.holdingNewWorkflowData.selectedTab.ID;

                                // modify parent tab
                                if($scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.length != undefined){
                                    $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.push({
                                        "workflowId": newWorkflow.ID,
                                        "tabId": newWorkflow.selectedTab.ID
                                    });
                                }else{
                                    $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab = [{
                                        "workflowId": newWorkflow.ID,
                                        "tabId": newWorkflow.selectedTab.ID
                                    }];
                                }

                                $scope.workSpaces.workflows.push(newWorkflow);
                            break;
                            case "DisplaySmallObject":
                                $scope.workSpaces.updateLastId();
                                newWorkflow.ID = $scope.workSpaces.lastWorkflowId;
                                $scope.workSpaces.updateLastId();
                                newWorkflow.selectedTab = newWorkflow.addTab();
                                newWorkflow.selectedTab.type = 5;
                                newWorkflow.selectedTab.title = $scope.holdingNewWorkflowData.data.name;
                                newWorkflow.selectedTab.color = $scope.holdingNewWorkflowData.selectedTab.color;
                                newWorkflow.selectedTab.changeType(newWorkflow.selectedTab.type, $scope.holdingNewWorkflowData.data);
                                newWorkflow.selectedTab.dataHolding.parentTab.workflowId = $scope.holdingNewWorkflowData.selectedTab.parentWF.ID;
                                newWorkflow.selectedTab.dataHolding.parentTab.tabId = $scope.holdingNewWorkflowData.selectedTab.ID;

                                if($scope.holdingNewWorkflowData.ActionSearch != true){
                                    // modify parent tab
                                    $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.workflowId = newWorkflow.ID;
                                    $scope.holdingNewWorkflowData.selectedTab.dataHolding.childTab.tabId = newWorkflow.selectedTab.ID;
                                }

                                $scope.workSpaces.workflows.push(newWorkflow);
                            break;
                            default:break;
                        }
                        $scope.holdingNewWorkflowData = null;
                    }
                    $timeout(function(){
                        //updates
                        $scope.displayNewWorkflowButtons = false;
                        $scope.updateAllTabName();
                        $scope.updateMatrixLayout();
                        $scope.workSpaces.updateNewWorkflowButtons();

                        $timeout(function(){
                            $scope.Steps.lastFocusedWorkflow = newWorkflow.ID;
                            $scope.refocusLastWorkflow();
                        },300);
                    },100);
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt convert to workflow", Toast.LONG, Toast.ERROR);
                    console.error("convertToWorkflow: ", e);
                }
            }

            /**
             * Focus on last workflow
             */
            $scope.refocusLastWorkflow = function(){
                $scope.workSpaces.scrollToLastWorkflow($scope.Steps);
                $timeout(function(){
                    $scope.focusingLastWorkflow = true;
                },500);
            }

            /**
             * Focus on specific workflow
             * @param  {object} workflow the workflow we want to focus 
             */
            $scope.focusThisWorkflow = function(workflow){
                var lastFocusedWorkflow = $scope.Steps.lastFocusedWorkflow+1-1;
                $scope.Steps.lastFocusedWorkflow = workflow.ID;
                $scope.workSpaces.scrollToLastWorkflow($scope.Steps);
                $timeout(function(){
                    $({someValue: $("#ZoomRange").val()}).animate({someValue: 80}, {
                        duration: 100,
                        step: function() {
                           $("#ZoomRange").val(Math.ceil(this.someValue));
                        }
                    });
                    $timeout(function(){
                        $scope.workSpaces.scrollToLastWorkflow($scope.Steps);
                        $timeout(function(){
                            $scope.Steps.lastFocusedWorkflow = lastFocusedWorkflow;
                        },200);
                    },200);
                },200);

            }


            /**
             * Cancel the creation of new workflow
             */
            $scope.CancelNewWorkflow = function(wFlow){
                $scope.displayNewWorkflowButtons = false;
                $scope.holdingNewWorkflowData = null;
                $scope.blurAllWindow = false;
                $scope.handlePickColor = false;
            }

            /**
             * Creates new workflow
             */
            $scope.openNewWorkflow = function(){
                try{
                    $scope.workSpaces.updateNewWorkflowButtons(1);
                    $scope.blurAllWindow = true;
                    $scope.handlePickColor = true;
                    $scope.colorPicked = null;
                    $scope.Pickcolor(function(){
                        $scope.blurAllWindow = false;
                        $scope.handlePickColor = false;
                        $scope.selectColorFilter(0);
                        $scope.displayNewWorkflowButtons = true;
                        $scope.displayNewWorkflowTabButtons = true;
                        $scope.holdingNewWorkflowData = null;
                    });
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt open new work flow", Toast.LONG, Toast.ERROR);
                    console.error("openNewWorkflow: ", e);
                }
            }










            /*********************************************************************************
            *                                                                                *
            *     00000        00000     000             00000     000000000       00000     *
            *   000   000    000   000   000           000   000   000      00   000   000   *
            *  000          000     000  000          000     000  000      00   00          *
            *  00           00       00  000          00       00  000000000      0000000    *
            *  000          000     000  000          000     000  000 000              00   *
            *   000   000    000   000   000           000   000   000   000     000   000   *
            *     00000        00000     0000000000      00000     000     000     00000     *
            *                                                                                *
            *********************************************************************************/
            /**
             * Let the use to choose color for workflow or tab
             * @param {Function} callback callback function
             */
            $scope.Pickcolor = function(callback){
                var waitForUserResponse = $interval(function(){
                    if($scope.colorPicked != null){
                        callback();
                        $interval.cancel(waitForUserResponse);
                    }
                },100);
            }

            /**
             * Gets current workflow depends on color selection
             * @return {object} the workflow we are going to display
             */
            $scope.getCurrentWorkflows = function(){
               
                // default colors, no color filter selected
                if($scope.workSpaces.selectedColors.length == 0)
                    return $scope.workSpaces.workflows;
                else{
                    return $scope.workSpaces.coloredWorkflows;
                }
            }

            /**
             * Updates the workspace to show specific colors
             * @param  {string} color color we want to select
             */
            $scope.selectColorFilter = function(color){
                // if choose default colors to be shown
                if(color == 0){
                    $scope.workSpaces.coloredWorkflows = [];
                    $scope.workSpaces.selectedColors = [];
                }else{
                    // if color already checked, remove it
                    if($scope.colorIsChecked(color))
                        $scope.removeColorFromColorFilter(color);
                    else
                        $scope.workSpaces.selectedColors.push(color);

                    $scope.updateColorFilterWorkflows();
                }
                // updates the layout
                $scope.updateAllTabName();
                $scope.updateMatrixLayout();
            }  


            $scope.updateColorFilterWorkflows = function(){
                $scope.workSpaces.coloredWorkflows = [];
                //loop in colors the are selected to filter
                for(var i=0; i< $scope.workSpaces.selectedColors.length; i++){
                    //loop on all workflows searching for selected colors
                    for(var j=0; j<$scope.workSpaces.workflows.length; j++){
                        //loop in all tabs in specific workflow to check if colors exists
                        for(var k=0; k<$scope.workSpaces.workflows[j].tabs.length; k++){
                            if($scope.workSpaces.selectedColors[i] == $scope.workSpaces.workflows[j].tabs[k].color){
                                var holdingWorkflowColored = null;
                                // loop in coloredWorkflows to check if exist
                                for(var m=0; m<$scope.workSpaces.coloredWorkflows.length;m++){
                                    if($scope.workSpaces.coloredWorkflows[m].ID == $scope.workSpaces.workflows[j].ID){
                                        holdingWorkflowColored = $scope.workSpaces.coloredWorkflows[m];
                                        break;
                                    }
                                }

                                // if not exist
                                if(holdingWorkflowColored == null){
                                    holdingWorkflowColored = new Workflow($scope.workSpaces.workflows[j], null,null,null,null,null, true);
                                    $scope.workSpaces.coloredWorkflows.push(holdingWorkflowColored);   
                                }

                                // add tab referece
                                holdingWorkflowColored.tabs.push($scope.workSpaces.workflows[j].tabs[k]);
                                holdingWorkflowColored.selectedTab = holdingWorkflowColored.tabs[0];
                                for(var m=0; m<holdingWorkflowColored.tabs.length;m++){
                                    if(holdingWorkflowColored.tabs[m].ID == $scope.workSpaces.workflows[j].selectedTab.ID){
                                        holdingWorkflowColored.selectedTab = holdingWorkflowColored.tabs[m];
                                    }
                                }
                            }
                        }

                    }
                }
            }

            /**
             * Checks if color is selected
             * @param  {string} color the color we want to check
             * @return {boolean}       returns true if color exist
             */
            $scope.colorIsChecked = function(color){
                // loop on selected colors to check if color exists
                for(var i=0; i<$scope.workSpaces.selectedColors.length; i++)
                    if(color == $scope.workSpaces.selectedColors[i])
                        return true;
                return false;
            }

            /**
             * Removes color from the selected colors array
             * @param  {string} color the color we want to remove
             */
            $scope.removeColorFromColorFilter = function(color){
               
                //loop on colors to remove it
                for(var i=0; i<$scope.workSpaces.selectedColors.length; i++){
                    if(color == $scope.workSpaces.selectedColors[i]){
                        $scope.workSpaces.selectedColors.splice(i,1);
                        break;
                    }
                }
            }

            $scope.getColors = function(){
                return Object.keys($scope.workSpaces.colors);
            }








            /*********************************************************************************
            *                                                                                *
            *     00000     00000000000      000      000000000       00000     000     000  *
            *   000   000   000            000 000    000      00   000   000   000     000  *
            *   00          000           000   000   000      00  000          000     000  *
            *    0000000    00000000000  000     000  000000000    00           00000000000  *
            *          00   000          00000000000  000 000      000          000     000  *
            *   000   000   000          000     000  000   000     000   000   000     000  *
            *     00000     00000000000  000     000  000     000     00000     000     000  *
            *                                                                                *
            *********************************************************************************/

            /**
             * Prepare the display for search and opening new tab or workflow
             * @param  {object} wFlow the workflow that contains our search elemnts
             */
            $scope.prepareForSearch = function(wFlow){
                try{
                    var dataHolding = wFlow.selectedTab.dataHolding;
                    var holdingRequestTab = wFlow.selectedTab;
                    if(dataHolding.searchText && dataHolding.searchText != "" && dataHolding.elementsToSearch != null && dataHolding.searchBy != null  && 
                        (!(wFlow.selectedTab.dataHolding.searchBy[0] == 0 && wFlow.selectedTab.dataHolding.searchBy[1] == 0 && wFlow.selectedTab.dataHolding.searchBy[2] == 0)) &&
                        (!(wFlow.selectedTab.dataHolding.elementsToSearch[0] == 0 && wFlow.selectedTab.dataHolding.elementsToSearch[1] == 0 && wFlow.selectedTab.dataHolding.elementsToSearch[2] == 0))){
                      
                        var dataToSearch = {
                            "text":dataHolding.searchText,
                            "dataType": [
                                dataHolding.elementsToSearch[0], //  Kbits
                                dataHolding.elementsToSearch[1], //  Deliveries
                                dataHolding.elementsToSearch[2]  //  Terms
                            ],
                            "searchBy": [
                                dataHolding.searchBy[0], //  Name
                                dataHolding.searchBy[1], //  Description
                                dataHolding.searchBy[2]  //  ID
                            ],
                            "forceSearch": ((dataHolding.forceLastModifed == true)?'LastModifed':'ServerPull')
                        } 
                        // check if there is no old child tab search
                        if(holdingRequestTab.dataHolding.childTab.workflowId == null || holdingRequestTab.dataHolding.childTab.tabId == null){
                            if($scope.Settings.autoOpenTabs == true){
                                // open in tab
                                $scope.holdingNewWorkflowData = {"selectedTab":holdingRequestTab, "Action":"Search"};
                                $scope.addNewTabToWorkflow(holdingRequestTab.parentWF);
                            }else{
                                // give the ability to choose where to open new workflow (display newWorkflowButtons)
                                $scope.holdingNewWorkflowData = {"selectedTab":holdingRequestTab, "Action":"Search"};
                                $scope.displayNewWorkflowButtons = true;
                                $scope.displayNewWorkflowTabButtons = true;
                                $scope.selectColorFilter(0);
                            }
                            var waitForUserResponse = $interval(function(){
                                if($scope.displayNewWorkflowButtons == false){
                                    $interval.cancel(waitForUserResponse);
                                    if(holdingRequestTab.dataHolding.childTab.workflowId == null || holdingRequestTab.dataHolding.childTab.tabId == null){
                                        // new workflow canceled
                                        $scope.holdingNewWorkflowData = null;
                                        $scope.displayNewWorkflowButtons = false;
                                    }else{
                                        $scope.workSpaces.updateDataInTab(holdingRequestTab.dataHolding.childTab, null);
                                        var svr = new Server("SearchTab", $scope.isDummy);
                                        svr.search(dataToSearch, function(result, error){
                                            if(error || !result){
                                                $scope.workSpaces.updateDataInTab(holdingRequestTab.dataHolding.childTab, []);
                                                $scope.InsertStepToLast10Steps();
                                                $scope.Toast.show("Server Error", error.message, Toast.LONG, Toast.ERROR);
                                                $scope.InsertStepToLast10Steps();
                                            }else{
                                                $timeout(function(){
                                                    var stor = new Storage();
                                                    loopResults(0, result, []);
                                                    function loopResults(index, originalData, resultData){
                                                        if(index < originalData.length){
                                                            stor.getElementById(originalData[index], holdingRequestTab.dataHolding.forceLastModifed, holdingRequestTab.dataHolding.forceServerPull, function(resultO){
                                                                if(resultO != undefined)
                                                                    resultData.push(resultO);
                                                                loopResults(Number(index)+1, originalData, resultData);
                                                            });    
                                                        }else{
                                                            $scope.workSpaces.updateDataInTab(holdingRequestTab.dataHolding.childTab, resultData);
                                                            $scope.InsertStepToLast10Steps();
                                                        }
                                                    }
                                                },1500);
                                            }
                                        });
                                    }
                                }
                            },100);
                        }else{ // there is old child tab search
                            $scope.workSpaces.selectTabAfterSearch(holdingRequestTab.dataHolding.childTab);
                            $scope.workSpaces.updateDataInTab(holdingRequestTab.dataHolding.childTab, null);
                            var svr = new Server("SearchTab", $scope.isDummy);
                            svr.search(dataToSearch, function(result, error){
                                if(error || !result){
                                    $scope.workSpaces.updateDataInTab(holdingRequestTab.dataHolding.childTab, []);
                                    $scope.InsertStepToLast10Steps();
                                    $scope.Toast.show("Server Error", error.message, Toast.LONG, Toast.ERROR);
                                    $scope.InsertStepToLast10Steps();
                                }else{
                                    $timeout(function(){
                                        var stor = new Storage();
                                        loopResults(0, result, []);
                                        function loopResults(index, originalData, resultData){
                                            if(index < originalData.length){
                                                stor.getElementById(originalData[index], holdingRequestTab.dataHolding.forceLastModifed, holdingRequestTab.dataHolding.forceServerPull, function(resultO){
                                                    if(resultO != undefined)
                                                        resultData.push(resultO);
                                                    loopResults(Number(index)+1, originalData, resultData);
                                                });    
                                            }else{
                                                $scope.workSpaces.updateDataInTab(holdingRequestTab.dataHolding.childTab, resultData);
                                                $scope.InsertStepToLast10Steps();
                                            }
                                        }
                                    },1500);
                                }
                            });
                            $timeout(function(){
                                $scope.Steps.lastFocusedWorkflow = holdingRequestTab.dataHolding.childTab.workflowId;
                                $scope.refocusLastWorkflow();
                                $timeout(function(){
                                    $scope.Steps.lastFocusedWorkflow = holdingRequestTab.parentWF.ID;
                                    $scope.focusingLastWorkflow = false;
                                },600);
                            },300);
                        }
                    }else{
                        $scope.Toast.show("Wrong Input", "Must be at least one <b>Element</b>, one <b>Search By</b> and <b>Search Text</b>.", Toast.LONG, Toast.ERROR);
                    }
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt complete search", Toast.LONG, Toast.ERROR);
                    console.error("prepareForSearch: ", e);
                }
            }

            /**
             * Filter the search results by type
             * @param {object} results results we want to filter
             * @param {string} type    the type we want
             * @return {array} returns new array with the results we need by type
             */
            $scope.FilterResults = function(results, type){
                try{
                    // if there is no results
                    if(results == null || results == undefined || results.length == 0){
                        return [];
                    }
                    var newResults = [];
                    // loop on each result check if the type is equal add them to new holding data
                    for(var i=0; i<results.length; i++){
                        if(results[i].type == type){
                            var stor = new Storage();
                            stor.getElementById(results[i], false, false, function(res){
                                newResults.push(res);
                            });
                        }
                    }
                    return newResults;
                }catch(e){
                    console.error("FilterResults: ", e);
                    return [];
                }
            }


            $scope.displayContent = function(wFlow,result){
                if(result.type == "Delivery"){
                    var stor = new Storage();
                    stor.getElementById(result, false, false, function(res){
                        result = res;
                        var dataHolding = wFlow.selectedTab.dataHolding;
                        var holdingRequestTab = wFlow.selectedTab;
                        var holdingDisplayObjectData = result;
                        if(dataHolding.childTab && dataHolding.childTab.length > 0){
                            $timeout(function(){
                                $scope.Steps.lastFocusedWorkflow = holdingRequestTab.dataHolding.childTab[holdingRequestTab.dataHolding.childTab.length-1].workflowId;
                                $scope.refocusLastWorkflow();
                                $timeout(function(){
                                    $scope.InsertStepToLast10Steps();
                                },500);
                            },300);
                            $scope.workSpaces.replaceSearchChildContent(dataHolding.childTab[dataHolding.childTab.length-1], result);
                            
                        }else{
                            $scope.displayContentNewTab(wFlow, result);
                        }
                    });
                }else{
                    $scope.displaySmallContentNewTab(wFlow, result, true);
                }
            }

            $scope.displayContentNewTab = function(wFlow,result){
                var holdingDisplayObjectData = result;
                var holdingRequestTab = wFlow.selectedTab;
                $scope.workSpaces.updateNewWorkflowButtons(2);
                $timeout(function(){
                    $scope.displayNewWorkflowTabButtons = false;
                    $scope.displayNewWorkflowButtons = true;
                    $scope.holdingNewWorkflowData = {"selectedTab":holdingRequestTab, "Action":"DisplayObject", "data" :result};
                    $scope.selectColorFilter(0);
                    var holdNumberOfChilds = holdingRequestTab.dataHolding.childTab.length;
                    var waitForUserResponse = $interval(function(){
                        if($scope.displayNewWorkflowButtons == false){
                            $interval.cancel(waitForUserResponse);
                            if(holdNumberOfChilds == holdingRequestTab.dataHolding.childTab.length){
                                // new workflow canceled
                                $scope.holdingNewWorkflowData = null;
                                $scope.displayNewWorkflowButtons = false;
                            }else{
                                $timeout(function(){
                                    $scope.Steps.lastFocusedWorkflow = holdingRequestTab.dataHolding.childTab[holdingRequestTab.dataHolding.childTab.length-1].workflowId;
                                    $scope.refocusLastWorkflow();
                                    $timeout(function(){
                                        $scope.Steps.lastFocusedWorkflow = holdingRequestTab.parentWF.ID;
                                        $scope.focusingLastWorkflow = false;
                                    },600);
                                },300);
                                $timeout(function(){
                                    $scope.InsertStepToLast10Steps();
                                },500);
                            }
                        }
                    },500);
                },200);
            }
            $scope.displaySmallContent = function(wFlow,result){
                
                var stor = new Storage();
                stor.getElementById(result, false, false, function(res){
                    result = res;
                    var dataHolding = wFlow.selectedTab.dataHolding;
                    var holdingRequestTab = wFlow.selectedTab;
                    var holdingDisplayObjectData = result;
                    if(holdingRequestTab.dataHolding.childTab.workflowId != null && holdingRequestTab.dataHolding.childTab.tabId != null){
                        $timeout(function(){
                            $scope.Steps.lastFocusedWorkflow = holdingRequestTab.dataHolding.childTab.workflowId;
                            $scope.refocusLastWorkflow();
                            $timeout(function(){
                                $scope.InsertStepToLast10Steps();
                            },500);
                        },300);
                        $scope.workSpaces.replaceSearchChildContent(dataHolding.childTab, result);
                        $scope.workSpaces.selectTabAfterSearch(dataHolding.childTab);
                    }else{
                        $scope.displaySmallContentNewTab(wFlow, result);
                    }
                });
            }

            $scope.displaySmallContentNewTab = function(wFlow,result, Action){
                
                var holdingDisplayObjectData = result;
                var holdingRequestTab = wFlow.selectedTab;
                $scope.workSpaces.updateNewWorkflowButtons(1);
                $timeout(function(){
                    $scope.displayNewWorkflowTabButtons = true;
                    $scope.displayNewWorkflowButtons = true;
                    $scope.holdingNewWorkflowData = {"selectedTab":holdingRequestTab, "Action":"DisplaySmallObject", "data" :result, "ActionSearch":((Action != undefined)?Action:false)};
                    $scope.selectColorFilter(0);
                    var waitForUserResponse = $interval(function(){
                        if($scope.displayNewWorkflowButtons == false){
                            $interval.cancel(waitForUserResponse);
                            if(holdingRequestTab.dataHolding.childTab && holdingRequestTab.dataHolding.childTab.workflowId == null){
                                // new workflow canceled
                                $scope.holdingNewWorkflowData = null;
                                $scope.displayNewWorkflowButtons = false;
                            }else{
                                $timeout(function(){
                                    $scope.Steps.lastFocusedWorkflow = holdingRequestTab.dataHolding.childTab.workflowId;
                                    $scope.refocusLastWorkflow();
                                    $timeout(function(){
                                        $scope.Steps.lastFocusedWorkflow = holdingRequestTab.parentWF.ID;
                                        $scope.focusingLastWorkflow = false;
                                    },600);
                                },300);
                                $timeout(function(){
                                    $scope.InsertStepToLast10Steps();
                                },500);
                            }
                        }
                    },500);
                },200);
            }


            $scope.toggleForceSearchOption = function(tab, toggleState){
                if(toggleState == 1){
                    tab.dataHolding.forceLastModifed = false;
                    tab.dataHolding.forceServerPull = true;
                }else{
                    tab.dataHolding.forceLastModifed = true;
                    tab.dataHolding.forceServerPull = false;
                }
            }


            /*********************************************************************************
            *                                                                                *
            *     00000     000000000    00000000000      000      00000000000  00000000000  *
            *   000   000   000      00  000            000 000        000      000          *
            *  000          000      00  000           000   000       000      000          *
            *  00           000000000    00000000000  000     000      000      00000000000  *
            *  000          000 000      000          00000000000      000      000          *
            *   000   000   000   000    000          000     000      000      000          *
            *     00000     000     000  00000000000  000     000      000      00000000000  *
            *                                                                                *
            *********************************************************************************/











            /*******************************************************
            *                                                      *
            *  00000000000  000000000    00000000000  00000000000  *
            *  000          000     000      000          000      *
            *  000          000     000      000          000      *
            *  00000000000  000     000      000          000      *
            *  000          000     000      000          000      *
            *  000          000     000      000          000      *
            *  00000000000  000000000    00000000000      000      *
            *                                                      *
            *******************************************************/



            $scope.editContent = function(wFlow){
                if(wFlow.selectedTab.content.locked){
                    if(wFlow.selectedTab.content.lockedBy.id == Globals.CurrentUser.id){
                        wFlow.selectedTab.content.progressWizard = {
                            header:wFlow.selectedTab.content.type +' Details',
                            index:1,
                            spinner:false
                        };
                        wFlow.selectedTab.content.inProgress = true;
                    }else{
                        $scope.Toast.show("Cannot Lock Content", "Content locked by "+wFlow.selectedTab.content.lockedBy.firstName+" "+wFlow.selectedTab.content.lockedBy.lastName+".", Toast.LONG, Toast.ERROR);
                    }
                }else{
                    wFlow.selectedTab.content.progressWizard = {
                        header:wFlow.selectedTab.content.type +' Details',
                        index:1,
                        spinner:true
                    };
                    wFlow.selectedTab.content.inProgress = true;
                    wFlow.selectedTab.content.lock(function(success, error){
                        $timeout(function(){
                            if(error || !success){
                                $scope.Toast.show("Cannot Lock Content", "Content locked by another user.", Toast.LONG, Toast.ERROR);
                                wFlow.selectedTab.content.progressWizard.spinner = {};
                                wFlow.selectedTab.content.inProgress = false;
                            }else{
                                wFlow.selectedTab.content.progressWizard.spinner = false;
                            }
                        },200);

                    })
                }
            }







            /************************************************************************************************************************
             *                                                                                                                       *
             *  00000000000  000      00  00000000000  00000000000  000000000   00         00     000      000             00000     *
             *      000      0000     00      000      000          000      00  00       00    000 000    000           000   000   *
             *      000      00 00    00      000      000          000      00   00     00    000   000   000           00          *
             *      000      00  000  00      000      00000000000  000000000      00   00    000     000  000            0000000    *
             *      000      00    00 00      000      000          000 000         00 00     00000000000  000                  00   *
             *      000      00     0000      000      000          000   000        000      000     000  000           000   000   *
             *  00000000000  00      000      000      00000000000  000     000       0       000     000  0000000000      00000     *
             *                                                                                                                       *
             ************************************************************************************************************************/

            var initBodyScroll = $interval(function(){
                if($('#BodyRow').length > 0){
                    $('#BodyRow').on('scroll', function(e){
                        $scope.focusingLastWorkflow = false;
                    });
                    $interval.cancel(initBodyScroll);
                }
            },1000);
            $interval(function() {
                if ($scope.lastZoomIn != $('#ZoomRange').val()) {

                    $scope.lastZoomIn = $('#ZoomRange').val();
                    var tempZoom = ((($scope.lastZoomIn / 100) * (2.0 - 0.3)) + 0.3) / 2;

                    $("#WorkFlowMatrix").animate({
                        'zoom': tempZoom
                    }, {
                        duration: 0,
                        queue: false
                    });

                    if (Number($('#ZoomRange').val()) < 20) {
                        $('.WorkFlowBlock.Available').css('box-shadow', '1px 0px 0px 5px rgba(0,0,0,.2) inset');
                    } else if (Number($('#ZoomRange').val()) < 50) {
                        $('.WorkFlowBlock.Available').css('box-shadow', '1px 0px 0px 3px rgba(0,0,0,.2) inset');
                    } else {
                        $('.WorkFlowBlock.Available').css('box-shadow', '1px 0px 0px 2px rgba(0,0,0,.2) inset');
                    }

                    var wWidth = $(window).width();
                    var wHeight = $(window).height();
                    var blockPosL = Number($('#WorkFlowMatrix').css('zoom')) * $('#pointToZoom').position().left;
                    var sLeft = blockPosL - ((wWidth) / 2);
                    var blockPosT = Number($('#WorkFlowMatrix').css('zoom')) * $('#pointToZoom').position().top;
                    var sTop = blockPosT - ((wHeight) / 2);
                    $("#BodyRow").animate({
                        scrollTop: sTop,
                        scrollLeft: sLeft
                    }, {
                        duration: 0,
                        queue: false
                    });

                    // setTimeout(function(){
                    // if($scope.lastZoomIn == $('#ZoomRange').val()){
                    // $scope.Workflow[0].scrollTo();
                    // }
                    // },400);
                }
                // console.log((((($scope.lastZoomIn/100) * (2.0-0.3))+0.3)/2) * $('#BodyRow').scrollLeft(), $('#BodyRow').scrollLeft());
                if (zoomingIn == false) {
                    var pointToZoomRate = ((($('#ZoomRange').val() / 100) * (2.0 - 0.3)) + 0.3) / 2;
                    $('#pointToZoom').css('left', ((1 / pointToZoomRate) * (($('#BodyRow').width() / 2) + $('#BodyRow').scrollLeft())) + "px");
                    $('#pointToZoom').css('top', ((1 / pointToZoomRate) * (($('#BodyRow').height() / 2) + $('#BodyRow').scrollTop())) + "px");
                }
                if($('#ZoomRange').val() <= 45){
                    if($scope.clickToMaximize != true)
                        $scope.clickToMaximize = true;
                }else{
                    if($scope.clickToMaximize != false)
                        $scope.clickToMaximize = false;
                }
            }, 50);
            $interval(function() {
                $('#BodyRow').css('height', ($(window).height() - 50) + "px");

                $('#FullScreenDiv').css('height', ($(window).height() - 50) + "px");
            }, 100);
            $interval(function() {
                $scope.updateMatrixLayout();
            }, 200);

            $interval(function() {
                if ($scope.Settings != undefined && $scope.Settings.autoScroll && $scope.Settings.autoScroll == true) {
                    if (mouse.y > 50) {
                        if (mouse.x < 60) {
                            var leftScroll = (60 - mouse.x) / 5;
                            $('#BodyRow').scrollLeft($('#BodyRow').scrollLeft() - leftScroll);
                        }
                        if (mouse.x > ($(window).width() - 60)) {
                            var rightScroll = (mouse.x - ($(window).width() - 60)) / 5;
                            $('#BodyRow').scrollLeft($('#BodyRow').scrollLeft() + rightScroll);
                        }
                        if (((mouse.y - 50) > 0) && ((mouse.y - 50) < 40)) {
                            if (mouse.x < ($(window).width() - 440) && mouse.x > 480) {
                                var topScroll = ((mouse.y - 50) - 40) / 3;
                                $('#BodyRow').scrollTop($('#BodyRow').scrollTop() + topScroll);
                            }
                        }
                        if (mouse.y > ($(window).height() - 30)) {
                            var bottomScroll = (mouse.y - ($(window).height() - 40)) / 3;
                            $('#BodyRow').scrollTop($('#BodyRow').scrollTop() + bottomScroll);
                        }
                    }
                }
            }, 20);

            /**
             * 
             * Interval checks if autosave is enable and saves the data
             *
             */
            $interval(function(){
                if($scope.Settings){
                    if($scope.Settings.autoSave == true){
                        // if the steps are not already saved in server and there is no redo to apply -> autosaves
                        if($scope.Steps.savedInServer == false && $scope.Steps.canRedo() == false){
                            $scope.counterBeforeSave++;
                            if($scope.counterBeforeSave > 7){
                                $scope.Steps.commitSteps($scope.workSpaces);
                                $scope.counterBeforeSave = 0;
                            }
                        }
                    }
                }
            },1000);
            

            /**
             * Check if there is new content in the server
             */
            // $interval(function(){
            //     Globals.getMinimized(function(minimizedData){
            //         console.log(minimizedData);
            //     });

            // },5000);





            /**
             * Clears local storags
             */
            $scope.clearLocalStorage = function () {
                try{
                    // create new storage
                    var str = new Storage();
                    str.clear(null,null,function(){
                        alert("Cleard");
                    });
                }catch(e){
                    $scope.Toast.show("Error!","Could'nt clear local storage", Toast.LONG, Toast.ERROR);
                    console.error("clearLocalStorage: ", e);
                }
            }


            /**
             * Enable scroll in specific places
             * @param {flag} a      if the layout is tab or workspace
             * @param {Number} wflwId the workflow Id we want to enable or disable scroll
             */
            $scope.EnableScroll = function(a, wflwId){
                if(a==1){
                    $('#'+wflwId+' .SelectedTabContent').removeClass('SidebarDisplay');
                    $('#BodyRow').css('overflow','scroll');
                }else{
                    $('#'+wflwId+' .SelectedTabContent').addClass('SidebarDisplay');
                    $('#BodyRow').css('overflow','hidden');
                }
            }


            $scope.getGlobals = function(){
                return Globals;
            }







            $scope.testFunctions = function(){
                $httpR.connectToServer({Key:"Steps", value:"dsadasdasdasdsadsad"},"KVPsetKeyValuePair", Globals, function(s,e){
                    if(e || !s){
                        console.error(e);
                    }else{
                        console.log(s);
                    }
                });
            }

            $scope.testFunctions1 = function(){
                User.login("antoon91","1234", function(s,e){
                    if(e || !s){
                        console.warn("error login ",e);
                    }else{
                        console.log("good login", s);
                        var svr = new Server(null, $scope.isDummy);
                        var dataToSearch = {}
                        svr.Search()
                    }
                })
            }










        }
    ]);

    app.directive('ngEnter', function() {
        return function($scope, $element, $attrs) {
            $element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    $scope.$eval($attrs.ngEnter, {
                        'event': event
                    });
                    event.preventDefault();
                }
            });
        };
    });
    app.directive('ngRclick', function() {
        return function($scope, $element, $attrs) {
            $element.bind("contextmenu", function(event) {
                $scope.$eval($attrs.ngRclick, {
                    'event': event
                });
                event.preventDefault();
            });
        };
    });





    var mouse = {
        x: 200,
        y: 200
    };
    var zoomingIn = false;
    document.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY;
    }, false);
    document.addEventListener('mouseout', function(e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
            mouse = {
                x: 200,
                y: 200
            };
        }
    }, false);







    $(document).ready(function() {
        var altDown = false;
        var ctrlDown = false;
        var scrolling = false;
        var firstMousePos = null;
        $(this).keydown(function(e) {
            if (e.keyCode == 18) {
                altDown = true;
            }
            if (e.keyCode == 17) {
                ctrlDown = true;
                if (scrolling == false) {
                    firstMousePos = {
                        'x': mouse.x,
                        'y': mouse.y
                    };
                    scrolling = true;
                }
            }
        });

        $(this).keyup(function(e) {
            if (e.keyCode == 18) {
                altDown = false;
            }
            if (e.keyCode == 17) {
                ctrlDown = false;
                scrolling = false;
            }
        });

        setInterval(function() {
            if (scrolling) {
                var scrollingRate = (((($('#ZoomRange').val() / 100) * (2.0 - 0.3)) + 0.3) / 2);
                var scrollLeftRate = (scrollingRate * (mouse.x - firstMousePos.x) / 50);
                var scrollTopRate = (scrollingRate * (mouse.y - firstMousePos.y) / 50);
                $('#BodyRow').scrollLeft($('#BodyRow').scrollLeft() + scrollLeftRate);
                $('#BodyRow').scrollTop($('#BodyRow').scrollTop() + scrollTopRate);
            }
        }, 10);

        $('body').on('mousedown', '#ZoomRange', function() {
            zoomingIn = true;
        });
        $('body').on('mouseup', '#ZoomRange', function() {
            zoomingIn = false;
        });

    });


    $.cssNumber.zoom = true;
    if (!("zoom" in document.body.style)) {
        $.cssHooks.zoom = {
            get: function(elem, computed, extra) {
                var value = $(elem).data('zoom');
                return value != null ? value : 1;
            },
            set: function(elem, value) {
                var $elem = $(elem);
                var size = { // without margin
                    width: $elem.outerWidth(),
                    height: $elem.outerWidth()
                };
                $elem.data('zoom', value);
                if (value != 1) {
                    $elem.css({
                        transform: 'scale(' + value + ')',
                        marginLeft: (size.width * value - size.width) / 2,
                        marginRight: (size.width * value - size.width) / 2,
                        marginTop: (size.height * value - size.height) / 2,
                        marginBottom: (size.height * value - size.height) / 2
                    });
                } else {
                    $elem.css({
                        transform: null,
                        margin: null
                    });
                }
            }
        };
    }

})(window.angular);

