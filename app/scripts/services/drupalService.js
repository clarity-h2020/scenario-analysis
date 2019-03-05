/* 
 * ***************************************************
 * 
 * cismet GmbH, Saarbruecken, Germany
 * 
 *               ... and it just works.
 * 
 * ***************************************************
 */

/*global angular*/
/*jshint sub:true*/

angular.module(
        'eu.myclimateservice.csis.scenario-analysis.services'
        ).factory('eu.myclimateservice.csis.scenario-analysis.services.drupalService',
        ['$http', '$resource', '$q', function ($http, $resource, $q) {
                'use strict';

                var $this, nodePath, emikatPath, nodeFields;
                $this = this;
                nodePath = '/node/:nodeId';
                emikatPath = '/scenarios/:scenarioId/feature/view.:viewId/table/data';
                nodeFields = [];
                //nodeFields['indicators'] = 'field_mcda_indicators'
                nodeFields['indicators'] = 'field_mcda_indicators';
                nodeFields['criteriaFunction'] = 'field_mcda_criteria_function';
                nodeFields['decisionStrategy'] = 'field_mcda_decision_strategy';

                // <editor-fold defaultstate="closed" desc="=== drupalRestApi ===========================">
                $this.drupalRestApi = {};
                $this.drupalRestApi.host = '';
                $this.drupalRestApi.token = undefined;
                $this.drupalRestApi.emikatCredentials = undefined;

                $this.drupalRestApi.initToken = function () {
                    return $http({method: 'GET', url: $this.drupalRestApi.host + '/rest/session/token'})
                            .then(function tokenSuccessCallback(response) {
                                $this.drupalRestApi.token = response.data;
                                console.log('X-CSRF-Token recieved from API: ' + $this.drupalRestApi.token);
                                return response.data;
                            }, function tokenErrorCallback(response) {
                                $this.drupalRestApi.token = undefined;
                                console.log('error retrieving X-CSRF-Token: ' + response);
                                $q.reject(undefined);
                            });
                };

                /**
                 * return a promise!
                 */
                $this.drupalRestApi.getToken = function () {
                    if (!$this.drupalRestApi.token || $this.drupalRestApi.token === null || $this.drupalRestApi.token === undefined) {
                        return $this.drupalRestApi.initToken();
                    } else {
                        $q.when($this.drupalRestApi.token);
                    }
                };

                $this.drupalRestApi.initEmikatCredentials = function () {
                    return $http({method: 'GET', url: $this.drupalRestApi.host + '/jsonapi/user/user'})
                            .then(function initEmikatCredentialsSuccessCallback(response) {
                                // data.data?! fXXk yeah! :o
                                if (response !== null && response.data !== null && response.data.data[0] !== null && response.data.data[0].attributes.field_basic_auth_credentials !== null) {
                                    $this.emikatRestApi.emikatCredentials = response.data.data[0].attributes.field_basic_auth_credentials;
                                    console.log('EMIKAT Authentication Info API.');
                                    return $this.emikatRestApi.emikatCredentials;
                                } else
                                {
                                    console.log('error retrieving EMIKAT Credentials: ' + response);
                                    $q.reject(response);
                                }
                            }, function initEmikatCredentialsErrorCallback(response) {
                                $this.emikatRestApi.emikatCredentials = undefined;
                                console.log('error retrieving EMIKAT Credentials: ' + response);
                                $q.reject(undefined);
                            });
                };

                /**
                 * return a promise!
                 */
                $this.drupalRestApi.getEmikatCredentials = function () {
                    if (!$this.drupalRestApi.emikatCredentials || $this.drupalRestApi.emikatCredentials === null || $this.drupalRestApi.emikatCredentials === undefined) {
                        return $this.drupalRestApi.initEmikatCredentials();
                    } else {
                        $q.when($this.drupalRestApi.emikatCredentials);
                    }
                };

                $this.drupalRestApi.getNode = function (nodeId) {

                    return $this.drupalRestApi.getToken().then(function tokenSuccessCallback(token) {
                        var nodeResource = $resource($this.drupalRestApi.host + nodePath,
                                {
                                    nodeId: '@nodeId',
                                    _format: 'hal_json'

                                }, {
                            get: {
                                method: 'GET',
                                isArray: false,
                                headers: {
                                    'Content-Type': 'application/hal+json',
                                    'X-CSRF-Token': token
                                }
                            }
                        });

                        var nodeInstance = nodeResource.get({nodeId: nodeId});
                        return nodeInstance.$promise;

                    }, function tokenErrorCallback(response) {
                        return $q.reject(response);
                    });
                };

                // init the token
                //$this.drupalRestApi.initToken();
                // </editor-fold>

                // <editor-fold defaultstate="closed" desc="=== emikatRestApi ===========================">
                $this.emikatRestApi = {};
                $this.emikatRestApi.host = 'https://service.emikat.at/EmiKatTst/api';

                $this.emikatRestApi.getImpactScenario = function (scenarioId, viewId, credentials) {
                    var getImpactScenario = function (scenarioId, viewId, credentials) {
                        var impactScenarioResource = $resource($this.emikatRestApi.host + emikatPath,
                                {
                                    scenarioId: '@scenarioId',
                                    viewId: '@nodeId'
                                }, {
                            get: {
                                method: 'GET',
                                isArray: false,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Basic ' + btoa(credentials)
                                }
                            }
                        });

                        var impactScenario = impactScenarioResource.get({scenarioId: scenarioId, viewId: viewId});
                        return impactScenario.$promise;
                    };
                    if (!credentials) {
                        return $this.drupalRestApi.getEmikatCredentials().then(function credentialsSuccessCallback(emikatCredentials) {
                            return getImpactScenario(scenarioId, viewId, emikatCredentials);
                        }, function credentialsErrorCallback(response) {
                            return $q.reject(response);
                        });
                    } else {
                        return getImpactScenario(scenarioId, viewId, credentials);
                    }
                };
                // </editor-fold>

                // <editor-fold defaultstate="closed" desc="=== drupalNodeHelper ===========================">
                $this.drupalNodeHelper = {};
                var getObjectFromDrupalField;
                $this.drupalNodeHelper.getIndicatorArray = function (node) {
                    return getObjectFromDrupalField(node, nodeFields['indicators']);
                };

                $this.drupalNodeHelper.getCriteriaFunction = function (node) {
                    return getObjectFromDrupalField(node, nodeFields['criteriaFunction']);
                };

                $this.drupalNodeHelper.getDecisionStrategy = function (node) {
                    return getObjectFromDrupalField(node, nodeFields['decisionStrategy']);
                };

                getObjectFromDrupalField = function (node, field) {
                    if (!node || node === null || node === undefined ||
                            !node[field] || node[field] === null || node[field] === undefined) {
                        console.log('node object is null or field "' + field + '" is empty!');
                        return [];
                    } else {
                        var objects = [];
                        for (var i = 0; i < node[field].length; i++) {
                            // this is madness: parse into object and later stringify again
                            // so that it can be used by the akward ICMM library (won't touch this thing!)
                            var object = JSON.parse(node[field][i].value);
                            objects.push(object);
                        }
                        return objects;
                    }
                };
                // </editor-fold>

                // <editor-fold defaultstate="closed" desc="=== emikatHelper ===========================">
                $this.emikatHelper = {};

                /**
                 * Parses, aggregates and transforms emikat API response to ICC DATA Vector
                 * 
                 * @param {type} scenarioData emikat scenario data as obtained from EMIKAT REST PAI
                 * @param {type} icon
                 * @param {type} aggregate
                 * @returns {Array}
                 */
                $this.emikatHelper.transformImpactScenario = function (scenarioData, icon = 'flower_injured_16.png', aggregate = false) {
                    var worldstates = [], cMap = {};
                    if (!scenarioData || !scenarioData.name || scenarioData.name === null || !scenarioData.rows || !scenarioData.columnnames) {
                        console.warn('EMIKAT Sceanrio Data is null, cannot transform result to ICC Data Array');
                        return worldstates;
                    } else {
                        console.info('tranforing EMIKAT Scenario: ' + scenarioData.name);
                    }

                    // fill associative map
                    for (var i = 0, len = scenarioData.columnnames.length; i < len; i++) {
                        cMap[scenarioData.columnnames[i]] = i;
                    }

                    // iterate rows
                    for (i = 0; i < scenarioData.rows.length; i++) {
                        var column = scenarioData.rows[i].values;
                        // yes, they start at 1 not at 0! :o
                        var worldstate = worldstates[column[cMap['HAZARD_EVENT_ID']]-1];
                        if (!worldstate || worldstate === null) {
                            worldstate = {};
                            worldstate.name = column[cMap['HAZEVENT_NAME']];
                            worldstate.iccdata = {};
                            // yes, they start at 1 not at 0! :o
                            worldstates[column[cMap['HAZARD_EVENT_ID']]-1] = worldstate;
                        }

                        // aggregate by vulnerability class
                        var indicatorSetKey = 'indicatorset';
                        if (aggregate === true) {
                            indicatorSetKey += column[cMap['VULNERABILITYCLASS_ID']];
                        }

                        // indicator set (group of indicators)
                        var indicatorSet = worldstate.iccdata[indicatorSetKey];
                        if (!indicatorSet || indicatorSet === null) {
                            indicatorSet = {};
                            indicatorSet.displayName = column[cMap['NAME']];
                            if (aggregate === true) {
                                indicatorSet.displayName += ': ' + column[cMap['VULCLASS_NAME']];
                            }

                            indicatorSet.iconResource = icon;
                            worldstate.iccdata[indicatorSetKey] = indicatorSet;
                        }

                        // FIXME: Always 5 damage classes?!
                        for (var j = 1; j < 6; j++) {
                            var indicatorKey = 'indicator' + j;
                            var indicator = indicatorSet[indicatorKey];
                            if (!indicator || indicator === null) {
                                indicator = {};
                                // FIXME: Damage Class Name!
                                indicator.displayName = 'D' + (j);
                                // FIXME: support different icons!
                                indicator.iconResource = icon;
                                indicator.unit = column[cMap['QUANTITYUNIT']];
                                indicator.value = 0;
                                indicatorSet[indicatorKey] = indicator;
                            }

                            if (aggregate === true) {
                                indicator.value += column[cMap['DAMAGELEVEL' + j + 'QUANTITY']];
                            } else {
                                indicator.value = column[cMap['DAMAGELEVEL' + j + 'QUANTITY']];
                            }
                        }
                    }
                    // just to be sure: remove null elements
                    return worldstates.filter(n => n);
                };



                // </editor-fold>

                return {
                    drupalRestApi: $this.drupalRestApi,
                    emikatRestApi: $this.emikatRestApi,
                    nodeHelper: $this.drupalNodeHelper,
                    emikatHelper: $this.emikatHelper
                };
            }
        ]);