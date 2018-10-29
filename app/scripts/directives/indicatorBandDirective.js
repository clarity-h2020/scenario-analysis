angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
    ).directive(
    'indicatorBand',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                criteriaFunction: '=?'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBandTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController'
            };
        }
    ]
    ).directive(
    'indicatorBandItem',
    [
        '$popover',
        function ($popover) {
            'use strict';
            var scope;
            scope = {
                interval: '=',
                previousInterval: '=',
                first: '=',
                last: '=',
                lowerBoundary: '@',
                upperBoundary: '@',
                onIntervalChanged: '&',
                getColor: '&'
            };
            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBandItemTemplate.html',
                controller: 'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandItemDirectiveController',
                replace: true,
                link: function (scope, elem, attrs) {
                    var popover = $popover(elem.find('#popover-target'), {
                        scope: scope,
                        title: attrs.title || 'Create a new interval',
                        template: 'templates/indicatorBandPopoverTemplate.html',
                        contentTemplate: 'templates/indicatorBandPopoverContentTemplate.html',
                        placement: 'bottom',
                        trigger: 'manual',
                        autoClose:true
                    });

                    scope.togglePopover = function () {
                        popover.$promise.then(popover.toggle);
                    };

                    scope.hidePopover = function () {
                        popover.$promise.then(popover.hide);
                    };
                }
            };
        }
    ]
    ).directive(
).directive(

    'gnumber',
    [
        '$filter',
        function ($filter) {
            'use strict';
            

            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {

                    // the view value is formatted with angular number filter
                    // the local is en_us, so it is sufficient to remove all ,
                    ctrl.$parsers.unshift(function (viewValue) {
                        var number;
                        
                        if(!viewValue.match(/^[\d.,]*$/)){
                            ctrl.$setValidity('gnumber', false);
                            return undefined;
                        }
                        
                        number= parseFloat(viewValue.replace(/,/g,''));
                        
                        if (!isNaN(number)) {
                            ctrl.$setValidity('gnumber', true);
                            return number;
                        }
                        else {
                            ctrl.$setValidity('gnumber', false);
                            return undefined;
                        }

                    });

                    ctrl.$formatters.unshift(function (value) {
                        return $filter('number')(value);
                    });

                }
            };
        }
    ]
).directive(
    'gpercent',
    [
        '$filter',
        function ($filter) {
            'use strict';
            

            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {

                    // the view value is formatted with angular number filter
                    // the local is en_us, so it is sufficient to remove all ,
                    ctrl.$parsers.unshift(function (viewValue) {
                        var number;
                        
                        if(!viewValue.match(/^[\d.,]*$/)){
                            ctrl.$setValidity('gpercent', false);
                            return undefined;
                        }
                        
                        number= parseFloat(viewValue.replace(/,/g,''));
                        
                        if (!isNaN(number) && number>=0 && number<=100) {
                            ctrl.$setValidity('gpercent', true);
                            return number;
                        }else {
                            ctrl.$setValidity('gpercent', false);
                            return undefined;
                        }

                    });

                    ctrl.$formatters.unshift(function (value) {
                        return $filter('number')(value);
                    });

                }
            };
        }
    ]
);
