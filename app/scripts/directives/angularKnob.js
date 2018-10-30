angular.module(
    'eu.myclimateservice.csis.scenario-analysis.directives'
).directive(
    'knob',
    function () {
        'use strict';
        return {
            restrict: 'EACM',
            template: function () {
                return '<input ng-model="knobData">';
            },
            replace: true,
            scope: {
                knobData: '=',
                knobOptions: '='
            },
            link: function (scope, elem) {


                var renderKnob = function () {
                    var $elem, knobOptions;
                    knobOptions = scope.knobOptions || {
                        'max': 100,
                        'width': 100,
                        'height': 100,
                        'displayInput': false,
                        'angleOffset': -125,
                        'angleArc': 250
                    };
                    knobOptions.release = function (v) {
                        scope.knobData = v;
                        scope.$apply();
                    };
                    $elem = elem;
                    $elem.val(scope.knobData);
                    $elem.knob(knobOptions);
                    //
                    elem.find('div').css('display', 'block')
                        .css('margin', '0 auto');
                };

                scope.$watch('knobData', function () {
                    renderKnob();
                }, true);

                scope.$watch('knobOptions', function () {
                    renderKnob();
                });

            }
        };
    }
);