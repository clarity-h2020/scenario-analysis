describe('CriteriaRadarChartDirective Test Suite', function () {
    'use strict';
    var ws, ws2, iccData, criteriaFunction;
    //our test objects..
    iccData = [
          {
            '$self': '/CRISMA.dataitems/2',
            'id': 2,
            'name': 'Indicators',
            'description': 'Indicator data',
            'lastmodified': new Date().toISOString(),
            'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
            'temporalcoverageto': '2010-11-20T11:55:00.000Z',
            'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
            'datadescriptor': {
              '$self': '/CRISMA.datadescriptors/1',
              'id': 1,
              'name': 'icc_slot',
              'description': 'Dataslot for icc data',
              'categories': [{
                  '$self': '/CRISMA.categories/3',
                  'id': 3,
                  'key': 'ICC_DATA',
                  'classification': {
                    '$self': '/CRISMA.classifications/2',
                    'id': 2,
                    'key': 'ICC_DATA'
                  }
                }],
              'defaultaccessinfocontenttype': 'application/json',
              'defaultaccessinfo': null
            },
            renderingdescriptor: [
              {
                gridWidth: 'col-sm-12',
                priority: 1,
                displayHeader: true,
                sortable: false,
                fullSize: true,
                collapsed: false,
                collapsible: true,
                bodyDirective: 'icc-data-body',
                headerDirective: 'icc-data-header',
                colourClasses: [
                  'panel-purple',
                  'panel-orange',
                  'panel-greenLight',
                  'panel-blue',
                  'panel-redLight'
                ],
                mergeId: 'iccIndicatorCriteriaWidget',
                title: 'Indicator & Criteria'
              },
              {
                gridWidth: 'col-sm-12',
                priority: 0,
                displayHeader: true,
                sortable: false,
                fullSize: true,
                collapsed: false,
                collapsible: true,
                bodyDirective: 'mini-indicator-body',
                colourClasses: [
                  'txt-color-blue',
                  'txt-color-purple',
                  'txt-color-greenDark',
                  'txt-color-orange',
                  'txt-color-redLight'
                ],
                widgetArea: false
              }
            ],
            'actualaccessinfocontenttype': 'application/json',
            'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"flower_dead_16.png","value":"257","unit":"People"},"noOfInjured":{"displayName":"Number of injured","iconResource":"flower_injured_16.png","value":"409","unit":"People"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"flower_homeless_16.png","value":"129","unit":"People"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"dollar_direct_16.png","value":"4582048.34","unit":"Dollar"},"displayName":"Economic cost","iconResource":"dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"dollar_indirect_16.png","value":"830923892.47","unit":"Dollar"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"dollar_restoration_16.png","value":"892930184.91","unit":"Dollar"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"home_lost_16.png","value":"49","unit":"Buildings"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"home_unsafe_16.png","value":"152","unit":"Buildings"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"road_damaged_16.png","value":"34","unit":"Roadsegments"},"displayName":"Damaged Infrastructure","iconResource":"road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"money_total_evac_16.png","value":"3494023211.23","unit":"Dollar"}}}',
            'categories': [{
                '$self': '/CRISMA.categories/2',
                'id': 2,
                'key': 'Indicators',
                'classification': {
                  '$self': '/CRISMA.classifications/2',
                  'id': 2,
                  'key': 'ICC_DATA'
                }
              }]
          },
          {
            '$self': '/CRISMA.dataitems/3',
            'id': 3,
            'name': 'Criteria',
            'description': 'Criteria data',
            'lastmodified': new Date().toISOString(),
            'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
            'temporalcoverageto': '2010-11-20T11:55:00.000Z',
            'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
            'datadescriptor': {
              '$self': '/CRISMA.datadescriptors/1',
              'id': 1,
              'name': 'icc_slot',
              'description': 'Dataslot for icc data',
              'categories': [{
                  '$self': '/CRISMA.categories/3',
                  'id': 3,
                  'key': 'ICC_DATA',
                  'classification': {
                    '$self': '/CRISMA.classifications/2',
                    'id': 2,
                    'key': 'ICC_DATA'
                  }
                }],
              'defaultaccessinfocontenttype': 'application/json',
              'defaultaccessinfo': null
            },
            renderingdescriptor: [{
                gridWidth: 'col-sm-12',
                priority: 1,
                displayHeader: true,
                sortable: false,
                fullSize: true,
                collapsed: false,
                collapsible: true,
                bodyDirective: 'icc-data-body',
                headerDirective: 'icc-data-header',
                colourClasses: [
                  'panel-purple',
                  'panel-orange',
                  'panel-greenLight',
                  'panel-blue',
                  'panel-redLight'
                ],
                mergeId: 'iccIndicatorCriteriaWidget',
                title: 'Indicator & Criteria'
              }],
            'actualaccessinfocontenttype': 'application/json',
            'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"flower_dead_16.png","value":"15","unit":"Percent"},"noOfInjured":{"displayName":"Number of injured","iconResource":"flower_injured_16.png","value":"80","unit":"Percent"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"flower_homeless_16.png","value":"5","unit":"Percent"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"dollar_direct_16.png","value":"90","unit":"Percent"},"displayName":"Economic cost","iconResource":"dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"dollar_indirect_16.png","value":"50","unit":"Percent"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"dollar_restoration_16.png","value":"34","unit":"Percent"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"home_lost_16.png","value":"49","unit":"Percent"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"home_unsafe_16.png","value":"29","unit":"Percent"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"road_damaged_16.png","value":"34","unit":"Percent"},"displayName":"Damaged Infrastructure","iconResource":"road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"money_total_evac_16.png","value":"80","unit":"Percent"}}}',
            'categories': [{
                '$self': '/CRISMA.categories/6',
                'id': 6,
                'key': 'Criteria',
                'classification': {
                  '$self': '/CRISMA.classifications/2',
                  'id': 2,
                  'key': 'ICC_DATA'
                }
              }]
          }
        ];
    ws = [{
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
            'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
            'categories': [
                {
                    '$self': '/CRISMA.categories/1',
                    'id': 1,
                    'key': 'Exercise',
                    'classification': {
                        '$self': '/CRISMA.classifications/1',
                        'id': 1,
                        'key': 'CAPTURE'
                    }
                }
            ],
            'creator': 'mscholl',
            'created': new Date().toISOString(),
            'origintransition': null,
            'worldstatedata': [
                {
                    '$self': '/CRISMA.dataitems/1',
                    'id': 1,
                    'name': 'Exercise Data',
                    'description': 'Data relevant for the exercise',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/2',
                        'id': 2,
                        'name': 'exercise_slot',
                        'description': 'Dataslot for exercise data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/4',
                                'id': 4,
                                'key': 'capture_data',
                                'classification': {
                                    '$self': '/CRISMA.classifications/1',
                                    'id': 1,
                                    'key': 'CAPTURE'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                        'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                    },
                    'actualaccessinfocontenttype': 'text/plain',
                    'actualaccessinfo': '1',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/5',
                            'id': 5,
                            'key': 'exercise_data',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ]
                }
            ],
            'iccdata': iccData,
            'childworldstates': []
        }];

    ws2 = [{
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
            'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
            'categories': [
                {
                    '$self': '/CRISMA.categories/1',
                    'id': 1,
                    'key': 'Exercise',
                    'classification': {
                        '$self': '/CRISMA.classifications/1',
                        'id': 1,
                        'key': 'CAPTURE'
                    }
                }
            ],
            'creator': 'mscholl',
            'created': new Date().toISOString(),
            'origintransition': null,
            'worldstatedata': [
                {
                    '$self': '/CRISMA.dataitems/1',
                    'id': 1,
                    'name': 'Exercise Data',
                    'description': 'Data relevant for the exercise',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/2',
                        'id': 2,
                        'name': 'exercise_slot',
                        'description': 'Dataslot for exercise data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/4',
                                'id': 4,
                                'key': 'capture_data',
                                'classification': {
                                    '$self': '/CRISMA.classifications/1',
                                    'id': 1,
                                    'key': 'CAPTURE'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                        'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                    },
                    'actualaccessinfocontenttype': 'text/plain',
                    'actualaccessinfo': '1',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/5',
                            'id': 5,
                            'key': 'exercise_data',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ]
                }
            ],
            'iccdata': iccData,
            'childworldstates': []
        }, {
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
            'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
            'categories': [
                {
                    '$self': '/CRISMA.categories/1',
                    'id': 1,
                    'key': 'Exercise',
                    'classification': {
                        '$self': '/CRISMA.classifications/1',
                        'id': 1,
                        'key': 'CAPTURE'
                    }
                }
            ],
            'creator': 'mscholl',
            'created': new Date().toISOString(),
            'origintransition': null,
            'worldstatedata': [
                {
                    '$self': '/CRISMA.dataitems/1',
                    'id': 1,
                    'name': 'Exercise Data',
                    'description': 'Data relevant for the exercise',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/2',
                        'id': 2,
                        'name': 'exercise_slot',
                        'description': 'Dataslot for exercise data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/4',
                                'id': 4,
                                'key': 'capture_data',
                                'classification': {
                                    '$self': '/CRISMA.classifications/1',
                                    'id': 1,
                                    'key': 'CAPTURE'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                        'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                    },
                    'actualaccessinfocontenttype': 'text/plain',
                    'actualaccessinfo': '1',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/5',
                            'id': 5,
                            'key': 'exercise_data',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ]
                }
            ],
            'iccdata': iccData,
            'childworldstates': []
        }, {
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
            'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
            'categories': [
                {
                    '$self': '/CRISMA.categories/1',
                    'id': 1,
                    'key': 'Exercise',
                    'classification': {
                        '$self': '/CRISMA.classifications/1',
                        'id': 1,
                        'key': 'CAPTURE'
                    }
                }
            ],
            'creator': 'mscholl',
            'created': new Date().toISOString(),
            'origintransition': null,
            'worldstatedata': [
                {
                    '$self': '/CRISMA.dataitems/1',
                    'id': 1,
                    'name': 'Exercise Data',
                    'description': 'Data relevant for the exercise',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/2',
                        'id': 2,
                        'name': 'exercise_slot',
                        'description': 'Dataslot for exercise data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/4',
                                'id': 4,
                                'key': 'capture_data',
                                'classification': {
                                    '$self': '/CRISMA.classifications/1',
                                    'id': 1,
                                    'key': 'CAPTURE'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                        'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                    },
                    'actualaccessinfocontenttype': 'text/plain',
                    'actualaccessinfo': '1',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/5',
                            'id': 5,
                            'key': 'exercise_data',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ]
                }
            ],
            'iccdata': iccData,
            'childworldstates': []
        }];

    criteriaFunction = {
        name: "default",
        criteriaFunctions: [{
                indicator: 'Number of dead',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Number of injured',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Number of homeless',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Direct damage cost',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Indirect damage cost',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Direct restoration cost',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Lost buildings',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Unsafe buildings',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Number of damaged road segments',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Total evacuationcost',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }, {
                indicator: 'Number of dead',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            }
        ]
    };

    describe('CriteriaRadarChart Directive Tests', function () {
        var $compile, $rootScope, critCalcService, $controller, WorldstateService;
        function compare (a, b) {
            if (a.axis < b.axis)
                return -1;
            if (a.axis > b.axis)
                return 1;
            return 0;
        }

        // Load the myApp module, which contains the directive
        beforeEach(function () {
            // we mock the constants necessary for the Worldstates Service
            module(function ($provide) {
                $provide.constant('CRISMA_DOMAIN', 'CRISMA');
                $provide.constant('CRISMA_ICMM_API', 'http://localhost:8890');
            });
            module('de.cismet.crisma.ICMM.Worldstates');
            
            module('eu.myclimateservice.csis.scenario-analysis.directives',function($provide){
              var CriteriaCalculationMock = {
                  calculateCriteria : function(){
                      return 100;
                  }
              };  
              $provide.value('eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',CriteriaCalculationMock);
            });

        });

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(
            [
                '$compile',
                '$rootScope',
                'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
                function (compile, rootScope, criteriaService) {
                    $compile = compile;
                    $rootScope = rootScope;
                    critCalcService = criteriaService;
                }
            ]
            ));

        beforeEach(inject(
            [
                '$controller',
                'de.cismet.crisma.ICMM.Worldstates',
                function (c, wsService) {
                    $controller = c;
                    WorldstateService = wsService;
                }
            ]
            ));


        it('contains at least an svg element if correct data is provided', function () {
            var scope = $rootScope.$new();
            scope.worldstates = ws;
            scope.criteriaFunction = criteriaFunction;

            // Compile a piece of HTML containing the directive
            var element = $compile(angular.element('<div class="col-lg-6" criteria-radar worldstates="worldstates" criteria-function="criteriaFunction">'))(scope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain('<svg');
        });

        it('calculates correct chart data for a single worldstate', function () {
            var scope, chartModelRef, chartModel,
                dataVector, wsDataRef, wsData;
            var scope = $rootScope.$new();
            scope.criteriaFunction = criteriaFunction;

            chartModelRef = [[{
                        axis: 'Number of dead',
                        tooltip: 'Number of dead',
                        value: 100
                    }, {
                        axis: 'Total evacuationcost',
                        tooltip: 'Total evacuationcost',
                        value: 100
                    }, {
                        axis: 'Number of damaged road segments',
                        tooltip: 'Number of damaged road segments',
                        value: 100
                    }, {
                        axis: 'Unsafe buildings',
                        tooltip: 'Unsafe buildings',
                        value: 100
                    }, {
                        axis: 'Lost buildings',
                        tooltip: 'Lost buildings',
                        value: 100
                    }, , {
                        axis: 'Direct restoration cost',
                        tooltip: 'Direct restoration cost',
                        value: 100
                    }, {
                        axis: 'Indirect damage cost',
                        tooltip: 'Indirect damage cost',
                        value: 100
                    }, {
                        axis: 'Direct damage cost',
                        tooltip: 'Direct damage cost',
                        value: 100
                    }, {
                        axis: 'Number of homeless',
                        tooltip: 'Number of homeless',
                        value: 100
                    }, {
                        axis: 'Number of injured',
                        tooltip: 'Number of injured',
                        value: 100
                    }].sort(compare)];

            $controller('eu.myclimateservice.csis.scenario-analysis.controllers.CriteriaRadarChartDirectiveController', {
                $scope: scope,
                ccs: critCalcService
            });

            dataVector = WorldstateService.utils.stripIccData(ws, true);
            chartModel = scope.convertToChartDataStructure(dataVector)[0];
            expect(chartModelRef.length).toEqual(chartModel.length);
            for (var i = 0; i < chartModel.length; i++) {
                wsDataRef = chartModelRef[i];
                wsData = chartModel[i].sort(compare);
                for (var j = 0; j < wsDataRef.length; j++) {
                    expect(wsDataRef[j]).toEqual(wsData[j]);
                }
            }
        });

        it('calculates correct chart data for a set of worldstates', function () {
            var scope, chartModelRef, chartModel,
                iccData, wsDataRef, wsData;
            var scope = $rootScope.$new();
            scope.criteriaFunction = criteriaFunction;
            chartModelRef = [{
                        axis: 'Number of dead',
                        tooltip: 'Number of dead',
                        value: 100
                    }, {
                        axis: 'Total evacuationcost',
                        tooltip: 'Total evacuationcost',
                        value: 100
                    }, {
                        axis: 'Number of damaged road segments',
                        tooltip: 'Number of damaged road segments',
                        value: 100
                    }, {
                        axis: 'Unsafe buildings',
                        tooltip: 'Unsafe buildings',
                        value: 100
                    }, {
                        axis: 'Lost buildings',
                        tooltip: 'Lost buildings',
                        value: 100
                    }, , {
                        axis: 'Direct restoration cost',
                        tooltip: 'Direct restoration cost',
                        value: 100
                    }, {
                        axis: 'Indirect damage cost',
                        tooltip: 'Indirect damage cost',
                        value: 100
                    }, {
                        axis: 'Direct damage cost',
                        tooltip: 'Direct damage cost',
                        value: 100
                    }, {
                        axis: 'Number of homeless',
                        tooltip: 'Number of homeless',
                        value: 100
                    }, {
                        axis: 'Number of injured',
                        tooltip: 'Number of injured',
                        value: 100
                    }].sort(compare);

            chartModelRef = [chartModelRef, chartModelRef, chartModelRef];

            $controller('eu.myclimateservice.csis.scenario-analysis.controllers.CriteriaRadarChartDirectiveController', {
                $scope: scope,
                ccs: critCalcService
            });

            iccData = WorldstateService.utils.stripIccData(ws2, true);
            chartModel = scope.convertToChartDataStructure(iccData)[0];
            expect(chartModelRef.length).toEqual(chartModel.length);
            for (var i = 0; i < chartModel.length; i++) {
                wsDataRef = chartModelRef[i];
                wsData = chartModel[i].sort(compare);
                for (var j = 0; j < wsDataRef.length; j++) {
                    expect(wsDataRef[j]).toEqual(wsData[j]);
                }
            }
        });

    });

});