angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'indicatorCriteriaAxisChooser',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                iccObject: '=',
                isXAxis: '@',
                selectedAxis: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorCriteriaAxisChooserTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorCriteriaAxisChooserDirectiveController'
            };
        }
    ]
);