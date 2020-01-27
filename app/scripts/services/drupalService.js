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
        ['$window', '$http', '$resource', '$q', function ($window, $http, $resource, $q) {
                'use strict';

                var $this, nodePath, emikatPath, nodeFields, reportImageTemplate,
                        glStepTemplate, initReportImageTemplate, taxonomyTermUuid,
                        initGlStepTemplate;
                /**
                 * FIXME: Heavily hardcoded time periods
                 * @type type
                 */
                var TIME_PERIODS = {
                    '20110101-20401231': '2011-2040',
                    '20410101-20701231': '2041-2070',
                    '20710101-21001231': '2071-2100',
                    'Baseline': '1971-2000'
                };
                $this = this;
                nodePath = '/node/:nodeId';
                emikatPath = '/scenarios/:scenarioId/feature/view.:viewId/table/data';
                nodeFields = [];
                //nodeFields['indicators'] = 'field_mcda_indicators'
                nodeFields['indicators'] = 'field_mcda_indicators';
                nodeFields['criteriaFunction'] = 'field_mcda_criteria_function';
                nodeFields['decisionStrategy'] = 'field_mcda_decision_strategy';

                // FIXME: retrieve from JSON:API ?      
                taxonomyTermUuid = '1ce9180e-8439-45a8-8e80-23161b76c2b9';

                initReportImageTemplate = function () {
                    return $http({method: 'GET', url: 'data/reportImageTemplate.json'})
                            .then(function successCallback(response) {
                                // data.data?! => data contains the data of the ngResource :o
                                reportImageTemplate = response.data;
                                return response;
                            }, function errorCallback(response) {
                                reportImageTemplate = null;
                                console.log('error loading report image template: ' + response);
                                return $q.reject(response);
                            });
                };

                initGlStepTemplate = function () {
                    return $http({method: 'GET', url: 'data/glStepTemplate.json'})
                            .then(function successCallback(response) {
                                // data.data?! => data contains the data of the ngResource :o
                                glStepTemplate = response.data;
                                return response;
                            }, function errorCallback(response) {
                                glStepTemplate = null;
                                console.log('error loading GL Step template: ' + response);
                                return $q.reject(response);
                            });
                };

                initReportImageTemplate();
                initGlStepTemplate();

                // <editor-fold defaultstate="closed" desc="=== drupalRestApi ===========================">
                $this.drupalRestApi = {};
                $this.drupalRestApi.host = '';
                $this.drupalRestApi.token = null;
                $this.drupalRestApi.emikatCredentials = null;
                $this.drupalRestApi.glStepInstance = null;
                $this.drupalRestApi.studyInfo = null;

                $this.drupalRestApi.initToken = function () {
                    return $http({method: 'GET', url: $this.drupalRestApi.host + '/rest/session/token'})
                            .then(function tokenSuccessCallback(response) {
                                $this.drupalRestApi.token = response.data;
                                console.log('X-CSRF-Token recieved from API: ' + $this.drupalRestApi.token);
                                return response.data;
                            }, function tokenErrorCallback(response) {
                                $this.drupalRestApi.token = null;
                                console.log('error retrieving X-CSRF-Token from ' + $this.drupalRestApi.host + '/rest/session/token:' + response);
                                return $q.reject(undefined);
                            });
                };

                $this.drupalRestApi.initGlStepResource = function (stepUuid) {

                    return $this.drupalRestApi.getToken().then(function tokenSuccessCallback(token) {
                        var glStepResource = $resource($this.drupalRestApi.host + '/jsonapi/node/gl_step/:stepUuid',
                                {
                                    stepUuid: '@stepUuid'
                                }, {
                            store: {
                                method: 'GET',
                                isArray: false,
                                headers: {
                                    'Accept': 'application/vnd.api+json',
                                    'Content-Type': 'application/vnd.api+json',
                                    'X-CSRF-Token': token
                                }
                            }
                        });

                        $this.drupalRestApi.glStepInstance = glStepResource.get({stepUuid: stepUuid});
                        return $this.drupalRestApi.glStepInstance.$promise;

                    }, function tokenErrorCallback(response) {
                        return $q.reject(response);
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
                    return $http({method: 'GET', url: $this.drupalRestApi.host + '/jsonapi/'}).then(function success(apiResponse) {
                        if (apiResponse !== null && apiResponse.data !== null && apiResponse.data.meta.links.me !== null &&
                                apiResponse.data.meta.links.me.meta !== null && apiResponse.data.meta.links.me.meta.id !== null) {
                            // FIXME: Ugly workaround for https://github.com/clarity-h2020/docker-drupal/issues/57
                            apiResponse.data.meta.links.me.href = $this.drupalRestApi.host + '/jsonapi/user/user/' + apiResponse.data.meta.links.me.meta.id;
                            return $http({method: 'GET', url: apiResponse.data.meta.links.me.href})
                                    .then(function initEmikatCredentialsSuccessCallback(userResponse) {
                                        if (userResponse !== null && userResponse.data.data !== null && userResponse.data.data !== null && userResponse.data.data.attributes.field_basic_auth_credentials !== null) {
                                            $this.emikatRestApi.emikatCredentials = userResponse.data.data.attributes.field_basic_auth_credentials;
                                            console.log('EMIKAT Authentication Info API recived from ' + apiResponse.data.meta.links.me.href);
                                            return $this.emikatRestApi.emikatCredentials;
                                        } else
                                        {
                                            console.log('error retrieving EMIKAT Credentials from ' + apiResponse.data.meta.links.me.href + ': ' + userResponse);
                                            $q.reject(userResponse);
                                        }
                                    }, function initEmikatCredentialsErrorCallback(userErrorResponse) {
                                        $this.emikatRestApi.emikatCredentials = undefined;
                                        console.log('error retrieving EMIKAT Credentials from ' + apiResponse.data.meta.links.me.href + ': ' + userErrorResponse);
                                        $q.reject(userErrorResponse);
                                    });
                        } else
                        {
                            console.error('error retrieving meta.links.me: null from ' + $this.drupalRestApi.host + '/jsonapi/', apiResponse);
                            $q.reject(apiResponse);
                        }
                    }, function error(apiErrorResponse) {
                        $this.emikatRestApi.emikatCredentials = undefined;
                        console.error('error retrieving meta.links.me from ' + $this.drupalRestApi.host + '/jsonapi/', apiErrorResponse);
                        $q.reject(apiErrorResponse);
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
                    console.log('Loading Impact Scenario Data for scenario ' + scenarioId + ' and view ' + viewId +
                                ' and credentials: ' + (credentials ? true : false));
                    //console.log('-> emikatRestApi.getImpactScenario');
                    var getImpactScenario = function (scenarioId, viewId, credentials) {
                        //console.log('-> emikatRestApi.getImpactScenario.getImpactScenario');
                        //console.log('credentials: ' + credentials + ' (Basic ' + btoa(credentials) + ')');
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

                        console.debug('loading Impact Scenario Data for scenario ' + scenarioId + ' and view ' + viewId +
                                ' and credentials: ' + (credentials ? true : false) + ' from EMIKAT: ' + $this.emikatRestApi.host + emikatPath);
                        var impactScenario = impactScenarioResource.get({scenarioId: scenarioId, viewId: viewId});
                        return impactScenario.$promise;
                    };
                    
                    if (credentials === undefined || !credentials || credentials === null) {
                        console.warn('emikat credentials ' + credentials + ' missing, trying to fetch them from Drupal API ....');
                        return $this.drupalRestApi.getEmikatCredentials().then(
                                function credentialsSuccessCallback(emikatCredentials) {
                                    console.debug('emikat credentials recieved, loading Impact Scenario Data for scenario ' + scenarioId + ' and view ' + viewId);
                                    return getImpactScenario(scenarioId, viewId, emikatCredentials);
                                },
                                function credentialsErrorCallback(response) {
                                    console.error(response);
                                    return $q.reject(response);
                                });
                    } else {
                        console.debug('emikat credentials already avilable, loading Impact Scenario Data for scenario ' + scenarioId + ' and view ' + viewId);
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

                // <editor-fold defaultstate="open" desc="=== emikatHelper ===========================">
                $this.emikatHelper = {};

                /**
                 * Parses, aggregates and transforms emikat API response to ICC DATA Vector.
                 * 
                 * KISS & YAGNI: 90% is hardcoded. This method works only with the format in samples/emikatScenarioDataHeatWave.json
                 * 
                 * @param {ScenarioData} scenarioData emikat scenario data as obtained from EMIKAT REST PAI
                 * @param {Array} damageClasses Damage  Class  information
                 * @param {boolean} aggregate
                 * @param {type} icon
                 * @returns {Array}
                 */
                $this.emikatHelper.transformImpactScenario = function (scenarioData, damageClasses, aggregate = false, icon = 'flower_injured_16.png') {
                    damageClasses = null;
                    aggregate = false;

                    var worldstates = [], criteriaMap = {};
                    if (!scenarioData || !scenarioData.name || scenarioData.name === null || !scenarioData.rows || !scenarioData.columnnames) {
                        console.warn('EMIKAT Sceanrio Data is null, cannot transform result to ICC Data Array');
                        return worldstates;
                    } else {
                        console.info('transforming (and aggregating: ' + aggregate + ') EMIKAT Scenario: ' + scenarioData.name);
                    }

                    // fill associative map
                    for (var i = 0, len = scenarioData.columnnames.length; i < len; i++) {
                        // COLUMN_NAME:index
                        criteriaMap[scenarioData.columnnames[i]] = i;
                    }

                    // iterate rows
                    console.debug('transformImpactScenario: processing ' + scenarioData.rows.length + ' rows');
                    for (i = 0; i < scenarioData.rows.length; i++) {
                        // value:index
                        var column = scenarioData.rows[i].values;
                        // yes, they start at 1 not at 0! :o
                        // here we define the grouping into worldstates
                        // TODO: we have to create  worldstates for each TIME_PERIOD / RCP combination

                        var scenarioName =
                                //column[criteriaMap['STUDY_VARIANT']] + ': ' +
                                column[criteriaMap['EMISSIONS_SCENARIO']].toUpperCase() + ' (' +
                                TIME_PERIODS[column[criteriaMap['TIME_PERIOD']]] + ')';


                        var worldstate = worldstates.find(function (ws) {
                            return ws.name === scenarioName;
                        });

                        if (!worldstate || worldstate === null) {
                            worldstate = {};
                            worldstate.name = scenarioName;
                            worldstate.iccdata = {};
                            worldstates.push(worldstate);
                            console.debug('transformImpactScenario: creating new worldstate ' + worldstate.name);
                        }

                        var indicatorSetKey = 'indicatorset';// + column[criteriaMap['EMISSIONS_SCENARIO']];
                        // indicator set (group of indicators)
                        var indicatorSet = worldstate.iccdata[indicatorSetKey];
                        if (!indicatorSet || indicatorSet === null) {
                            indicatorSet = {};
                            // FIXME: Heavily hardcoded indicator sez
                            indicatorSet.displayName = 'Mortality Rate following Heat Wave Events';
                            //console.debug('transformImpactScenario: creating new Indicator Set ' + indicatorSet.displayName);
                            /*if (aggregate === false) {
                             indicatorSet.displayName += ': ' + column[criteriaMap['EVENT_FREQUENCY']];
                             }*/

                            indicatorSet.iconResource = icon;
                            worldstate.iccdata[indicatorSetKey] = indicatorSet;
                        }

                        var indicatorKey = 'indicator' + column[criteriaMap['EVENT_FREQUENCY']];
                        var indicator = indicatorSet[indicatorKey];
                        if (!indicator || indicator === null) {
                            indicator = {};
                            indicator.displayName = column[criteriaMap['EVENT_FREQUENCY']];
                            indicator.iconResource = icon;
                            indicator.unit = '‰'; //column[criteriaMap['QUANTITYUNIT']];
                            indicator.value = 0;
                            indicatorSet[indicatorKey] = indicator;
                        } else {
                            console.warn(worldstate.name + '/' + indicatorSet.name + '/' + indicator.displayName + ' = ' + indicator.value + ' already exists!');
                        }

                        // FIXME: Heavily hardcoded calculation of indicator value
                        indicator.value = (parseInt(column[criteriaMap['DAMAGEQUANTITY']]) / parseInt(column[criteriaMap['EXPOSEDQUANTITY']]) * 1000);
                    }

                    //console.log(JSON.stringify(worldstates));
                    return worldstates.sort(function (a, b) {
                        var nameA = a.name.toUpperCase(); // Groß-/Kleinschreibung ignorieren
                        var nameB = b.name.toUpperCase(); // Groß-/Kleinschreibung ignorieren
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        // Namen müssen gleich sein
                        return 0;
                    });

                };
                // </editor-fold>


                $this.screenshotHelper = {};

                /**
                 * 
                 * @param {type} token
                 * @returns {unresolved}
                 */
                var createReportImageResource = function (token) {

                    return $resource($this.drupalRestApi.host + '/jsonapi/node/report_image/:imageFileUuid',
                            {
                                imageFileUuid: '@imageFileUuid'
                            }, {
                        store: {
                            method: 'POST',
                            isArray: false,
                            headers: {
                                'Accept': 'application/vnd.api+json',
                                'Content-Type': 'application/vnd.api+json',
                                'X-CSRF-Token': token
                            }
                        }
                    });
                };

                /**
                 * POST report image file resource to JSON API
                 * 
                 * @param {type} token
                 * @param {type} imageName
                 * @returns {unresolved}
                 */
                var createReportImageFileResource = function (token, imageName = 'scenario-analysis.png') {

                    return $resource($this.drupalRestApi.host + '/jsonapi/node/report_image/field_image',
                            {
                                //_format: 'hal_json'
                            }, {
                        store: {
                            method: 'POST',
                            isArray: false,
                            headers: {
                                'Content-Type': 'application/octet-stream',
                                'Accept': 'application/vnd.api+json',
                                'Content-Disposition': 'file; filename="' + imageName + '"',
                                'X-CSRF-Token': token
                            }
                        }
                    });
                };

                /**
                 * Take a screenshot of hrml element ($elementId) and store it under $ imageName
                 * wirh comment $comment in Drupal.
                 * @param {type} elementId
                 * @param {type} title
                 * @param {type} imageName
                 * @param {type} comment
                 * @param {type} foreignObjectRendering
                 * @returns {undefined}
                 */
                $this.screenshotHelper.uploadScreenshot = function (elementId, title = elementId, imageName = elementId + '.png', comment = title, foreignObjectRendering = false) {

                    // STEP #1:
                    // html2canvas screenshot function: take snapshot of HTML element $elementId (e.g. <div id="inlcudeInReport">
                    $window.html2canvas(document.getElementById(elementId), {logging: true, foreignObjectRendering: foreignObjectRendering}).then(canvas => {
                        canvas.toBlob(function uploadImage(imageBlob) {
                            // function is invoked on button press, so we can safely assume that the token promise was resolved.
                            // TODO: add some error checking before going live

                            // STEP #2:
                            // Create new file entity: POST $imageBlob to /jsonapi/node/report_image/field_image
                            var reportImageFileResource = createReportImageFileResource($this.drupalRestApi.token, imageName);
                            reportImageFileResource.store(imageBlob)
                                    .$promise.then(function uploadImageFileSuccess(imageResponse) {
                                        var imageFileUuid = imageResponse.data.id;
                                        console.log('upload image file "' + imageName + '" + finished: ' + imageFileUuid);

                                        // STEP #3: 
                                        // Create new report_image Node, assign image entity uuid from Step #2, POST to /jsonapi/node/report_image/
                                        reportImageTemplate.data.attributes.title = title;
                                        reportImageTemplate.data.attributes.field_comment.value = comment;
                                        reportImageTemplate.data.relationships.field_image.data.id = imageFileUuid;
                                        reportImageTemplate.data.relationships.field_source_step.data.id = $this.drupalRestApi.studyInfo.step_uuid;
                                        var reportImageResource = createReportImageResource($this.drupalRestApi.token);
                                        reportImageResource.store(reportImageTemplate).$promise.then(function storeReportImageSuccess(reportImageResponse) {
                                            if (reportImageResponse && reportImageResponse.data && reportImageResponse.data.id) {
                                                if ($this.drupalRestApi.glStepInstance && $this.drupalRestApi.glStepInstance.data &&
                                                        $this.drupalRestApi.glStepInstance.data.relationships && $this.drupalRestApi.glStepInstance.data.relationships.field_report_images && $this.drupalRestApi.glStepInstance.data.relationships.field_report_images.data &&
                                                        $this.drupalRestApi.glStepInstance.data.relationships.field_report_images.data.length > 0) {
                                                    console.log('adding resource image to ' + $this.drupalRestApi.glStepInstance.data.relationships.field_report_images.data.length + ' existing relationships');
                                                    glStepTemplate.data.relationships.field_report_images.data = $this.drupalRestApi.glStepInstance.data.relationships.field_report_images.data;
                                                }

                                                // STEP #4: update GL-Step reportImageRelationship, PATCH /jsonapi/node/gl_step/
                                                var reportImageRelationship = {
                                                    'id': reportImageResponse.data.id,
                                                    'type': 'node--report_image'
                                                };


                                                glStepTemplate.data.id = $this.drupalRestApi.studyInfo.step_uuid;
                                                glStepTemplate.data.relationships.field_report_images.data.push(reportImageRelationship);
                                                console.log('assigning report image ' + reportImageResponse.data.id + ' to GL Step ' + $this.drupalRestApi.studyInfo.step_uuid);

                                                $http(
                                                        {
                                                            method: 'PATCH',
                                                            url: $this.drupalRestApi.host + '/jsonapi/node/gl_step/' + $this.drupalRestApi.studyInfo.step_uuid,
                                                            headers: {
                                                                'Accept': 'application/vnd.api+json',
                                                                'Content-Type': 'application/vnd.api+json',
                                                                'X-CSRF-Token': $this.drupalRestApi.token
                                                            },
                                                            data: glStepTemplate
                                                        }
                                                ).then(function successCallback(glStepResponse) {
                                                    console.log('report image ' + reportImageResponse.data.id + ' successfully assigned to GL Step ' + $this.drupalRestApi.studyInfo.step_uuid);
                                                }, function errorCallback(glStepErrorResponse) {
                                                    console.log('error updating GL Step ' + $this.drupalRestApi.studyInfo.step_uuid + ': ' + glStepErrorResponse);
                                                });
                                            } else {
                                                console.error('error processing stored ReportImage entity: ' + reportImageResponse);
                                            }

                                        }, function storeReportImageError(reportImageErrorResponse) {
                                            console.log('error storing ReportImage entity: ' + reportImageErrorResponse.statusText);
                                            $q.reject(reportImageErrorResponse);
                                        });
                                    }, function uploadImageFileError(imageErrorResponse) {
                                        console.log('error uploading Image: ' + imageErrorResponse.statusText);
                                        $q.reject(imageErrorResponse);
                                    });
                        });
                    });
                };

                return {
                    drupalRestApi: $this.drupalRestApi,
                    emikatRestApi: $this.emikatRestApi,
                    nodeHelper: $this.drupalNodeHelper,
                    emikatHelper: $this.emikatHelper,
                    screenshotHelper: $this.screenshotHelper
                };
            }
        ]);
