angular.module(
    'eu.myclimateservice.csis.scenario-analysis.services'
).factory(
    'eu.myclimateservice.csis.scenario-analysis.services.FilesPersistanceService',
    [
        function () {
            'use strict';
            var persistCriteriaFunctions, persistDecisionStrategies;

            function download(text) {
                var bb;
                bb = new Blob([text], {type: 'text/plain'});
                //works in ff and in chrome
                window.open(window.URL.createObjectURL(bb));
            }

            persistCriteriaFunctions = function (criteriaFunctions) {
                download(angular.toJson(criteriaFunctions));
            };

            persistDecisionStrategies = function (decisionStrategies) {
                download(angular.toJson(decisionStrategies));
            };

            return {
                'persistCriteriaFunctions': persistCriteriaFunctions,
                'persistDecisionStrategies': persistDecisionStrategies
            };
        }
    ]
);