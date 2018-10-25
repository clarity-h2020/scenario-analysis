angular.module(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.cids.rest.collidngNames.Nodes',
        'de.cismet.crisma.ICMM.services',
        'ui.bootstrap.tabs',
        'ui.bootstrap.collapse',
        'ui.bootstrap.tpls'
    ]
    ).controller(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers.MainController',
    [
        '$scope',
        '$timeout',
        'eu.crismaproject.worldstateAnalysis.services.IcmmPersistanceService',
        'eu.crismaproject.worldstateAnalysis.services.FilesPersistanceService',
        'ngDialog',
        function ($scope, $timeout, IcmmPersistanceService, FilesPersistanceService, ngDialog) {
            'use strict';
            
            var parent = window.seamless.connect();
            // Receive a message
            parent.receive(function(data, event) {

              // Print out the data that was received.
              console.log("child recieved: " + data);
            });

            var createChartModels;
            // we bind to the container object since the provider directives are nested in angular-bootstrap tabs
            // tabs create a own scope and thus override every "simple" property. using an container object the binding
            // stll works...
            $scope.container = {};
            $scope.forCriteriaTable = false;
            $scope.container.chartModels = [];
            $scope.icmmTabCollapsed = false;
            $scope.filesTabCollapsed = false;
            $scope.icmmTabActive = false;
            $scope.filesTabActive = true;

            $scope.openRadarModal = function (index) {
                var childScope;
                childScope = $scope.$new();
                childScope.ws = $scope.container.chartModels[index];
                childScope.criteriaFunction = $scope.container.selectedCriteriaFunction;
                ngDialog.open({
                    template: 'templates/criteriaRadarPopupTemplate.html',
                    scope: childScope,
                    className: 'ngdialog-theme-default ngdialog-theme-custom ngdialog-theme-width'
                });
            };

            createChartModels = function () {
                var j, modelArr;
                $scope.container.chartModels = [];
                if ($scope.container.worldstates && $scope.container.worldstates.length > 0) {
                    for (j = 0; j < $scope.container.worldstates.length; j++) {
                        modelArr = [];
                        if ($scope.container.worldstates[j]) {
                            modelArr.push($scope.container.worldstates[j]);
                        }
                        if ($scope.container.worldstateRef) {
                            modelArr = modelArr.concat($scope.container.worldstateRef);
                        }
                        $scope.container.chartModels.push(modelArr);
                    }
                }
            };

            $scope.$watch('container.worldstateRef', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    createChartModels();
                }
            });
            $scope.$watchCollection('container.worldstates', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.container.worldstates) {
                    createChartModels();
                }
            });

            $scope.updateSelectedCriteriaFunction = function (index) {
                $scope.container.selectedCriteriaFunction = $scope.container.criteriaFunctions[index];
            };

            $scope.updateSelectedDecisionStrategy = function (index) {
                $scope.container.selectedDecisionStrategy = $scope.container.decisionStrategies[index];
            };

            $scope.persistCriteriaFunctions = function () {
                $scope.showPersistSpinner = true;
                $scope.showPersistDone = false;
                $timeout(function () {
                    if ($scope.icmmTabVisible) {
                        IcmmPersistanceService.persistCriteriaFunctions($scope.container.criteriaFunctions);
                    } else {
                        FilesPersistanceService.persistCriteriaFunctions($scope.container.criteriaFunctions);
                    }

                    $scope.showPersistSpinner = false;
                    $scope.showPersistDone = true;
                    $timeout(function () {
                        $scope.showPersistDone = false;
                    }, 1500);
                }, 500);

            };

            $scope.indicatorVector = [];

            $scope.showDsPersistSpinner = false;
            $scope.showDsPersistDone = false;

            $scope.persistDecisionStrategies = function () {
                $scope.showDsPersistSpinner = true;
                $scope.showDsPersistDone = false;
                $timeout(function () {
                    if ($scope.icmmTabVisible) {
                        IcmmPersistanceService.persistDecisionStrategies($scope.container.decisionStrategies);
                    } else {
                        FilesPersistanceService.persistDecisionStrategies($scope.container.decisionStrategies);
                    }
                    $scope.showDsPersistSpinner = false;
                    $scope.showDsPersistDone = true;
                    $timeout(function () {
                        $scope.showDsPersistDone = false;
                    }, 1500);
                }, 500);
            };

            $scope.indicatorVector = [];

            /*
             * Since we want to showcase the icmm based context provider as well as the file based context provider
             * we need to update the bindings for the analysis widgets everyt time the user switches between 
             * the icmm and the file tab.
             * The following code is not needed if only one of both context providers is used.
             */

            function watchIcmmWs () {
                return $scope.$watch('container.worldstatesIcmm', function () {
                    $scope.container.worldstates = $scope.container.worldstatesIcmm;
                });
            }

            $scope.derigsterIcmmWsWatch = watchIcmmWs();

            function watchFilesWs () {
                return $scope.$watch('container.worldstatesFiles', function () {
                    $scope.container.worldstates = $scope.container.worldstatesFiles;
                });
            }

            // refWorldstate watches
            function watchRefWsIcmm () {
                return $scope.$watch('container.refWorldstatesIcmm', function () {
                    $scope.container.refWorldstates = $scope.container.refWorldstatesIcmm;
                });
            }

            $scope.derigsterRefWsIcmmWatch = watchRefWsIcmm();

            function watchRefWsFiles () {
                return $scope.$watch('container.refWorldstatesFiles', function () {
                    $scope.container.refWorldstates = $scope.container.refWorldstatesFiles;
                });
            }

            // criteriaFunctions watches
            function watchCfIcmm () {
                return $scope.$watch('container.criteriaFunctionsIcmm', function () {
                    $scope.container.criteriaFunctions = $scope.container.criteriaFunctionsIcmm;
                    $scope.container.selectedCriteriaFunction = $scope.container.criteriaFunctions ? $scope.container.criteriaFunctions[0] : false;
                });
            }

            $scope.derigsterCfIcmm = watchCfIcmm();

            function watchCfFiles () {
                return $scope.$watch('container.criteriaFunctionsFiles', function () {
                    $scope.container.criteriaFunctions = $scope.container.criteriaFunctionsFiles;
                    $scope.container.selectedCriteriaFunction = $scope.container.criteriaFunctions ? $scope.container.criteriaFunctions[0] : false;
                });
            }

            //decision strategy watches
            function watchDsIcmm () {
                return $scope.$watch('container.decisionStrategiesIcmm', function () {
                    $scope.container.decisionStrategies = $scope.container.decisionStrategiesIcmm;
                    $scope.container.selectedDecisionStrategy = $scope.container.decisionStrategies ? $scope.container.decisionStrategies[0] : false;
                });
            }

            $scope.derigsterDsIcmm = watchDsIcmm();

            function watchDsFiles () {
                return $scope.$watch('container.decisionStrategiesFiles', function () {
                    $scope.container.decisionStrategies = $scope.container.decisionStrategiesFiles;
                    $scope.container.selectedDecisionStrategy = $scope.container.decisionStrategies ? $scope.container.decisionStrategies[0] : false;
                });
            }


            $scope.icmmTabVisible = true;
            $scope.switchToIcmmTab = function () {
                $scope.icmmTabVisible = true;
                if ($scope.derigsterFilesWsWatch) {
                    $scope.derigsterFilesWsWatch();
                }
                $scope.derigsterIcmmWsWatch = watchIcmmWs();
                if ($scope.derigsterRefWsFilesWatch) {
                    $scope.derigsterRefWsFilesWatch();
                }
                $scope.derigsterRefWsIcmmWatch = watchRefWsIcmm();

                if ($scope.derigsterCfFilesWatch) {
                    $scope.derigsterCfFilesWatch();
                }
                $scope.derigsterCfIcmm = watchCfIcmm();
                if ($scope.derigsterDsFilesWatch) {
                    $scope.derigsterDsFilesWatch();
                }
                $scope.derigsterDsIcmm = watchDsIcmm();


                $scope.icmmLastViewed = true;
                
                if(!parent || parent === null) {
                    parent = window.seamless.connect();
                }
                // Send a message
                parent.send({
                  myparam: 'child -> parent'
                });
            };


            $scope.switchToFilesTab = function () {
                $scope.icmmTabVisible = false;

                $scope.derigsterIcmmWsWatch();
                $scope.derigsterFilesWsWatch = watchFilesWs();

                $scope.derigsterRefWsIcmmWatch();
                $scope.derigsterRefWsFilesWatch = watchRefWsFiles();

                $scope.derigsterCfIcmm();
                $scope.derigsterCfFilesWatch = watchCfFiles();

                $scope.derigsterDsIcmm();
                $scope.derigsterDsFilesWatch = watchDsFiles();

                $scope.icmmLastViewed = true;
            };

        }
    ]
    );
