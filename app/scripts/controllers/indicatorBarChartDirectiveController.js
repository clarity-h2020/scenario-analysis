angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.indicatorBarChartDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        '$filter',
        function ($scope, WorldstateService, $filter) {
            'use strict';
            var ctrl, formatValueFunc;
            ctrl = this;
            formatValueFunc = d3.format('.3s');

            this.createChartModels = function () {
                var i, indicatorMap, indicators, indicatorGroup, indicatorGroupProp, indicatorProp;
                indicatorMap = {};
                for (i = 0; i < $scope.worldstates.length; i++) {
                    indicators = WorldstateService.utils.stripIccData([$scope.worldstates[i]])[0].data;
                    for (indicatorGroupProp in indicators) {
                        if (indicators.hasOwnProperty(indicatorGroupProp)) {
                            indicatorGroup = indicators[indicatorGroupProp];
                            for (indicatorProp in indicatorGroup) {
                                if (indicatorGroup.hasOwnProperty(indicatorProp) && indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                    if (!indicatorMap[indicatorProp]) {
                                        indicatorMap[indicatorProp] = {
                                            key: indicatorGroup[indicatorProp].displayName,
                                            forceY: [0, 0],
                                            values: []
                                        };
                                    }
                                    if (parseInt(indicatorGroup[indicatorProp].value) > indicatorMap[indicatorProp].forceY) {
                                        indicatorMap[indicatorProp].forceY[1] = parseInt(indicatorGroup[indicatorProp].value);
                                    }
                                    indicatorMap[indicatorProp].values.push([$scope.worldstates[i].name, parseFloat(indicatorGroup[indicatorProp].value)]);
                                }
                            }
                        }
                    }
                }
                var a = [];
                for (indicators in indicatorMap) {
                    if (indicatorMap.hasOwnProperty(indicators)) {
                        a.push([indicatorMap[indicators]]);
                    }
                }
                $scope.chartModels = a;
            };

            var colorCategory = d3.scale.category20().range();
            $scope.colorFunction = function () {
                return function (d, i) {
                    return colorCategory[i % colorCategory.length];
                };
            };

            $scope.yAxisTickFormat = function (d) {
                var d3String = formatValueFunc(d);

                return d3String.replace('M', 'Mio').replace('G', 'Mrd').replace('T', 'B');
            };

            $scope.toolTipContentFunction = function () {
                return function (key, x, y, e) {
                    return '<h3 style="font-weight:normal; font-size:18px">' + x + '</h3>' +
                        '<p>' + key + ': ' + $filter('number')(e.value) + '</p>';
                };
            };

            $scope.getLegendColor = function ($index) {
                return {
                    'color': $scope.colorFunction()(0, $index)
                };
            };

            $scope.$watch('worldstates', function () {
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    ctrl.createChartModels();
                }
            }, true);
        }
    ]
);



