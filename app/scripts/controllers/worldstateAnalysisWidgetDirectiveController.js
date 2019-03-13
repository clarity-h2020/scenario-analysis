angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
    ).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.WorldstateAnalysisWidgetDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        'localStorageService',
        '$timeout',
        function ($scope, Worldstates, localStorageService, $timeout) {
            'use strict';
            var createChartModels, getIndicators;
            $scope.forCriteriaTable = true;
            $scope.showTableIndicatorse = true;
            $scope.showTableRadarCharte = false;
            $scope.chartModels = [];

            createChartModels = function () {
                var j, modelArr;
                $scope.chartModels = [];
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    for (j = 0; j < $scope.worldstates.length; j++) {
                        modelArr = [];
                        if ($scope.worldstates[j]) {
                            modelArr.push($scope.worldstates[j]);
                        }
                        if ($scope.worldstateRef) {
                            modelArr = modelArr.concat($scope.worldstateRef);
                        }
                        $scope.chartModels.push(modelArr);
                    }
                }
            };

            getIndicators = function () {
                var indicatorGroup, indicatorProp, iccObject, group, j,
                    indicatorName, indicator, add, forEachFunc;
                forEachFunc = function (value, index, arr) {
                    if (indicatorName === value.displayName) {
                        add = false;
                    }
                    if (index === arr.length - 1 && add) {
                        $scope.indicatorVector.push(indicator);
                    }
                };

                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    for (j = 0; j < $scope.worldstates.length; j++) {
                        iccObject = Worldstates.utils.stripIccData([$scope.worldstates[j]], false)[0];
                        for (indicatorGroup in iccObject.data) {
                            if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                group = iccObject.data[indicatorGroup];
                                for (indicatorProp in group) {
                                    if (group.hasOwnProperty(indicatorProp)) {
                                        if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                            if ($scope.indicatorVector.length > 0) {
                                                indicatorName = group[indicatorProp].displayName;
                                                indicator = group[indicatorProp];
                                                add = true;
                                                $scope.indicatorVector.forEach(forEachFunc);
                                            } else {
                                                $scope.indicatorVector.push(group[indicatorProp]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            $scope.criteriaFunctionSet = localStorageService.get('criteriaFunctionSet') || [];
            $scope.criteriaFunctionSets = $scope.criteriaFunctionSet;
            $scope.selectedCriteriaFunction = $scope.criteriaFunctionSet[0];
            $scope.persistCriteriaFunctions = function () {
                $scope.showPersistSpinner = true;
                $scope.showPersistDone = false;
                $timeout(function () {
                    localStorageService.add('criteriaFunctionSet', $scope.criteriaFunctionSets);
                    $scope.showPersistSpinner = false;
                    $scope.showPersistDone = true;
                    $timeout(function () {
                        $scope.showPersistDone = false;
                    }, 1500);
                }, 500);

            };

            $scope.decisionStrategies = localStorageService.get('decisionStrategies') || [];
            $scope.selectedDecisionStrategy = $scope.decisionStrategies[0];
            $scope.persistDecisionStrategies = function () {
                $scope.showDsPersistSpinner = true;
                $scope.showDsPersistDone = false;
                $timeout(function () {
                    localStorageService.add('decisionStrategies', $scope.decisionStrategies);
                    $scope.showDsPersistSpinner = false;
                    $scope.showDsPersistDone = true;
                    $timeout(function () {
                        $scope.showDsPersistDone = false;
                    }, 1500);
                }, 500);
            };

            Worldstates.query({level: 2}, function (data) {
                $scope.allWorldstates = data;
            });

            $scope.$watch('worldstateRef', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    createChartModels();
                    getIndicators();
                }
            });
            $scope.$watch('worldstates', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates) {
                    createChartModels();
                    getIndicators();
                }
            }, true);

            $scope.indicatorVector = [];
        }
    ]
    );



