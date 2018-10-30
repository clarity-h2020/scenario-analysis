angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.levelOfEmphasisDirectiveController',
    [
        '$scope',
        'eu.myclimateservice.csis.scenario-analysis.services.AnalysisService',
        function ($scope, AnalysisService) {
            'use strict';
            var controller, owa, i;

            controller = this;
            owa = AnalysisService.getOwa();

            this.updateLseVectors = function () {
                if ($scope.indicatorSize >= 1) {
                    controller.onlyPositiveLse = [];
                    for (i = 0; i < $scope.indicatorSize; i++) {
                        if (i === 0) {
                            this.onlyPositiveLse[i] = 1;
                        } else {
                            this.onlyPositiveLse[i] = 0;
                        }
                    }
                    controller.overEmphPosLse = owa.hLSWeights($scope.indicatorSize <= 1 ? 1 : $scope.indicatorSize);
                    controller.neutralLse = owa.meanWeights($scope.indicatorSize <= 1 ? 1 : $scope.indicatorSize);
                    controller.overEmphNegLse = owa.lLSWeights($scope.indicatorSize <= 1 ? 1 : $scope.indicatorSize);
                    controller.onlyNegativeLse = [];
                    for (i = 0; i < $scope.indicatorSize; i++) {
                        if (i === $scope.indicatorSize - 1) {
                            controller.onlyNegativeLse[i] = 1;
                        } else {
                            controller.onlyNegativeLse[i] = 0;
                        }
                    }
                }
            };
            this.updateSatisfactionEmphasis = function (lse) {
                var weights;
                switch (parseInt(lse)) {
                    case -2:
                        {
                            weights = controller.onlyNegativeLse;
                            break;
                        }
                    case -1:
                        {
                            weights = controller.overEmphNegLse;
                            break;
                        }
                    case 0:
                        {
                            weights = controller.neutralLse;
                            break;
                        }
                    case 1:
                        {
                            weights = controller.overEmphPosLse;
                            break;
                        }
                    case 2:
                        {
                            weights = controller.onlyPositiveLse;
                            break;
                        }

                }
                return weights;
            };

            this.satisfactionEmphasisEquals = function (v1, v2) {
                var i;
                if (v1 && v2) {
                    if (v1.length === v2.length) {
                        for (i = 0; i < v1.length; i++) {
                            if (v1[i] !== v2[i]) {
                                return false;
                            }
                        }
                        return true;
                    }
                }
                return false;
            };

            this.updateInternalModel = function (satisfactionEmphVector) {
                if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.onlyNegativeLse)) {
                    return -2;
                } else if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.overEmphNegLse)) {
                    return -1;
                } else if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.neutralLse)) {
                    return 0;
                } else if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.overEmphPosLse)) {
                    return 1;
                } else if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.onlyPositiveLse)) {
                    return 2;
                }
                return 0;
            };

            controller.updateLseVectors();
            if ($scope.indicatorSize >= 1) {
                $scope.model = {
                    lse: $scope.satisfactionEmphasis ? controller.updateInternalModel($scope.satisfactionEmphasis) : 0
                };
            }
            $scope.satisfactionEmphasis = $scope.satisfactionEmphasis || controller.updateSatisfactionEmphasis(0);
            $scope.$watch('model', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.indicatorSize >= 1) {
                    $scope.satisfactionEmphasis = controller.updateSatisfactionEmphasis($scope.model.lse);
                }
            }, true);

            $scope.$watch('satisfactionEmphasis', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.indicatorSize >= 1) {
                    $scope.model.lse = controller.updateInternalModel($scope.satisfactionEmphasis);
                }
            }, true);

            $scope.$watch('indicatorSize', function () {
                controller.updateLseVectors();
                if ($scope.indicatorSize >= 1) {

                    if (!($scope.model && $scope.model.lse)) {
                        $scope.model = {
                            lse: $scope.satisfactionEmphasis ? controller.updateInternalModel($scope.satisfactionEmphasis) : 0
                        };
                    }
                    $scope.satisfactionEmphasis = controller.updateSatisfactionEmphasis($scope.model.lse);
                }
            }, true);
        }
    ]
    );


