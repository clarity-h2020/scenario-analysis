angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
    ).directive(
    'fileContextProvider',
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
                templateUrl: 'templates/fileContextProviderTemplate.html',
                //controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.FileContextProviderDirectiveController'
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.drupalContextProviderDirectiveController'
            };
        }
    ]
    );