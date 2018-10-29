angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'criteriaFunctionManager',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunctionSet:'=criteriaFunctions'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/criteriaFunctionManagerTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.CriteriaFunctionManagerDirectiveController'
            };
        }
    ]
);