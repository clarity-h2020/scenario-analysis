angular.module(
        'eu.myclimateservice.csis.scenario-analysis.controllers'
        ).controller(
        'eu.myclimateservice.csis.scenario-analysis.controllers.CriteriaFunctionManagerDirectiveController',
        [
            '$scope',
            'de.cismet.crisma.ICMM.Worldstates',
            function ($scope, Worldstates) {
                'use strict';
                var onloadDsFile;
                $scope.editable = [];
                $scope.indicators = [];
                $scope.currentIntervalFunctions = [];
                $scope.selectedCriteriaFunctionIndex = -1;
                $scope.tooltipDelete = {
                    title: 'Delete this criteria function'
                };
                $scope.tooltipAdd = {
                    normaltitle: 'Create a new criteria function',
                    disabledTitle: 'Can not create criteria function. Select a worldstate first',
                    title: ''
                };
                $scope.tooltipSave = {
                    title: 'Save changes'
                };
                $scope.tooltipRename = {
                    title: 'Rename criteria function'
                };
                $scope.tooltipRenameDone = {
                    title: 'Done'
                };
                $scope.tooltipImportFromFile = {
                    title: 'Import Criteria Function from File'
                };

                $scope.addCriteriaFunction = function () {
                    var i, j, createCritriaFunction = true, criteriaFunctions = [];
                    if ($scope.listItemsDisabled) {
                        return;
                    }
                    for (i = 0; i < $scope.indicators.length; i++) {
                        // FIXME: displayName is the uinque key, in criteria functions manager UI avoid duplicate entries
                        if (criteriaFunctions.length > 0) {
                            for (j = 0; j < criteriaFunctions.length; j++) {
                                if (criteriaFunctions[j].indicator === $scope.indicators[i].displayName) {
                                    createCritriaFunction = false;
                                    break;
                                }
                            }
                        }
                        
                        if (createCritriaFunction === true) {
                            //console.log($scope.indicators[i].displayName + ' -> ' + $scope.indicators[i].iconResource);
                            criteriaFunctions.push({
                                indicator: $scope.indicators[i].displayName,
                                iconResource: $scope.indicators[i].iconResource,
                                lowerBoundary: {
                                    criteriaValue: 0,
                                    indicatorValue: 0
                                },
                                upperBoundary: {
                                    criteriaValue: 100,
                                    indicatorValue: 0
                                },
                                intervals: []
                            });
                            //console.debug('create criteriaFunctions['+j+'/'+ criteriaFunctions.length+'].'+criteriaFunctions[j].indicator + 
                            //                ' = '+ 'indicators['+i+'/'+$scope.indicators.length+'].'+$scope.indicators[i].displayName);
                        }
                        createCritriaFunction = true;
                    }

                    $scope.criteriaFunctionSet.push({
                        name: 'Criteria function ' + ($scope.criteriaFunctionSet.length + 1),
                        criteriaFunctions: criteriaFunctions
                    });
                    $scope.editable.push(false);
                };

                $scope.removeCriteriaFunction = function () {
                    $scope.criteriaFunctionSet.splice($scope.selectedCriteriaFunctionIndex, 1);
                };

                $scope.getListItemClass = function (index) {
                    var classList = 'list-group-item';
                    if ($scope.listItemsDisabled) {
                        classList += ' disabled';
                    }
                    if ($scope.selectedCriteriaFunctionIndex === index) {
                        classList += ' list-group-item-info';
                    }
                    return classList;
                };

                $scope.setSelectedCriteriaFunction = function (index) {
                    if (!$scope.listItemsDisabled) {
                        $scope.selectedCriteriaFunctionIndex = index;
                        $scope.currentCriteriaFunction = $scope.criteriaFunctionSet[$scope.selectedCriteriaFunctionIndex];
                    }
                };

                $scope.getButtonStyle = function () {
                    return {
                        'color': $scope.listItemsDisabled ? '#CCC' : '#fff'
                    };
                };

                $scope.listItemsDisabled = $scope.indicators && $scope.indicators.length <= 0 ? true : false;
                $scope.tooltipAdd.title = $scope.listItemsDisabled ? $scope.tooltipAdd.disabledTitle : $scope.tooltipAdd.normaltitle;
                $scope.$watchCollection('worldstates', function (newVal, oldVal) {
                    var indicatorGroup, indicatorProp, iccObject, group;
                    if (newVal !== oldVal) {
                        if ($scope.worldstates && $scope.worldstates.length === 0) {
                            $scope.indicators = [];
                        } else {
                            if ($scope.indicators.length === 0) {
                                iccObject = Worldstates.utils.stripIccData([$scope.worldstates[0]], false)[0];
                                for (indicatorGroup in iccObject.data) {
                                    if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                        group = iccObject.data[indicatorGroup];
                                        for (indicatorProp in group) {
                                            if (group.hasOwnProperty(indicatorProp)) {
                                                if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                                    $scope.indicators.push(group[indicatorProp]);
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }
                        $scope.listItemsDisabled = $scope.indicators && $scope.indicators.length <= 0 ? true : false;
                        $scope.tooltipAdd.title = $scope.listItemsDisabled ? $scope.tooltipAdd.disabledTitle : $scope.tooltipAdd.normaltitle;
                        if ($scope.listItemsDisaled) {
                            $scope.selectedCriteriaFunctionIndex = -1;
                        }
                    }
                });


                //Import of criteria functions from file
                //check if the File API is available
                $scope.fileAPIAvailable = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

                onloadDsFile = function (theFile) {
                    return function (e) {
                        var cf, indicatorMapLength, indicatorProp, cfIndicatorLength, cfIndicator, indicatorFound, j, msg,
                                referenceIccData, indicatorGroup;
                        try {
                            cf = JSON.parse(e.target.result);
                            indicatorMapLength = 0;
                            referenceIccData = Worldstates.utils.stripIccData([$scope.worldstates[0]])[0].data;
                            for (indicatorGroup in referenceIccData) {
                                if (referenceIccData.hasOwnProperty(indicatorGroup)) {
                                    if (indicatorGroup !== 'displayName' && indicatorGroup !== 'iconResource') {
                                        for (indicatorProp in referenceIccData[indicatorGroup]) {
                                            if (referenceIccData[indicatorGroup].hasOwnProperty(indicatorProp)) {
                                                if (indicatorGroup !== 'displayName' && indicatorGroup !== 'iconResource') {
                                                    indicatorMapLength++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            // we need to check if the criteria Functions defined in the file
                            // match to the indicators of the loaded indicator files...
                            for (indicatorProp in $scope.indicatorMap) {
                                if ($scope.indicatorMap.hasOwnProperty(indicatorProp)) {
                                    cfIndicatorLength = cf.criteriaFunctions.length;
                                    for (j = 0; j < cf.criteriaFunctions.length; j++) {
                                        cfIndicator = cf.criteriaFunctions[j].indicator;
                                        indicatorFound = false;

                                        if ($scope.indicatorMap[indicatorProp].displayName === cfIndicator) {
                                            indicatorFound = true;
                                            break;
                                        }
                                    }
                                    if (!indicatorFound) {
                                        msg = 'Could not find indicator "' + $scope.indicatorMap[indicatorProp].displayName + '" in criteria function "' + cf.name + '"';
                                        console.error(msg);
                                        return;
                                    }
                                    if (cfIndicatorLength !== indicatorMapLength) {
                                        msg = 'Criteria Function :"' + cf.name + '" contains more indicators than the loaded indicator files.';
                                        console.error(msg);
                                        return;
                                    }
                                }
                            }
                            $scope.criteriaFunctionSet.push(cf);
                            $scope.$apply();
                        } catch (err) {
                            // show an error in the gui...
                            console.error('Could not read CriteriaFunction File: ' + theFile.name);
                        }
                    };
                };

                $scope.$watch('criteriaFunctionFile', function (newVal, oldVal) {
                    var i, file, reader;
                    if (!angular.equals(newVal, oldVal) && newVal) {
                        //visualize file loading with an spinner or something else...
                        for (i = 0; i < $scope.criteriaFunctionFile.length; i++) {

                            file = $scope.criteriaFunctionFile[i];

                            reader = new FileReader();
                            reader.onload = onloadDsFile(file);

                            try {
                                //we assume that the file is utf-8 encoded
                                reader.readAsText(file);
                            } catch (err) {
                                // show an error in the gui...
                                console.error('Could not read CriteriaFunction File: ' + file.name);
                            }
                        }

                    }

                });
            }
        ]
        );



