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

                var $this;
                $this = this;

                // <editor-fold defaultstate="open" desc="=== drupalRestApi ===========================">
                $this.drupalRestApi = {};
                $this.drupalRestApi.host = ''; //http://roberto:8080';
                $this.drupalRestApi.token = undefined;
                // </editor-fold>

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

                $this.drupalRestApi.getStudy = function (studyId) {

                    return $this.drupalRestApi.getToken().then(function tokenSuccessCallback(token) {
                        var studyResource = $resource($this.drupalRestApi.host + '/study/:studyId',
                            {
                                studyId: '@studyId',
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

                    var studyInstance = studyResource.get({studyId: studyId});
                    return studyInstance.$promise;

                    }, function tokenErrorCallback(response) {
                        return $q.reject(response);
                    });
                };

                // init the token
                //$this.drupalRestApi.initToken();

                $this.drupalStudyHelper = {};
                $this.drupalStudyHelper.getIndicatorArray = function (study) {
                    if (!study || study === null || study === undefined ||
                            !study.field_indicators || study.field_indicators === null || study.field_indicators === undefined) {
                        return [];
                    } else {
                        var studyIndicators = [];
                        for(var i = 0; i < study.field_indicators.length; i++) {
                            // this is madness: parse into object and later stringify again
                            // so that it can be used by the akward ICMM library (won't touch this thing!)
                            var studyIndicator = JSON.parse(study.field_indicators[i].value);
                            studyIndicators.push(studyIndicator);
                        }
                        return studyIndicators;
                    }

                };

                return {
                    restApi: $this.drupalRestApi,
                    studyHelper: $this.drupalStudyHelper
                };
            }
        ]);
