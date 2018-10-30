angular.module(
    'eu.myclimateservice.csis.scenario-analysis.services'
    ).factory(
    'eu.myclimateservice.csis.scenario-analysis.services.IcmmPersistanceService',
    [
        'eu.myclimateservice.csis.scenario-analysis.services.CriteriaFunction',
        'eu.myclimateservice.csis.scenario-analysis.services.DecisionStrategies',
        function (CF, DS) {
            'use strict';
            var persistCriteriaFunctions, persistDecisionStrategies;

            persistCriteriaFunctions = function (criteriaFunctions) {
                CF.update(criteriaFunctions);
            };

            persistDecisionStrategies = function (decisionStrategies) {
                DS.update(decisionStrategies);
            };

            return {
                'persistCriteriaFunctions': persistCriteriaFunctions,
                'persistDecisionStrategies': persistDecisionStrategies
            };
        }
    ]
    );