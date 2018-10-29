angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
    ).directive(
    'worldstateAnalysisWidget',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunctionSets:'=',
                selectedCriteriaFunction:'=',
                decisionStrategies:'=',
                selectedDecisionStrategy:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl:'templates/worldstateAnalysisWidgetTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.WorldstateAnalysisWidgetDirectiveController'
            };
        }
    ]
    );