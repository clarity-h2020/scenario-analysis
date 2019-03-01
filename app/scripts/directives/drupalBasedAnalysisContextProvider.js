angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
    ).directive(
    'drupalContextProvider',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                'worldstates': '=',
                'selectedWorldstates': '=',
                'decisionStrategies': '=',
                'criteriaFunctions': '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/drupalContextProviderTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.drupalContextProviderDirectiveController'
            };
        }
    ]
    );