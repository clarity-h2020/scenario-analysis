angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandItemDirectiveController',
    [
        '$scope',
        '$filter',
        '$element',
        '$timeout',
        function ($scope, $filter, $element, $timeout) {
            'use strict';
            $scope.actualHeightExceeded = false;
            $scope.getElementHeight = function () {
                return $element.height();
            };
            $scope.getElementWidth = function () {
                return $element.width();
            };
            $scope.checkActualHeight = function () {
                $timeout(function () {
                    var childElem = $scope.lowerBoundary || $scope.upperBoundary ? $element.children()[0] : $element.children()[1];
                    if (angular.element(childElem).height() > angular.element($element.parent()).height()) {
                        $scope.actualHeightExceeded = true;
                    } else {
                        if ($scope.actualHeightExceeded) {
                            $timeout(function () {
                                $scope.checkActualHeight();
                            });
                        }
                        $scope.actualHeightExceeded = false;
                    }
                }, 500);
            };
            $scope.actualHeightExceeded = false;
            $scope.checkActualHeight();

            $scope.$on('band-item-added', function () {
                $scope.checkActualHeight();
            });

            $scope.$on('band-item-removed', function () {
                $scope.checkActualHeight();
            });

            $scope.getCriteriaSuggestion = function () {
                var criteriaSuggestion;
                if (!$scope.interval || $scope.upperBoundary) {
                    criteriaSuggestion = 100;
                } else if ($scope.lowerBoundary) {
                    criteriaSuggestion = 0;
                } else {
                    if (!$scope.previousInterval) {
                        criteriaSuggestion = ($scope.interval.criteriaValue) / 2;
                    } else {
                        criteriaSuggestion = $scope.previousInterval.criteriaValue + ($scope.interval.criteriaValue - $scope.previousInterval.criteriaValue) / 2;
                    }
                }
                return criteriaSuggestion;
            };
            $scope.$on('tooltip.show.before', function () {
                $scope.popOverItem.criteriaValue = $scope.getCriteriaSuggestion();
                $scope.popOverItem.indicatorValue= $scope.interval.indicatorValue || 0;
            });
            $scope.minWidth = 80;
            var indicatorVal = $scope.interval ? $scope.interval.indicatorValue || 0 : 0;
            $scope.popOverItem = {
                criteriaValue: $scope.getCriteriaSuggestion(),
                indicatorValue: indicatorVal
            };
            $scope.getPercent = function () {
                var sumBefore = 0;
                if ($scope.lowerBoundary || $scope.upperBoundary) {
                    return 100;
                }
                if ($scope.previousInterval) {
                    sumBefore = $scope.previousInterval.criteriaValue || 0;
                }
                if ($scope.interval && ($scope.interval.criteriaValue || $scope.interval.criteriaValue === 0)) {
//                    return  Math.floor(($scope.interval.criteriaValue - sumBefore))
                    if (sumBefore > $scope.interval.criteriaValue) {
                        throw new Error('The criteriaValue of the previous interval can not be higher than the criteriaValue of the current Interval');
                    }
                    return ($scope.interval.criteriaValue - sumBefore);
                }
                if (sumBefore > 100) {
                    throw new Error('The criteriaValue of the previous interval can not be higher than the criteriaValue of the current Interval');
                }
                return (100 - sumBefore);
            };
            $scope.intervalWidth = function () {
                var percentage = $scope.getPercent();
                return {
                    width: percentage + '%'
                };
            };
            $scope.getColorClass = function () {
                if ($scope.lowerBoundary) {
                    return 'color-a';
                }
                if ($scope.upperBoundary) {
                    return 'color-j';
                }
                return $scope.getColor({interval: $scope.interval});
            };
            $scope.del = function (interval) {
                $scope.$emit('band-item-removed', interval);
                $scope.tooltip = {
                    title: $scope.getTooltipTitle(),
                    checked: false
                };
            };
            $scope.updateInterval = function (event) {
                $scope.onIntervalChanged({
                    criteriaValue: $scope.popOverItem.criteriaValue,
                    indicatorValue: $scope.popOverItem.indicatorValue
                });
                $scope.hidePopover();
                //this is necessary to avoid poping up the poover for the new created interval
                event.stopPropagation();
                $timeout(function(){
                    $scope.tooltip = {
                        title: $scope.getTooltipTitle(),
                        checked: false
                    };
                });
            };
            $scope.getTooltipTitle = function () {
                var title = '';
                title += 'Criteria: ';
                if ($scope.lowerBoundary) {
                    title += '0%';
                } else if ($scope.upperBoundary) {
                    title += '100%';
                } else {
                    title += ($scope.previousInterval.criteriaValue || '0') + '% -' + $scope.interval.criteriaValue + '%';
                }
                title += '\n Indicator Values: ';
                if ($scope.lowerBoundary) {
                    title += '<= ' + ($scope.interval ? $scope.interval.indicatorValue || 0 : 0);
                } else if ($scope.upperBoundary) {
                    title += '>= ' + ($scope.interval ? $scope.interval.indicatorValue || 0 : 0);
                } else {
                    title += ($scope.previousInterval ? $scope.previousInterval.indicatorValue || 0 : 0) + '- ' + $scope.interval.indicatorValue;
                }
                return title;
            };
            if ($scope.previousInterval && $scope.interval) {

                $scope.tooltip = {
                    title: $scope.getTooltipTitle(),
                    checked: false
                };
            }
        }
    ]
);


