angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'levelOfEmphasis',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                satisfactionEmphasis: '=',
                indicatorSize:'=',
                // the expert mode feature is implemented later on. When true a similiar component 
                // to the criteriaEmphasis is needed...
                expertMode:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/levelOfEmphasisTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.levelOfEmphasisDirectiveController'
            };
        }
    ]
);