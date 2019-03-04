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
                            .then(function tokenSuccessCallback(response) {
                                if (response !== null && response.data[0] !== null && response.data[0].attributes.field_basic_auth_credentials !== null) {
                                    $this.emikatRestApi.emikatCredentials = response.data[0].attributes.field_basic_auth_credentials;
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
                $this.emikatRestApi.host = 'https://service.emikat.at/EmiKatTst/api/';

                $this.emikatRestApi.getImpactScenario = function (scenarioId, viewId) {

                    return $this.drupalRestApi.getEmikatCredentials().then(function credentialsSuccessCallback(credentials) {
                        var impactScenarioResource = $resource($this.drupalRestApi.host + emikatPath,
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

                        var impactScenario = impactScenarioResource.get({scenarioId:scenarioId, viewId:viewId});
                        return impactScenario.$promise;

                    }, function credentialsErrorCallback(response) {
                        return $q.reject(response);
                    });
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

                return {
                    drupalRestApi: $this.drupalRestApi,
                    emikatRestApi: $this.emikatRestApi,
                    nodeHelper: $this.drupalNodeHelper
                };
            }
        ]);
