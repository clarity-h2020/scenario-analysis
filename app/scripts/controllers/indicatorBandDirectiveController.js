angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
    ).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
    [
        '$scope',
        '$timeout',
        'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
        function ($scope, $timeout, ccs) {
            'use strict';
            var initData, criteriaSortFunction;
            initData = {
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 0
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            };

            criteriaSortFunction = function (intervalA, intervalB) {
                return intervalA.criteriaValue - intervalB.criteriaValue;
            };

            if (!$scope.criteriaFunction) {
                $scope.criteriaFunction = initData;
            }

            $scope.criteriaFunction.lowerBoundary = $scope.criteriaFunction.lowerBoundary || initData.lowerBoundary;
            $scope.criteriaFunction.upperBoundary = $scope.criteriaFunction.upperBoundary || initData.upperBoundary;
            $scope.criteriaFunction.intervals = $scope.criteriaFunction.intervals ? ($scope.criteriaFunction.intervals.sort(criteriaSortFunction) || initData.intervals.sort(criteriaSortFunction)) : initData.intervals.sort(criteriaSortFunction);
            $scope.$watch('criteriaFunction', function () {
                if ($scope.criteriaFunction) {
                    $scope.criteriaFunction.lowerBoundary = $scope.criteriaFunction.lowerBoundary || initData.lowerBoundary;
                    $scope.criteriaFunction.upperBoundary = $scope.criteriaFunction.upperBoundary || initData.upperBoundary;
                    $scope.criteriaFunction.intervals = $scope.criteriaFunction.intervals ? ($scope.criteriaFunction.intervals.sort(criteriaSortFunction) || initData.intervals.sort(criteriaSortFunction)) : initData.intervals.sort(criteriaSortFunction);
                }
            }, true);


            $scope.getIntervalColor = function (interval) {

                var colorClass, colorValue;
                colorValue = ccs.getColor(interval, $scope.criteriaFunction);
                switch (colorValue) {
                    case '#B5F4BC':
                        colorClass = 'color-b';
                        break;
                    // C_FEELING_ORANGE;
                    case '#FFBA6B':
                        colorClass = 'color-c';
                        break;
                        //D_AFFINITY;
                    case '#FF9F80':
                        colorClass = 'color-d';
                        break;
                        //E_ORANGE_SHERBERT;
                    case '#FFC48C':
                        colorClass = 'color-e';
                        break;
                        // F_PEACE_BABY_YELLOW;
                    case '#FFDC8A':
                        colorClass = 'color-f';
                        break;
                        //G_JAYANTHI;
                    case '#FFF19E':
                        colorClass = 'color-g';
                        break;
                        //H_HONEY_DO;
                    case '#EFFAB4':
                        colorClass = 'color-h';
                        break;
                        //I_SPLASH_OF_LIME;
                    case '#D1F2A5':
                        colorClass = 'color-i';
                        break;
                }

                return colorClass;
            };

            $scope.deleteInterval = function (interval) {
                var index = $scope.criteriaFunction.intervals.indexOf(interval);
                $scope.criteriaFunction.intervals.splice(index, 1);
            };

            $scope.updateLowerBoundary = function (indicatorVal) {
                $scope.criteriaFunction.lowerBoundary.indicatorValue = indicatorVal;
            };

            $scope.updateUpperBoundary = function (indicatorVal) {
                $scope.criteriaFunction.upperBoundary.indicatorValue = indicatorVal;
            };

            $scope.$on('band-item-removed', function (args, interval) {
                if (args.targetScope !== $scope) {
                    $scope.$broadcast('band-item-removed');
                } else {
                    $scope.deleteInterval(interval);
                }
            });

            $scope.createInterval = function (criteriaVal, indicatorVal) {
                var newInterval = {
                    criteriaValue: criteriaVal,
                    indicatorValue: indicatorVal
                };
                $scope.criteriaFunction.intervals.push(newInterval);
                $scope.criteriaFunction.intervals.sort(criteriaSortFunction);
                $scope.$broadcast('band-item-added');
            };

            // needed to place the interval marker at the rigth position
            $scope.getIntervalWidth = function (interval, previousInterval) {
                var sumBefore = 0;
                if (previousInterval) {
                    sumBefore = previousInterval.criteriaValue || 0;
                }
                if (interval && interval.criteriaValue) {
                    return {
                        width: (interval.criteriaValue - sumBefore) + '%'
                    };
                }
                return {
                    width: (100 - sumBefore) + '%'
                };
            };
        }
    ]
    );


