describe('RelationAnalysisChartDirective Test Suite', function () {
    'use strict';
    var ws, ws2,criteriaFunction;
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
                    'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"images/flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"images/flower_dead_16.png","value":"15","unit":"Percent"},"noOfInjured":{"displayName":"Number of injured","iconResource":"images/flower_injured_16.png","value":"80","unit":"Percent"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"images/flower_homeless_16.png","value":"5","unit":"Percent"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"images/dollar_direct_16.png","value":"90","unit":"Percent"},"displayName":"Economic cost","iconResource":"images/dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"images/dollar_indirect_16.png","value":"50","unit":"Percent"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"images/dollar_restoration_16.png","value":"34","unit":"Percent"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"images/home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"images/home_lost_16.png","value":"49","unit":"Percent"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"images/home_unsafe_16.png","value":"29","unit":"Percent"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"images/road_damaged_16.png","value":"34","unit":"Percent"},"displayName":"Damaged Infrastructure","iconResource":"images/road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"images/money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"images/money_total_evac_16.png","value":"80","unit":"Percent"}}}',
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
    criteriaFunction = {
        name: "default",
        criteriaFunctions: [{
                indicator:'Number of dead',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Number of injured',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Number of homeless',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Direct damage cost',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Indirect damage cost',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Direct restoration cost',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Lost buildings',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Unsafe buildings',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Number of damaged road segments',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Total evacuationcost',
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            },{
                indicator:'Number of dead',
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

    describe('RelationAnalysisChart Directive Tests', function () {
        var $compile, $rootScope, ccs;

        // Load the myApp module, which contains the directive
        beforeEach(function () {
            // we mock the constants necessary for the Worldstates Service
            module(function ($provide) {
                $provide.constant('CRISMA_DOMAIN', 'CRISMA');
                $provide.constant('CRISMA_ICMM_API', 'http://localhost:8890');
            });
            module('de.cismet.crisma.ICMM.Worldstates');
            module('eu.myclimateservice.csis.scenario-analysis.directives');
            module('templates/relationAnalysisChartTemplate.html', 'templates/indicatorCriteriaAxisChooserTemplate.html');
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
            var element = $compile('<relation-analysis-chart height="350" for-criteria="forCriteria" worldstates="worldstates"></relation-analysis-chart>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain('<div class="alert alert-warning">');
        });

        it('contains at least an svg element if correct data is provided', function () {
            var scope, controller, WorldstateService;
            inject(
                [
                    '$controller',
                    '$rootScope',
                    'de.cismet.crisma.ICMM.Worldstates',
                    'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
                    function (c, r, wsService,criteriaService) {
                        scope = r.$new();
                        controller = c;
                        WorldstateService = wsService;
                        ccs=criteriaService;
                    }
                ]
                );
            scope.worldstates = ws;
            scope.forCriteria = false;
            scope.cf=criteriaFunction;
            // Compile a piece of HTML containing the directive
            var element = $compile('<relation-analysis-chart height="350" for-criteria="forCriteria" worldstates="worldstates" criteria-function="cf"></relation-analysis-chart>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain('<svg>');
        });

    });

    describe('RelationAnalysisChart Controller Tests', function () {
        var WorldstateService, controller, scope, filter, tableParams;

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
        });

        beforeEach(inject(
            [
                '$controller',
                '$rootScope',
                'de.cismet.crisma.ICMM.Worldstates',
                function (c, r, wsService) {
                    scope = r.$new();
                    controller = c;
                    WorldstateService = wsService;
                }
            ]
            ));


        it('builds chart data for indicators correctly', function () {
            var resultModel, myController, iccData, calculatedModel,
                xAxis, yAxis;

            scope.worldstates = ws;
            scope.forCriteria = false;
            xAxis = {"name": "Number of dead", "icon": "images/flower_dead_16.png", "isGroup": false};
            yAxis = {"name": "Number of dead", "icon": "images/flower_dead_16.png", "isGroup": false};
            myController = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.RelationAnalysisChartDirectiveController',
                {
                    $scope: scope,
                    WorldstateService: WorldstateService
                }
            );

            iccData = WorldstateService.utils.stripIccData(scope.worldstates, false);
            calculatedModel = myController.createChartData(iccData, xAxis, yAxis);

            // our example result model of the table...
            resultModel = [{"key": "1. Ski-Weltmeisterschaften Garmisch-Partenkirchen 1", "values": [{"x": "257", "y": "257"}]}];

            expect(calculatedModel).toEqual(resultModel);
        });

        it('builds chart data for criteria correctly', function () {
            var resultModel, myController, iccData, calculatedModel,
                xAxis, yAxis;

            scope.worldstates = ws;
            scope.forCriteria = false;
            xAxis = {"name": "Number of dead", "icon": "images/flower_dead_16.png", "isGroup": false};
            yAxis = {"name": "Number of dead", "icon": "images/flower_dead_16.png", "isGroup": false};
            myController = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.RelationAnalysisChartDirectiveController',
                {
                    $scope: scope,
                    WorldstateService: WorldstateService
                }
            );

            iccData = WorldstateService.utils.stripIccData(scope.worldstates, true);
            calculatedModel = myController.createChartData(iccData, xAxis, yAxis);

            // our example result model of the table...
            resultModel = [{"key": "1. Ski-Weltmeisterschaften Garmisch-Partenkirchen 1", "values": [{"x": "15", "y": "15"}]}];

            expect(calculatedModel).toEqual(resultModel);
        });

        it('does not mix up the axes', function () {
            var resultModel, myController, iccData, calculatedModel,
                xAxis, yAxis;

            scope.worldstates = ws;
            scope.forCriteria = false;
            xAxis = {"name": "Number of dead", "icon": "images/flower_dead_16.png", "isGroup": false};
            yAxis = {"name": "Lost buildings", "icon": "images/flower_dead_16.png", "isGroup": false};
            myController = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.RelationAnalysisChartDirectiveController',
                {
                    $scope: scope,
                    WorldstateService: WorldstateService
                }
            );

            iccData = WorldstateService.utils.stripIccData(scope.worldstates, true);
            calculatedModel = myController.createChartData(iccData, xAxis, yAxis);

            // our example result model of the table...
            resultModel = [{"key": "1. Ski-Weltmeisterschaften Garmisch-Partenkirchen 1", "values": [{"x": "15", "y": "49"}]}];

            expect(calculatedModel).toEqual(resultModel);
        });

        it('throws an error if no iccData object is provided', function () {
            var myController, errFunc1, errFunc2, errFunc3,
                xAxis, yAxis;

            scope.worldstates = ws;
            scope.forCriteria = false;
            xAxis = {"name": "Number of dead", "icon": "images/flower_dead_16.png", "isGroup": false};
            yAxis = {"name": "Lost buildings", "icon": "images/flower_dead_16.png", "isGroup": false};
            myController = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.RelationAnalysisChartDirectiveController',
                {
                    $scope: scope,
                    WorldstateService: WorldstateService
                }
            );

            errFunc1 = function () {
                return myController.createChartData(undefined, xAxis, yAxis);
            };

            errFunc2 = function () {
                return myController.createChartData(null, xAxis, yAxis);
            };

            expect(errFunc1).toThrow();
            expect(errFunc2).toThrow();

        });
        

        it('throws an error if no axis objects are provided', function () {
            var iccData, myController, errFunc1, errFunc2, errFunc3,
                xAxis, yAxis;

            scope.worldstates = ws;
            scope.forCriteria = false;
            xAxis = {"name": "Number of dead", "icon": "images/flower_dead_16.png", "isGroup": false};
            yAxis = {"name": "Lost buildings", "icon": "images/flower_dead_16.png", "isGroup": false};
            myController = controller(
                'eu.myclimateservice.csis.scenario-analysis.controllers.RelationAnalysisChartDirectiveController',
                {
                    $scope: scope,
                    WorldstateService: WorldstateService
                }
            );

            iccData = WorldstateService.utils.stripIccData(scope.worldstates, true);

            errFunc1 = function () {
                return myController.createChartData(iccData, undefined, yAxis);
            };

            errFunc2 = function () {
                return myController.createChartData(iccData, xAxis, undefined);
            };

            expect(errFunc1).toThrow();
            expect(errFunc2).toThrow();

        });
        
    });
});