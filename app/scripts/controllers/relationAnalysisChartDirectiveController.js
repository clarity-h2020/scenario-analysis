angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.RelationAnalysisChartDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
        function ($scope, WorldstateService, ccs) {
            'use strict';

            var controller = this;

            this.createChartData = function (iccData, xAxis, yAxis, xAxisCF, yAxisCf, forCriteria) {
                var i, iccItem, valueX, valueY, data = [];
                if (!iccData || !xAxis || !yAxis) {
                    throw 'Invalid configuration. Can no determine chart data for (iccData, xAxis, yaxis):' + iccData + ' , ' + xAxis + ' , ' + yAxis;
                }
                
                if(forCriteria && !(xAxisCF && yAxisCf)){
                    return;
                }
                
                var firstValueX = 0;
                for (i = 0; i < iccData.length; i++) {
                    iccItem = iccData[i];
                    if (!iccItem) {
                        throw 'Invalid icc object ' + iccItem;
                    }
                    valueX = controller.getDataValueForAxis(xAxis, iccItem, xAxisCF, forCriteria);
                    valueY = controller.getDataValueForAxis(yAxis, iccItem, yAxisCf, forCriteria);
//                    valueX = Math.random() * 500 + 200;
//                    valueY = Math.random() * 500 + 200;
                    if (firstValueX === 0) {
                        firstValueX = valueX;
                    }
                    data.push({
                        key: (i + 1) + '. ' + iccData[i].name,
                        values: [{
                            x: valueX,
                            y: valueY
                        }]
                    });
                }

                return data;
            };

            this.getDataValueForAxis = function (axis, iccObject, criteriaFunction, forCriteria) {
                var axisProp, iccItem, iccGroup, iccProp, iccGroupProp;
                if (!(axis && axis.name)) {
                    return null;
                }
                axisProp = axis.name;
                iccItem = iccObject.data;
                for (iccGroupProp in iccItem) {
                    if (iccItem.hasOwnProperty(iccGroupProp)) {
                        iccGroup = iccItem[iccGroupProp];
                        for (iccProp in iccGroup) {
                            if (iccGroup.hasOwnProperty(iccProp)) {
                                if (iccGroup[iccProp].displayName === axisProp) {
                                    if (forCriteria) {
                                        return ccs.calculateCriteria(iccGroup[iccProp].value, criteriaFunction);
                                    }
                                    return iccGroup[iccProp].value;
                                }
                            }
                        }
                    }
                }
                return null;
            };


            $scope.getXAxisLabel = function () {
                var res = '';
                if ($scope.xAxis && $scope.xAxis.name) {
                    res = $scope.xAxis.name;
                }
                return res;
            };

            $scope.getYAxisLabel = function () {
                var res = '';
                if ($scope.yAxis && $scope.yAxis.name) {
                    res = $scope.yAxis.name;
                }
                return res;
            };

            $scope.zScale = d3.scale.linear();

            $scope.yAxisTickFormatFunction = function () {
                return function (d) {
                    return d3.round(d, 2);
                };
            };

            $scope.xAxisTickFormatFunction = function () {
                return function (d) {
                    return d3.round(d, 2);
                };
            };

            this.dataChangedWatchCallback = function () {
                if ($scope.worldstates() && $scope.worldstates().length > 0) {
                    $scope.iccData = WorldstateService.utils.stripIccData($scope.worldstates());
                    $scope.iccObject = $scope.iccData[0];
                    if ($scope.xAxis && $scope.yAxis) {
                        if ($scope.xAxis.name.indexOf('Select') === -1 &&
                                $scope.yAxis.name.indexOf('Select') === -1) {
                            $scope.chartdata = controller.createChartData($scope.iccData, $scope.xAxis,
                                $scope.yAxis,
                                $scope.xAxisCriteriaFunction,
                                $scope.yAxisCriteriaFunction,
                                $scope.forCriteria);
                        }
                    }
                }
            };

            this.updateAxisCriteriaFunctions = function () {
                var i;
                for (i = 0; i < $scope.criteriaFunctionSet.criteriaFunctions.length; i++) {
                    if ($scope.criteriaFunctionSet.criteriaFunctions[i].indicator === $scope.xAxis.name) {
                        $scope.xAxisCriteriaFunction = $scope.criteriaFunctionSet.criteriaFunctions[i];
                    }
                    if ($scope.criteriaFunctionSet.criteriaFunctions[i].indicator === $scope.yAxis.name) {
                        $scope.yAxisCriteriaFunction = $scope.criteriaFunctionSet.criteriaFunctions[i];
                    }
                }
            };

            this.axisWatchCallback = function () {
                if ($scope.xAxis && $scope.yAxis) {
                    if ($scope.xAxis.name.indexOf('Select') === -1 &&
                            $scope.yAxis.name.indexOf('Select') === -1) {
                        if ($scope.criteriaFunctionSet) {
                            controller.updateAxisCriteriaFunctions();
                        }
                        $scope.chartdata = controller.createChartData($scope.iccData, $scope.xAxis,
                            $scope.yAxis, $scope.xAxisCriteriaFunction, $scope.yAxisCriteriaFunction, $scope.forCriteria);
                    }
                }
            };

            $scope.$watch('xAxis', this.axisWatchCallback);
            $scope.$watch('yAxis', this.axisWatchCallback);

            $scope.$watch('forCriteria', this.dataChangedWatchCallback);
            $scope.$watch('worldstates()', this.dataChangedWatchCallback,true);
            $scope.$watch('criteriaFunctionSet', this.axisWatchCallback, true);
        }
    ]
);


