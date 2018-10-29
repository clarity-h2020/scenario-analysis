describe('Indicator Bar Chart Test Suite', function () {
    'use strict';
    var ws, ws2;
    //our test objects..
    ws = [{
            "$self": "/CRISMA.worldstates/60",
            "id": 60,
            "name": "L'Aquila (M=7 +BR -PC) 2",
            "description": "<html><p>This worldstate contains data of the impact of a moderate earthquake in the L'Aquila region with applied building resistance improvement and people congestion reduction mitigation.</p></html>",
            "categories": [
                {
                    "$self": "/CRISMA.categories/26",
                    "id": 26,
                    "key": "Simulation dataset",
                    "classification": {
                        "$self": "/CRISMA.classifications/5",
                        "id": 5,
                        "key": "COMMON_INFO"
                    }
                }
            ],
            "creator": "mscholl",
            "created": 1373979942551,
            "origintransition": {
                "$self": "/CRISMA.transitions/53",
                "id": 53,
                "name": "New root action",
                "description": "This worldstate was created by the \"New root\" action.",
                "transitionstatuscontenttype": "application/json",
                "transitionstatus": "{\"status\":\"finished\"}",
                "performedmanipulations": []
            },
            "worldstatedata": [
                {
                    "$self": "/CRISMA.dataitems/199",
                    "id": 199,
                    "name": "contour_dem_25",
                    "description": "Contour lines from study zone DEM 25m",
                    "lastmodified": 1375962833302,
                    "temporalcoveragefrom": 1375962833302,
                    "temporalcoverageto": 1375962833302,
                    "spatialcoverage": {
                        "$self": "/CRISMA.geom/3",
                        "id": 3,
                        "geo_field": "POLYGON ((13.001769184558139 41.94309595023041, 13.001769184558139 42.66818236687727, 13.874479230931126 42.66818236687727, 13.874479230931126 41.94309595023041, 13.001769184558139 41.94309595023041))"
                    }}],
            "iccdata": [{
                    "$self": "/CRISMA.dataitems/216",
                    "id": 216,
                    "name": "L'Aquila (M=7 Law=Blake) ICC Data",
                    "description": "L'Aquila Earthquake ICC data",
                    "lastmodified": 1378138833511,
                    "temporalcoveragefrom": 1378138833511,
                    "temporalcoverageto": 1378138833511,
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/1',
                        'id': 1,
                        'name': 'icc_slot',
                        'description': 'Dataslot for icc data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/3',
                                'id': 3,
                                'key': 'ICC_DATA',
                                'classification': {
                                    '$self': '/CRISMA.classifications/2',
                                    'id': 2,
                                    'key': 'ICC_DATA'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/json',
                        'defaultaccessinfo': null
                    },
                    "actualaccessinfocontenttype": "application/json",
                    "actualaccessinfo": "{\n  \"casualties\": {\n    \"displayName\": \"Casualties\", \n    \"iconResource\": \"images/flower_16.png\", \n    \"noOfDead\": {\n      \"displayName\": \"Number of dead\", \n      \"iconResource\": \"images/flower_dead_16.png\", \n      \"value\": \"1\",     \"unit\":\"People\"\n    }, \n    \"noOfInjured\": {\n      \"displayName\": \"Number of injured\", \n      \"iconResource\": \"images/flower_injured_16.png\", \n      \"value\": \"54\",     \"unit\":\"People\"\n    }, \n    \"noOfHomeless\": {\n      \"displayName\": \"Number of homeless\", \n      \"iconResource\": \"images/flower_homeless_16.png\", \n      \"value\": \"8434\",     \"unit\":\"People\"\n    }\n  }, \n  \"cost\": {\n    \"directDamageCost\": {\n      \"displayName\": \"Direct damage cost\", \n      \"iconResource\": \"images/Euro_direct_16.png\", \n      \"value\": \"22547532\",     \"unit\":\"Euro\"\n    }, \n    \"displayName\": \"Economic cost\", \n    \"iconResource\": \"images/Euro_16.png\", \n    \"indirectDamageCost\": {\n      \"displayName\": \"Indirect damage cost\", \n      \"iconResource\": \"images/Euro_indirect_16.png\", \n      \"value\": \"43753689\",     \"unit\":\"Euro\"\n    }, \n    \"restorationCost\": {\n      \"displayName\": \"Direct restoration cost\", \n      \"iconResource\": \"images/Euro_restoration_16.png\", \n      \"value\": \"83657772\",     \"unit\":\"Euro\"\n    }\n  }, \n  \"damagedBuildings\": {\n    \"displayName\": \"Damaged buildings\", \n    \"iconResource\": \"images/home_16.png\", \n    \"lostBuildings\": {\n      \"displayName\": \"Lost buildings\", \n      \"iconResource\": \"images/home_lost_16.png\", \n      \"value\": \"178\",     \"unit\":\"Buildings\"\n    }, \n    \"unsafeBuildings\": {\n      \"displayName\": \"Unsafe buildings\", \n      \"iconResource\": \"images/home_unsafe_16.png\", \n      \"value\": \"449\",     \"unit\":\"Buildings\"\n    }\n  }, \n  \"damagedInfrastructure\": {\n    \"damagedRoadSegments\": {\n      \"displayName\": \"Number of damaged road segments\", \n      \"iconResource\": \"images/road_damaged_16.png\", \n      \"value\": \"1287\",     \"unit\":\"Road seqments\"\n    }, \n    \"displayName\": \"Damaged Infrastructure\", \n    \"iconResource\": \"images/road_16.png\"\n  }, \n  \"evacuationCost\": {\n    \"displayName\": \"Evacuation cost\", \n    \"iconResource\": \"images/money_evac_16.png\", \n    \"totalEvacuationCost\": {\n      \"displayName\": \"Total evacuation cost\", \n      \"iconResource\": \"images/money_total_evac_16.png\", \n      \"value\": \"25067094\",     \"unit\":\"Euro\"\n    }\n  }\n}",
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/2',
                            'id': 2,
                            'key': 'Indicators',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }],
            "childworldstates": []
        }];
    ws2 = [{
            "$self": "/CRISMA.worldstates/60",
            "id": 60,
            "name": "L'Aquila (M=7 +BR -PC) 2",
            "description": "<html><p>This worldstate contains data of the impact of a moderate earthquake in the L'Aquila region with applied building resistance improvement and people congestion reduction mitigation.</p></html>",
            "categories": [
                {
                    "$self": "/CRISMA.categories/26",
                    "id": 26,
                    "key": "Simulation dataset",
                    "classification": {
                        "$self": "/CRISMA.classifications/5",
                        "id": 5,
                        "key": "COMMON_INFO"
                    }
                }
            ],
            "creator": "mscholl",
            "created": 1373979942551,
            "origintransition": {
                "$self": "/CRISMA.transitions/53",
                "id": 53,
                "name": "New root action",
                "description": "This worldstate was created by the \"New root\" action.",
                "transitionstatuscontenttype": "application/json",
                "transitionstatus": "{\"status\":\"finished\"}",
                "performedmanipulations": []
            },
            "worldstatedata": [
                {
                    "$self": "/CRISMA.dataitems/199",
                    "id": 199,
                    "name": "contour_dem_25",
                    "description": "Contour lines from study zone DEM 25m",
                    "lastmodified": 1375962833302,
                    "temporalcoveragefrom": 1375962833302,
                    "temporalcoverageto": 1375962833302,
                    "spatialcoverage": {
                        "$self": "/CRISMA.geom/3",
                        "id": 3,
                        "geo_field": "POLYGON ((13.001769184558139 41.94309595023041, 13.001769184558139 42.66818236687727, 13.874479230931126 42.66818236687727, 13.874479230931126 41.94309595023041, 13.001769184558139 41.94309595023041))"
                    }}],
            "iccdata": [{
                    "$self": "/CRISMA.dataitems/216",
                    "id": 216,
                    "name": "L'Aquila (M=7 Law=Blake) ICC Data",
                    "description": "L'Aquila Earthquake ICC data",
                    "lastmodified": 1378138833511,
                    "temporalcoveragefrom": 1378138833511,
                    "temporalcoverageto": 1378138833511,
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/1',
                        'id': 1,
                        'name': 'icc_slot',
                        'description': 'Dataslot for icc data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/3',
                                'id': 3,
                                'key': 'ICC_DATA',
                                'classification': {
                                    '$self': '/CRISMA.classifications/2',
                                    'id': 2,
                                    'key': 'ICC_DATA'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/json',
                        'defaultaccessinfo': null
                    },
                    "actualaccessinfocontenttype": "application/json",
                    "actualaccessinfo": "{\n  \"casualties\": {\n    \"displayName\": \"Casualties\", \n    \"iconResource\": \"images/flower_16.png\", \n    \"noOfDead\": {\n      \"displayName\": \"Number of dead\", \n      \"iconResource\": \"images/flower_dead_16.png\", \n      \"value\": \"1\",     \"unit\":\"People\"\n    }, \n    \"noOfInjured\": {\n      \"displayName\": \"Number of injured\", \n      \"iconResource\": \"images/flower_injured_16.png\", \n      \"value\": \"54\",     \"unit\":\"People\"\n    }, \n    \"noOfHomeless\": {\n      \"displayName\": \"Number of homeless\", \n      \"iconResource\": \"images/flower_homeless_16.png\", \n      \"value\": \"8434\",     \"unit\":\"People\"\n    }\n  }, \n  \"cost\": {\n    \"directDamageCost\": {\n      \"displayName\": \"Direct damage cost\", \n      \"iconResource\": \"images/Euro_direct_16.png\", \n      \"value\": \"22547532\",     \"unit\":\"Euro\"\n    }, \n    \"displayName\": \"Economic cost\", \n    \"iconResource\": \"images/Euro_16.png\", \n    \"indirectDamageCost\": {\n      \"displayName\": \"Indirect damage cost\", \n      \"iconResource\": \"images/Euro_indirect_16.png\", \n      \"value\": \"43753689\",     \"unit\":\"Euro\"\n    }, \n    \"restorationCost\": {\n      \"displayName\": \"Direct restoration cost\", \n      \"iconResource\": \"images/Euro_restoration_16.png\", \n      \"value\": \"83657772\",     \"unit\":\"Euro\"\n    }\n  }, \n  \"damagedBuildings\": {\n    \"displayName\": \"Damaged buildings\", \n    \"iconResource\": \"images/home_16.png\", \n    \"lostBuildings\": {\n      \"displayName\": \"Lost buildings\", \n      \"iconResource\": \"images/home_lost_16.png\", \n      \"value\": \"178\",     \"unit\":\"Buildings\"\n    }, \n    \"unsafeBuildings\": {\n      \"displayName\": \"Unsafe buildings\", \n      \"iconResource\": \"images/home_unsafe_16.png\", \n      \"value\": \"449\",     \"unit\":\"Buildings\"\n    }\n  }, \n  \"damagedInfrastructure\": {\n    \"damagedRoadSegments\": {\n      \"displayName\": \"Number of damaged road segments\", \n      \"iconResource\": \"images/road_damaged_16.png\", \n      \"value\": \"1287\",     \"unit\":\"Road seqments\"\n    }, \n    \"displayName\": \"Damaged Infrastructure\", \n    \"iconResource\": \"images/road_16.png\"\n  }, \n  \"evacuationCost\": {\n    \"displayName\": \"Evacuation cost\", \n    \"iconResource\": \"images/money_evac_16.png\", \n    \"totalEvacuationCost\": {\n      \"displayName\": \"Total evacuation cost\", \n      \"iconResource\": \"images/money_total_evac_16.png\", \n      \"value\": \"25067094\",     \"unit\":\"Euro\"\n    }\n  }\n}",
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/2',
                            'id': 2,
                            'key': 'Indicators',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }],
            "childworldstates": []
        },{
            "$self": "/CRISMA.worldstates/55",
            "id": 55,
            "name": "L'Aquila (M=7)ff",
            "description": "<html><p>This worldstate contains data of a moderate earthquake in the L'Aquila region. Moreover, building resistance and population densitiy data is available.</p></html>",
            "categories": [
                {
                    "$self": "/CRISMA.categories/25",
                    "id": 25,
                    "key": "Initial dataset",
                    "classification": {
                        "$self": "/CRISMA.classifications/5",
                        "id": 5,
                        "key": "COMMON_INFO"
                    }
                }
            ],
            "creator": "mscholl",
            "created": 1379487573551,
            "origintransition": {
                "$self": "/CRISMA.transitions/51",
                "id": 51,
                "name": "Initial transition",
                "description": "This worldstate was created manually by an expert user.",
                "transitionstatuscontenttype": "application/json",
                "transitionstatus": "{\"status\":\"finished\"}",
                "performedmanipulations": []
            },
            "worldstatedata": [],
            "iccdata": [{
                "$self": "/CRISMA.dataitems/98",
                "id": 98,
                "name": "L'Aquila (M=7 Law=Blake) ICC Data",
                "description": "L'Aquila Earthquake ICC data",
                "lastmodified": 1378138833511,
                "temporalcoveragefrom": 1378138833511,
                "temporalcoverageto": 1378138833511,
                "datadescriptor": {
                    "$self": "/CRISMA.datadescriptors/25",
                    "id": 25,
                    "name": "ICC Data Vector descriptor",
                    "description": "ICC Data Vector descriptor",
                    "categories": [
                        {
                            "$ref": "/CRISMA.categories/18"
                        }
                    ],
                    "defaultaccessinfocontenttype": "application/json",
                    "defaultaccessinfo": "null"
                },
                "actualaccessinfocontenttype": "application/json",
                "actualaccessinfo": "{\n  \"casualties\": {\n    \"displayName\": \"Casualties\", \n    \"iconResource\": \"images/flower_16.png\", \n    \"noOfDead\": {\n      \"displayName\": \"Number of dead\", \n      \"iconResource\": \"images/flower_dead_16.png\", \n      \"value\": \"257\",     \"unit\":\"People\"\n    }, \n    \"noOfInjured\": {\n      \"displayName\": \"Number of injured\", \n      \"iconResource\": \"images/flower_injured_16.png\", \n      \"value\": \"409\",     \"unit\":\"People\"\n    }, \n    \"noOfHomeless\": {\n      \"displayName\": \"Number of homeless\", \n      \"iconResource\": \"images/flower_homeless_16.png\", \n      \"value\": \"129\",     \"unit\":\"People\"\n    }\n  }, \n  \"cost\": {\n    \"directDamageCost\": {\n      \"displayName\": \"Direct damage cost\", \n      \"iconResource\": \"images/Euro_direct_16.png\", \n      \"value\": \"4582148.34\",     \"unit\":\"Euro\"\n    }, \n    \"displayName\": \"Economic cost\", \n    \"iconResource\": \"images/Euro_16.png\", \n    \"indirectDamageCost\": {\n      \"displayName\": \"Indirect damage cost\", \n      \"iconResource\": \"images/Euro_indirect_16.png\", \n      \"value\": \"830923892.47\",     \"unit\":\"Euro\"\n    }, \n    \"restorationCost\": {\n      \"displayName\": \"Direct restoration cost\", \n      \"iconResource\": \"images/Euro_restoration_16.png\", \n      \"value\": \"892930184.91\",     \"unit\":\"Euro\"\n    }\n  }, \n  \"damagedBuildings\": {\n    \"displayName\": \"Damaged buildings\", \n    \"iconResource\": \"images/home_16.png\", \n    \"lostBuildings\": {\n      \"displayName\": \"Lost buildings\", \n      \"iconResource\": \"images/home_lost_16.png\", \n      \"value\": \"49\",     \"unit\":\"Buildings\"\n    }, \n    \"unsafeBuildings\": {\n      \"displayName\": \"Unsafe buildings\", \n      \"iconResource\": \"images/home_unsafe_16.png\", \n      \"value\": \"152\",     \"unit\":\"Buildings\"\n    }\n  }, \n  \"damagedInfrastructure\": {\n    \"damagedRoadSegments\": {\n      \"displayName\": \"Number of damaged road segments\", \n      \"iconResource\": \"images/road_damaged_16.png\", \n      \"value\": \"34\",     \"unit\":\"Road seqments\"\n    }, \n    \"displayName\": \"Damaged Infrastructure\", \n    \"iconResource\": \"images/road_16.png\"\n  }, \n  \"evacuationCost\": {\n    \"displayName\": \"Evacuation cost\", \n    \"iconResource\": \"images/money_evac_16.png\", \n    \"totalEvacuationCost\": {\n      \"displayName\": \"Total evacuation cost\", \n      \"iconResource\": \"images/money_total_evac_16.png\", \n      \"value\": \"3494023211.23\",     \"unit\":\"Euro\"\n    }\n  }\n}",
                'categories': [
                    {
                        '$self': '/CRISMA.categories/2',
                        'id': 2,
                        'key': 'Indicators',
                        'classification': {
                            '$self': '/CRISMA.classifications/2',
                            'id': 2,
                            'key': 'ICC_DATA'
                        }
                    }
                ]
            }],
            "childworldstates": [
            ]
        }
    ];

    describe('Controller Tests', function () {
        var WorldstateService, controller, scope, filter, tableParams, critCalcService, analysisService, ngDialog;
        // load the controller's module
        beforeEach(function () {
            // we mock the constants necessary for the Worldstates Service
            module(function ($provide) {
                $provide.constant('CRISMA_DOMAIN', 'CRISMA');
                $provide.constant('CRISMA_ICMM_API', 'http://localhost:8890');
            });
            module('de.cismet.crisma.ICMM.Worldstates');
            module('eu.myclimateservice.csis.scenario-analysis.controllers');
            module('eu.myclimateservice.csis.scenario-analysis.services');
        });
        beforeEach(inject(
            [
                '$controller',
                '$rootScope',
                '$filter',
                'de.cismet.crisma.ICMM.Worldstates',
                function (c, r, f, wsService) {
                    scope = r.$new();
                    controller = c;
                    WorldstateService = wsService;
                    filter = f;
                }
            ]
            ));

        it('builds correct chart model for one worldstate', function () {
            var chartModels;
            scope.worldstates = ws;
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.indicatorBarChartDirectiveController',
                {
                    $scope: scope,
                    WorldstateService: WorldstateService,
                    $ilter: filter,
                }
            );
            scope.$digest();

            chartModels = [
                [{
                        key: 'Number of dead',
                        forceY: [0, 0],
                        values: [['L\'Aquila (M=7 +BR -PC) 2', 1]]
                    }
                ], [
                    {
                        key: 'Number of injured',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 54]
                        ]
                    }
                ], [
                    {
                        key: 'Number of homeless',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 8434]
                        ]
                    }
                ], [
                    {
                        key: 'Direct damage cost',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 22547532]
                        ]
                    }
                ], [
                    {
                        key: 'Indirect damage cost',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 43753689]
                        ]
                    }
                ], [
                    {
                        key: 'Direct restoration cost',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 83657772]
                        ]
                    }
                ], [
                    {
                        key: 'Lost buildings',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 178]
                        ]
                    }
                ], [
                    {
                        key: 'Unsafe buildings',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 449]
                        ]
                    }
                ], [
                    {
                        key: 'Number of damaged road segments',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 1287]
                        ]
                    }
                ], [
                    {
                        key: 'Total evacuation cost',
                        forceY: [0, 0],
                        values: [
                            ['L\'Aquila (M=7 +BR -PC) 2', 25067094]
                        ]
                    }
                ]
            ];
            expect(scope.chartModels).toEqual(chartModels);
        });

        it('builds correct chart model for multiple worldstate', function () {
            var chartModels;
            scope.worldstates = ws2;
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.indicatorBarChartDirectiveController',
                {
                    $scope: scope,
                    WorldstateService: WorldstateService,
                    $ilter: filter,
                }
            );
            scope.$digest();

            chartModels =
                [[{
                            key: 'Number of dead',
                            forceY: [0, 0],
                            values: [
                                ['L\'Aquila (M=7 +BR -PC) 2', 1],
                                ['L\'Aquila (M=7)ff', 257]
                            ]
                        }],
                    [{
                            key: 'Number of injured',
                            forceY:
                                [0, 0],
                            values:
                                [
                                    ['L\'Aquila (M=7 +BR -PC) 2', 54]
                                        ,
                                    ['L\'Aquila (M=7)ff', 409]
                                ]
                        }]
                        ,
                    [{
                            key: 'Number of homeless',
                            forceY:
                                [0, 0],
                            values:
                                [
                                    ['L\'Aquila (M=7 +BR -PC) 2', 8434]
                                        ,
                                    ['L\'Aquila (M=7)ff', 129]
                                ]
                        }]
                        ,
                    [{
                            key: 'Direct damage cost',
                            forceY:
                                [0, 0],
                            values:
                                [
                                    ['L\'Aquila (M=7 +BR -PC) 2', 22547532]
                                        ,
                                    ['L\'Aquila (M=7)ff', 4582148]
                                ]
                        }]
                        ,
                    [{
                            key: 'Indirect damage cost',
                            forceY:
                                [0, 0],
                            values:
                                [
                                    ['L\'Aquila (M=7 +BR -PC) 2', 43753689]
                                        ,
                                    ['L\'Aquila (M=7)ff', 830923892]
                                ]
                        }]
                        ,
                    [{
                            key: 'Direct restoration cost',
                            forceY:
                                [0, 0],
                            values:
                                [
                                    ['L\'Aquila (M=7 +BR -PC) 2', 83657772]
                                        ,
                                    ['L\'Aquila (M=7)ff', 892930184]
                                ]
                        }]
                        ,
                    [{
                            key: 'Lost buildings',
                            forceY:
                                [0, 0],
                            values:
                                [
                                    ['L\'Aquila (M=7 +BR -PC) 2', 178]
                                        ,
                                    ['L\'Aquila (M=7)ff', 49]
                                ]
                        }]
                        ,
                    [{
                            key: 'Unsafe buildings',
                            forceY:
                                [0, 0],
                            values:
                                [
                                    ['L\'Aquila (M=7 +BR -PC) 2', 449]
                                        ,
                                    ['L\'Aquila (M=7)ff', 152]
                                ]
                        }]
                        ,
                    [{
                            key: 'Number of damaged road segments',
                            forceY:
                                [0, 0],
                            values:
                                [
                                    ['L\'Aquila (M=7 +BR -PC) 2', 1287]
                                        ,
                                    ['L\'Aquila (M=7)ff', 34]
                                ]
                        }]
                        ,
                    [{
                            key: 'Total evacuation cost',
                            forceY:
                                [0, 0],
                            values: [
                                ['L\'Aquila (M=7 +BR -PC) 2', 25067094],
                                ['L\'Aquila (M=7)ff', 3494023211]
                            ]
                        }]
                ];

            expect(scope.chartModels).toEqual(chartModels);

        });

    });
});
