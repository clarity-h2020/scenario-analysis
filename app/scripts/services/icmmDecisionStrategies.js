angular.module(
    'eu.myclimateservice.csis.scenario-analysis.services'
    ).factory(
    'eu.myclimateservice.csis.scenario-analysis.services.DecisionStrategies',
    [
        '$resource',
        'de.cismet.crisma.ICMM.config.IcmmSettings',
        'de.cismet.crisma.ICMM.services.icmm',
        function ($resource, IcmmSettings, Icmm) {
            'use strict';
            var ds, processResult, dsFacade, createResource;
            processResult = function (dsDataObj) {
                var wrapper;
                if (dsDataObj) {
                    wrapper = JSON.parse(dsDataObj);
                    return JSON.parse(wrapper.decisionStrategies);
                }
                return null;

            };

            createResource = function () {
                var r;

                r = $resource(IcmmSettings.getIcmmApi() + '/' + IcmmSettings.getDomain() + '.decisionstrategies/1', {
                    dsId: '@id',
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
                        transformResponse: processResult
                    },
                    'update': {
                        method: 'PUT',
                        transformRequest: function (data) {
                            var transformedData, wrapper;
                            wrapper = {
                                $self: '/CRISMA.decisionstrategies/1',
                                id: 1,
                                decisionStrategies: angular.toJson(data)
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
                    return Icmm.getNextId(IcmmSettings.getIcmmApi() + '/' + IcmmSettings.getDomain(), '.decisionstrategies');
                };

                return r;
            };

            ds = createResource();
            dsFacade = {
                'get': function () {
                    return ds.get.apply(this, arguments);
                },
                'query': function () {
                    return ds.query.apply(this, arguments);
                },
                'update': function () {
                    return ds.update.apply(this, arguments);
                },
                'getId': function () {
                    return ds.getId.apply(this, arguments);
                }
            };

            IcmmSettings.addApiListener(function () {
                ds = createResource();
            });

            return dsFacade;
        }
    ]
    );
