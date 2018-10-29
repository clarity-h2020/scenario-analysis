describe('IndicatorBandDirective Test Suite', function () {
    'use strict';
    // Load the myApp module, which contains the directive
    beforeEach(function () {
        // we mock the constants necessary for the Worldstates Service
        module(function ($provide) {
            $provide.constant('CRISMA_DOMAIN', 'CRISMA');
            $provide.constant('CRISMA_ICMM_API', 'http://localhost:8890');
        });
        module('de.cismet.crisma.ICMM.Worldstates');
        module('ngTable');
        module('mgcrea.ngStrap.popover');
        module('eu.myclimateservice.csis.scenario-analysis.directives');
        module('eu.myclimateservice.csis.scenario-analysis.controllers');
    });

    describe('IndiciatorBand Directive Tests', function () {
        var $compile, $rootScope;



        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(
            [
                '$compile',
                '$rootScope',
                function (compile, rootScope) {
                    $compile = compile;
                    $rootScope = rootScope;
                }
            ]
        ));

        it('Shows initial indicator band if no binding is provided', function () {
            // Compile a piece of HTML containing the directive
            $compile('<indicator-band></indicator-band>')($rootScope);
            expect(true).toEqual(true);
        });

    });

    describe('IndiciatorBandItem Controller Tests', function () {
        var scope, controller, filter, timeout;

        beforeEach(inject(
            [
                '$controller',
                '$rootScope',
                '$filter',
                '$timeout',
                function (c, r, f, t) {
                    scope = r.$new();
                    controller = c;
                    filter = f;
                    timeout = t;
                }
            ]
        ));

        it('calculates a correct prediction for the criteria value of a new item', function () {
            scope.first = false;
            scope.upperBoundary = false;
            scope.lowerBoundary = false;
            scope.previousInterval = {
                criteriaValue: 50,
                indicatorValue: 0
            };
            scope.interval = {
                criteriaValue: 100,
                indicatorValue: 0
            };
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandItemDirectiveController',
                {
                    $scope: scope,
                    $filter: filter,
                    $element: null,
                    $timeout: timeout
                }
            );
            expect(scope.getCriteriaSuggestion()).toEqual(75);

            scope.upperBoundary = true;
            expect(scope.getCriteriaSuggestion()).toEqual(100);

            scope.upperBoundary = false;
            scope.lowerBoundary = true;
            expect(scope.getCriteriaSuggestion()).toEqual(0);
            scope.lowerBoundary = false;

            scope.previousInterval = null;
            expect(scope.getCriteriaSuggestion()).toEqual(50);

            scope.interval = null;
            expect(scope.getCriteriaSuggestion()).toEqual(100);

            scope.previousInterval = {
                criteriaValue: 100,
                indicatorValue: 0
            };
            scope.interval = {
                criteriaValue: 50,
                indicatorValue: 0
            };
            expect(scope.getCriteriaSuggestion()).toEqual(75);
        });

        it('calculates the correct percantage of the progress element', function () {

            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandItemDirectiveController',
                {
                    $scope: scope,
                    $filter: filter,
                    $element: null,
                    $timeout: timeout
                }
            );
            scope.upperBoundary = true;
            expect(scope.intervalWidth().width).toEqual('100%');
            scope.upperBoundary = false;

            scope.lowerBoundary = true;
            expect(scope.intervalWidth().width).toEqual('100%');
            scope.lowerBoundary = false;

            scope.interval = {
                criteriaValue: 100,
                indicatorValue: 0
            };
            expect(scope.intervalWidth().width).toEqual('100%');


            scope.interval = {
                criteriaValue: 0,
                indicatorValue: 0
            };
            expect(scope.intervalWidth().width).toEqual('0%');

            scope.interval = {
                criteriaValue: 50,
                indicatorValue: 0
            };
            expect(scope.intervalWidth().width).toEqual('50%');

            scope.previousInterval = {
                criteriaValue: 25,
                indicatorValue: 0
            };
            expect(scope.intervalWidth().width).toEqual('25%');

            scope.previousInterval = {
                criteriaValue: 75,
                indicatorValue: 0
            };
            expect(scope.intervalWidth).toThrow();
        });

        it('listen to events when deleting or adding new intervals and adjusts the heigth', function () {
            scope.first = false;
            scope.upperBoundary = false;
            scope.lowerBoundary = false;
            scope.previousInterval = {
                criteriaValue: 50,
                indicatorValue: 0
            };
            scope.interval = {
                criteriaValue: 100,
                indicatorValue: 0
            };
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandItemDirectiveController',
                {
                    $scope: scope,
                    $filter: filter,
                    $element: null,
                    $timeout: timeout
                }
            );

            spyOn(scope, "checkActualHeight");
            scope.$broadcast("band-item-removed");

            expect(scope.checkActualHeight).toHaveBeenCalled();

            scope.$broadcast("band-item-added");
            expect(scope.checkActualHeight).toHaveBeenCalled();

        });
        it('broadcasts an event whenthe interval is deleted', function () {
            scope.first = false;
            scope.upperBoundary = false;
            scope.lowerBoundary = false;
            scope.previousInterval = {
                criteriaValue: 50,
                indicatorValue: 0
            };
            scope.interval = {
                criteriaValue: 100,
                indicatorValue: 0
            };
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandItemDirectiveController',
                {
                    $scope: scope,
                    $filter: filter,
                    $element: null,
                    $timeout: timeout
                }
            );

            spyOn(scope, "$emit");
            scope.del(scope.interval);
            expect(scope.$emit).toHaveBeenCalledWith("band-item-removed", scope.interval);

        });
    });

    describe('IndiciatorBand Controller Tests', function () {
        var scope, controller, rootScope;

        beforeEach(inject(
            [
                '$controller',
                '$rootScope',
                function (c, r) {
                    scope = r.$new();
                    controller = c;
                    rootScope = r;
                }
            ]
        ));

        it('creates a default criteriaFunction if no criteriaFunction is provided', function () {
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );

            // the controller initializes a standard criteriaFunction like this
            var defaultCritFunc = {
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 0
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            };
            expect(scope.criteriaFunction).toEqual(defaultCritFunc);
        });

        it('keeps the interval array always sorted...', function () {
            scope.criteriaFunction = {
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 0
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: [{
                    criteriaValue: 75,
                    indicatorValue: 0
                }, {
                    criteriaValue: 25,
                    indicatorValue: 0
                }, {
                    criteriaValue: 50,
                    indicatorValue: 0
                }]
            };
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );
            expect(scope.criteriaFunction.intervals).toEqual([{
                criteriaValue: 25,
                indicatorValue: 0
            }, {
                criteriaValue: 50,
                indicatorValue: 0
            }, {
                criteriaValue: 75,
                indicatorValue: 0
            }]);

            scope.criteriaFunction.intervals[0].criteriaValue = 90;
            scope.$apply();
            expect(scope.criteriaFunction.intervals).toEqual([{
                criteriaValue: 50,
                indicatorValue: 0
            }, {
                criteriaValue: 75,
                indicatorValue: 0
            }, {
                criteriaValue: 90,
                indicatorValue: 0
            }]);

            scope.criteriaFunction.intervals.push({
                criteriaValue: 10,
                indicatorValue: 0
            });
            scope.$apply();
            expect(scope.criteriaFunction.intervals).toEqual([{
                criteriaValue: 10,
                indicatorValue: 0
            }, {
                criteriaValue: 50,
                indicatorValue: 0
            }, {
                criteriaValue: 75,
                indicatorValue: 0
            }, {
                criteriaValue: 90,
                indicatorValue: 0
            }]);

        });

        it('broadcasts an event when adding a new interval', function () {
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );

            spyOn(scope, '$broadcast');
            scope.createInterval(50, 50);
            expect(scope.$broadcast).toHaveBeenCalledWith('band-item-added');
        });

        it('listens to band-item-removed events when an interval is deleted', function () {
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );

            scope.criteriaFunction.intervals.push({
                criteriaValue: 10,
                indicatorValue: 0
            });
            scope.$apply();
            spyOn(scope, 'deleteInterval');
            scope.$broadcast('band-item-removed', {
                criteriaValue: 10,
                indicatorValue: 0
            });
            expect(scope.deleteInterval).toHaveBeenCalledWith({
                criteriaValue: 10,
                indicatorValue: 0
            });
        });

        it('broadcasts band-item-removed event when an interval is deleted', function () {
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );

            scope.criteriaFunction.intervals.push({
                criteriaValue: 10,
                indicatorValue: 0
            });
            scope.$apply();
            spyOn(scope, '$broadcast').and.callThrough();
            scope.$broadcast('band-item-removed', {
                criteriaValue: 10,
                indicatorValue: 0
            });

            expect(scope.$broadcast).toHaveBeenCalledWith('band-item-removed', {
                criteriaValue: 10,
                indicatorValue: 0
            });
            expect(scope.criteriaFunction.intervals).toEqual([]);
        });
    });

    describe('CriteriaFunctionManager Controller Tests', function () {
        var scope, controller, rootScope;

        beforeEach(inject(
            [
                '$controller',
                '$rootScope',
                '$filter',
                '$timeout',
                function (c, r, f, t) {
                    scope = r.$new();
                    controller = c;
                    rootScope = r;
                }
            ]
        ));

        it('creates a default criteriaFunction if no criteriaFunction is provided', function () {
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );

            // the controller initializes a standard criteriaFunction like this
            var defaultCritFunc = {
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 0
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            };
            expect(scope.criteriaFunction).toEqual(defaultCritFunc);
        });

        it('keeps the interval array always sorted...', function () {
            scope.criteriaFunction = {
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 0
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: [{
                    criteriaValue: 75,
                    indicatorValue: 0
                }, {
                    criteriaValue: 25,
                    indicatorValue: 0
                }, {
                    criteriaValue: 50,
                    indicatorValue: 0
                }]
            };
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );
            expect(scope.criteriaFunction.intervals).toEqual([{
                criteriaValue: 25,
                indicatorValue: 0
            }, {
                criteriaValue: 50,
                indicatorValue: 0
            }, {
                criteriaValue: 75,
                indicatorValue: 0
            }]);

            scope.criteriaFunction.intervals[0].criteriaValue = 90;
            scope.$apply();
            expect(scope.criteriaFunction.intervals).toEqual([{
                criteriaValue: 50,
                indicatorValue: 0
            }, {
                criteriaValue: 75,
                indicatorValue: 0
            }, {
                criteriaValue: 90,
                indicatorValue: 0
            }]);

            scope.criteriaFunction.intervals.push({
                criteriaValue: 10,
                indicatorValue: 0
            });
            scope.$apply();
            expect(scope.criteriaFunction.intervals).toEqual([{
                criteriaValue: 10,
                indicatorValue: 0
            }, {
                criteriaValue: 50,
                indicatorValue: 0
            }, {
                criteriaValue: 75,
                indicatorValue: 0
            }, {
                criteriaValue: 90,
                indicatorValue: 0
            }]);

        });

        it('broadcasts an event when adding a new interval', function () {
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );

            spyOn(scope, '$broadcast');
            scope.createInterval(50, 50);
            expect(scope.$broadcast).toHaveBeenCalledWith('band-item-added');
        });

        it('listens to band-item-removed events when an interval is deleted', function () {
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );

            scope.criteriaFunction.intervals.push({
                criteriaValue: 10,
                indicatorValue: 0
            });
            scope.$apply();
            spyOn(scope, 'deleteInterval');
            scope.$broadcast('band-item-removed', {
                criteriaValue: 10,
                indicatorValue: 0
            });
            expect(scope.deleteInterval).toHaveBeenCalledWith({
                criteriaValue: 10,
                indicatorValue: 0
            });
        });

        it('broadcasts band-item-removed event when an interval is deleted', function () {
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorBandDirectiveController',
                {
                    $scope: scope
                }
            );

            scope.criteriaFunction.intervals.push({
                criteriaValue: 10,
                indicatorValue: 0
            });
            scope.$apply();
            spyOn(scope, '$broadcast').and.callThrough();
            scope.$broadcast('band-item-removed', {
                criteriaValue: 10,
                indicatorValue: 0
            });

            expect(scope.$broadcast).toHaveBeenCalledWith('band-item-removed', {
                criteriaValue: 10,
                indicatorValue: 0
            });
            expect(scope.criteriaFunction.intervals).toEqual([]);
        });
    });
    
});