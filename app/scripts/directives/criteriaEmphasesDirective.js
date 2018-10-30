angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'criteriaEmphasis',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                criteriaEmphases: '=',
                indicatorMap:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/criteriaEmphasesTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.criteriaEmphasesController'
            };
        }
    ]
);