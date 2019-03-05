angular.module(
        'eu.myclimateservice.csis.scenario-analysis.controllers'
        ).controller(
        'eu.myclimateservice.csis.scenario-analysis.controllers.drupalContextProviderDirectiveController',
        [
            '$scope',
            '$timeout',
            'de.cismet.crisma.ICMM.services.icmm',
            'de.cismet.crisma.ICMM.Worldstates',
            'eu.myclimateservice.csis.scenario-analysis.services.drupalService',
            function ($scope, $timeout, Icmm, Worldstates, drupalService) {
                'use strict';
                var showIndicatorFileLoadingError, showFileLoading, loadIndicatorObjects,
                        loadIndicatorObject, onloadCfFile, onloadDsFile, onSeamlessEvent,
                        onloadIccObjects, loadCriteriaFunctions, loadDecisionStrategies;
                var drupalRestApi = drupalService.drupalRestApi;
                var emikatRestApi = drupalService.emikatRestApi;

                console.log('window.seamless.connect()');
                var parent = window.seamless.connect();
                // Receive a message, this only works when the parent window calls send(...) 
                // inside the onConnect() method, otherwise the event is not recieved (race condition?)
                // strangley, the onConnect callback is called twice. See comment in nodeConncetor.js
                parent.receive(function (data) {
                    //console.log('parent.receive:' + data);
                    onSeamlessEvent(data);
                });

                //initialize the bindings
                $scope.selectedWorldstates = [];
                $scope.worldstates = [];
                $scope.criteriaFunctions = [];
                $scope.decisionStrategies = [];
                $scope.showDummyListItem = true;
                $scope.removeSelectionBtnDisabled = true;
                $scope.removeSelectionButtonStyle = {
                    'color': '#888'
                };
                $scope.noIndicatorsLoaded = true;
                /*
                 * the indicator maps keeps track of the indicators that each object  
                 * (e.g. indicator object, criteriaFunctionContainer and decisionStrategyContainer) that are loaded by this directive
                 *  must provide
                 */
                $scope.tooltipRename = {
                    title: 'Rename criteria function'
                };
                $scope.tooltipRenameDone = {
                    title: 'Done'
                };
                $scope.tooltipDeleteSelection = {
                    title: 'Done'
                };
                $scope.tooltipDeleteSelection = {
                    title: 'Remove selection'
                };
                $scope.tooltipAdd = {
                    title: 'Add Icc Objects from file'
                };
                $scope.editable = [];
                $scope.toggleSelection = function (index) {
                    var wsToToggle, i, isSelected;
                    wsToToggle = $scope.worldstates[index];
                    //check if the worldstate is already contained in the selectedWorldstates array..
                    isSelected = -1;
                    for (i = 0; i < $scope.selectedWorldstates.length; i++) {
                        if ($scope.selectedWorldstates[i].id === wsToToggle.id) {
                            isSelected = i;
                            break;
                        }
                    }

                    if (isSelected >= 0) {
                        $scope.selectedWorldstates.splice(isSelected, 1);
                    } else {
                        $scope.selectedWorldstates.push(wsToToggle);
                    }
                };

                $scope.$watchCollection('selectedWorldstates', function () {
                    //if no indicator objects are selected anymore whe need to disable the button
                    if ($scope.selectedWorldstates.length <= 0) {
                        $scope.removeSelectionBtnDisabled = true;
                        $scope.removeSelectionButtonStyle = {
                            'color': '#CCC'
                        };
                    } else {
                        $scope.removeSelectionBtnDisabled = false;
                        $scope.removeSelectionButtonStyle = {};
                    }
                });

                $scope.getItemStyle = function (index) {
                    var c = 'list-group-item';
                    var wsToToggle, i, isSelected;
                    wsToToggle = $scope.worldstates[index];
                    //check if the worldstate is already contained in the selectedWorldstates array..
                    isSelected = -1;
                    for (i = 0; i < $scope.selectedWorldstates.length; i++) {
                        if ($scope.selectedWorldstates[i].id === wsToToggle.id) {
                            isSelected = i;
                        }
                    }

                    if (isSelected >= 0) {
                        c += ' list-group-item-info';
                    }

                    return c;
                };

                //check if the File API is available
                $scope.fileAPIAvailable = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

                $scope.removeSelectedDummyWS = function () {
                    var i, j, indexToRemove;
                    if ($scope.removeSelectionBtnDisabled) {
                        return;
                    }
                    indexToRemove = [];
                    for (i = 0; i < $scope.selectedWorldstates.length; i++) {
                        for (j = 0; j < $scope.worldstates.length; j++) {
                            if (angular.equals($scope.worldstates[j], $scope.selectedWorldstates[i])) {
                                indexToRemove.push(j);
                            }
                        }
                    }
                    for (i = indexToRemove.length - 1; i >= 0; i--) {
                        $scope.worldstates.splice(indexToRemove[i], 1);
                    }
                    $scope.selectedWorldstates = [];
                };

                /*
                 * be carefull calling this function from angular contexts
                 * @param {type} file that could not be loaded properly...
                 * @returns {undefined}
                 */
                showIndicatorFileLoadingError = function (message) {
                    $scope.fileLoadError = true;
                    $scope.errorMessage = message;
                    //$scope.$apply();
                };

                showFileLoading = function () {
                    $scope.fileLoadError = false;
                    $scope.fileLoading = true;
                };

                $scope.fileLoadError = false;
                $scope.fileLoading = false;

                $scope.showCfFileLoadingError = function (message) {
                    $scope.cfFileLoadError = true;
                    $scope.cfFileLoadErrorMsg = ' Criteria functions not loaded. ' + message;
                    //$scope.$apply();
                };

                $scope.showDsFileLoadingError = function (message) {
                    $scope.dsFileLoadError = true;
                    $scope.dsFileLoadErrorMsg = ' Decision strategies not loaded. ' + message;
                    //$scope.$apply();
                };

                onloadIccObjects = function (file) {
                    return function (e) {
                        console.log('load icc file: ' + file.name);

                        var fileObj;
                        try {
                            fileObj = JSON.parse(e.target.result);
                            if (Object.prototype.toString.call(fileObj) !== '[object Array]') {
                                loadIndicatorObject(fileObj);
                            } else {
                                loadIndicatorObjects(fileObj);
                            }
                            $scope.$apply();
                        } catch (err) {
                            console.log(err.toString());
                            // show an error in the gui...
                            showIndicatorFileLoadingError(err.toString());
                        }
                    };
                };

                loadIndicatorObjects = function (indicatorObjects) {
                    var arrayLength = indicatorObjects.length;
                    console.debug('loading ' + arrayLength + ' indicator arrays');
                    for (var i = 0; i < arrayLength; i++) {
                        loadIndicatorObject(indicatorObjects[i]);
                    }
                };

                loadIndicatorObject = function (indicatorObject) {
                    var worldstateDummy, indicatorProp, indicator, origLoadedIndicators, indicatorGroup,
                            loadedIndicatorLength, indicatorMapLength, containsIndicator, msg;
                    try {

                        /*
                         * 
                         * accept two differnt kind of files. 
                         * 1. A plain icc data object.
                         * In that case we apply a standard name to this object
                         * 
                         * 2. A worldstate Dummy object that already has a name
                         */

                        if (indicatorObject.name && indicatorObject.iccdata) {
                            worldstateDummy = indicatorObject;
                            origLoadedIndicators = indicatorObject.iccdata;
                            worldstateDummy.iccdata = {
                                // this is a total mess: serialise the deserialized icc data again
                                // so that it can be deserilaized by icmm helper library
                                actualaccessinfo: JSON.stringify(worldstateDummy.iccdata)
                            };
                        } else {
                            //generate a uniqe id...
                            origLoadedIndicators = indicatorObject;
                            worldstateDummy = {
                                name: 'Nonamed indicator data',
                                iccdata: {
                                    actualaccessinfo: JSON.stringify(indicatorObject)
                                }
                            };
                        }
                        var tmp;
                        if ($scope.worldstates && $scope.worldstates.length > 0) {
                            tmp = Worldstates.utils.stripIccData([$scope.worldstates[0]])[0].data;
                        } else {
                            tmp = origLoadedIndicators;
                        }
                        $scope.indicatorMap = {};
                        for (indicatorGroup in tmp) {
                            if (tmp.hasOwnProperty(indicatorGroup)) {
                                for (indicatorProp in tmp[indicatorGroup]) {
                                    if (tmp[indicatorGroup].hasOwnProperty(indicatorProp)) {
                                        if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                            $scope.indicatorMap[indicatorProp] = tmp[indicatorGroup][indicatorProp];
                                        }
                                    }
                                }
                            }
                        }
                        loadedIndicatorLength = 0;
                        indicatorMapLength = 0;
                        for (indicator in $scope.indicatorMap) {
                            if ($scope.indicatorMap.hasOwnProperty(indicator)) {
                                containsIndicator = false;
                                indicatorMapLength++;
                                for (indicatorGroup in origLoadedIndicators) {
                                    if (origLoadedIndicators.hasOwnProperty(indicatorGroup)) {
                                        for (indicatorProp in origLoadedIndicators[indicatorGroup]) {
                                            if (origLoadedIndicators[indicatorGroup].hasOwnProperty(indicatorProp)) {
                                                if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                                    if ($scope.indicatorMap[indicator].displayName === origLoadedIndicators[indicatorGroup][indicatorProp].displayName) {
                                                        loadedIndicatorLength++;
                                                        containsIndicator = true;
                                                        //break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (!containsIndicator) {
                                    msg = 'Could not load indicator file. It contains no indicator data for ' + indicator;
                                    console.error(msg);
                                    showIndicatorFileLoadingError(msg);
                                    return;
                                }
                            }
                        }

                        // FIXME: don't use  displayName as **unique** key !!!111!!11 :o(
                        /**if (loadedIndicatorLength !== indicatorMapLength) {
                         msg = 'indicator data in file has more indicators ('+loadedIndicatorLength+') defined than the first loaded indicator set ('+indicatorMapLength+').';
                         console.error(msg);
                         showIndicatorFileLoadingError(msg);
                         return;
                         }**/

                        // we need an id to distinct the icc objects. eg. the ranking table use this id
                        // to keep track of the indicator objects
                        if (!worldstateDummy.id) {
                            worldstateDummy.id = Math.floor((Math.random() * 1000000) + 1);
                        }

                        // an excellent example on technical debt and accidental complexity:
                        // instead of adressing the root cause of the problem, we
                        // introduce additional inadequateness and ambiguity
                        Icmm.convertToCorrectIccDataFormat(worldstateDummy);

                        if ($scope.worldstates) {
                            $scope.worldstates.push(worldstateDummy);
                            $scope.editable.push(false);
                        } else {
                            $scope.editable.push(false);
                            $scope.worldstates = [worldstateDummy];
                        }
                        $scope.showDummyListItem = false;
                        $scope.noIndicatorsLoaded = false;
                        // when indicator objects are added we want them to be selected by default
                        $scope.selectedWorldstates.splice(0, $scope.selectedWorldstates.length);
                        $scope.worldstates.forEach(function (object, index) {
                            $scope.toggleSelection(index);
                        });

                        //$scope.$apply();

                    } catch (err) {
                        // show an error in the gui...
                        showIndicatorFileLoadingError(err.toString());
                        console.error(err.toString());
                    }
                };

                onloadCfFile = function (theFile) {
                    return function (e) {
                        var criteriaFunctionArray;
                        try {
                            criteriaFunctionArray = JSON.parse(e.target.result);
                            if (Object.prototype.toString.call(criteriaFunctionArray) !== '[object Array]') {
                                loadCriteriaFunctions([criteriaFunctionArray]);
                            } else {
                                loadCriteriaFunctions(criteriaFunctionArray);
                            }
                            $scope.loadedCfFile = theFile.name;
                            $scope.$apply();
                        } catch (err) {
                            // show an error in the gui...
                            console.error('Could not read Criteria Function Config File: ' + theFile.name);
                            console.error(err.toString());
                        }
                    };
                };

                loadCriteriaFunctions = function (criteriaFunctionArray) {

                    var criteriaFunctionContainer, i, j, indicatorProp, indicatorFound, cfIndicator, msg, indicatorMapLength,
                            cfIndicatorLength;

                    if (Object.prototype.toString.call(criteriaFunctionArray) === '[object Array]') {
                        indicatorMapLength = 0;
                        for (indicatorProp in $scope.indicatorMap) {
                            if ($scope.indicatorMap.hasOwnProperty(indicatorProp)) {
                                indicatorMapLength++;
                            }
                        }
                        // we need to check if the criteria Functions defined in the file
                        // match to the indicators of the loaded indicator files...
                        for (indicatorProp in $scope.indicatorMap) {
                            if ($scope.indicatorMap.hasOwnProperty(indicatorProp)) {
                                for (i = 0; i < criteriaFunctionArray.length; i++) {
                                    criteriaFunctionContainer = criteriaFunctionArray[i];
                                    if (criteriaFunctionContainer && criteriaFunctionContainer !== null && criteriaFunctionContainer !== undefined &&
                                            criteriaFunctionContainer.criteriaFunctions && criteriaFunctionContainer.criteriaFunctions !== null && criteriaFunctionContainer.criteriaFunctions !== undefined) {
                                        cfIndicatorLength = criteriaFunctionContainer.criteriaFunctions.length;
                                        if (criteriaFunctionContainer.name) {
                                            $scope.loadedCfFile = criteriaFunctionContainer.name;
                                        } else {
                                            $scope.loadedCfFile = ' ';
                                        }

                                        for (j = 0; j < criteriaFunctionContainer.criteriaFunctions.length; j++) {
                                            cfIndicator = criteriaFunctionContainer.criteriaFunctions[j].indicator;
                                            indicatorFound = false;

                                            if ($scope.indicatorMap[indicatorProp].displayName === cfIndicator) {
                                                indicatorFound = true;
                                                break;
                                            }
                                        }
                                        if (!indicatorFound) {
                                            msg = 'Could not find indicator "' + $scope.indicatorMap[indicatorProp].displayName + '" in criteria function "' + criteriaFunctionContainer.name + '"';
                                            console.error(msg);
                                            $scope.showCfFileLoadingError(msg);
                                            return;
                                        }
                                        if (cfIndicatorLength !== indicatorMapLength) {
                                            msg = 'Criteria Function :"' + criteriaFunctionContainer.name + '" contains more indicators than the loaded indicator files.';
                                            console.error(msg);
                                            $scope.showCfFileLoadingError(msg);
                                            return;
                                        }
                                    } else {
                                        $scope.showCfFileLoadingError('Wrong Criteria Function File Format');
                                    }
                                }
                            }
                        }

                        console.log(criteriaFunctionArray.length + ' criteria functions strategies loaded');
                        $scope.criteriaFunctions = criteriaFunctionArray;

                    } else {
                        msg = 'criteria function object is not an array or empty';
                        console.log(msg + ': ' + criteriaFunctionArray.toString());
                        $scope.showCfFileLoadingError('msg');
                    }
                };

                onloadDsFile = function (theFile) {
                    return function (e) {
                        var decisionStrategyArray;
                        try {
                            decisionStrategyArray = JSON.parse(e.target.result);
                            if (Object.prototype.toString.call(decisionStrategyArray) !== '[object Array]') {
                                decisionStrategyArray = [decisionStrategyArray];
                            }
                            loadDecisionStrategies(decisionStrategyArray);
                            $scope.loadedDsfFile = theFile.name;
                            $scope.$apply();
                        } catch (err) {
                            // show an error in the gui...
                            console.error('Could not read Decision Strategy Config File: ' + theFile.name);
                            console.error(err.toString());
                        }
                    };
                };

                loadDecisionStrategies = function (decisionStrategyArray) {
                    var decisionStrategyContainer, i, j, indicatorProp, indicatorFound, cfIndicator,
                            msg, indicatorMapLength, dsIndicatorLength;

                    if (Object.prototype.toString.call(decisionStrategyArray) === '[object Array]') {
                        indicatorMapLength = 0;
                        for (indicatorProp in $scope.indicatorMap) {
                            if ($scope.indicatorMap.hasOwnProperty(indicatorProp)) {
                                indicatorMapLength++;
                            }
                        }
                        // we need to check if the decision strategies defined in the file
                        // match to the indicators of the loaded indicator files...
                        for (indicatorProp in $scope.indicatorMap) {
                            for (i = 0; i < decisionStrategyArray.length; i++) {
                                decisionStrategyContainer = decisionStrategyArray[i];
                                if (decisionStrategyContainer && decisionStrategyContainer !== null && decisionStrategyContainer !== undefined &&
                                        decisionStrategyContainer.criteriaEmphases && decisionStrategyContainer.criteriaEmphases !== null && decisionStrategyContainer.criteriaEmphases !== undefined) {
                                    if (decisionStrategyContainer.name) {
                                        $scope.loadedDsfFile = decisionStrategyContainer.name;
                                    } else {
                                        $scope.loadedDsfFile = '';
                                    }

                                    dsIndicatorLength = decisionStrategyContainer.criteriaEmphases.length;
                                    for (j = 0; j < decisionStrategyContainer.criteriaEmphases.length; j++) {
                                        cfIndicator = decisionStrategyContainer.criteriaEmphases[j].indicator.displayName;
                                        indicatorFound = false;

                                        if ($scope.indicatorMap[indicatorProp].displayName === cfIndicator) {
                                            indicatorFound = true;
                                            break;
                                        }
                                    }
                                    if (decisionStrategyContainer.satisfactionEmphasis.length !== indicatorMapLength) {
                                        msg = 'Satisfaction Emphasis Vector for decision strategy :"' + decisionStrategyArray.name + '" contains more elements than indicator are defined';
                                        console.error(msg);
                                        $scope.showDsFileLoadingError(msg);
                                        return;
                                    }
                                    if (!indicatorFound) {
                                        msg = 'Could not find indicator "' + $scope.indicatorMap[indicatorProp].displayName + '" in decision strategy "' + decisionStrategyContainer.name + '"';
                                        console.error(msg);
                                        $scope.showDsFileLoadingError(msg);
                                        return;
                                    }
                                    if (dsIndicatorLength !== indicatorMapLength) {
                                        msg = 'Decision strategy :"' + decisionStrategyArray.name + '" contains more indicators than the loaded indicator files.';
                                        console.error(msg);
                                        $scope.showDsFileLoadingError(msg);
                                        return;
                                    }
                                } else {
                                    $scope.showCfFileLoadingError('Wrong Criteria Function File Format');
                                }
                            }
                        }

                        $scope.decisionStrategies = decisionStrategyArray;
                        console.log(decisionStrategyArray.length + ' decision strategies loaded');
                    } else {
                        msg = 'decision strategy object is not an array or empty';
                        console.log(msg + ': ' + decisionStrategyArray.toString());
                        $scope.showCfFileLoadingError('msg');
                    }
                };

                onSeamlessEvent = function (eventData) {
                    console.log('load node from node id: ' + eventData.nodeId);

                    // FIXME: This is only for testing purposes! We load load the JSON from the 
                    // IA/RA EU-GL step, but ir should come from the Data Package or EMIKAT REST API!
                    drupalRestApi.getNode(eventData.nodeId).then(function (node) {
                        var indicatorArray = drupalService.nodeHelper.getIndicatorArray(node);
                        var criteriaFunctionArray = drupalService.nodeHelper.getCriteriaFunction(node);
                        var decisionStrategyArray = drupalService.nodeHelper.getDecisionStrategy(node);
                        loadIndicatorObjects(indicatorArray);
                        loadCriteriaFunctions(criteriaFunctionArray);
                        loadDecisionStrategies(decisionStrategyArray);
                    }, function (error) {
                        console.log(error.data.message);
                        showIndicatorFileLoadingError(error.data.message.toString());
                    });

                    // FIXME: get scenario and view ids from Data Package
                    emikatRestApi.getImpactScenario(2846, 2812).then(function (impactScenario) {
                        //TODO: do something useful here!
                        console.log(impactScenario);
                    }, function (error) {
                        console.log(error.message);
                    });
                };

                /*
                 * When the newFile property has changed the User want's to add a new list of files.
                 */
                $scope.$watch('iccObjects', function (newVal, oldVal) {
                    var i, file, reader;
                    if (!angular.equals(newVal, oldVal) && newVal) {
                        showFileLoading();

                        for (i = 0; i < $scope.iccObjects.length; i++) {

                            file = $scope.iccObjects[i];

                            reader = new FileReader();
                            reader.onload = onloadIccObjects(file);
                            try {
                                //we assume that the file is utf-8 encoded
                                reader.readAsText(file);
                            } catch (err) {
                                // show an error in the gui...
                                showIndicatorFileLoadingError(err.toString());
                                console.error(err.toString());
                            }

                        }
                    }
                }, true);

                $scope.$watch('cfConfigFile', function () {
                    var file;
                    $scope.cfFileLoadError = false;
                    $scope.loadedCfFile = false;
                    if ($scope.cfConfigFile) {
                        showFileLoading();

                        file = $scope.cfConfigFile[0];

                        var reader = new FileReader();
                        reader.onload = onloadCfFile(file);

                        try {
                            //we assume that the file is utf-8 encoded
                            reader.readAsText(file);
                        } catch (err) {
                            // show an error in the gui...
                            console.error('Could not read Criteria Function Config File: ' + file.name);
                            console.error(err.toString());
                        }
                    }

                }, true);

                $scope.$watch('dsConfigFile', function () {
                    var file;
                    $scope.dsFileLoadError = false;
                    $scope.loadedDsfFile = false;
                    if ($scope.dsConfigFile) {
                        showFileLoading();

                        file = $scope.dsConfigFile[0];

                        var reader = new FileReader();
                        reader.onload = onloadDsFile(file);

                        try {
                            //we assume that the file is utf-8 encoded
                            reader.readAsText(file);
                        } catch (err) {
                            // show an error in the gui...
                            console.error('Could not read Decision Strategy Config File: ' + file.name);
                            console.error(err.toString());
                        }

                    }

                }, true);

                // if local file /scripts/.local.js exists, load some test data
                if (window.emikatProperties) {
                    console.warn('/scripts/.local.js found, loading test data');
                    emikatRestApi.getImpactScenario(window.emikatProperties.scenarioId, window.emikatProperties.viewId, window.emikatProperties.credentials).then(function (impactScenario) {
                        //TODO: do something useful here!
                        console.log(impactScenario);
                        var worldstates = drupalService.emikatHelper.transformImpactScenario(impactScenario);
                        console.log(JSON.stringify(worldstates));
                        
                        // this is a total mess: worldstates object is awkwardly modified modified by infamous ICCM_Helper
                        loadIndicatorObjects(worldstates);
                    }, function (error) {
                        console.log(error.message);
                    });
                }
            }
        ]
        );


