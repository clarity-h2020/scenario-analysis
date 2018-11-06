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

                var $this, studyPath, studyFields;
                $this = this;
                studyPath = '/study/:studyId';
                studyFields = [];
                //studyFields['indicators'] = 'field_mcda_indicators'
                studyFields['indicators'] = 'field_indicators';
                studyFields['criteriaFunction'] = 'field_mcda_criteriafunction';
                studyFields['decisionStrategy'] = 'field_field_mcda_decision_strate';              

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
                        var studyResource = $resource($this.drupalRestApi.host + studyPath,
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
                var getObjectFromDrupalField;
                $this.drupalStudyHelper.getIndicatorArray = function (study) {
                    return getObjectFromDrupalField(study, studyFields['indicators']);
                };
                
                $this.drupalStudyHelper.getCriteriaFunction = function (study) {
                    return getObjectFromDrupalField(study, studyFields['criteriaFunction']);
                };
                
                $this.drupalStudyHelper.getDecisionStrategy = function (study) {
                    return getObjectFromDrupalField(study, studyFields['decisionStrategy']);
                };      
                
                getObjectFromDrupalField = function(study, field) {
                    if (!study || study === null || study === undefined ||
                            !study.field_indicators || study[field] === null || study[field] === undefined) {
                        console.log('study object is null or field "' + field + '" is empty!');
                        return [];
                    } else {
                        var objects = [];
                        for(var i = 0; i < study[field].length; i++) {
                            // this is madness: parse into object and later stringify again
                            // so that it can be used by the akward ICMM library (won't touch this thing!)
                            var object = JSON.parse(study[field][i].value);
                            objects.push(object);
                        }
                        return objects;
                    }
                };

                return {
                    restApi: $this.drupalRestApi,
                    studyHelper: $this.drupalStudyHelper
                };
            }
        ]);
