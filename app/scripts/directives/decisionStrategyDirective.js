angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'decisionStrategy',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                decisionStrategy: '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/decisionStrategyTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.DecisionStrategyDirectiveController'
            };
        }
    ]
);