describe('Worldstate Ranking Table Test Suite', function () {
    'use strict';
    var ws, ws2, cf, ds;
    //our test objects..
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
            'iccdata': [
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
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"flower_dead_16.png","value":"257","unit":"People"},"noOfInjured":{"displayName":"Number of injured","iconResource":"flower_injured_16.png","value":"409","unit":"People"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"flower_homeless_16.png","value":"129","unit":"People"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"dollar_direct_16.png","value":"4582048.34","unit":"Dollar"},"displayName":"Economic cost","iconResource":"dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"dollar_indirect_16.png","value":"830923892.47","unit":"Dollar"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"dollar_restoration_16.png","value":"892930184.91","unit":"Dollar"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"home_lost_16.png","value":"49","unit":"Buildings"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"home_unsafe_16.png","value":"152","unit":"Buildings"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"road_damaged_16.png","value":"34","unit":"Roadsegments"},"displayName":"Damaged Infrastructure","iconResource":"road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"money_total_evac_16.png","value":"3494023211.23","unit":"Dollar"}}}',
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
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"tobe":"done"}',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/6',
                            'id': 6,
                            'key': 'Criteria',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }
            ],
            'childworldstates': []
        }];
    ws2 = [
        {
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
            'iccdata': [
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
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"flower_dead_16.png","value":"257","unit":"People"},"noOfInjured":{"displayName":"Number of injured","iconResource":"flower_injured_16.png","value":"409","unit":"People"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"flower_homeless_16.png","value":"129","unit":"People"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"dollar_direct_16.png","value":"4582048.34","unit":"Dollar"},"displayName":"Economic cost","iconResource":"dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"dollar_indirect_16.png","value":"830923892.47","unit":"Dollar"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"dollar_restoration_16.png","value":"892930184.91","unit":"Dollar"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"home_lost_16.png","value":"49","unit":"Buildings"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"home_unsafe_16.png","value":"152","unit":"Buildings"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"road_damaged_16.png","value":"34","unit":"Roadsegments"},"displayName":"Damaged Infrastructure","iconResource":"road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"money_total_evac_16.png","value":"3494023211.23","unit":"Dollar"}}}',
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
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"tobe":"done"}',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/6',
                            'id': 6,
                            'key': 'Criteria',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }
            ],
            'childworldstates': []
        },
        {
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 2',
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
            'iccdata': [
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
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"flower_dead_16.png","value":"257","unit":"People"},"noOfInjured":{"displayName":"Number of injured","iconResource":"flower_injured_16.png","value":"409","unit":"People"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"flower_homeless_16.png","value":"129","unit":"People"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"dollar_direct_16.png","value":"4582048.34","unit":"Dollar"},"displayName":"Economic cost","iconResource":"dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"dollar_indirect_16.png","value":"830923892.47","unit":"Dollar"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"dollar_restoration_16.png","value":"892930184.91","unit":"Dollar"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"home_lost_16.png","value":"49","unit":"Buildings"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"home_unsafe_16.png","value":"152","unit":"Buildings"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"road_damaged_16.png","value":"34","unit":"Roadsegments"},"displayName":"Damaged Infrastructure","iconResource":"road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"money_total_evac_16.png","value":"3494023211.23","unit":"Dollar"}}}',
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
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"tobe":"done"}',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/6',
                            'id': 6,
                            'key': 'Criteria',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }
            ],
            'childworldstates': []
        }
    ];
    cf = {
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
            }
        ]
    };
    ds = {
        name: 'No dead no mater the cost',
        criteriaEmphases: [{
                indicator: {
                    displayName: 'Number of dead',
                    iconResource: 'flower_dead_16.png',
                    value: 1,
                    unit: 'People'
                },
                criteriaEmphasis: 100
            }, {
                indicator: {
                    displayName: 'Number of injured',
                    iconResource: 'flower_injured_16.png',
                    value: 54,
                    unit: 'People'
                },
                criteriaEmphasis: 91
            }, {
                indicator: {
                    displayName: 'Number of homeless',
                    iconResource: 'flower_homeless_16.png',
                    value: 8434,
                    unit: 'People'
                },
                criteriaEmphasis: 75
            }, {
                indicator: {
                    displayName: 'Direct damage cost',
                    iconResource: 'dollar_direct_16.png',
                    value: 22547532,
                    unit: 'Dollar'
                },
                criteriaEmphasis: 0
            }, {
                indicator: {
                    displayName: 'Indirect damage cost',
                    iconResource: 'dollar_indirect_16.png',
                    value: 43753689,
                    unit: 'Dollar'
                },
                criteriaEmphasis: 0
            }, {
                indicator: {
                    displayName: 'Direct restoration cost',
                    iconResource: 'dollar_restoration_16.png',
                    value: 83657772,
                    unit: 'Dollar'
                },
                criteriaEmphasis: 0
            }, {
                indicator: {
                    displayName: 'Lost buildings',
                    iconResource: 'home_lost_16.png',
                    value: 178,
                    unit: 'Buildings'
                },
                criteriaEmphasis: 31
            }, {
                indicator: {
                    displayName: 'Unsafe buildings',
                    iconResource: 'home_unsafe_16.png',
                    value: 449,
                    unit: 'Buildings'
                },
                criteriaEmphasis: 24
            }, {
                indicator: {
                    displayName: 'Number of damaged road segments',
                    iconResource: 'road_damaged_16.png',
                    value: 1287,
                    unit: 'Road seqments'
                },
                criteriaEmphasis: 17
            }, {
                indicator: {
                    displayName: 'Total evacuationcost',
                    iconResource: 'money_total_evac_16.png',
                    value: 25067094,
                    unit: 'Dollar'
                },
                criteriaEmphasis: 0
            }],
        satisfactionEmphasis: [0.0005955687417718765, 0.003919369989414712, 0.011799997968901054, 0.025792927056955333, 0.047307430204593395, 0.07765444132758087, 0.11807189711775551, 0.16974031233646442, 0.23379325055209618, 0.3113248047044667]
    };
    describe('WorldstateRankingTable Directive Tests', function () {
        var $compile, $rootScope;
        // Load the myApp module, which contains the directive
        beforeEach(function () {
            // we mock the constants necessary for the Worldstates Service
            module(function ($provide) {
                $provide.constant('CRISMA_DOMAIN', 'CRISMA');
                $provide.constant('CRISMA_ICMM_API', 'http://localhost:8890');
            });
            module('de.cismet.crisma.ICMM.Worldstates');
            module('ngTable');
            module('ngDialog');
            module('eu.myclimateservice.csis.scenario-analysis.directives');
            module('eu.myclimateservice.csis.scenario-analysis.services');
            module('templates/worldstateRankingTableTemplate.html','templates/rankingTableHeader.html');
        });
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
        it('replaces the element with a warn badge when no worldstate is provided ', function () {
            // Compile a piece of HTML containing the directive
            $rootScope.criteriaFunction = cf;
            $rootScope.decisionStrategy = ds;
            var element = $compile('<worldstate-ranking-table worldstates="worldstates" criteria-function="criteriaFunction" decision-strategy="decisionStrategy" show-indicators="false" show-radar-chart="false"> </worldstate-ranking-table>')($rootScope);
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain('<strong>Warning: </strong>There are no worldstates selected.');
        });
        it('replaces the element with a warn badge when no criteriaFunction is provided ', function () {
            $rootScope.worldstates = [ws];
            $rootScope.decisionStrategy = ds;
            var element = $compile('<worldstate-ranking-table worldstates="worldstates" criteria-function="criteriaFunction" decision-strategy="decisionStrategy" show-indicators="false" show-radar-chart="false"> </worldstate-ranking-table>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain('<strong>Warning: </strong>No criteria function selected.');
        });
        it('replaces the element with a warn badge when no decisionstrategy is provided ', function () {
            $rootScope.criteriaFunction = cf;
            $rootScope.worldstates = [ws];
            var element = $compile('<worldstate-ranking-table worldstates="worldstates" criteria-function="criteriaFunction" decision-strategy="decisionStrategy" show-indicators="false" show-radar-chart="false"> </worldstate-ranking-table>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain('<strong>Warning: </strong>No decision strategy selected.');
        });
        it('replaces the element with a table when worldstates, critFunc, decStrat is provided', function () {
            $rootScope.criteriaFunction = cf;
            $rootScope.worldstates = [ws];
            $rootScope.decisionStrategy = ds;
            var element = $compile('<worldstate-ranking-table worldstates="worldstates" criteria-function="criteriaFunction" decision-strategy="decisionStrategy" show-indicators="false" show-radar-chart="false"> </worldstate-ranking-table>')($rootScope);
            $rootScope.$digest();
            expect(element.html()).toContain('Rank');
            expect(element.html()).toContain('Worldstate');
            expect(element.html()).toContain('Score');
        });
        it('shows a criteria radar chart if criteria radar chart is true', function () {
            $rootScope.criteriaFunction = cf;
            $rootScope.worldstates = [ws];
            $rootScope.decisionStrategy = ds;
            $rootScope.showRadar = true;
            var element = $compile('<worldstate-ranking-table worldstates="worldstates" criteria-function="criteriaFunction" decision-strategy="decisionStrategy" show-indicators="false" show-radar-chart="showRadar"> </worldstate-ranking-table>')($rootScope);
            $rootScope.$digest();
            expect(element.html()).toContain('Criteria radar');
//            expect(element.html()).toContain('<svg');
        });
    });
    describe('IndiciatorCriteriaTable Controller Tests', function () {
        var WorldstateService, controller, scope, filter, tableParams, critCalcService, analysisService, ngDialog;
        // load the controller's module
        beforeEach(function () {
            // we mock the constants necessary for the Worldstates Service
            module(function ($provide) {
                $provide.constant('CRISMA_DOMAIN', 'CRISMA');
                $provide.constant('CRISMA_ICMM_API', 'http://localhost:8890');
            });
            module('de.cismet.crisma.ICMM.Worldstates');
            module('ngTable');
            module('eu.myclimateservice.csis.scenario-analysis.controllers');
            module('eu.myclimateservice.csis.scenario-analysis.services');
        });
        beforeEach(inject(
            [
                '$controller',
                '$rootScope',
                '$filter',
                'ngTableParams',
                'de.cismet.crisma.ICMM.Worldstates',
                'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
                'eu.myclimateservice.csis.scenario-analysis.services.AnalysisService',
                'ngDialog',
                function (c, r, f, wsService, tp, criteriaCalculator, as, dialog) {
                    scope = r.$new();
                    controller = c;
                    WorldstateService = wsService;
                    filter = f;
                    tableParams = tp;
                    critCalcService = criteriaCalculator;
                    analysisService = as;
                    ngDialog = dialog;
                }
            ]
            ));

        it('builds table data correctly with indicators / LoS values', function () {
            var columns, rows;
            scope.worldstates = [];
            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.worldstateRankingTableDirectiveController',
                {
                    $scope: scope,
                    $ilter: filter,
                    NgTableParams: tableParams,
                    WorldstateService: WorldstateService,
                    ccs: critCalcService,
                    as: analysisService,
                    dialog: ngDialog
                }
            );
            //we need to call digets to fire the watch that listens on worldstate changes
            scope.$digest();
            scope.worldstates = ws;
            scope.decisionStrategy = ds;
            scope.criteriaFunction = cf;
            scope.showIndicators = true;
            scope.$digest();
            // our example result model of the table...
            columns = [{
                    title: 'Rank',
                    field: 'rank'
                }, {
                    title: 'Worldstate',
                    field: 'worldstate'
                }, {
                    title: 'Score',
                    field: 'score'
                }, {
                    title: 'Number of dead (1)',
                    field: 'Number of dead'
                }, {
                    title: 'Number of injured (2)',
                    field: 'Number of injured'
                }, {
                    title: 'Number of homeless (3)',
                    field: 'Number of homeless'
                }, {
                    title: 'Direct damage cost (4)',
                    field: 'Direct damage cost'
                }, {
                    title: 'Indirect damage cost (5)',
                    field: 'Indirect damage cost'
                }, {
                    title: 'Direct restoration cost (6)',
                    field: 'Direct restoration cost'
                }, {
                    title: 'Lost buildings (7)',
                    field: 'Lost buildings'
                }, {
                    title: 'Unsafe buildings (8)',
                    field: 'Unsafe buildings'
                }, {
                    title: 'Number of damaged road segments (9)',
                    field: 'Number of damaged road segments'
                }, {
                    title: 'Total evacuationcost (10)',
                    field: 'Total evacuationcost'
                }];
            rows = [{
                    "rank": 1,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 1",
                    "ws": 'ws',
                    "score": "0.30 %",
                    "rawScore": 0.003005552248419059,
                    "Number of dead": {
                        "indicator": "257 People",
                        "los": "0.00 % LoS"
                    },
                    "Number of injured": {
                        "indicator": "409 People",
                        "los": "0.00 % LoS"
                    },
                    "Number of homeless": {
                        "indicator": "129 People",
                        "los": "0.00 % LoS"
                    },
                    "Direct damage cost": {
                        "indicator": "4,582,048.34 Dollar",
                        "los": "0.00 % LoS"
                    },
                    "Indirect damage cost": {
                        "indicator": "830,923,892.47 Dollar",
                        "los": "0.00 % LoS"
                    },
                    "Direct restoration cost": {
                        "indicator": "892,930,184.91 Dollar",
                        "los": "0.00 % LoS"
                    },
                    "Lost buildings": {
                        "indicator": "49 Buildings",
                        "los": "0.51 % LoS"
                    },
                    "Unsafe buildings": {
                        "indicator": "152 Buildings",
                        "los": "0.00 % LoS"
                    },
                    "Number of damaged road segments": {
                        "indicator": "34 Roadsegments",
                        "los": "0.66 % LoS"
                    },
                    "Total evacuationcost": {
                        "indicator": "3,494,023,211.23 Dollar",
                        "los": "0.00 % LoS"
                    }
                }];
            //change the worldstate object to a simple value since it is not necessary for the test
            scope.tableData[0].ws = 'ws';
            expect(scope.columns).toEqual(columns);
            expect(scope.tableData).toEqual(rows);
        });

        it('extracts indicators from a worldstate', function () {
            var ctrl, result;
            scope.worldstates = ws;
            scope.decisionStrategy = ds;
            scope.criteriaFunction = cf;
            scope.showIndicators = true;
            ctrl = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.worldstateRankingTableDirectiveController',
                {
                    $scope: scope,
                    $ilter: filter,
                    NgTableParams: tableParams,
                    WorldstateService: WorldstateService,
                    ccs: critCalcService,
                    as: analysisService,
                    dialog: ngDialog
                });

            result = [{
                    displayName: 'Number of dead',
                    iconResource: 'flower_dead_16.png',
                    value: '257',
                    unit: 'People'
                }, {
                    displayName: 'Number of injured',
                    iconResource: 'flower_injured_16.png',
                    value: '409',
                    unit: 'People'
                }, {
                    displayName: 'Number of homeless',
                    iconResource: 'flower_homeless_16.png',
                    value: '129',
                    unit: 'People'
                }, {
                    displayName: 'Direct damage cost',
                    iconResource: 'dollar_direct_16.png',
                    value: '4582048.34',
                    unit: 'Dollar'
                }, {
                    displayName: 'Indirect damage cost',
                    iconResource: 'dollar_indirect_16.png',
                    value: '830923892.47',
                    unit: 'Dollar'
                }, {
                    displayName: 'Direct restoration cost',
                    iconResource: 'dollar_restoration_16.png',
                    value: '892930184.91',
                    unit: 'Dollar'
                }, {
                    displayName: 'Lost buildings',
                    iconResource: 'home_lost_16.png',
                    value: '49',
                    unit: 'Buildings'
                }, {
                    displayName: 'Unsafe buildings',
                    iconResource: 'home_unsafe_16.png',
                    value: '152',
                    unit: 'Buildings'
                }, {
                    displayName: 'Number of damaged road segments',
                    iconResource: 'road_damaged_16.png',
                    value: '34',
                    unit: 'Roadsegments'
                }, {
                    displayName: 'Total evacuationcost',
                    iconResource: 'money_total_evac_16.png',
                    value: '3494023211.23',
                    unit: 'Dollar'
                }];
            expect(ctrl.extractIndicators(ws[0])).toEqual(result);
        });

        it('calculates a correct criteria values', function () {
            var ctrl, result;
            scope.worldstates = ws;
            scope.decisionStrategy = ds;
            scope.criteriaFunction = cf;
            scope.showIndicators = true;
            ctrl = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.worldstateRankingTableDirectiveController',
                {
                    $scope: scope,
                    $ilter: filter,
                    NgTableParams: tableParams,
                    WorldstateService: WorldstateService,
                    ccs: critCalcService,
                    as: analysisService,
                    dialog: ngDialog
                }
            );

            result = [{
                    "indicator": {
                        "displayName": "Number of dead",
                        "iconResource": "flower_dead_16.png",
                        "value": "257",
                        "unit": "People"
                    },
                    "criteria": 0
                }, {
                    "indicator": {
                        "displayName": "Number of injured",
                        "iconResource": "flower_injured_16.png",
                        "value": "409",
                        "unit": "People"
                    },
                    "criteria": 0
                }, {
                    "indicator": {
                        "displayName": "Number of homeless",
                        "iconResource": "flower_homeless_16.png",
                        "value": "129",
                        "unit": "People"
                    },
                    "criteria": 0
                }, {
                    "indicator": {
                        "displayName": "Direct damage cost",
                        "iconResource": "dollar_direct_16.png",
                        "value": "4582048.34",
                        "unit": "Dollar"
                    },
                    "criteria": 0
                }, {
                    "indicator": {
                        "displayName": "Indirect damage cost",
                        "iconResource": "dollar_indirect_16.png",
                        "value": "830923892.47",
                        "unit": "Dollar"
                    },
                    "criteria": 0
                }, {
                    "indicator": {
                        "displayName": "Direct restoration cost",
                        "iconResource": "dollar_restoration_16.png",
                        "value": "892930184.91",
                        "unit": "Dollar"
                    },
                    "criteria": 0
                }, {
                    "indicator": {
                        "displayName": "Lost buildings",
                        "iconResource": "home_lost_16.png",
                        "value": "49",
                        "unit": "Buildings"
                    },
                    "criteria": 0.51
                }, {
                    "indicator": {
                        "displayName": "Unsafe buildings",
                        "iconResource": "home_unsafe_16.png",
                        "value": "152",
                        "unit": "Buildings"
                    },
                    "criteria": 0
                }, {
                    "indicator": {
                        "displayName": "Number of damaged road segments",
                        "iconResource": "road_damaged_16.png",
                        "value": "34",
                        "unit": "Roadsegments"
                    },
                    "criteria": 0.66
                }, {
                    "indicator": {
                        "displayName": "Total evacuationcost",
                        "iconResource": "money_total_evac_16.png",
                        "value": "3494023211.23",
                        "unit": "Dollar"
                    },
                    "criteria": 0
                }];
            expect(ctrl.getCriteriaVectorForWorldstate(ws[0], cf)).toEqual(result);
        });

        it('inserts a new item with the highest score at row 1', function () {
            var ctrl, newTableItem;
            scope.worldstates = ws;
            scope.decisionStrategy = ds;
            scope.criteriaFunction = cf;
            scope.showIndicators = true;
            scope.tableData = [{
                    "rank": 1,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 1",
                    "ws": 'ws',
                    "score": "0.30 %",
                    "rawScore": 0.001005552248419059
                }, {
                    "rank": 2,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 2",
                    "ws": 'ws',
                    "score": "0.20 %",
                    "rawScore": 0.002005552248419059
                }, {
                    "rank": 3,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 3",
                    "ws": 'ws',
                    "score": "0.10 %",
                    "rawScore": 0.001005552248419059
                }];

            ctrl = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.worldstateRankingTableDirectiveController',
                {
                    $scope: scope,
                    $ilter: filter,
                    NgTableParams: tableParams,
                    WorldstateService: WorldstateService,
                    ccs: critCalcService,
                    as: analysisService,
                    dialog: ngDialog
                }
            );
            newTableItem = {
                "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 4",
                "ws": 'ws',
                "score": "100.0 %",
                "rawScore": 1
            };
            ctrl.insertAtCorrectTablePosition(scope.tableData, newTableItem);

            expect(scope.tableData[0]).toEqual({
                "rank": 1,
                "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 4",
                "ws": 'ws',
                "score": "100.0 %",
                "rawScore": 1
            });
        });

        it('inserts a new item with the lowest score at the last row', function () {
            var ctrl, newTableItem;
            scope.worldstates = ws;
            scope.decisionStrategy = ds;
            scope.criteriaFunction = cf;
            scope.showIndicators = true;
            scope.tableData = [{
                    "rank": 1,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 1",
                    "ws": 'ws',
                    "score": "0.30 %",
                    "rawScore": 0.003005552248419059
                }, {
                    "rank": 2,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 2",
                    "ws": 'ws',
                    "score": "0.20 %",
                    "rawScore": 0.002005552248419059
                }, {
                    "rank": 3,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 3",
                    "ws": 'ws',
                    "score": "0.10 %",
                    "rawScore": 0.001005552248419059
                }];


            ctrl = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.worldstateRankingTableDirectiveController',
                {
                    $scope: scope,
                    $ilter: filter,
                    NgTableParams: tableParams,
                    WorldstateService: WorldstateService,
                    ccs: critCalcService,
                    as: analysisService,
                    dialog: ngDialog
                }
            );
            newTableItem = {
                "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 4",
                "ws": 'ws',
                "score": "0.00 %",
                "rawScore": 0
            };
            ctrl.insertAtCorrectTablePosition(scope.tableData, newTableItem);

            expect(scope.tableData[3]).toEqual({
                "rank": 4,
                "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 4",
                "ws": 'ws',
                "score": "0.00 %",
                "rawScore": 0
            });
        });

        it('inserts a new item between exisisting rows', function () {
            var ctrl, newTableItem;
            scope.worldstates = ws;
            scope.decisionStrategy = ds;
            scope.criteriaFunction = cf;
            scope.showIndicators = true;

            scope.tableData = [{
                    "rank": 1,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 1",
                    "ws": 'ws',
                    "score": "0.30 %",
                    "rawScore": 0.003005552248419059
                }, {
                    "rank": 2,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 2",
                    "ws": 'ws',
                    "score": "0.20 %",
                    "rawScore": 0.002005552248419059
                }, {
                    "rank": 3,
                    "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 3",
                    "ws": 'ws',
                    "score": "0.10 %",
                    "rawScore": 0.001005552248419059
                }];


            ctrl = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.worldstateRankingTableDirectiveController',
                {
                    $scope: scope,
                    $ilter: filter,
                    NgTableParams: tableParams,
                    WorldstateService: WorldstateService,
                    ccs: critCalcService,
                    as: analysisService,
                    dialog: ngDialog
                }
            );
            newTableItem = {
                "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 4",
                "ws": 'ws',
                "score": "25.0 %",
                "rawScore": 0.002505552248419059
            };
            
            ctrl.insertAtCorrectTablePosition(scope.tableData, newTableItem);

            expect(scope.tableData[1]).toEqual({
                "rank": 2,
                "worldstate": "Ski-Weltmeisterschaften Garmisch-Partenkirchen 4",
                "ws": 'ws',
                "score": "25.0 %",
                "rawScore": 0.002505552248419059
            });
        });

    });
});