angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
    ).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.DecisionStrategyDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, Worldstates) {
            'use strict';
            var ctrl;

            ctrl = this;

            this.extractIndicators = function (worldstates) {
                var indicatorGroup, indicatorProp, iccObject, group, j, indicatorMap;

                indicatorMap = {};
                $scope.indicatorSize = 0;

                if (worldstates && worldstates.length > 0) {
                    for (j = 0; j < worldstates.length; j++) {
                        iccObject = Worldstates.utils.stripIccData([worldstates[j]], false)[0];
                        for (indicatorGroup in iccObject.data) {
                            if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                group = iccObject.data[indicatorGroup];
                                for (indicatorProp in group) {
                                    if (group.hasOwnProperty(indicatorProp)) {
                                        if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                            if (!indicatorMap[indicatorProp]) {
                                                indicatorMap[indicatorProp] = group[indicatorProp];
                                                $scope.indicatorSize++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return indicatorMap;
            };

            $scope.decisionStrategy = $scope.decisionStrategy || {};
            $scope.indicatorSize = $scope.indicatorSize || 0;
            $scope.indicatorMap = $scope.indicatorMap || {};
            $scope.$watch('worldstates', function () {
                $scope.indicatorMap= ctrl.extractIndicators($scope.worldstates);
            },true);

        }
    ]
    );


