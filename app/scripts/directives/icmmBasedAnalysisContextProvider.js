angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
    ).directive(
    'icmmContextProvider',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                'worldstates': '=',
                'selectedWorldstates': '=',
                'decisionStrategies': '=',
                'criteriaFunctions': '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/icmmContextProviderTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.IcmmContextProviderDirectiveController'
            };
        }
    ]
    );