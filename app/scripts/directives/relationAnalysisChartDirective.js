angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'relationAnalysisChart',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates: '&',
                chartHeight: '@height',
                forCriteria: '=',
                criteriaFunctionSet: '=criteriaFunction'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/relationAnalysisChartTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.RelationAnalysisChartDirectiveController'
            };
        }
    ]
);