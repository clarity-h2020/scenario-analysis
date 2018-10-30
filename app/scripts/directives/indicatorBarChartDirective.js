angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'indicatorBarCharts',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBarChartTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.indicatorBarChartDirectiveController'
            };
        }
    ]
);