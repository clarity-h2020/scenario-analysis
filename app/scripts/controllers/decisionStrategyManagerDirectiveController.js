angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
    ).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.decisionStrategyManagerDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        'eu.myclimateservice.csis.scenario-analysis.services.AnalysisService',
        function ($scope, Worldstates, AnalysisService) {
            'use strict';
            var onloadDsFile;
            $scope.editable = [];
            $scope.currentIntervalFunctions = [];
            $scope.selectedDecisionStrategyIndex = -1;
            $scope.tooltipDelete = {
                title: 'Delete this decision strategy'
            };
            $scope.tooltipAdd = {
                normaltitle: 'Create a new decision strategy',
                disabledTitle: 'Can not create Decision Strategy. Select a worldstate first',
                title: ''
            };
            $scope.tooltipSave = {
                title: 'Save changes'
            };
            $scope.tooltipRename = {
                title: 'Rename decision strategy'
            };
            $scope.tooltipRenameDone = {
                title: 'Done'
            };
            $scope.tooltipImportFromFile = {
                title: 'Import Criteria Function from File'
            };

            $scope.addDecisionStrategy = function () {
                var i, indicator, criteriaEmphases = [];
                if ($scope.listItemsDisabled) {
                    return;
                }
                for (i = 0; i < $scope.indicatorVector.length; i++) {
                    indicator = $scope.indicatorVector[i];
                    criteriaEmphases.push({
                        indicator: indicator,
                        criteriaEmphasis: 100
                    });
                }
                $scope.decisionStrategies.push({
                    name: 'Decision Strategy ' + ($scope.decisionStrategies.length + 1),
                    criteriaEmphases: criteriaEmphases,
                    satisfactionEmphasis: AnalysisService.getOwa().meanWeights($scope.indicatorVector.length <= 1 ? 1 : $scope.indicatorVector.length)
                });

                $scope.editable.push(false);
            };

            $scope.removeDecisionStrategy = function () {
                $scope.decisionStrategies.splice($scope.selectedDecisionStrategyIndex, 1);
            };

            $scope.getItemStyle = function (index) {
                var c = 'list-group-item';
                if ($scope.selectedDecisionStrategyIndex === index) {
                    c += ' list-group-item-info';
                }
                if ($scope.listItemsDisabled) {
                    c += ' disabled';
                }

                return c;
            };

            $scope.setSelectedDecisionStrategy = function (index) {
                if (!$scope.listItemsDisabled) {
                    $scope.selectedDecisionStrategyIndex = index;
                    $scope.currentDecisionStrategy = $scope.decisionStrategies[$scope.selectedDecisionStrategyIndex];
                }
            };

            $scope.updateModel = function () {
                var i, indicatorGroup, indicatorProp, iccObject, group, alreadyExists;
                $scope.indicatorVector = [];
                for (i = 0; i < $scope.worldstates.length; i++) {

                    iccObject = Worldstates.utils.stripIccData([$scope.worldstates[i]], false)[0];
                    for (indicatorGroup in iccObject.data) {
                        if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                            group = iccObject.data[indicatorGroup];
                            for (indicatorProp in group) {
                                if (group.hasOwnProperty(indicatorProp)) {
                                    if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                        if ($scope.indicatorVector) {
                                            alreadyExists = false;
                                            /*jshint -W083 */
                                            $scope.indicatorVector.forEach(function (item) {
                                                if (item.displayName === group[indicatorProp].displayName) {
                                                    alreadyExists = true;
                                                }
                                            });
                                            if (!alreadyExists) {
                                                $scope.indicatorVector.push(group[indicatorProp]);
                                            }
                                        } else {
                                            $scope.indicatorVector.push(group[indicatorProp]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            $scope.getButtonStyle = function () {
                return {
                    'color': $scope.listItemsDisabled ? '#CCC' : '#fff'
                };
            };

            $scope.worldstates = $scope.worldstates || [];
            $scope.listItemsDisabled = !($scope.worldstates && $scope.worldstates.length > 0);
            $scope.$watch('worldstates', function () {
                $scope.updateModel();
                $scope.listItemsDisabled = !($scope.worldstates && $scope.worldstates.length > 0);
                $scope.tooltipAdd.title = $scope.listItemsDisabled ? $scope.tooltipAdd.disabledTitle : $scope.tooltipAdd.normaltitle;
                if ($scope.listItemsDisabled) {
                    $scope.selectedDecisionStrategyIndex = -1;
                }
            }, true);

            //Import of decision strategies from file
            //check if the File API is available
            $scope.fileAPIAvailable = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

            onloadDsFile = function (theFile) {
                return function (e) {
                    var ds, referenceIccData, indicatorGroup, indicatorMapLength, indicatorProp,
                        dsIndicatorLength, dsIndicator, indicatorFound, msg, j;
                    try {
                        ds = JSON.parse(e.target.result);
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
                                dsIndicatorLength = ds.criteriaFunctions.length;
                                for (j = 0; j < ds.criteriaFunctions.length; j++) {
                                    dsIndicator = ds.criteriaFunctions[j].indicator;
                                    indicatorFound = false;

                                    if ($scope.indicatorMap[indicatorProp].displayName === dsIndicator) {
                                        indicatorFound = true;
                                        break;
                                    }
                                }
                                if (!indicatorFound) {
                                    msg = 'Could not find indicator "' + $scope.indicatorMap[indicatorProp].displayName + '" in criteria function "' + ds.name + '"';
                                    console.error(msg);
                                    return;
                                }
                                if (dsIndicatorLength !== indicatorMapLength) {
                                    msg = 'Criteria Function :"' + ds.name + '" contains more indicators than the loaded indicator files.';
                                    console.error(msg);
                                    return;
                                }
                            }
                        }
                        $scope.decisionStrategies.push(ds);
                        $scope.$apply();
                    } catch (err) {
                        // show an error in the gui...
                        console.error('Could not read Decision Strat File: ' + theFile.name);
                    }
                };
            };

            $scope.$watch('decisionStrategyFile', function (newVal, oldVal) {
                var i, file, reader;
                if (!angular.equals(newVal, oldVal) && newVal) {

                    for (i = 0; i < $scope.decisionStrategyFile.length; i++) {

                        file = $scope.decisionStrategyFile[i];

                        reader = new FileReader();
                        reader.onload = onloadDsFile(file);
                        try {
                            //we assume that the file is utf-8 encoded
                            reader.readAsText(file);
                        } catch (err) {
                            // show an error in the gui...
                            console.error('Could not read Decision Strat File: ' + file.name);
                        }
                    }

                }

            });
        }
    ]
    );



