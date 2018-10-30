angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'indicatorCriteriaTable',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                forCriteria: '=',
                criteriaFunction:'=',
                detailIcons: '@'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorCriteriaTableTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorCriteriaTableDirectiveController'
            };
        }
    ]
);