var app = angular.module('IntelLearner', ['onsen', 'firebase']);

app.controller('MainCtrl', ["$scope", "$http", "$timeout", "$interval", "$filter", "$window","Workspace", "TypeOf",
    function($scope, $http, $timeout, $interval, $filter, $window, Workspace, TypeOf) {


        // PRIM COLOR = rgb(8,96,168)


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
        $scope.AppStatus = 0;
        $scope.currentUser = {};
        $scope.settings = {}
        $scope.last10Steps = [];
        $scope.Workflow = [];
        $scope.currentUndoOrder = 1;
        $scope.progressLines = [];
        $scope.lastZoomIn = $('#ZoomRange').val();
        $scope.holdDoubleClickOnTab = false;
        $scope.selectedWorkflow = 0;
        $scope.workSpaces = {};
        $scope.displayNewWorkflowTabButtons = true;
		$scope.displayNewWorkflowButtons = true;




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
                $scope.loadUserData();
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

        }

        $scope.loadUserData = function() {
            var loadedAmmount = 0;
            $scope.loadDataFromSRV(function(e) {
                AllDataLoaded(++loadedAmmount);
            });
            // $scope.loadDataFromSRV2(function(e){
            // 	AllDataLoaded(++loadedAmmount);
            // });
            function AllDataLoaded(finished) {
                $('.StatusBarPerc').css('width', ((finished / 1) * 100) + "%");
                if (finished == 1) {
                    $timeout(function() {
                        $scope.$apply(function() {
                            $scope.AppStatus = 2;
                            $('#LoadingScreen').hide();
                            var waitUntilLoad = setInterval(function(){
                            	if($('#Workflow0').position()){
                            		setTimeout(function(){
                            			console.log($('#Workflow0').position());
		                            	$scope.Workflow[0].scrollTo();
	                            	},500);
	                            	clearInterval(waitUntilLoad);
	                            }
                            },100);
                        });
                    }, 300);
                }
            }
        }
        // $scope.loadDataFromSRV2 = function(callbackFunction){
        // 	setTimeout(function(){
        // 		callbackFunction(true);
        // 	},3000);
        // }
        $scope.loadDataFromSRV = function(callbackFunction) {
            callbackFunction(true);
            $scope.currentUser = {
                'firstName': 'David',
                'lastName': 'Antoon',
                'profilePicture': 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p320x320/988960_632550293533974_2658667833563570113_n.jpg?oh=c62dc24dba7545a6d06915cd01c11a3f&oe=55A4011C&__gda__=1436053802_e6b13ee76d8aa131e270234503c16cc8'
            };
            $scope.settings = {
                'defaultOpenTabs': 'splite', // over, Splite
                'autoScroll': false

            }
            $scope.last10Steps = [];
            $scope.currentUndoOrder = 1;
            $scope.progressLines = [{
                "LineId": "1233",
                "Color": "red",
                "tabs": [{
                    "WorkflowId": "343243",
                    "tabId": "213321"
                }, {
                    "WorkflowId": "343243",
                    "tabId": "2221"
                }]
            }, {
                "LineId": "2",
                "tabs": [{
                    "WorkflowId": "213",
                    "tabId": "112"
                }]
            }];

            $scope.workSpaces = new Workspace();
            $scope.Workflow  = $scope.workSpaces.workflows;
            

            $timeout(function() {
                $scope.$apply(function() {
                    $scope.InsertStepToLast10Steps();
                });
            }, 10);


            $('#WorkFlowMatrix').css('min-width', "10000px").css('min-height', "10000px").css('width', "10000px").css('height', "10000px");
            // $scope.settings = {}
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

        $scope.canUndo = function() {
            var undoFound = false;
            $scope.last10Steps.sort(function(a, b) {
                return (a.orderSteps - b.orderSteps)
            });
            for (var i = 0; i < $scope.last10Steps.length; i++) {
                if ($scope.currentUndoOrder < $scope.last10Steps[i].orderSteps) {
                    undoFound = true;
                    break;
                }
            }
            return undoFound;
        }
        $scope.canRedo = function() {
            var redoFound = false;
            $scope.last10Steps.sort(function(a, b) {
                return (a.orderSteps - b.orderSteps)
            });
            for (var i = 0; i < $scope.last10Steps.length; i++) {
                if ($scope.currentUndoOrder > $scope.last10Steps[i].orderSteps) {
                    redoFound = true;
                    break;
                }
            }
            return redoFound;
        }
        $scope.UndoWorkflow = function() {
            var RetData;
            if ($scope.canUndo()) {
                $scope.last10Steps.sort(function(a, b) {
                    return (a.orderSteps - b.orderSteps)
                });
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
        }
        $scope.RedoWorkflow = function() {
            var RetData;
            if ($scope.canRedo()) {
                $scope.last10Steps.sort(function(a, b) {
                    return (a.orderSteps - b.orderSteps)
                });
                for (var i = $scope.last10Steps.length - 1; i >= 0; i--) {
                    if ($scope.currentUndoOrder > $scope.last10Steps[i].orderSteps) {
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
                                $scope.currentUndoOrder--;
                                $scope.workSpaces.updateNewWorkflowButtons();
                            });
                        }, 1);
                        break;
                    }
                }
            }

        }
        $scope.UpdateLast10Steps = function() {
            $scope.last10Steps.sort(function(a, b) {
                return (a.orderSteps - b.orderSteps)
            });
            if ($scope.last10Steps.length > 0) {
                var templast10Steps = [];
                for (var i = 0; i < $scope.last10Steps.length; i++) {
                    $scope.last10Steps[i].orderSteps -= ($scope.currentUndoOrder - 1);
                    if ($scope.last10Steps[i].orderSteps > 0) {
                        templast10Steps.push($scope.last10Steps[i]);
                    }
                }
                $scope.last10Steps = templast10Steps;
            }
            $scope.currentUndoOrder = 1;
        }
        $scope.InsertStepToLast10Steps = function() {
            $timeout(function() {
                $scope.$apply(function() {
                    $scope.UpdateLast10Steps();
                    $scope.last10Steps.sort(function(a, b) {
                        return (a.orderSteps - b.orderSteps)
                    });
                    var tempWorkflowArray = "[";
                    for (var i = 0; i < $scope.Workflow.length; i++) {
                    	if($scope.Workflow.length>1 && i != $scope.Workflow.length-1){
                    		tempWorkflowArray += $scope.Workflow[i].toString()+",";
                    	}else{
	                        tempWorkflowArray += $scope.Workflow[i].toString();
                    	}
                    }
                    tempWorkflowArray += "]";
                    var InsData = {
                        'orderSteps': 0,
                        'allWorkFlowContents': tempWorkflowArray,
                        'allProgressLines': JSON.stringify($scope.progressLines)
                    }
                    $scope.last10Steps.unshift(InsData);
                    $scope.last10Steps = $scope.last10Steps.slice(0, 10);
                    for (var i = 0; i < $scope.last10Steps.length; i++) {
                        $scope.last10Steps[i].orderSteps = (i + 1);
                    }
                });


            }, 1);
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

        $scope.updateTabName = function(workflowId, tabId, inputId) {

            $('#' + inputId).attr('readonly', 'readonly');
            for (var i = 0; i < $scope.Workflow.length; i++) {
                if ($scope.Workflow[i].ID == workflowId) {
                    for (var j = 0; j < $scope.Workflow[i].tabs.length; j++) {
                        if ($scope.Workflow[i].tabs[j].ID == tabId) {
                            $scope.Workflow[i].tabs[j].title = $('#' + inputId).val();
                            $timeout(function() {
                                $scope.$apply(function() {
                                    $scope.InsertStepToLast10Steps();
                                });
                            }, 10);
                            break;
                        }
                    }
                    break;
                }
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
        $scope.selectTab = function(workflow, tab) {
            $scope.holdDoubleClickOnTab = true;
            $timeout(function() {
                if ($scope.holdDoubleClickOnTab == true) {
                    if(workflow.selectedTab.ID != tab.ID){
                        workflow.selectedTab = tab;
                        $timeout(function() {
                            $scope.$apply(function() {
                                $scope.InsertStepToLast10Steps();
                            });
                        }, 10);
                    }
                }
            }, 200);
        }
        $scope.getSelectedTabType = function(workflow){
            return workflow.selectedTab.Type;
        }
        
        $scope.getSelectedTab = function(workflow, tabId) {
            return (workflow.selectedTab.ID == tabId);
        }
        $scope.updateAllTabName = function() {
            for (var i = 0; i < $scope.Workflow.length; i++) {
                for (var j = 0; j < $scope.Workflow[i].tabs.length; j++) {
                    $('#WorkflowId' + $scope.Workflow[i].ID + 'Tab' + $scope.Workflow[i].tabs[j].ID).val($scope.Workflow[i].tabs[j].title);
                }
            }
        }




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

        $scope.editTabSettings = function(index){
            console.log("Edit");
        }
        $scope.closeTab = function(workflow){
            workflow.tabs.splice($scope.getSelectedTabIndex(workflow),1);
            if(workflow.tabs.length > 0){
                workflow.selectedTab = workflow.tabs[0];
            }else{
                for(var i=0; i<$scope.Workflow.length; i++){
                    if($scope.Workflow[i].ID == workflow.ID){
                        $scope.Workflow.splice(i,1);
                        break;
                    }
                }
            }
            $scope.updateMatrixLayout();
            $scope.workSpaces.updateNewWorkflowButtons();
            $timeout(function() {
                $scope.$apply(function() {
                    $scope.InsertStepToLast10Steps();
                });
            }, 10);
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


        $scope.updateMatrixLayout = function() {
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
                $($('#WorkFlowMatrix > .WorkFlowBlock')[i]).find('.SelectedTabContent').css('height', (tempBlockHeight-73) + "px");
            }
            // if($scope.workSpaces != null)
                // $scope.workSpaces.updateNewWorkflowButtons();

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
            $timeout(function() {
                $scope.$apply(function() {
                    $scope.InsertStepToLast10Steps();
                });
            }, 10);
        }
        
        $scope.addNewTabToWorkflow = function(workflow){
            workflow.selectedTab = workflow.addTab();
            $timeout(function() {
                $scope.$apply(function() {
                    $scope.InsertStepToLast10Steps();
                });
            }, 10);
        }

        $scope.resizeBlock = function(direction, workflowId) {

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
        }

        $scope.convertToWorkflow = function(newWorkflow){
            $scope.workSpaces.addNewWorkflow(newWorkflow);
            $scope.workSpaces.updateNewWorkflowButtons();
            $timeout(function() {
                $scope.$apply(function() {
                    $scope.InsertStepToLast10Steps();
                });
            }, 10);
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
        }, 50);
        $interval(function() {
            $('#BodyRow').css('height', ($(window).height() - 50) + "px");
            $('#FullScreenDiv').css('height', ($(window).height() - 50) + "px");
        }, 100);
        $interval(function() {
            $scope.updateMatrixLayout();
        }, 200);

        $interval(function() {
            if ($scope.settings.autoScroll && $scope.settings.autoScroll == true) {
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





        // var previousScrollTop = $('#BodyRow').scrollTop();
        // var scrollLock = true;
        // $('#BodyRow').scroll(function(e) {
        // 	if(scrollLock == true) {
        // 		$('#BodyRow').scrollTop(previousScrollTop); 
        // 	}
        // 	console.log(previousScrollTop);
        // 	previousScrollTop = $('#BodyRow').scrollTop();
        // });



        








        $scope.testFun = function() {

            // $scope.workSpaces.updateNewWorkflowButtons();
            // $scope.Workflow[0].addTab();
            // $timeout(function() {
            //     $scope.$apply(function() {
            //         $scope.InsertStepToLast10Steps();
            //     });
            // }, 10);
        }

        $scope.testFun2 = function() {
            $scope.Workflow.push(new Workflow(null, 9, 13, 12, 14, 13, 0, 2));
            $scope.updateMatrixLayout();
            $timeout(function() {
                $scope.$apply(function() {
                    $scope.InsertStepToLast10Steps();
                });
            }, 10);
        }

        $scope.testFun3 = function(){
        	$scope.Workflow.splice(2,1);
        	$scope.updateMatrixLayout();
            $timeout(function() {
                $scope.$apply(function() {
                    $scope.InsertStepToLast10Steps();
                });
            }, 10);
        }










        $scope.EnableScroll = function(a){
            if(a==1){
                $('#BodyRow').css('overflow','scroll');
            }else{
                $('#BodyRow').css('overflow','hidden');
            }
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


// Format date
function formatDay(d) {
    var date = new Date(d);
    var weekDay = 'ראשון שני שלישי רביעי חמישי שישי שבת'.split(' ')[date.getDay()];
    var day = date.getDate();
    var month = 'ינואר פבואר מרץ אפריל מאי יוני יולי אוגוסט ספטמבר אוקטובר נובמבר דצמבר'.split(' ')[date.getMonth()];
    return weekDay + ', ' + month + ' ' + day;
}

function formatTime(d) {
    var date = new Date(d);
    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;
    var mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;
    return hours + ':' + mins;
}

function formatDate(d) {
    var dateNow = new Date();
    var selectedDate = new Date(d);

    if (((dateNow - selectedDate) / 1000 / 60 / 60) < 48) {
        if (dateNow.getDate() == selectedDate.getDate()) {
            return 'היום, ' + formatTime(d);
        } else if ((new Date(dateNow - 1000 * 60 * 60 * 24)).getDate() == selectedDate.getDate()) {
            return 'אתמול, ' + formatTime(d);
        } else {
            return formatDay(d) + ', ' + formatTime(d) + '';
        }
    } else {
        if (dateNow.getFullYear() > selectedDate.getFullYear()) {
            return selectedDate.getFullYear() + ", " + formatDay(d);
        } else {
            return formatDay(d) + ', ' + formatTime(d) + '';
        }
    }
}

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
        if (altDown && ctrlDown) {
            checkCanvas();
            $('#myCanvas').show();
        } else {
            $('#myCanvas').hide();
        }
    }, 100);
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

updateCanvasLayout();

function updateCanvasLayout() {
    var CanvasDims = (((($('#ZoomRange').val() / 100) * (2.0 - 0.3)) + 0.3) / 2) * 10000;
    $('#myCanvas').attr('height', CanvasDims + "px").attr('width', CanvasDims + "px");
}

function checkCanvas() {
    var c = $('#myCanvas')[0];
    var ctx = c.getContext("2d");

    // //Path 1
    // ctx.beginPath();
    // ctx.moveTo(2066, 2015);
    // ctx.lineTo(2328, 2015);
    // ctx.lineWidth = 5;
    // var grad= ctx.createLinearGradient(2066, 2015, 2328, 2015);
    // grad.addColorStop(0, "#660000");
    // grad.addColorStop(1, "#b20000");
    // ctx.strokeStyle = grad;
    // ctx.lineJoin = 'round';
    // ctx.lineCap = 'round';
    // ctx.stroke();


    // //Path 2
    // ctx.beginPath();
    // ctx.moveTo(2328, 2015);
    // ctx.lineTo(2700, 2600);
    // ctx.lineWidth = 5;
    // var grad= ctx.createLinearGradient( 2328, 2015, 2700, 2600);
    // grad.addColorStop(0, "#b20000");
    // grad.addColorStop(1, "#ff0000");
    // ctx.strokeStyle = grad;
    // ctx.lineJoin = 'round';
    // ctx.lineCap = 'round';
    // 
    // ctx.stroke();


    // POINTS

    ctx.beginPath();
    ctx.arc((1080.450603885093 / Number($('#WorkFlowMatrix').css('zoom'))), (1010.9981815719973 / Number($('#WorkFlowMatrix').css('zoom'))), 8, 0, 2 * Math.PI, true);
    ctx.strokeStyle = "#660000";
    ctx.stroke();

    // ctx.beginPath();
    // ctx.arc(2328, 2015, 8, 0, 2 * Math.PI, true);
    // ctx.strokeStyle = "#b20000";
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.arc(2700, 2600, 8, 0, 2 * Math.PI, true);
    // ctx.strokeStyle = "#ff0000";
    // ctx.stroke();





    // //Path 3
    // ctx.beginPath();
    // ctx.moveTo(150, 150);
    // ctx.lineTo(100, 50);
    // ctx.lineWidth = 5;
    // var grad= ctx.createLinearGradient(150, 150, 100, 50);
    // grad.addColorStop(0, "#b20000");
    // grad.addColorStop(1, "#e50000");
    // ctx.strokeStyle = grad;
    // ctx.lineJoin = 'round';
    // ctx.lineCap = 'round';
    // ctx.stroke();

    // //Path 4
    // ctx.beginPath();
    // ctx.moveTo(150, 150);
    // ctx.lineTo(100, 50);
    // ctx.lineWidth = 5;
    // var grad= ctx.createLinearGradient(150, 150, 100, 50);
    // grad.addColorStop(0, "#b20000");
    // grad.addColorStop(1, "#e50000");
    // ctx.strokeStyle = grad;
    // ctx.lineJoin = 'round';
    // ctx.lineCap = 'round';
    // ctx.stroke();



}

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