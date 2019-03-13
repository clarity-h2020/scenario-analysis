angular.module(
        'eu.myclimateservice.csis.scenario-analysis.demoApp.controllers',
        [
            'de.cismet.crisma.ICMM.Worldstates',
            'de.cismet.cids.rest.collidngNames.Nodes',
            'de.cismet.crisma.ICMM.services',
            'ui.bootstrap.tabs',
            'ui.bootstrap.collapse',
            'ui.bootstrap.tpls'
        ]
        ).controller(
        'eu.myclimateservice.csis.scenario-analysis.demoApp.controllers.MainController',
        [
            '$window',
            '$scope',
            '$resource',
            '$http',
            '$timeout',
            '$q',
            'eu.myclimateservice.csis.scenario-analysis.services.IcmmPersistanceService',
            'eu.myclimateservice.csis.scenario-analysis.services.FilesPersistanceService',
            'eu.myclimateservice.csis.scenario-analysis.services.drupalService',
            'ngDialog',
            function ($window, $scope, $resource, $http, $timeout, $q, IcmmPersistanceService, FilesPersistanceService, drupalService, ngDialog) {
                'use strict';

                var restApi = drupalService.restApi;


                var createChartModels;
                // we bind to the container object since the provider directives are nested in angular-bootstrap tabs
                // tabs create a own scope and thus override every "simple" property. using an container object the binding
                // stll works...
                $scope.container = {};
                $scope.forCriteriaTable = false;
                $scope.showTableIndicatorse = true;
                $scope.showTableRadarCharte = false;
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

                function watchFilesWs() {
                    return $scope.$watch('container.worldstatesFiles', function () {
                        $scope.container.worldstates = $scope.container.worldstatesFiles;
                    });
                }

                function watchRefWsFiles() {
                    return $scope.$watch('container.refWorldstatesFiles', function () {
                        $scope.container.refWorldstates = $scope.container.refWorldstatesFiles;
                    });
                }

                function watchCfFiles() {
                    return $scope.$watch('container.criteriaFunctionsFiles', function () {
                        $scope.container.criteriaFunctions = $scope.container.criteriaFunctionsFiles;
                        $scope.container.selectedCriteriaFunction = $scope.container.criteriaFunctions ? $scope.container.criteriaFunctions[0] : false;
                    });
                }

                function watchDsFiles() {
                    return $scope.$watch('container.decisionStrategiesFiles', function () {
                        $scope.container.decisionStrategies = $scope.container.decisionStrategiesFiles;
                        $scope.container.selectedDecisionStrategy = $scope.container.decisionStrategies ? $scope.container.decisionStrategies[0] : false;
                    });
                }

                watchFilesWs();
                watchRefWsFiles();
                watchCfFiles();
                watchDsFiles();

                $scope.screenshot = drupalService.screenshotHelper.uploadScreenshot;
            }
        ]);
