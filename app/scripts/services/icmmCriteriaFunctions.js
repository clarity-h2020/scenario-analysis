angular.module(
    'eu.myclimateservice.csis.scenario-analysis.services'
    ).factory(
    'eu.myclimateservice.csis.scenario-analysis.services.CriteriaFunction',
    [
        '$resource',
        'de.cismet.crisma.ICMM.config.IcmmSettings',
        'de.cismet.crisma.ICMM.services.icmm',
        function ($resource, IcmmSettings, Icmm) {
            'use strict';
            var cf, processResult, cfFacade, createResource;
            processResult = function (cfDataObj) {
                var wrapper;
                if (cfDataObj) {
                    wrapper = JSON.parse(cfDataObj);
                    if (wrapper) {
                        return JSON.parse(wrapper.criteriaFunctions);
                    }
                }
                return null;
            };

            createResource = function () {
                var r;

                r = $resource(IcmmSettings.getIcmmApi() + '/' + IcmmSettings.getDomain() + '.criteriafunctions/1', {
                    cfId: '@id',
                    deduplicate: false,
                    omitNullValues: 'false'
                }, {
                    'get': {
                        method: 'GET',
                        transformResponse: processResult
                    },
                    'query': {
                        isArray: true,
                        method: 'GET',
                        params: {
                            level: '1',
                            omitNullValues: 'true'
                        },
                        transformResponse: processResult
                    },
                    'update': {
                        method: 'PUT',
                        transformRequest: function (data) {
                            var transformedData, wrapper;
                            wrapper = {
                                $self: '/CRISMA.criteriafunctions/1',
                                id: 1,
                                criteriaFunctions: angular.toJson(data)
                            };
                            transformedData = JSON.stringify(wrapper, function (k, v) {
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
                    return Icmm.getNextId(IcmmSettings.getIcmmApi() + '/' + IcmmSettings.getDomain(), '.criteriafunctions');
                };
                return r;
            };
            
            cf = createResource();
            
            cfFacade = {
                'get': function () {
                    return cf.get.apply(this, arguments);
                },
                'query': function () {
                    return cf.query.apply(this, arguments);
                },
                'update': function () {
                    return cf.update.apply(this, arguments);
                },
                'getId': function () {
                    return cf.getId.apply(this, arguments);
                }
            };

            IcmmSettings.addApiListener(function () {
                cf = createResource();
            });

            return cfFacade;
        }
    ]
    );