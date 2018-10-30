angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.CriteriaRadarChartDirectiveController',
    [
        '$scope',
        'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
        function ($scope,ccs) {
            'use strict';
            $scope.legendItems = [];
            
            $scope.convertToChartDataStructure = function (indicatorVector) {
                var i, j, indicatorData, groupName, group, criteriaProp,
                    indiactor, result, dataItem,legendItems, criteriaFunction;
                if(!$scope.criteriaFunction){
                    return;
                }
                result = [];
                legendItems = [];
                for (i = 0; i < indicatorVector.length; i++) {
                    dataItem = [];
                    indicatorData = indicatorVector[i].data;
                    legendItems.push(indicatorVector[i].name);
                    for (groupName in indicatorData) {
                        if (indicatorData.hasOwnProperty(groupName)) {
                            group = indicatorData[groupName];
                            for (criteriaProp in group) {
                                if (group.hasOwnProperty(criteriaProp) &&
                                        criteriaProp !== 'displayName' &&
                                        criteriaProp !== 'iconResource') {
                                    indiactor = group[criteriaProp];
                                    for(j=0;j<$scope.criteriaFunction.criteriaFunctions.length;j++){
                                        if($scope.criteriaFunction.criteriaFunctions[j].indicator === indiactor.displayName){
                                            criteriaFunction=$scope.criteriaFunction.criteriaFunctions[j];
                                            break;
                                        }
                                    }
                                    dataItem.push({
                                        axis: $scope.useNumbers ? dataItem.length+1 :indiactor.displayName,
                                        tooltip: indiactor.displayName,
                                        value: Math.round(ccs.calculateCriteria(indiactor.value,criteriaFunction)*100)/100
                                    });
                                }
                            }
                        }
                    }
                    result.push(dataItem);
                }
                return [result,legendItems];
            };
        }
    ]
);


