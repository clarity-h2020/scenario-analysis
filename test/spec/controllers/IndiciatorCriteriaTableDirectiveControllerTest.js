describe('IndiciatorCriteriaTableDirective Test Suite', function () {
    'use strict';
    var ws, ws2, cf;
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

    describe('IndiciatorCriteriaTable Directive Tests', function () {
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
            module('eu.myclimateservice.csis.scenario-analysis.directives');
            module('eu.myclimateservice.csis.scenario-analysis.services');
            module('templates/indicatorCriteriaTableTemplate.html', 'templates/nopager.html', 'templates/indicatorCriteriaTableHeader.html');
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

        it('Replaces the element with a warn badge when no worldstate is provided ', function () {
            // Compile a piece of HTML containing the directive
            var element = $compile('<indicator-criteria-table detail-icons="{{false}}" worldstates="worldstates" for-criteria="false"></indicator-criteria-table>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain('<strong>Warning: </strong>There are no worldstates selected.');
        });

        it('Replaces the element with a table when worldstates are provided ', function () {
            var element;
            // Compile a piece of HTML containing the directive
            $rootScope.worldstates = ws;
            $rootScope.criteriaFunction = cf;

            element = $compile('<indicator-criteria-table detail-icons="{{false}}" worldstates="worldstates" for-criteria="false" criteria-function="criteriaFunction"></indicator-criteria-table>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain("<table");
        });

        it('shows Criteria when forCriteria is true', function () {
            var element;
            // Compile a piece of HTML containing the directive
            $rootScope.worldstates = ws;
            $rootScope.forCriteria = true;
            $rootScope.criteriaFunction = cf;

            element = $compile('<indicator-criteria-table detail-icons="{{false}}" worldstates="worldstates" for-criteria="false" criteria-function="criteriaFunction"></indicator-criteria-table>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain("Criteria");
        });

        it('shows Indicators when forCriteria is false', function () {
            var element;
            // Compile a piece of HTML containing the directive
            $rootScope.worldstates = ws;
            $rootScope.forCriteria = true;
            $rootScope.criteriaFunction = cf;
            element = $compile('<indicator-criteria-table detail-icons="{{false}}" worldstates="worldstates" for-criteria="false" criteria-function="criteriaFunction"></indicator-criteria-table>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain("Indicators");
        });
    });

    describe('IndiciatorCriteriaTable Controller Tests', function () {
        var WorldstateService, controller, scope, filter, tableParams, critCalcService;

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
                'de.cismet.crisma.ICMM.Worldstates',
                'ngTableParams',
                'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
                function (c, r, f, wsService, tp, criteriaCalculator) {
                    scope = r.$new();
                    controller = c;
                    WorldstateService = wsService;
                    filter = f;
                    tableParams = tp;
                    critCalcService = criteriaCalculator;
                }
            ]
            ));


        it('tabledata_built_correctly_1', function () {
            var columns, rows;

            scope.worldstates = ws;
            scope.forCriteria = false;
            scope.criteriaFunction = cf;

            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorCriteriaTableDirectiveController',
                {
                    $scope: scope,
                    $ilter: filter,
                    WorldstateService: WorldstateService,
                    NgTableParams: tableParams,
                    ccs: critCalcService
                }
            );

            //we need to call digets to fire the watch that listens on worldstate changes
            scope.$digest();

            // our example result model of the table...
            columns = [{title: 'Indicators', field: 'f1', visible: true}, {title: 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1', field: 'f2', visible: true}];
            rows = [
                {f1: {name: 'Casualties', icon: 'flower_16.png'}, f2: null},
                {f1: {name: 'Number of dead', icon: 'flower_dead_16.png'}, f2: {name: '257 People'}},
                {f1: {name: 'Number of homeless', icon: 'flower_homeless_16.png'}, f2: {name: '129 People'}},
                {f1: {name: 'Number of injured', icon: 'flower_injured_16.png'}, f2: {name: '409 People'}},
                {f1: {name: 'Economic cost', icon: 'dollar_16.png'}, f2: null},
                {f1: {name: 'Direct damage cost', icon: 'dollar_direct_16.png'}, f2: {name: '4,582,048.34 Dollar'}},
                {f1: {name: 'Indirect damage cost', icon: 'dollar_indirect_16.png'}, f2: {name: '830,923,892.47 Dollar'}},
                {f1: {name: 'Direct restoration cost', icon: 'dollar_restoration_16.png'}, f2: {name: '892,930,184.91 Dollar'}},
                {f1: {name: 'Damaged buildings', icon: 'home_16.png'}, f2: null},
                {f1: {name: 'Lost buildings', icon: 'home_lost_16.png'}, f2: {name: '49 Buildings'}},
                {f1: {name: 'Unsafe buildings', icon: 'home_unsafe_16.png'}, f2: {name: '152 Buildings'}},
                {f1: {name: 'Damaged Infrastructure', icon: 'road_16.png'}, f2: null},
                {f1: {name: 'Number of damaged road segments', icon: 'road_damaged_16.png'}, f2: {name: '34 Roadsegments'}},
                {f1: {name: 'Evacuation cost', icon: 'money_evac_16.png'}, f2: null},
                {f1: {name: 'Total evacuationcost', icon: 'money_total_evac_16.png'}, f2: {name: '3,494,023,211.23 Dollar'}}
            ];

            expect(scope.columns).toEqual(columns);
            expect(scope.rows).toEqual(rows);
        });

        it('tabledata_built_correctly_2', function () {
            var columns, rows;

            scope.worldstates = ws2;
            scope.forCriteria = false;
            scope.criteriaFunction = cf;

            controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorCriteriaTableDirectiveController',
                {
                    $scope: scope,
                    $ilter: filter,
                    WorldstateService: WorldstateService,
                    NgTableParams: tableParams,
                    ccs: critCalcService
                }
            );

            //we need to call digest to fire the watch that listens on worldstate changes
            scope.$digest();

            columns = [
                {title: 'Indicators', field: 'f1', visible: true},
                {title: 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1', field: 'f2', visible: true},
                {title: 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 2', field: 'f3', visible: true}
            ];
            rows = [
                {f1: {name: 'Casualties', icon: 'flower_16.png'}, f2: null, f3: null},
                {f1: {name: 'Number of dead', icon: 'flower_dead_16.png'}, f2: {name: '257 People'}, f3: {name: '257 People'}},
                {f1: {name: 'Number of homeless', icon: 'flower_homeless_16.png'}, f2: {name: '129 People'}, f3: {name: '129 People'}},
                {f1: {name: 'Number of injured', icon: 'flower_injured_16.png'}, f2: {name: '409 People'}, f3: {name: '409 People'}},
                {f1: {name: 'Economic cost', icon: 'dollar_16.png'}, f2: null, f3: null},
                {f1: {name: 'Direct damage cost', icon: 'dollar_direct_16.png'}, f2: {name: '4,582,048.34 Dollar'}, f3: {name: '4,582,048.34 Dollar'}},
                {f1: {name: 'Indirect damage cost', icon: 'dollar_indirect_16.png'}, f2: {name: '830,923,892.47 Dollar'}, f3: {name: '830,923,892.47 Dollar'}},
                {f1: {name: 'Direct restoration cost', icon: 'dollar_restoration_16.png'}, f2: {name: '892,930,184.91 Dollar'}, f3: {name: '892,930,184.91 Dollar'}},
                {f1: {name: 'Damaged buildings', icon: 'home_16.png'}, f2: null, f3: null},
                {f1: {name: 'Lost buildings', icon: 'home_lost_16.png'}, f2: {name: '49 Buildings'}, f3: {name: '49 Buildings'}},
                {f1: {name: 'Unsafe buildings', icon: 'home_unsafe_16.png'}, f2: {name: '152 Buildings'}, f3: {name: '152 Buildings'}},
                {f1: {name: 'Damaged Infrastructure', icon: 'road_16.png'}, f2: null, f3: null},
                {f1: {name: 'Number of damaged road segments', icon: 'road_damaged_16.png'}, f2: {name: '34 Roadsegments'}, f3: {name: '34 Roadsegments'}},
                {f1: {name: 'Evacuation cost', icon: 'money_evac_16.png'}, f2: null, f3: null},
                {f1: {name: 'Total evacuationcost', icon: 'money_total_evac_16.png'}, f2: {name: '3,494,023,211.23 Dollar'}, f3: {name: '3,494,023,211.23 Dollar'}}
            ];
            expect(scope.columns).toEqual(columns);
            expect(scope.rows).toEqual(rows);
        });
    });

});