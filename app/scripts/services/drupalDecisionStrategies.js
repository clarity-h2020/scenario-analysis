angular.module(
    'eu.myclimateservice.csis.scenario-analysis.services'
    ).factory(
    'eu.myclimateservice.csis.scenario-analysis.services.DecisionStrategies',
    [
        '$resource',
        'eu.myclimateservice.csis.scenario-analysis.services.configurationService',
        function ($resource, configurationService) {
            'use strict';
            var decisionStrategy, transformResponse, decisionStrategyFacade, createResource;
            transformResponse = function (studyJsonString) {
                var study;
                if (studyJsonString) {
                    study = JSON.parse(studyJsonString);
                    
                    return JSON.parse(study.decisionStrategies);
                }
                return null;

            };
            
            

            createResource = function () {
                var r;

                r = $resource(configurationService.$this.drupalRestApi.host + '/' + configurationService.getDomain() + '.decisionstrategies/1', {
                    decisionStrategyId: '@id',
                    deduplicate: false,
                    omitNullValues: 'false'
                }, {
                    'query': {
                        method: 'GET',
                        isArray: true,
                        params: {
                            level: '1',
                            omitNullValues: 'true'
                        },
                        transformResponse: transformResponse
                    },
                    'update': {
                        method: 'PUT',
                        transformRequest: function (data) {
                            var transformedData, study;
                            study = {
                                $self: '/CRISMA.decisionstrategies/1',
                                id: 1,
                                decisionStrategies: angular.toJson(data)
                            };
                            transformedData = JSON.stringify(study, function (k, v) {
                                // we have to take care of angular properties by ourselves
                                if (k.substring(0, 1) === '$' && !(k === '$self' || k === '$ref')) {
                                    return undefined;
                                }

                                return v;
                            });
                            return transformedData;
                        }
                    }
                });

                r.getId = function () {
                    return Icmm.getNextId(configurationService.getIcmmApi() + '/' + configurationService.getDomain(), '.decisionstrategies');
                };

                return r;
            };

            decisionStrategy = createResource();
            decisionStrategyFacade = {
                'get': function () {
                    return decisionStrategy.get.apply(this, arguments);
                },
                'query': function () {
                    return decisionStrategy.query.apply(this, arguments);
                },
                'update': function () {
                    return decisionStrategy.update.apply(this, arguments);
                },
                'getId': function () {
                    return decisionStrategy.getId.apply(this, arguments);
                }
            };

            configurationService.addApiListener(function () {
                decisionStrategy = createResource();
            });

            return decisionStrategyFacade;
        }
    ]
    );
