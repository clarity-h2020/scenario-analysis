angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'worldstateRankingTable',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunction:'=',
                decisionStrategy:'=',
                showIndicators:'=',
                showRadarChart:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl:'templates/worldstateRankingTableTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.worldstateRankingTableDirectiveController'
            };
        }
    ]
);