angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'decisionStrategyManager',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                decisionStrategies: '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/decisionStrategyManagerTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.decisionStrategyManagerDirectiveController'
            };
        }
    ]
);