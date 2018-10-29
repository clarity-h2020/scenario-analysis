angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorCriteriaAxisChooserDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';

            var getAxisProperties, xAxis, defaultAxis;
            xAxis = $scope.isXAxis === 'true';
            defaultAxis = {
                name: xAxis ? 'Select a x-axis' : 'Select a y-axis'
            };
            getAxisProperties = function (iccData) {
                var group, axesGroup, prop, res = [];
                if (iccData) {
                    var worldstateIccData = iccData.data;
                    for (group in worldstateIccData) {
                        if (worldstateIccData.hasOwnProperty(group)) {
                            axesGroup = worldstateIccData[group];
                            res.push({
                                name: axesGroup.displayName,
                                icon: axesGroup.iconResource,
                                isGroup: true
                            });
                            for (prop in axesGroup) {
                                if (axesGroup.hasOwnProperty(prop)) {
                                    if (prop !== 'displayName' && prop !== 'iconResource') {
                                        res.push({
                                            name: axesGroup[prop].displayName,
                                            icon: axesGroup[prop].iconResource,
                                            isGroup: false
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                return res;
            };

            if (!$scope.selectedAxis) {
                $scope.selectedAxis = defaultAxis;
            }

            $scope.scales = [];

            $scope.axisSelected = function (index) {
                if ($scope.scales[index]) {
                    $scope.selectedAxis = $scope.scales[index];
                } else {
                    $scope.selectedAxis = defaultAxis;
                }
            };

            $scope.$watch('iccObject', function () {
                if ($scope.iccObject) {
                    $scope.scales = getAxisProperties($scope.iccObject);
                }
            });
        }
    ]
);


