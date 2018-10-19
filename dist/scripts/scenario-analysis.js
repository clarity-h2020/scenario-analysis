// this is only used for demo/testing purposes
angular.module(
    'eu.crismaproject.worldstateAnalysis.demoApp',
    [
        'eu.crismaproject.worldstateAnalysis.demoApp.controllers',
        'eu.crismaproject.worldstateAnalysis.directives',
        'eu.crismaproject.worldstateAnalysis.services',
        'de.cismet.crisma.widgets.worldstateTreeWidget',
        'ui.bootstrap.tabs',
        'ui.bootstrap.collapse',
        'ui.bootstrap.dropdown',
        'ui.bootstrap.tpls'
    ]
    );

angular.module(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers',
    [
        'de.cismet.crisma.ICMM.config',
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.cids.rest.collidngNames.Nodes',
        'de.cismet.crisma.ICMM.services',
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers',
    [
        'nvd3ChartDirectives',
        'eu.crismaproject.worldstateAnalysis.services',
        'ngDialog',
        'de.cismet.crisma.ICMM.config',
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.criteriaEmphasesController',
    [
        '$scope',
        function ($scope) {
            'use strict';
            var ctrl;

            ctrl = this;

            this.updateCriteriaEmphases = function () {
                var i, item;
                if ($scope.critEmphInternal) {
                    for (i = 0; i < $scope.critEmphInternal.length; i++) {
                        item = $scope.critEmphInternal[i];
                        if ($scope.criteriaEmphases[i]) {
                            $scope.criteriaEmphases[i].criteriaEmphasis = item.criteriaEmphasis;
                        } else {
                            $scope.criteriaEmphases.push({
                                indicator : item.indicator,
                                criteriaEmphasis : item.criteriaEmphasis
                            });
                        }
                    }
                }
            };

            this.updateInternalCriteriaEmphases = function () {
                var critEmphExists, newCritEmphInternal, indicatorName;
                newCritEmphInternal = [];
                for (indicatorName in $scope.indicatorMap) {
                    if ($scope.indicatorMap.hasOwnProperty(indicatorName)) {
                        //check if there is a value for that indicator in the bounded critEmphases
                        critEmphExists = false;
                        if ($scope.criteriaEmphases && $scope.criteriaEmphases.length !== 0) {
                            /*jshint -W083 */
                            $scope.criteriaEmphases.forEach(function (critEmph) {
                                if (critEmph.indicator.displayName === $scope.indicatorMap[indicatorName].displayName) {
                                    critEmphExists = true;
                                    newCritEmphInternal.push(critEmph);
                                }
                            });
                        }
                        // create a default criteriaEmphasis of 100
                        if (!critEmphExists) {
                            newCritEmphInternal.push({
                                indicator: $scope.indicatorMap[indicatorName],
                                criteriaEmphasis: 100
                            });
                        }
                    }
                }
                $scope.critEmphInternal = newCritEmphInternal;
            };

            $scope.$watch('critEmphInternal', function () {
                if (!angular.equals($scope.criteriaEmphases, $scope.critEmphInternal)) {
                    ctrl.updateCriteriaEmphases();
                }
            }, true);

            $scope.knobMax = 100;
            $scope.knobOptions = {
                'width': 100,
                'height': 80,
                'displayInput': true,
                'angleOffset': -125,
                'angleArc': 250
            };

            $scope.criteriaEmphases = $scope.criteriaEmphases || [];
            $scope.indicatorMap = {};
            $scope.$watch('indicatorMap', function () {
                if ($scope.indicatorMap && Object.keys($scope.indicatorMap).length !== 0) {
                    ctrl.updateInternalCriteriaEmphases();
                }
            }, true);

            $scope.$watch('criteriaEmphases', function () {
                if (!angular.equals($scope.criteriaEmphases, $scope.critEmphInternal)) {
                    ctrl.updateInternalCriteriaEmphases();
                    $scope.criteriaEmphases = $scope.critEmphInternal;
                }
            }, true);
        }
    ]
);



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.CriteriaFunctionManagerDirectiveController',
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
                var i, criteriaFunctions = [];
                if ($scope.listItemsDisabled) {
                    return;
                }
                for (i = 0; i < $scope.indicators.length; i++) {
                    criteriaFunctions.push({
                        indicator: $scope.indicators[i].displayName,
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




angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.CriteriaRadarChartDirectiveController',
    [
        '$scope',
        'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
        function ($scope,ccs) {
            'use strict';
            $scope.legendItems = [];
            
            $scope.convertToChartDataStructure = function (indicatorVector) {
                var i, j, indicatorData, groupName, group, criteriaProp,
                    indiactor, result, dataItem,legendItems, criteriaFunction;
                if(!$scope.criteriaFunction){
                    return;
                }
                result = [];
                legendItems = [];
                for (i = 0; i < indicatorVector.length; i++) {
                    dataItem = [];
                    indicatorData = indicatorVector[i].data;
                    legendItems.push(indicatorVector[i].name);
                    for (groupName in indicatorData) {
                        if (indicatorData.hasOwnProperty(groupName)) {
                            group = indicatorData[groupName];
                            for (criteriaProp in group) {
                                if (group.hasOwnProperty(criteriaProp) &&
                                        criteriaProp !== 'displayName' &&
                                        criteriaProp !== 'iconResource') {
                                    indiactor = group[criteriaProp];
                                    for(j=0;j<$scope.criteriaFunction.criteriaFunctions.length;j++){
                                        if($scope.criteriaFunction.criteriaFunctions[j].indicator === indiactor.displayName){
                                            criteriaFunction=$scope.criteriaFunction.criteriaFunctions[j];
                                            break;
                                        }
                                    }
                                    dataItem.push({
                                        axis: $scope.useNumbers ? dataItem.length+1 :indiactor.displayName,
                                        tooltip: indiactor.displayName,
                                        value: Math.round(ccs.calculateCriteria(indiactor.value,criteriaFunction)*100)/100
                                    });
                                }
                            }
                        }
                    }
                    result.push(dataItem);
                }
                return [result,legendItems];
            };
        }
    ]
);



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.DecisionStrategyDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, Worldstates) {
            'use strict';
            var ctrl;

            ctrl = this;

            this.extractIndicators = function (worldstates) {
                var indicatorGroup, indicatorProp, iccObject, group, j, indicatorMap;

                indicatorMap = {};
                $scope.indicatorSize = 0;

                if (worldstates && worldstates.length > 0) {
                    for (j = 0; j < worldstates.length; j++) {
                        iccObject = Worldstates.utils.stripIccData([worldstates[j]], false)[0];
                        for (indicatorGroup in iccObject.data) {
                            if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                group = iccObject.data[indicatorGroup];
                                for (indicatorProp in group) {
                                    if (group.hasOwnProperty(indicatorProp)) {
                                        if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                            if (!indicatorMap[indicatorProp]) {
                                                indicatorMap[indicatorProp] = group[indicatorProp];
                                                $scope.indicatorSize++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return indicatorMap;
            };

            $scope.decisionStrategy = $scope.decisionStrategy || {};
            $scope.indicatorSize = $scope.indicatorSize || 0;
            $scope.indicatorMap = $scope.indicatorMap || {};
            $scope.$watch('worldstates', function () {
                $scope.indicatorMap= ctrl.extractIndicators($scope.worldstates);
            },true);

        }
    ]
    );



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.decisionStrategyManagerDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        'eu.crismaproject.worldstateAnalysis.services.AnalysisService',
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




angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.FileContextProviderDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.services.icmm',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, Icmm, Worldstates) {
            'use strict';
            var showIndicatorFileLoadingError, showFileLoading, onloadIccObjects, onloadCfFile, onloadDsFile;

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
             * (e.g. indicator object, criteriaFunction and decisionStrategy) that are loaded by this directive
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
                $scope.$apply();
            };

            showFileLoading = function () {
                $scope.fileLoadError = false;
                $scope.fileLoading = true;
            };

            $scope.fileLoadError = false;
            $scope.fileLoading = false;

            $scope.showCfFileLoadingError = function (message) {
                $scope.cfFileLoadError = true;
                $scope.cfFileLoadErrorMsg = 'Criteria functions not loaded. ' + message;
                $scope.$apply();
            };

            $scope.showDsFileLoadingError = function (message) {
                $scope.dsFileLoadError = true;
                $scope.dsFileLoadErrorMsg = 'Decision strategies not loaded. ' + message;
                $scope.$apply();
            };

            onloadIccObjects = function (file) {
                return function (e) {
                    var fileObj, worldstateDummy, indicatorProp, indicator, origLoadedIndicators, indicatorGroup,
                        loadedIndicatorLength, indicatorMapLength, containsIndicator, msg;
                    try {
                        fileObj = JSON.parse(e.target.result);
                        /*
                         * accept two differnt kind of files. 
                         * 1. A plain icc data object.
                         * In that case we apply a standard name to this object
                         * 
                         * 2. A worldstate Dummy object that already has a name
                         */

                        if (fileObj.name && fileObj.iccdata) {
                            worldstateDummy = fileObj;
                            origLoadedIndicators = fileObj.iccdata;
                            worldstateDummy.iccdata = {
                                actualaccessinfo: JSON.stringify(worldstateDummy.iccdata)
                            };
                        } else {
                            //generate a uniqe id...
                            origLoadedIndicators = fileObj;
                            worldstateDummy = {
                                name: 'Nonamed indicator data ' + '(filename: ' + file.name + ' )',
                                iccdata: {
                                    actualaccessinfo: JSON.stringify(fileObj)
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
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (!containsIndicator) {
                                    msg = 'Could not load indicator file ' + file.name + '. It contains no indicator data for ' + indicator;
                                    console.error(msg);
                                    showIndicatorFileLoadingError(msg);
                                    return;
                                }
                            }
                        }
                        if (loadedIndicatorLength !== indicatorMapLength) {
                            msg = 'indicator data in file ' + file.name + ' has more indicators defined that the first loaded indicator set.';
                            console.error(msg);
                            showIndicatorFileLoadingError(msg);
                            return;
                        }

                        // we need an id to distinc the icc objects. eg. the ranking table use this id
                        // to keep track of the indicator objects
                        if (!worldstateDummy.id) {
                            worldstateDummy.id = Math.floor((Math.random() * 1000000) + 1);
                        }

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

                        $scope.$apply();

                    } catch (err) {
                        // show an error in the gui...
                        showIndicatorFileLoadingError(err.toString());
                    }
                };
            };

            onloadCfFile = function (theFile) {
                return function (e) {
                    var cfSet, cf, i, j, indicatorProp, indicatorFound, cfIndicator, msg, indicatorMapLength,
                        cfIndicatorLength;
                    try {
                        cfSet = JSON.parse(e.target.result);

                        if (Object.prototype.toString.call(cfSet) === '[object Array]') {
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
                                    for (i = 0; i < cfSet.length; i++) {
                                        cf = cfSet[i];
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
                                            $scope.showCfFileLoadingError(msg);
                                            return;
                                        }
                                        if (cfIndicatorLength !== indicatorMapLength) {
                                            msg = 'Criteria Function :"' + cf.name + '" contains more indicators than the loaded indicator files.';
                                            console.error(msg);
                                            $scope.showCfFileLoadingError(msg);
                                            return;
                                        }
                                    }
                                }
                            }
                            $scope.criteriaFunctions = cfSet;
                            $scope.loadedCfFile = theFile.name;

                        }
                        $scope.$apply();
                    } catch (err) {
                        // show an error in the gui...
                        console.error('Could not read Criteria Function Config File: ' + theFile.name);
                    }
                };
            };

            onloadDsFile = function (theFile) {
                return function (e) {
                    var ds, s, i, j, indicatorProp, indicatorFound, cfIndicator, msg, indicatorMapLength, dsIndicatorLength;
                    try {
                        ds = JSON.parse(e.target.result);

                        if (Object.prototype.toString.call(ds) === '[object Array]') {
                            indicatorMapLength = 0;
                            for (indicatorProp in $scope.indicatorMap) {
                                if ($scope.indicatorMap.hasOwnProperty(indicatorProp)) {
                                    indicatorMapLength++;
                                }
                            }
                            // we need to check if the decision strategies defined in the file
                            // match to the indicators of the loaded indicator files...
                            for (indicatorProp in $scope.indicatorMap) {
                                for (i = 0; i < ds.length; i++) {
                                    s = ds[i];
                                    dsIndicatorLength = s.criteriaEmphases.length;
                                    for (j = 0; j < s.criteriaEmphases.length; j++) {
                                        cfIndicator = s.criteriaEmphases[j].indicator.displayName;
                                        indicatorFound = false;

                                        if ($scope.indicatorMap[indicatorProp].displayName === cfIndicator) {
                                            indicatorFound = true;
                                            break;
                                        }
                                    }
                                    if (s.satisfactionEmphasis.length !== indicatorMapLength) {
                                        msg = 'Satisfaction Emphasis Vector for decision strategy :"' + ds.name + '" contains more elements than indicator are defined';
                                        console.error(msg);
                                        $scope.showDsFileLoadingError(msg);
                                        return;
                                    }
                                    if (!indicatorFound) {
                                        msg = 'Could not find indicator "' + $scope.indicatorMap[indicatorProp].displayName + '" in decision strategy "' + s.name + '"';
                                        console.error(msg);
                                        $scope.showDsFileLoadingError(msg);
                                        return;
                                    }
                                    if (dsIndicatorLength !== indicatorMapLength) {
                                        msg = 'Decision strategy :"' + ds.name + '" contains more indicators than the loaded indicator files.';
                                        console.error(msg);
                                        $scope.showDsFileLoadingError(msg);
                                        return;
                                    }
                                }
                            }
                            $scope.loadedDsfFile = theFile.name;
                            $scope.decisionStrategies = ds;
                        }
                        $scope.$apply();
                    } catch (err) {
                        // show an error in the gui...
                        console.error('Could not read Decision Strategy Config File: ' + theFile.name);
                    }
                };
            };

            /*
             * When the newFile property has changed the User want's to add a new list of files..
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
                        }

                    }

                }
            });

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
                    }

                }

            }, true);
        }
    ]
    );



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IcmmContextProviderDirectiveController',
    [
        '$scope',
        'de.cismet.collidingNameService.Nodes',
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.crisma.ICMM.services.icmm',
        'eu.crismaproject.worldstateAnalysis.services.CriteriaFunction',
        'eu.crismaproject.worldstateAnalysis.services.DecisionStrategies',
        'de.cismet.crisma.ICMM.config.IcmmSettings',
        function ($scope, Nodes, Worldstates, Icmm, CF, DS, IcmmSettings) {
            'use strict';

            // intialisation for the worldstate tree
            $scope.activeItem = {};
            $scope.treeOptions = {
                checkboxClass: 'glyphicon glyphicon-unchecked',
                folderIconClosed: 'icon-world.png',
                folderIconOpen: 'icon-world.png',
                leafIcon: 'icon-world.png',
                imagePath: 'bower_components/crisma-worldstate-tree-widget-angular/dist/images/',
                multiSelection: true
            };
            $scope.treeSelection = [];
            $scope.selectedWorldstates = [];

            Worldstates.query({level: 3, fields: 'id,name,key,iccdata,actualaccessinfo, actualaccessinfocontenttype, categories', deduplicate: false}, function (data) {
                data.forEach(function (ws) {
                    ws = Icmm.convertToCorrectIccDataFormat(ws);
                });
                $scope.worldstates = data;
            });

            $scope.criteriaFunctions = [];
            CF.query(function (data) {
                if (data.length > 0) {
                    $scope.criteriaFunctions = data;
                }
            });
            $scope.selectedCriteriaFunction = $scope.criteriaFunctions[0];
            $scope.showDsPersistSpinner = false;
            $scope.showDsPersistDone = false;
            $scope.decisionStrategies = [];
            DS.query(function (data) {
                $scope.decisionStrategies = data || [];
            });

            // every time the treeSelection changes, we need to determine the
            // corresponding worldstates to the selected nodes. 
            // we assume that the treeSelection watch is only fired as a result of selection
            // or deselection events in the tree.
            $scope.$watchCollection('treeSelection', function (newVal, oldVal) {
                var i, wsId, wsNode, ws, objectKey, isContained;
                if (newVal !== oldVal) {
                    if ($scope.treeSelection.length > $scope.selectedWorldstates.length) {
                        //we need to find the new element in the treeSelection array.
                        for (i = $scope.treeSelection.length - 1; i >= 0; i++) {
                            wsNode = $scope.treeSelection[i];
                            isContained = false;
                            /*jshint -W083 */
                            $scope.selectedWorldstates.forEach(function (val) {
                                objectKey = wsNode.objectKey;
                                wsId = parseInt(objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length));
                                if (parseInt(val.id) === wsId) {
                                    isContained = true;
                                }
                            });
                            if (!isContained) {
                                objectKey = wsNode.objectKey;
                                wsId = objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length);
                                /*jshint -W083 */
                                Worldstates.get({level: 3, fields: 'id,name,key,iccdata,actualaccessinfo, actualaccessinfocontenttype, categories', deduplicate: false, 'wsId': wsId}, function (tmpWs) {
                                    $scope.selectedWorldstates.push(Icmm.convertToCorrectIccDataFormat(tmpWs));
                                });
                                break;
                            }
                        }
                    } else if ($scope.treeSelection.length < $scope.selectedWorldstates.length) {
                        //we need to find the deleted element in the treeSelection array.
                        for (i = 0; i < $scope.selectedWorldstates.length; i++) {
                            ws = $scope.selectedWorldstates[i];
                            isContained = false;
                            /*jshint -W083 */
                            $scope.treeSelection.forEach(function (val) {
                                objectKey = val.objectKey;
                                wsId = parseInt(objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length));
                                if (parseInt(ws.id) === wsId) {
                                    isContained = true;
                                }
                            });
                            if (!isContained) {
                                $scope.selectedWorldstates.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            });

            // Retrieve the top level nodes from the icmm api
            $scope.treeNodes = Nodes.query(function () {
            });


            $scope.backendUrls = [{
                    url: 'http://crisma.cismet.de/icmm_api',
                    domain: 'CRISMA',
                    name: 'crisma.cismet.de'
                }, {
                    url: 'http://localhost:8890',
                    domain: 'CRISMA',
                    name: 'localhost'
                }];

            $scope.selectedIcms = $scope.backendUrls[0];
            $scope.updateSelectedIcms = function (index) {
                $scope.selectedIcms = $scope.backendUrls[index];
            };
            $scope.$watch('selectedIcms', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    IcmmSettings.setIcmmApi($scope.selectedIcms.url);
                    IcmmSettings.setDomain($scope.selectedIcms.domain);
                }
            });
            IcmmSettings.addApiListener(function () {
                $scope.treeSelection = [];
                $scope.worldstates = [];
                $scope.selectedWorldstates = [];
                $scope.treeNodes =[];
                 Nodes.query(function (data) {
                     $scope.treeNodes =data;
                });
                $scope.criteriaFunctions = [];
                CF.query(function (data) {
                    if (data.length > 0) {
                        $scope.criteriaFunctions = data;
                    }
                });
                $scope.decisionStrategies = [];
                DS.query(function (data) {
                    $scope.decisionStrategies = data || [];
                });
                Worldstates.query({level: 3, fields: 'id,name,key,iccdata,actualaccessinfo, actualaccessinfocontenttype, categories', deduplicate: false}, function (data) {
                    data.forEach(function (ws) {
                        ws = Icmm.convertToCorrectIccDataFormat(ws);
                    });
                    $scope.worldstates = data;
                });

            });
        }
    ]
    );



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandDirectiveController',
    [
        '$scope',
        '$timeout',
        'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
        function ($scope, $timeout, ccs) {
            'use strict';
            var initData, criteriaSortFunction;
            initData = {
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 0
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            };

            criteriaSortFunction = function (intervalA, intervalB) {
                return intervalA.criteriaValue - intervalB.criteriaValue;
            };

            if (!$scope.criteriaFunction) {
                $scope.criteriaFunction = initData;
            }

            $scope.criteriaFunction.lowerBoundary = $scope.criteriaFunction.lowerBoundary || initData.lowerBoundary;
            $scope.criteriaFunction.upperBoundary = $scope.criteriaFunction.upperBoundary || initData.upperBoundary;
            $scope.criteriaFunction.intervals = $scope.criteriaFunction.intervals ? ($scope.criteriaFunction.intervals.sort(criteriaSortFunction) || initData.intervals.sort(criteriaSortFunction)) : initData.intervals.sort(criteriaSortFunction);
            $scope.$watch('criteriaFunction', function () {
                if ($scope.criteriaFunction) {
                    $scope.criteriaFunction.lowerBoundary = $scope.criteriaFunction.lowerBoundary || initData.lowerBoundary;
                    $scope.criteriaFunction.upperBoundary = $scope.criteriaFunction.upperBoundary || initData.upperBoundary;
                    $scope.criteriaFunction.intervals = $scope.criteriaFunction.intervals ? ($scope.criteriaFunction.intervals.sort(criteriaSortFunction) || initData.intervals.sort(criteriaSortFunction)) : initData.intervals.sort(criteriaSortFunction);
                }
            }, true);


            $scope.getIntervalColor = function (interval) {

                var colorClass, colorValue;
                colorValue = ccs.getColor(interval, $scope.criteriaFunction);
                switch (colorValue) {
                    case '#B5F4BC':
                        colorClass = 'color-b';
                        break;
                    // C_FEELING_ORANGE;
                    case '#FFBA6B':
                        colorClass = 'color-c';
                        break;
                        //D_AFFINITY;
                    case '#FF9F80':
                        colorClass = 'color-d';
                        break;
                        //E_ORANGE_SHERBERT;
                    case '#FFC48C':
                        colorClass = 'color-e';
                        break;
                        // F_PEACE_BABY_YELLOW;
                    case '#FFDC8A':
                        colorClass = 'color-f';
                        break;
                        //G_JAYANTHI;
                    case '#FFF19E':
                        colorClass = 'color-g';
                        break;
                        //H_HONEY_DO;
                    case '#EFFAB4':
                        colorClass = 'color-h';
                        break;
                        //I_SPLASH_OF_LIME;
                    case '#D1F2A5':
                        colorClass = 'color-i';
                        break;
                }

                return colorClass;
            };

            $scope.deleteInterval = function (interval) {
                var index = $scope.criteriaFunction.intervals.indexOf(interval);
                $scope.criteriaFunction.intervals.splice(index, 1);
            };

            $scope.updateLowerBoundary = function (indicatorVal) {
                $scope.criteriaFunction.lowerBoundary.indicatorValue = indicatorVal;
            };

            $scope.updateUpperBoundary = function (indicatorVal) {
                $scope.criteriaFunction.upperBoundary.indicatorValue = indicatorVal;
            };

            $scope.$on('band-item-removed', function (args, interval) {
                if (args.targetScope !== $scope) {
                    $scope.$broadcast('band-item-removed');
                } else {
                    $scope.deleteInterval(interval);
                }
            });

            $scope.createInterval = function (criteriaVal, indicatorVal) {
                var newInterval = {
                    criteriaValue: criteriaVal,
                    indicatorValue: indicatorVal
                };
                $scope.criteriaFunction.intervals.push(newInterval);
                $scope.criteriaFunction.intervals.sort(criteriaSortFunction);
                $scope.$broadcast('band-item-added');
            };

            // needed to place the interval marker at the rigth position
            $scope.getIntervalWidth = function (interval, previousInterval) {
                var sumBefore = 0;
                if (previousInterval) {
                    sumBefore = previousInterval.criteriaValue || 0;
                }
                if (interval && interval.criteriaValue) {
                    return {
                        width: (interval.criteriaValue - sumBefore) + '%'
                    };
                }
                return {
                    width: (100 - sumBefore) + '%'
                };
            };
        }
    ]
    );



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandItemDirectiveController',
    [
        '$scope',
        '$filter',
        '$element',
        '$timeout',
        function ($scope, $filter, $element, $timeout) {
            'use strict';
            $scope.actualHeightExceeded = false;
            $scope.getElementHeight = function () {
                return $element.height();
            };
            $scope.getElementWidth = function () {
                return $element.width();
            };
            $scope.checkActualHeight = function () {
                $timeout(function () {
                    var childElem = $scope.lowerBoundary || $scope.upperBoundary ? $element.children()[0] : $element.children()[1];
                    if (angular.element(childElem).height() > angular.element($element.parent()).height()) {
                        $scope.actualHeightExceeded = true;
                    } else {
                        if ($scope.actualHeightExceeded) {
                            $timeout(function () {
                                $scope.checkActualHeight();
                            });
                        }
                        $scope.actualHeightExceeded = false;
                    }
                }, 500);
            };
            $scope.actualHeightExceeded = false;
            $scope.checkActualHeight();

            $scope.$on('band-item-added', function () {
                $scope.checkActualHeight();
            });

            $scope.$on('band-item-removed', function () {
                $scope.checkActualHeight();
            });

            $scope.getCriteriaSuggestion = function () {
                var criteriaSuggestion;
                if (!$scope.interval || $scope.upperBoundary) {
                    criteriaSuggestion = 100;
                } else if ($scope.lowerBoundary) {
                    criteriaSuggestion = 0;
                } else {
                    if (!$scope.previousInterval) {
                        criteriaSuggestion = ($scope.interval.criteriaValue) / 2;
                    } else {
                        criteriaSuggestion = $scope.previousInterval.criteriaValue + ($scope.interval.criteriaValue - $scope.previousInterval.criteriaValue) / 2;
                    }
                }
                return criteriaSuggestion;
            };
            $scope.$on('tooltip.show.before', function () {
                $scope.popOverItem.criteriaValue = $scope.getCriteriaSuggestion();
                $scope.popOverItem.indicatorValue= $scope.interval.indicatorValue || 0;
            });
            $scope.minWidth = 80;
            var indicatorVal = $scope.interval ? $scope.interval.indicatorValue || 0 : 0;
            $scope.popOverItem = {
                criteriaValue: $scope.getCriteriaSuggestion(),
                indicatorValue: indicatorVal
            };
            $scope.getPercent = function () {
                var sumBefore = 0;
                if ($scope.lowerBoundary || $scope.upperBoundary) {
                    return 100;
                }
                if ($scope.previousInterval) {
                    sumBefore = $scope.previousInterval.criteriaValue || 0;
                }
                if ($scope.interval && ($scope.interval.criteriaValue || $scope.interval.criteriaValue === 0)) {
//                    return  Math.floor(($scope.interval.criteriaValue - sumBefore))
                    if (sumBefore > $scope.interval.criteriaValue) {
                        throw new Error('The criteriaValue of the previous interval can not be higher than the criteriaValue of the current Interval');
                    }
                    return ($scope.interval.criteriaValue - sumBefore);
                }
                if (sumBefore > 100) {
                    throw new Error('The criteriaValue of the previous interval can not be higher than the criteriaValue of the current Interval');
                }
                return (100 - sumBefore);
            };
            $scope.intervalWidth = function () {
                var percentage = $scope.getPercent();
                return {
                    width: percentage + '%'
                };
            };
            $scope.getColorClass = function () {
                if ($scope.lowerBoundary) {
                    return 'color-a';
                }
                if ($scope.upperBoundary) {
                    return 'color-j';
                }
                return $scope.getColor({interval: $scope.interval});
            };
            $scope.del = function (interval) {
                $scope.$emit('band-item-removed', interval);
                $scope.tooltip = {
                    title: $scope.getTooltipTitle(),
                    checked: false
                };
            };
            $scope.updateInterval = function (event) {
                $scope.onIntervalChanged({
                    criteriaValue: $scope.popOverItem.criteriaValue,
                    indicatorValue: $scope.popOverItem.indicatorValue
                });
                $scope.hidePopover();
                //this is necessary to avoid poping up the poover for the new created interval
                event.stopPropagation();
                $timeout(function(){
                    $scope.tooltip = {
                        title: $scope.getTooltipTitle(),
                        checked: false
                    };
                });
            };
            $scope.getTooltipTitle = function () {
                var title = '';
                title += 'Criteria: ';
                if ($scope.lowerBoundary) {
                    title += '0%';
                } else if ($scope.upperBoundary) {
                    title += '100%';
                } else {
                    title += ($scope.previousInterval.criteriaValue || '0') + '% -' + $scope.interval.criteriaValue + '%';
                }
                title += '\n Indicator Values: ';
                if ($scope.lowerBoundary) {
                    title += '<= ' + ($scope.interval ? $scope.interval.indicatorValue || 0 : 0);
                } else if ($scope.upperBoundary) {
                    title += '>= ' + ($scope.interval ? $scope.interval.indicatorValue || 0 : 0);
                } else {
                    title += ($scope.previousInterval ? $scope.previousInterval.indicatorValue || 0 : 0) + '- ' + $scope.interval.indicatorValue;
                }
                return title;
            };
            if ($scope.previousInterval && $scope.interval) {

                $scope.tooltip = {
                    title: $scope.getTooltipTitle(),
                    checked: false
                };
            }
        }
    ]
);



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.indicatorBarChartDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        '$filter',
        function ($scope, WorldstateService, $filter) {
            'use strict';
            var ctrl, formatValueFunc;
            ctrl = this;
            formatValueFunc = d3.format('.3s');

            this.createChartModels = function () {
                var i, indicatorMap, indicators, indicatorGroup, indicatorGroupProp, indicatorProp;
                indicatorMap = {};
                for (i = 0; i < $scope.worldstates.length; i++) {
                    indicators = WorldstateService.utils.stripIccData([$scope.worldstates[i]])[0].data;
                    for (indicatorGroupProp in indicators) {
                        if (indicators.hasOwnProperty(indicatorGroupProp)) {
                            indicatorGroup = indicators[indicatorGroupProp];
                            for (indicatorProp in indicatorGroup) {
                                if (indicatorGroup.hasOwnProperty(indicatorProp) && indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                    if (!indicatorMap[indicatorProp]) {
                                        indicatorMap[indicatorProp] = {
                                            key: indicatorGroup[indicatorProp].displayName,
                                            forceY: [0, 0],
                                            values: []
                                        };
                                    }
                                    if (parseInt(indicatorGroup[indicatorProp].value) > indicatorMap[indicatorProp].forceY) {
                                        indicatorMap[indicatorProp].forceY[1] = parseInt(indicatorGroup[indicatorProp].value);
                                    }
                                    indicatorMap[indicatorProp].values.push([$scope.worldstates[i].name, parseInt(indicatorGroup[indicatorProp].value)]);
                                }
                            }
                        }
                    }
                }
                var a = [];
                for (indicators in indicatorMap) {
                    if (indicatorMap.hasOwnProperty(indicators)) {
                        a.push([indicatorMap[indicators]]);
                    }
                }
                $scope.chartModels = a;
            };

            var colorCategory = d3.scale.category20().range();
            $scope.colorFunction = function () {
                return function (d, i) {
                    return colorCategory[i % colorCategory.length];
                };
            };

            $scope.yAxisTickFormat = function (d) {
                var d3String = formatValueFunc(d);

                return d3String.replace('M', 'Mio').replace('G', 'Mrd').replace('T', 'B');
            };

            $scope.toolTipContentFunction = function () {
                return function (key, x, y, e) {
                    return '<h3 style="font-weight:normal; font-size:18px">' + x + '</h3>' +
                        '<p>' + key + ': ' + $filter('number')(e.value) + '</p>';
                };
            };

            $scope.getLegendColor = function ($index) {
                return {
                    'color': $scope.colorFunction()(0, $index)
                };
            };

            $scope.$watch('worldstates', function () {
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    ctrl.createChartModels();
                }
            }, true);
        }
    ]
);




angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaAxisChooserDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';

            var getAxisProperties, xAxis, defaultAxis;
            xAxis = $scope.isXAxis === 'true';
            defaultAxis = {
                name: xAxis ? 'Select a x-axis' : 'Select a y-axis'
            };
            getAxisProperties = function (iccData) {
                var group, axesGroup, prop, res = [];
                if (iccData) {
                    var worldstateIccData = iccData.data;
                    for (group in worldstateIccData) {
                        if (worldstateIccData.hasOwnProperty(group)) {
                            axesGroup = worldstateIccData[group];
                            res.push({
                                name: axesGroup.displayName,
                                icon: axesGroup.iconResource,
                                isGroup: true
                            });
                            for (prop in axesGroup) {
                                if (axesGroup.hasOwnProperty(prop)) {
                                    if (prop !== 'displayName' && prop !== 'iconResource') {
                                        res.push({
                                            name: axesGroup[prop].displayName,
                                            icon: axesGroup[prop].iconResource,
                                            isGroup: false
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                return res;
            };

            if (!$scope.selectedAxis) {
                $scope.selectedAxis = defaultAxis;
            }

            $scope.scales = [];

            $scope.axisSelected = function (index) {
                if ($scope.scales[index]) {
                    $scope.selectedAxis = $scope.scales[index];
                } else {
                    $scope.selectedAxis = defaultAxis;
                }
            };

            $scope.$watch('iccObject', function () {
                if ($scope.iccObject) {
                    $scope.scales = getAxisProperties($scope.iccObject);
                }
            });
        }
    ]
);



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaTableDirectiveController',
    [
        '$scope',
        '$filter',
        'de.cismet.crisma.ICMM.Worldstates',
        'ngTableParams',
        'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
        function ($scope, $filter, WorldstateService, NgTableParams, ccs) {
            'use strict';
            var getOrderedProperties = function (obj) {
                var p, keys;
                keys = [];
                for (p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        keys.push(p);
                    }
                }
                keys.sort();
                return keys;
            },
                updateTable = function () {
                    var field, group, i, iccData, j, k_outer, k_inner, keys_outer, keys_inner, prop, val,
                        criteriaFunction, k, unit, indicatorVector;

                    indicatorVector = WorldstateService.utils.stripIccData($scope.worldstates);

                    if (!(!$scope.worldstates || $scope.worldstates.length === 0)) {
                        $scope.rows = [];
                        $scope.columns = [{
                                title: $scope.forCriteria ? 'Level of satisfaction (higher is better)' : 'Indicators',
                                field: 'f1',
                                visible: true
                            }];
                        j = 0;
                        iccData = indicatorVector[0].data;
                        keys_outer = getOrderedProperties(iccData);
                        for (k_outer = 0; k_outer < keys_outer.length; ++k_outer) {
                            group = iccData[keys_outer[k_outer]];
                            $scope.rows[j++] = {
                                f1: {
                                    name: group.displayName,
                                    icon: group.iconResource
                                }
                            };
                            keys_inner = getOrderedProperties(group);
                            for (k_inner = 0; k_inner < keys_inner.length; ++k_inner) {
                                prop = keys_inner[k_inner];
                                if (prop !== 'displayName' && prop !== 'iconResource') {
                                    $scope.rows[j++] = {
                                        f1: {
                                            name: group[prop].displayName,
                                            icon: group[prop].iconResource
                                        }
                                    };
                                }
                            }
                        }
                        for (i = 0; i < indicatorVector.length; ++i) {
                            field = 'f' + (i + 2);
                            $scope.columns.push({
                                title: indicatorVector[i].name,
                                field: field,
                                visible: true
                            });
                            iccData = indicatorVector[i].data;
                            j = 0;
                            keys_outer = getOrderedProperties(iccData);
                            for (k_outer = 0; k_outer < keys_outer.length; ++k_outer) {
                                group = iccData[keys_outer[k_outer]];
                                $scope.rows[j++][field] = null;
                                keys_inner = getOrderedProperties(group);
                                for (k_inner = 0; k_inner < keys_inner.length; ++k_inner) {
                                    prop = keys_inner[k_inner];
                                    unit = $scope.forCriteria ? '% LoS' : group[prop].unit;
                                    if (prop !== 'displayName' && prop !== 'iconResource') {
                                        if ($scope.forCriteria) {
                                            for (k = 0; k < $scope.criteriaFunction.criteriaFunctions.length; k++) {
                                                if ($scope.criteriaFunction.criteriaFunctions[k].indicator === group[prop].displayName) {
                                                    criteriaFunction = $scope.criteriaFunction.criteriaFunctions[k];
                                                    break;
                                                }
                                            }
                                            val = ccs.calculateCriteria(group[prop].value, criteriaFunction);
                                        } else {
                                            val = group[prop].value;
                                        }
                                        
                                        // check if val is an integer.
                                        if (val % 1 === 0) {
                                            val = $filter('number')(val, 0);
                                        }else{
                                            val = $filter('number')(val, 2);
                                        }
                                        $scope.rows[j++][field] = {name: val + ' ' + unit};
                                    }
                                }
                            }
                        }
                    }
                    if ($scope.tableParams) {
                        $scope.tableParams.reload();
                    } else {
                        $scope.tableParams = new NgTableParams({
                            page: 1,
                            count: 10000
                        }, {
                            counts: [],
                            total: $scope.worldstates.length,
                            getData: function ($defer, params) {
                                if ($scope.worldstates.length <= 0) {
                                    return null;
                                }
                                $defer.resolve($scope.rows.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        });
                    }
                };

            $scope.tableVisibleSwitch = '0';
            $scope.isGroupRow = function (row) {
                return row.f2 === null;
            };

            $scope.getRowStyle = function (index) {
                var row = $scope.rows[index],
                    groupRowStyle = {
                        'font-weight': 'bold'
                    };
                return $scope.isGroupRow(row) ? groupRowStyle : '';
            };

            $scope.getCellStyle = function (index) {
                var dataCellStyle = {
                    'text-align': 'right'
                };
                return index > 0 ? dataCellStyle : '';
            };

            $scope.$watchCollection('worldstates', function () {
                if ($scope.worldstates && $scope.worldstates.length>0) {
                    if ($scope.forCriteria && !$scope.criteriaFunction) {
                        return;
                    }
                    updateTable();
                }
            });
            $scope.$watch('forCriteria', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates) {
                    if ($scope.forCriteria && !$scope.criteriaFunction) {
                        return;
                    }
                    updateTable();
                }
            });

            $scope.$watch('criteriaFunction', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates && $scope.criteriaFunction) {
                    updateTable();
                }
            }, true);
        }
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.levelOfEmphasisDirectiveController',
    [
        '$scope',
        'eu.crismaproject.worldstateAnalysis.services.AnalysisService',
        function ($scope, AnalysisService) {
            'use strict';
            var controller, owa, i;

            controller = this;
            owa = AnalysisService.getOwa();

            this.updateLseVectors = function () {
                if ($scope.indicatorSize >= 1) {
                    controller.onlyPositiveLse = [];
                    for (i = 0; i < $scope.indicatorSize; i++) {
                        if (i === 0) {
                            this.onlyPositiveLse[i] = 1;
                        } else {
                            this.onlyPositiveLse[i] = 0;
                        }
                    }
                    controller.overEmphPosLse = owa.hLSWeights($scope.indicatorSize <= 1 ? 1 : $scope.indicatorSize);
                    controller.neutralLse = owa.meanWeights($scope.indicatorSize <= 1 ? 1 : $scope.indicatorSize);
                    controller.overEmphNegLse = owa.lLSWeights($scope.indicatorSize <= 1 ? 1 : $scope.indicatorSize);
                    controller.onlyNegativeLse = [];
                    for (i = 0; i < $scope.indicatorSize; i++) {
                        if (i === $scope.indicatorSize - 1) {
                            controller.onlyNegativeLse[i] = 1;
                        } else {
                            controller.onlyNegativeLse[i] = 0;
                        }
                    }
                }
            };
            this.updateSatisfactionEmphasis = function (lse) {
                var weights;
                switch (parseInt(lse)) {
                    case -2:
                        {
                            weights = controller.onlyNegativeLse;
                            break;
                        }
                    case -1:
                        {
                            weights = controller.overEmphNegLse;
                            break;
                        }
                    case 0:
                        {
                            weights = controller.neutralLse;
                            break;
                        }
                    case 1:
                        {
                            weights = controller.overEmphPosLse;
                            break;
                        }
                    case 2:
                        {
                            weights = controller.onlyPositiveLse;
                            break;
                        }

                }
                return weights;
            };

            this.satisfactionEmphasisEquals = function (v1, v2) {
                var i;
                if (v1 && v2) {
                    if (v1.length === v2.length) {
                        for (i = 0; i < v1.length; i++) {
                            if (v1[i] !== v2[i]) {
                                return false;
                            }
                        }
                        return true;
                    }
                }
                return false;
            };

            this.updateInternalModel = function (satisfactionEmphVector) {
                if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.onlyNegativeLse)) {
                    return -2;
                } else if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.overEmphNegLse)) {
                    return -1;
                } else if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.neutralLse)) {
                    return 0;
                } else if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.overEmphPosLse)) {
                    return 1;
                } else if (controller.satisfactionEmphasisEquals(satisfactionEmphVector, this.onlyPositiveLse)) {
                    return 2;
                }
                return 0;
            };

            controller.updateLseVectors();
            if ($scope.indicatorSize >= 1) {
                $scope.model = {
                    lse: $scope.satisfactionEmphasis ? controller.updateInternalModel($scope.satisfactionEmphasis) : 0
                };
            }
            $scope.satisfactionEmphasis = $scope.satisfactionEmphasis || controller.updateSatisfactionEmphasis(0);
            $scope.$watch('model', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.indicatorSize >= 1) {
                    $scope.satisfactionEmphasis = controller.updateSatisfactionEmphasis($scope.model.lse);
                }
            }, true);

            $scope.$watch('satisfactionEmphasis', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.indicatorSize >= 1) {
                    $scope.model.lse = controller.updateInternalModel($scope.satisfactionEmphasis);
                }
            }, true);

            $scope.$watch('indicatorSize', function () {
                controller.updateLseVectors();
                if ($scope.indicatorSize >= 1) {

                    if (!($scope.model && $scope.model.lse)) {
                        $scope.model = {
                            lse: $scope.satisfactionEmphasis ? controller.updateInternalModel($scope.satisfactionEmphasis) : 0
                        };
                    }
                    $scope.satisfactionEmphasis = controller.updateSatisfactionEmphasis($scope.model.lse);
                }
            }, true);
        }
    ]
    );



angular.module(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.cids.rest.collidngNames.Nodes',
        'de.cismet.crisma.ICMM.services',
        'ui.bootstrap.tabs',
        'ui.bootstrap.collapse',
        'ui.bootstrap.tpls'
    ]
    ).controller(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers.MainController',
    [
        '$scope',
        '$timeout',
        'eu.crismaproject.worldstateAnalysis.services.IcmmPersistanceService',
        'eu.crismaproject.worldstateAnalysis.services.FilesPersistanceService',
        'ngDialog',
        function ($scope, $timeout, IcmmPersistanceService, FilesPersistanceService, ngDialog) {
            'use strict';

            var createChartModels;
            // we bind to the container object since the provider directives are nested in angular-bootstrap tabs
            // tabs create a own scope and thus override every "simple" property. using an container object the binding
            // stll works...
            $scope.container = {};
            $scope.forCriteriaTable = false;
            $scope.container.chartModels = [];
            $scope.icmmTabCollapsed = false;
            $scope.filesTabCollapsed = false;

            $scope.openRadarModal = function (index) {
                var childScope;
                childScope = $scope.$new();
                childScope.ws = $scope.container.chartModels[index];
                childScope.criteriaFunction = $scope.container.selectedCriteriaFunction;
                ngDialog.open({
                    template: 'templates/criteriaRadarPopupTemplate.html',
                    scope: childScope,
                    className: 'ngdialog-theme-default ngdialog-theme-custom ngdialog-theme-width'
                });
            };

            createChartModels = function () {
                var j, modelArr;
                $scope.container.chartModels = [];
                if ($scope.container.worldstates && $scope.container.worldstates.length > 0) {
                    for (j = 0; j < $scope.container.worldstates.length; j++) {
                        modelArr = [];
                        if ($scope.container.worldstates[j]) {
                            modelArr.push($scope.container.worldstates[j]);
                        }
                        if ($scope.container.worldstateRef) {
                            modelArr = modelArr.concat($scope.container.worldstateRef);
                        }
                        $scope.container.chartModels.push(modelArr);
                    }
                }
            };

            $scope.$watch('container.worldstateRef', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    createChartModels();
                }
            });
            $scope.$watchCollection('container.worldstates', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.container.worldstates) {
                    createChartModels();
                }
            });

            $scope.updateSelectedCriteriaFunction = function (index) {
                $scope.container.selectedCriteriaFunction = $scope.container.criteriaFunctions[index];
            };

            $scope.updateSelectedDecisionStrategy = function (index) {
                $scope.container.selectedDecisionStrategy = $scope.container.decisionStrategies[index];
            };

            $scope.persistCriteriaFunctions = function () {
                $scope.showPersistSpinner = true;
                $scope.showPersistDone = false;
                $timeout(function () {
                    if ($scope.icmmTabVisible) {
                        IcmmPersistanceService.persistCriteriaFunctions($scope.container.criteriaFunctions);
                    } else {
                        FilesPersistanceService.persistCriteriaFunctions($scope.container.criteriaFunctions);
                    }

                    $scope.showPersistSpinner = false;
                    $scope.showPersistDone = true;
                    $timeout(function () {
                        $scope.showPersistDone = false;
                    }, 1500);
                }, 500);

            };

            $scope.indicatorVector = [];

            $scope.showDsPersistSpinner = false;
            $scope.showDsPersistDone = false;

            $scope.persistDecisionStrategies = function () {
                $scope.showDsPersistSpinner = true;
                $scope.showDsPersistDone = false;
                $timeout(function () {
                    if ($scope.icmmTabVisible) {
                        IcmmPersistanceService.persistDecisionStrategies($scope.container.decisionStrategies);
                    } else {
                        FilesPersistanceService.persistDecisionStrategies($scope.container.decisionStrategies);
                    }
                    $scope.showDsPersistSpinner = false;
                    $scope.showDsPersistDone = true;
                    $timeout(function () {
                        $scope.showDsPersistDone = false;
                    }, 1500);
                }, 500);
            };

            $scope.indicatorVector = [];

            /*
             * Since we want to showcase the icmm based context provider as well as the file based context provider
             * we need to update the bindings for the analysis widgets everyt time the user switches between 
             * the icmm and the file tab.
             * The following code is not needed if only one of both context providers is used.
             */

            function watchIcmmWs () {
                return $scope.$watch('container.worldstatesIcmm', function () {
                    $scope.container.worldstates = $scope.container.worldstatesIcmm;
                });
            }

            $scope.derigsterIcmmWsWatch = watchIcmmWs();

            function watchFilesWs () {
                return $scope.$watch('container.worldstatesFiles', function () {
                    $scope.container.worldstates = $scope.container.worldstatesFiles;
                });
            }

            // refWorldstate watches
            function watchRefWsIcmm () {
                return $scope.$watch('container.refWorldstatesIcmm', function () {
                    $scope.container.refWorldstates = $scope.container.refWorldstatesIcmm;
                });
            }

            $scope.derigsterRefWsIcmmWatch = watchRefWsIcmm();

            function watchRefWsFiles () {
                return $scope.$watch('container.refWorldstatesFiles', function () {
                    $scope.container.refWorldstates = $scope.container.refWorldstatesFiles;
                });
            }

            // criteriaFunctions watches
            function watchCfIcmm () {
                return $scope.$watch('container.criteriaFunctionsIcmm', function () {
                    $scope.container.criteriaFunctions = $scope.container.criteriaFunctionsIcmm;
                    $scope.container.selectedCriteriaFunction = $scope.container.criteriaFunctions ? $scope.container.criteriaFunctions[0] : false;
                });
            }

            $scope.derigsterCfIcmm = watchCfIcmm();

            function watchCfFiles () {
                return $scope.$watch('container.criteriaFunctionsFiles', function () {
                    $scope.container.criteriaFunctions = $scope.container.criteriaFunctionsFiles;
                    $scope.container.selectedCriteriaFunction = $scope.container.criteriaFunctions ? $scope.container.criteriaFunctions[0] : false;
                });
            }

            //decision strategy watches
            function watchDsIcmm () {
                return $scope.$watch('container.decisionStrategiesIcmm', function () {
                    $scope.container.decisionStrategies = $scope.container.decisionStrategiesIcmm;
                    $scope.container.selectedDecisionStrategy = $scope.container.decisionStrategies ? $scope.container.decisionStrategies[0] : false;
                });
            }

            $scope.derigsterDsIcmm = watchDsIcmm();

            function watchDsFiles () {
                return $scope.$watch('container.decisionStrategiesFiles', function () {
                    $scope.container.decisionStrategies = $scope.container.decisionStrategiesFiles;
                    $scope.container.selectedDecisionStrategy = $scope.container.decisionStrategies ? $scope.container.decisionStrategies[0] : false;
                });
            }


            $scope.icmmTabVisible = true;
            $scope.switchToIcmmTab = function () {
                $scope.icmmTabVisible = true;
                if ($scope.derigsterFilesWsWatch) {
                    $scope.derigsterFilesWsWatch();
                }
                $scope.derigsterIcmmWsWatch = watchIcmmWs();
                if ($scope.derigsterRefWsFilesWatch) {
                    $scope.derigsterRefWsFilesWatch();
                }
                $scope.derigsterRefWsIcmmWatch = watchRefWsIcmm();

                if ($scope.derigsterCfFilesWatch) {
                    $scope.derigsterCfFilesWatch();
                }
                $scope.derigsterCfIcmm = watchCfIcmm();
                if ($scope.derigsterDsFilesWatch) {
                    $scope.derigsterDsFilesWatch();
                }
                $scope.derigsterDsIcmm = watchDsIcmm();


                $scope.icmmLastViewed = true;
            };


            $scope.switchToFilesTab = function () {
                $scope.icmmTabVisible = false;

                $scope.derigsterIcmmWsWatch();
                $scope.derigsterFilesWsWatch = watchFilesWs();

                $scope.derigsterRefWsIcmmWatch();
                $scope.derigsterRefWsFilesWatch = watchRefWsFiles();

                $scope.derigsterCfIcmm();
                $scope.derigsterCfFilesWatch = watchCfFiles();

                $scope.derigsterDsIcmm();
                $scope.derigsterDsFilesWatch = watchDsFiles();

                $scope.icmmLastViewed = true;
            };

        }
    ]
    );

angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.RelationAnalysisChartDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
        function ($scope, WorldstateService, ccs) {
            'use strict';

            var controller = this;

            this.createChartData = function (iccData, xAxis, yAxis, xAxisCF, yAxisCf, forCriteria) {
                var i, iccItem, valueX, valueY, data = [];
                if (!iccData || !xAxis || !yAxis) {
                    throw 'Invalid configuration. Can no determine chart data for (iccData, xAxis, yaxis):' + iccData + ' , ' + xAxis + ' , ' + yAxis;
                }
                
                if(forCriteria && !(xAxisCF && yAxisCf)){
                    return;
                }
                
                var firstValueX = 0;
                for (i = 0; i < iccData.length; i++) {
                    iccItem = iccData[i];
                    if (!iccItem) {
                        throw 'Invalid icc object ' + iccItem;
                    }
                    valueX = controller.getDataValueForAxis(xAxis, iccItem, xAxisCF, forCriteria);
                    valueY = controller.getDataValueForAxis(yAxis, iccItem, yAxisCf, forCriteria);
//                    valueX = Math.random() * 500 + 200;
//                    valueY = Math.random() * 500 + 200;
                    if (firstValueX === 0) {
                        firstValueX = valueX;
                    }
                    data.push({
                        key: (i + 1) + '. ' + iccData[i].name,
                        values: [{
                            x: valueX,
                            y: valueY
                        }]
                    });
                }

                return data;
            };

            this.getDataValueForAxis = function (axis, iccObject, criteriaFunction, forCriteria) {
                var axisProp, iccItem, iccGroup, iccProp, iccGroupProp;
                if (!(axis && axis.name)) {
                    return null;
                }
                axisProp = axis.name;
                iccItem = iccObject.data;
                for (iccGroupProp in iccItem) {
                    if (iccItem.hasOwnProperty(iccGroupProp)) {
                        iccGroup = iccItem[iccGroupProp];
                        for (iccProp in iccGroup) {
                            if (iccGroup.hasOwnProperty(iccProp)) {
                                if (iccGroup[iccProp].displayName === axisProp) {
                                    if (forCriteria) {
                                        return ccs.calculateCriteria(iccGroup[iccProp].value, criteriaFunction);
                                    }
                                    return iccGroup[iccProp].value;
                                }
                            }
                        }
                    }
                }
                return null;
            };


            $scope.getXAxisLabel = function () {
                var res = '';
                if ($scope.xAxis && $scope.xAxis.name) {
                    res = $scope.xAxis.name;
                }
                return res;
            };

            $scope.getYAxisLabel = function () {
                var res = '';
                if ($scope.yAxis && $scope.yAxis.name) {
                    res = $scope.yAxis.name;
                }
                return res;
            };

            $scope.zScale = d3.scale.linear();

            $scope.yAxisTickFormatFunction = function () {
                return function (d) {
                    return d3.round(d, 2);
                };
            };

            $scope.xAxisTickFormatFunction = function () {
                return function (d) {
                    return d3.round(d, 2);
                };
            };

            this.dataChangedWatchCallback = function () {
                if ($scope.worldstates() && $scope.worldstates().length > 0) {
                    $scope.iccData = WorldstateService.utils.stripIccData($scope.worldstates());
                    $scope.iccObject = $scope.iccData[0];
                    if ($scope.xAxis && $scope.yAxis) {
                        if ($scope.xAxis.name.indexOf('Select') === -1 &&
                                $scope.yAxis.name.indexOf('Select') === -1) {
                            $scope.chartdata = controller.createChartData($scope.iccData, $scope.xAxis,
                                $scope.yAxis,
                                $scope.xAxisCriteriaFunction,
                                $scope.yAxisCriteriaFunction,
                                $scope.forCriteria);
                        }
                    }
                }
            };

            this.updateAxisCriteriaFunctions = function () {
                var i;
                for (i = 0; i < $scope.criteriaFunctionSet.criteriaFunctions.length; i++) {
                    if ($scope.criteriaFunctionSet.criteriaFunctions[i].indicator === $scope.xAxis.name) {
                        $scope.xAxisCriteriaFunction = $scope.criteriaFunctionSet.criteriaFunctions[i];
                    }
                    if ($scope.criteriaFunctionSet.criteriaFunctions[i].indicator === $scope.yAxis.name) {
                        $scope.yAxisCriteriaFunction = $scope.criteriaFunctionSet.criteriaFunctions[i];
                    }
                }
            };

            this.axisWatchCallback = function () {
                if ($scope.xAxis && $scope.yAxis) {
                    if ($scope.xAxis.name.indexOf('Select') === -1 &&
                            $scope.yAxis.name.indexOf('Select') === -1) {
                        if ($scope.criteriaFunctionSet) {
                            controller.updateAxisCriteriaFunctions();
                        }
                        $scope.chartdata = controller.createChartData($scope.iccData, $scope.xAxis,
                            $scope.yAxis, $scope.xAxisCriteriaFunction, $scope.yAxisCriteriaFunction, $scope.forCriteria);
                    }
                }
            };

            $scope.$watch('xAxis', this.axisWatchCallback);
            $scope.$watch('yAxis', this.axisWatchCallback);

            $scope.$watch('forCriteria', this.dataChangedWatchCallback);
            $scope.$watch('worldstates()', this.dataChangedWatchCallback,true);
            $scope.$watch('criteriaFunctionSet', this.axisWatchCallback, true);
        }
    ]
);



angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.WorldstateAnalysisWidgetDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        'localStorageService',
        '$timeout',
        function ($scope, Worldstates, localStorageService, $timeout) {
            'use strict';
            var createChartModels, getIndicators;
            $scope.forCriteriaTable = true;
            $scope.chartModels = [];

            createChartModels = function () {
                var j, modelArr;
                $scope.chartModels = [];
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    for (j = 0; j < $scope.worldstates.length; j++) {
                        modelArr = [];
                        if ($scope.worldstates[j]) {
                            modelArr.push($scope.worldstates[j]);
                        }
                        if ($scope.worldstateRef) {
                            modelArr = modelArr.concat($scope.worldstateRef);
                        }
                        $scope.chartModels.push(modelArr);
                    }
                }
            };

            getIndicators = function () {
                var indicatorGroup, indicatorProp, iccObject, group, j,
                    indicatorName, indicator, add, forEachFunc;
                forEachFunc = function (value, index, arr) {
                    if (indicatorName === value.displayName) {
                        add = false;
                    }
                    if (index === arr.length - 1 && add) {
                        $scope.indicatorVector.push(indicator);
                    }
                };

                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    for (j = 0; j < $scope.worldstates.length; j++) {
                        iccObject = Worldstates.utils.stripIccData([$scope.worldstates[j]], false)[0];
                        for (indicatorGroup in iccObject.data) {
                            if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                group = iccObject.data[indicatorGroup];
                                for (indicatorProp in group) {
                                    if (group.hasOwnProperty(indicatorProp)) {
                                        if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                            if ($scope.indicatorVector.length > 0) {
                                                indicatorName = group[indicatorProp].displayName;
                                                indicator = group[indicatorProp];
                                                add = true;
                                                $scope.indicatorVector.forEach(forEachFunc);
                                            } else {
                                                $scope.indicatorVector.push(group[indicatorProp]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            $scope.criteriaFunctionSet = localStorageService.get('criteriaFunctionSet') || [];
            $scope.criteriaFunctionSets = $scope.criteriaFunctionSet;
            $scope.selectedCriteriaFunction = $scope.criteriaFunctionSet[0];
            $scope.persistCriteriaFunctions = function () {
                $scope.showPersistSpinner = true;
                $scope.showPersistDone = false;
                $timeout(function () {
                    localStorageService.add('criteriaFunctionSet', $scope.criteriaFunctionSets);
                    $scope.showPersistSpinner = false;
                    $scope.showPersistDone = true;
                    $timeout(function () {
                        $scope.showPersistDone = false;
                    }, 1500);
                }, 500);

            };

            $scope.decisionStrategies = localStorageService.get('decisionStrategies') || [];
            $scope.selectedDecisionStrategy = $scope.decisionStrategies[0];
            $scope.persistDecisionStrategies = function () {
                $scope.showDsPersistSpinner = true;
                $scope.showDsPersistDone = false;
                $timeout(function () {
                    localStorageService.add('decisionStrategies', $scope.decisionStrategies);
                    $scope.showDsPersistSpinner = false;
                    $scope.showDsPersistDone = true;
                    $timeout(function () {
                        $scope.showDsPersistDone = false;
                    }, 1500);
                }, 500);
            };

            Worldstates.query({level: 2}, function (data) {
                $scope.allWorldstates = data;
            });

            $scope.$watch('worldstateRef', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    createChartModels();
                    getIndicators();
                }
            });
            $scope.$watch('worldstates', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates) {
                    createChartModels();
                    getIndicators();
                }
            }, true);

            $scope.indicatorVector = [];
        }
    ]
    );




angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.worldstateRankingTableDirectiveController',
    [
        '$scope',
        '$filter',
        'ngTableParams',
        'de.cismet.crisma.ICMM.Worldstates',
        'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
        'eu.crismaproject.worldstateAnalysis.services.AnalysisService',
        'ngDialog',
        function ($scope, $filter, NgTableParams, Worldstates, ccs, as, ngDialog) {
            'use strict';
            var ctrl;

            ctrl = this;
            ctrl.getOrderedProperties = function (obj) {
                var p, keys;
                keys = [];
                for (p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        keys.push(p);
                    }
                }
                keys.sort();
                return keys;
            };

            ctrl.extractIndicators = function (worldstate) {
                var indicatorGroup, indicatorProp, iccObject, group, indicators;
                indicators = [];
                if (worldstate) {
                    iccObject = Worldstates.utils.stripIccData([worldstate], false)[0];
                    for (indicatorGroup in iccObject.data) {
                        if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                            group = iccObject.data[indicatorGroup];
                            for (indicatorProp in group) {
                                if (group.hasOwnProperty(indicatorProp)) {
                                    if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                        indicators.push(group[indicatorProp]);
                                    }
                                }
                            }
                        }
                    }
                }
                return indicators;
            };

            ctrl.getCriteriaVectorForWorldstate = function (ws, critFunc) {
                var indicators, criterias, i;
                indicators = ctrl.extractIndicators(ws);
                criterias = [];
                if (indicators && indicators.length === critFunc.criteriaFunctions.length) {
                    for (i = 0; i < indicators.length; i++) {
                        /*jshint -W083 */
                        critFunc.criteriaFunctions.forEach(function (cf) {
                            if (cf.indicator === indicators[i].displayName) {
                                criterias.push({
                                    indicator: indicators[i],
                                    criteria: ccs.calculateCriteria(indicators[i].value, cf) / 100
                                });
                            }
                        });
                    }
                }
                return criterias;
            };

            ctrl.getCritAndWeightVector = function (dec, criteria) {
                var critWeight, i, critEmph;
                critWeight = {};
                critWeight.criteria = [];
                critWeight.weights = [];
                for (i = 0; i < dec.criteriaEmphases.length; i++) {
                    critEmph = dec.criteriaEmphases[i];
                    /*jshint -W083 */
                    criteria.forEach(function (c) {
                        if (c.indicator.displayName === critEmph.indicator.displayName) {
                            critWeight.criteria.push(c.criteria);
                            critWeight.weights.push(critEmph.criteriaEmphasis / 100);
                        }
                    });
                }
                return critWeight;
            };

            ctrl.createTableItem = function (ws) {
                var i, crit, critWeight, score, newTableItem, item;
                if ($scope.criteriaFunction && $scope.decisionStrategy) {
                    crit = ctrl.getCriteriaVectorForWorldstate(ws, $scope.criteriaFunction);
                    critWeight = ctrl.getCritAndWeightVector($scope.decisionStrategy, crit);
                    score = as.getOwa().aggregateLS(critWeight.criteria, $scope.decisionStrategy.satisfactionEmphasis, critWeight.weights);
                } else {
                    score = 0;
                }
                newTableItem = {
                    'rank': i,
                    'worldstate': ws.name,
                    'ws': ws,
                    'score': $filter('number')(score * 100, 2) + ' %',
                    rawScore: score
                };

                if ($scope.criteriaFunction && $scope.decisionStrategy) {
                    //we want to add the indicator and criteria....
                    for (i = 0; i < crit.length; i++) {
                        item = crit[i];
                        newTableItem[item.indicator.displayName] = {
                            indicator: $filter('number')(item.indicator.value) + ' ' + item.indicator.unit,
                            los: $filter('number')(item.criteria, 2) + ' % LoS'
                        };
                    }
                }
                return newTableItem;
            };

            ctrl.addMissingColumns = function (ws) {
                var i, indicator, indicators, exists = false;
                indicators = ctrl.extractIndicators(ws);
                for (i = 0; i < indicators.length; i++) {
                    indicator = indicators[i];
                    /*jshint -W083 */
                    $scope.columns.forEach(function (item) {
                        if (item.field === indicator.displayName) {
                            exists = true;
                        }
                    });
                    if (!exists) {
                        $scope.columns.push({
                            title: indicator.displayName + ' (' + ($scope.columns.length - 2) + ')',
                            field: indicator.displayName,
                        });
                    }
                }
            };

            ctrl.insertAtCorrectTablePosition = function (tableArr, newTableItem) {
                var i, insertPosition, updateRank,
                    tableItem, score;
                score = newTableItem.rawScore;
                if (!tableArr || tableArr.length === 0) {
                    newTableItem.rank = 1;
                    tableArr.push(newTableItem);
                } else {
                    insertPosition = -1;
                    updateRank = false;
                    for (i = 0; i < tableArr.length; i++) {
                        tableItem = tableArr[i];
                        if (updateRank) {
                            tableItem.rank++;
                        }
                        if (tableItem.rawScore <= score && insertPosition === -1) {
                            //we have found our insertion point..
                            newTableItem.rank = i + 1;
                            tableItem.rank++;
                            updateRank = true;
                            insertPosition = i;
                        }
                    }
                    if (insertPosition === -1) {
                        newTableItem.rank = tableArr.length + 1;
                        tableArr.push(newTableItem);
                    } else {
                        tableArr.splice(insertPosition, 0, newTableItem);
                    }
                }
            };

            ctrl.addWorldstateToTableData = function (ws) {
                var newTableItem;
                ctrl.addMissingColumns(ws);
                newTableItem = ctrl.createTableItem(ws);
                // we need to find out the insertion point...
                if (!$scope.tableData) {
                    $scope.tableData = [];
                }
                ctrl.insertAtCorrectTablePosition($scope.tableData, newTableItem);
//                ctrl.refreshTable();
            };

            ctrl.removeWorldstateFromTableData = function (ws) {
                var i, isRemoved = -1;
                if ($scope.tableData) {
                    $scope.tableData.forEach(function (item, index) {
                        if (angular.equals(item.ws, ws) && isRemoved === -1) {
                            isRemoved = index;
                        }
                    });
                    if (isRemoved !== -1) {
                        $scope.tableData.splice(isRemoved, 1);
                        for (i = isRemoved; i < $scope.tableData.length; i++) {
                            $scope.tableData[i].rank--;
                        }
//                    ctrl.refreshTable();
                    } else {
                        console.error('Could not remove worldstate ' + ws + ' from ranking table');
                    }
                }
            };

            ctrl.updateWorldstateTableData = function (ws) {
                var tableItem, i, newTableItem;
                newTableItem = ctrl.createTableItem(ws);
                for (i = 0; i < $scope.tableData.length; i++) {
                    tableItem = $scope.tableData[i];
                    if (tableItem.ws.id === ws.id) {
                        ctrl.removeWorldstateFromTableData(tableItem.ws);
                        break;
                    }
                }
                ctrl.insertAtCorrectTablePosition($scope.tableData, newTableItem);
            };

            ctrl.refreshTable = function () {
                if ($scope.tableParams) {
                    $scope.tableParams.reload();
//                    $scope.tableParams.settings().$scope = $scope;
                } else {
                    $scope.tableParams = new NgTableParams({
                        page: 1, // show first page
                        count: 1000, // count per page
                        sorting: {
                            name: 'asc'     // initial sorting
                        }
                    }, {
                        counts: [], // hide page counts control
                        total: 1, // value less than count hide pagination
                        getData: function ($defer, params) {
                            // use build-in angular filter
                            var orderedData;
                            orderedData = params.sorting() ?
                                $filter('orderBy')($scope.tableData, params.orderBy()) :
                                $scope.tableData;
                            params.total(orderedData.length); // set total for recalc pagination
                            $defer.resolve($scope.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });
                    $scope.tableParams.settings().$scope = $scope;
                }
            };

            ctrl.addMissingWoldstatesToTable = function (oldWorldStates) {
                var i, ws, isContained;
                for (i = $scope.worldstates.length - 1; i >= 0; i--) {
                    ws = $scope.worldstates[i];
                    isContained = false;
                    /*jshint -W083 */
                    if (oldWorldStates) {
                        oldWorldStates.forEach(function (val) {
                            if (parseInt(val.id) === parseInt(ws.id)) {
                                isContained = true;
                            }
                        });
                        if (!isContained) {
                            ctrl.addWorldstateToTableData(ws);
                        }
                    }
                }
            };

            ctrl.removeMissingWorldstatesFromTable = function (oldWorldstates) {
                var i, ws, isContained;
                for (i = oldWorldstates.length - 1; i >= 0; i--) {
                    ws = oldWorldstates[i];
                    isContained = false;
                    /*jshint -W083 */
                    $scope.worldstates.forEach(function (val) {
                        if (parseInt(val.id) === parseInt(ws.id)) {
                            isContained = true;
                        }
                    });
                    if (!isContained) {
                        ctrl.removeWorldstateFromTableData(ws);
                    }
                }
            };

            ctrl.worldstateWatchCallback = function (newVal, oldVal) {
//                if (newVal === oldVal || !oldVal) {
                if (newVal === oldVal || !oldVal) {
                    return;
                }
                ctrl.removeMissingWorldstatesFromTable(oldVal);

                if ($scope.worldstates && $scope.worldstates.length > 0 && $scope.criteriaFunction && $scope.decisionStrategy) {
                    ctrl.addMissingWoldstatesToTable(oldVal);
                    ctrl.refreshTable();
                }
            };

            ctrl.decisionStrategyWatchCallback = function (newVal, oldVal) {
                var ws, newTableItem, i = 0, newTableData = [];
                if (!angular.equals(newVal, oldVal) && $scope.worldstates && $scope.worldstates.length > 0) {
                    if ($scope.criteriaFunction && $scope.decisionStrategy) {
                        if (!$scope.tableData || $scope.tableData.length === 0) {
                            for (i = 0; i < $scope.worldstates.length; i++) {
                                ctrl.addWorldstateToTableData($scope.worldstates[i]);
                            }
                        } else {
                            // we need to re-calculate and re-index the tableData...
                            for (i = 0; i < $scope.tableData.length; i++) {
                                ws = $scope.tableData[i].ws;
                                newTableItem = ctrl.createTableItem(ws);
                                ctrl.insertAtCorrectTablePosition(newTableData, newTableItem);
                            }
                            $scope.tableData = newTableData;
                        }
                        ctrl.refreshTable();
                    }
                }
            };

            $scope.clickToOpen = function (index) {
                $scope.ws = [$scope.tableData[index].ws];
                ngDialog.open({
                    template: 'templates/criteriaRadarPopupTemplate.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default ngdialog-theme-custom ngdialog-theme-width'
                });
            };

            $scope.columns = [{
                    title: 'Rank',
                    field: 'rank'
                }, {
                    title: 'Worldstate',
                    field: 'worldstate'
                }, {
                    title: 'Score',
                    field: 'score'
                }];

            $scope.tableVisibleSwitch = '0';
            $scope.$watch('worldstates', ctrl.worldstateWatchCallback, true);

            $scope.$watch('decisionStrategy', ctrl.decisionStrategyWatchCallback, true);

            $scope.$watch('criteriaFunction', ctrl.decisionStrategyWatchCallback, true);
        }
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives',
    [
        'eu.crismaproject.worldstateAnalysis.controllers',
        'ngTable',
        'de.cismet.crisma.ICMM.Worldstates',
        'mgcrea.ngStrap.popover'
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'knob',
    function () {
        'use strict';
        return {
            restrict: 'EACM',
            template: function () {
                return '<input ng-model="knobData">';
            },
            replace: true,
            scope: {
                knobData: '=',
                knobOptions: '='
            },
            link: function (scope, elem) {


                var renderKnob = function () {
                    var $elem, knobOptions;
                    knobOptions = scope.knobOptions || {
                        'max': 100,
                        'width': 100,
                        'height': 100,
                        'displayInput': false,
                        'angleOffset': -125,
                        'angleArc': 250
                    };
                    knobOptions.release = function (v) {
                        scope.knobData = v;
                        scope.$apply();
                    };
                    $elem = elem;
                    $elem.val(scope.knobData);
                    $elem.knob(knobOptions);
                    //
                    elem.find('div').css('display', 'block')
                        .css('margin', '0 auto');
                };

                scope.$watch('knobData', function () {
                    renderKnob();
                }, true);

                scope.$watch('knobOptions', function () {
                    renderKnob();
                });

            }
        };
    }
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'criteriaEmphasis',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                criteriaEmphases: '=',
                indicatorMap:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/criteriaEmphasesTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.criteriaEmphasesController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'criteriaFunctionManager',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunctionSet:'=criteriaFunctions'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/criteriaFunctionManagerTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.CriteriaFunctionManagerDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'criteriaRadar',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        function (WorldstateService) {
            'use strict';

            var scope, linkFunction, drawLegend, augmentWithTooltips;
            scope = {
                localModel: '&worldstates',
                criteriaFunction: '=',
                showLegend: '=',
                showAxisText: '=',
                useNumbers: '='
            };

            augmentWithTooltips = function (elem) {
                d3.select(elem[0])
                    .selectAll('circle')
                    .select('title')
                    .text(function (j) {
                        return j.tooltip + ': ' + Math.max(j.value, 0);
                    });
            };

            drawLegend = function (elem, chartConfig, legendItems) {
                var colorscale, legendSvg, legendContainer, rects,
                    labelWidthHistory, labels, labelWidth, breakIndex, yOff;
                colorscale = d3.scale.category10();
                legendSvg = d3.select(elem[0])
                    .append('div')
                    .append('svg')
                    .attr('width', chartConfig.w)
                    .attr('height', 5);

                //Initiate Legend
                legendContainer = legendSvg.append('g')
                    .attr('class', 'legend')
                    .attr('height', 5)
                    .attr('width', 50);

                //Create colour squares
                rects = legendContainer.selectAll('rect')
                    .data(legendItems)
                    .enter()
                    .append('rect')
                    .attr('y', 15)
                    .attr('x', 0)
                    .attr('width', 10)
                    .attr('height', 10)
                    .style('fill', function (d, i) {
                        return colorscale(i);
                    });

                //Create text next to squares
                labels = legendContainer.selectAll('text')
                    .data(legendItems)
                    .enter()
                    .append('text')
                    .attr('y', 24)
                    .attr('x', 0)
                    .attr('font-size', '11px')
                    .attr('fill', '#737373')
                    .text(function (d) {
                        return d;
                    });

//                      we need to adjust the position of the legend labels
//                      and break the line if necessary
                labelWidthHistory = [];
                labelWidth = [];
                breakIndex = 0;
                yOff = 0;
                labels.attr('transform', function (data, i) {
                    var width, sumLabelWidth, sumRectWidth, margin, offset;
                    width = d3.select(this).node().getBBox().width;
                    sumLabelWidth = labelWidth.reduce(function (prev, curr) {
                        return prev + curr;
                    }, 0);

                    labelWidth.push(width);
                    labelWidthHistory.push(width);
                    sumRectWidth = (i - breakIndex + 1) * 15;
                    margin = (i - breakIndex) * 20;
                    offset = sumLabelWidth + sumRectWidth + margin;

                    if (offset + width > chartConfig.w) {
                        yOff += 20;
                        breakIndex = i;
                        labelWidth = [width];
                        offset = 15;
                    }
                    return 'translate(' + offset + ',' + yOff + ')';
                });

                yOff = 0;
                breakIndex = 0;
                rects.attr('transform', function (data, i) {
                    var sumLabelWidth, sumRectWidth, margin, offset;
                    sumLabelWidth = labelWidthHistory.reduce(function (prev, curr, index) {
                        if (index < i && index >= breakIndex) {
                            return prev + curr;
                        }
                        return prev;
                    }, 0);
                    sumRectWidth = (i - breakIndex) * 15;
                    margin = (i - breakIndex) * 20;
                    offset = sumLabelWidth + sumRectWidth + margin;
                    if (offset + labelWidthHistory[i] + 15 > chartConfig.w) {
                        yOff += 20;
                        breakIndex = i;
                        offset = 0;
                    }
                    return 'translate(' + offset + ',' + yOff + ')';
                });

                //set the size of the legend containers correctly
                legendSvg.attr('height', yOff + 50);
                legendContainer.attr('height', yOff + 50);

                //center the legend horizontally
                legendContainer.attr('transform', function () {
                    var legendWidth, off;
                    legendWidth = d3.select(this).node().getBBox().width;
                    off = (chartConfig.w - legendWidth) / 2;
                    off = off < 0 ? 0 : off;
                    return 'translate(' + off + ',' + '0)';
                });

            };

            linkFunction = function (scope, elem) {
                var cfg, width, watchCallback;

                watchCallback = function () {
                    var indicators, chartDataModel;
                    elem.removeData();
                    elem.empty();
                    if(!scope.criteriaFunction){
                        return;
                    }
                    if (scope.localModel() && scope.localModel().length > 0) {
                        // we are only interest in criteria data
                        indicators = WorldstateService.utils.stripIccData(scope.localModel(), false);
                        chartDataModel = scope.convertToChartDataStructure(indicators);
                        scope.chartData = chartDataModel[0];
                        scope.legendItems = chartDataModel[1];

                        var divNode = d3.select(elem[0]).append('div')
                            .attr('style', 'display:block;margin: 0 auto;')
                            .node();

                        cfg.w =  width = elem.width ? elem.width() : 200;
                        cfg.h =  width = elem.width ? elem.width() : 200;
                        RadarChart.draw(divNode, scope.chartData, cfg);
                        if (scope.showLegend) {
                            drawLegend(elem, cfg, scope.legendItems);
                        }
                        if (scope.useNumbers) {
                            augmentWithTooltips(elem, cfg, scope.legendItems);
                        }
                    }
                };
                //we want the chart to adjust to the size of the element it is placed in
                width = elem.width ? elem.width() : 200;
//                width =  200;
                cfg = {
                    w: width,
                    h: width,
                    maxValue: 100,
                    levels: 4,
                    axisText: angular.isDefined(scope.showAxisText) ? scope.showAxisText ? true : false : false,
                    showTooltip: scope.useNumbers
                };

                scope.$watchCollection('localModel()', watchCallback);
                scope.$watch('criteriaFunction', watchCallback, true);
            };

            return {
                scope: scope,
                restrict: 'AE',
                link: linkFunction,
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.CriteriaRadarChartDirectiveController'
            };
        }
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'decisionStrategy',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                decisionStrategy: '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/decisionStrategyTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.DecisionStrategyDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'decisionStrategyManager',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                decisionStrategies: '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/decisionStrategyManagerTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.decisionStrategyManagerDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'fileContextProvider',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                'worldstates': '=',
                'selectedWorldstates': '=',
                'decisionStrategies': '=',
                'criteriaFunctions': '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/fileContextProviderTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.FileContextProviderDirectiveController'
            };
        }
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'fileInput',
    [
        '$parse',
        function ($parse) {
            'use strict';

            return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    elem.bind('change', function(){
                        $parse(attrs.fileInput).assign(scope, elem[0].files);
                        scope.$apply();
                    });
                }
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'icmmContextProvider',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                'worldstates': '=',
                'selectedWorldstates': '=',
                'decisionStrategies': '=',
                'criteriaFunctions': '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/icmmContextProviderTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IcmmContextProviderDirectiveController'
            };
        }
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'indicatorBand',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                criteriaFunction: '=?'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBandTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandDirectiveController'
            };
        }
    ]
    ).directive(
    'indicatorBandItem',
    [
        '$popover',
        function ($popover) {
            'use strict';
            var scope;
            scope = {
                interval: '=',
                previousInterval: '=',
                first: '=',
                last: '=',
                lowerBoundary: '@',
                upperBoundary: '@',
                onIntervalChanged: '&',
                getColor: '&'
            };
            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBandItemTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandItemDirectiveController',
                replace: true,
                link: function (scope, elem, attrs) {
                    var popover = $popover(elem.find('#popover-target'), {
                        scope: scope,
                        title: attrs.title || 'Create a new interval',
                        template: 'templates/indicatorBandPopoverTemplate.html',
                        contentTemplate: 'templates/indicatorBandPopoverContentTemplate.html',
                        placement: 'bottom',
                        trigger: 'manual',
                        autoClose:true
                    });

                    scope.togglePopover = function () {
                        popover.$promise.then(popover.toggle);
                    };

                    scope.hidePopover = function () {
                        popover.$promise.then(popover.hide);
                    };
                }
            };
        }
    ]
    ).directive(
).directive(

    'gnumber',
    [
        '$filter',
        function ($filter) {
            'use strict';
            

            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {

                    // the view value is formatted with angular number filter
                    // the local is en_us, so it is sufficient to remove all ,
                    ctrl.$parsers.unshift(function (viewValue) {
                        var number;
                        
                        if(!viewValue.match(/^[\d.,]*$/)){
                            ctrl.$setValidity('gnumber', false);
                            return undefined;
                        }
                        
                        number= parseFloat(viewValue.replace(/,/g,''));
                        
                        if (!isNaN(number)) {
                            ctrl.$setValidity('gnumber', true);
                            return number;
                        }
                        else {
                            ctrl.$setValidity('gnumber', false);
                            return undefined;
                        }

                    });

                    ctrl.$formatters.unshift(function (value) {
                        return $filter('number')(value);
                    });

                }
            };
        }
    ]
).directive(
    'gpercent',
    [
        '$filter',
        function ($filter) {
            'use strict';
            

            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {

                    // the view value is formatted with angular number filter
                    // the local is en_us, so it is sufficient to remove all ,
                    ctrl.$parsers.unshift(function (viewValue) {
                        var number;
                        
                        if(!viewValue.match(/^[\d.,]*$/)){
                            ctrl.$setValidity('gpercent', false);
                            return undefined;
                        }
                        
                        number= parseFloat(viewValue.replace(/,/g,''));
                        
                        if (!isNaN(number) && number>=0 && number<=100) {
                            ctrl.$setValidity('gpercent', true);
                            return number;
                        }else {
                            ctrl.$setValidity('gpercent', false);
                            return undefined;
                        }

                    });

                    ctrl.$formatters.unshift(function (value) {
                        return $filter('number')(value);
                    });

                }
            };
        }
    ]
);

angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'indicatorBarCharts',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBarChartTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.indicatorBarChartDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'indicatorCriteriaAxisChooser',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                iccObject: '=',
                isXAxis: '@',
                selectedAxis: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorCriteriaAxisChooserTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaAxisChooserDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'indicatorCriteriaTable',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                forCriteria: '=',
                criteriaFunction:'=',
                detailIcons: '@'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorCriteriaTableTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaTableDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'levelOfEmphasis',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                satisfactionEmphasis: '=',
                indicatorSize:'=',
                // the expert mode feature is implemented later on. When true a similiar component 
                // to the criteriaEmphasis is needed...
                expertMode:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/levelOfEmphasisTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.levelOfEmphasisDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'relationAnalysisChart',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates: '&',
                chartHeight: '@height',
                forCriteria: '=',
                criteriaFunctionSet: '=criteriaFunction'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/relationAnalysisChartTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.RelationAnalysisChartDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'worldstateAnalysisWidget',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunctionSets:'=',
                selectedCriteriaFunction:'=',
                decisionStrategies:'=',
                selectedDecisionStrategy:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl:'templates/worldstateAnalysisWidgetTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.WorldstateAnalysisWidgetDirectiveController'
            };
        }
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'worldstateRankingTable',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunction:'=',
                decisionStrategy:'=',
                showIndicators:'=',
                showRadarChart:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl:'templates/worldstateRankingTableTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.worldstateRankingTableDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.services',
    ['de.cismet.crisma.ICMM.config']
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
).factory(
    'eu.crismaproject.worldstateAnalysis.services.AnalysisService',
    [
        function () {
            'use strict';

            var owa;

            owa = (function () {
                var checkVector, checkVectorRange, epsilon, equals, eFactor, publicApi, self;

                // default tolerance
                epsilon = 0.0000001;
                eFactor = 1000000;
                self = this;
                publicApi = {};

                equals = function (a, b, e) {
                    return Math.abs(a - b) < e;
                };

                checkVectorRange = function (vector) {
                    var i;

                    for (i = 0; i < vector.length; ++i) {
                        if (vector[i] < 0 || vector[i] > 1) {
                            throw 'arg value not within range [0, 1]: arg[' + i + ']=' + vector[i];
                        }
                    }
                };

                checkVector = function (vector) {
                    var i, sum;

                    checkVectorRange(vector);

                    sum = 0;
                    for (i = 0; i < vector.length; ++i) {
                        sum += vector[i];
                    }

                    if (!equals(sum, 1, epsilon)) {
                        throw 'sum of vector is not 1: ' + sum;
                    }
                };

                publicApi.orness = function (weights) {
                    var i, n, orness;

                    checkVector(weights);

                    n = weights.length;
                    orness = 0;
                    for (i = 0; i < weights.length; ++i) {
                        orness += (n - (i + 1)) * weights[i];
                    }

                    orness *= (1 / (n - 1));

                    return orness;
                };

                publicApi.dispersion = function (weights) {
                    var i, dispersion;

                    checkVector(weights);

                    dispersion = 0;
                    for (i = 0; i < weights.length; ++i) {
                        if (weights[i] !== 0) {
                            dispersion += weights[i] * Math.log(weights[i]);
                        }
                    }

                    dispersion *= -1;

                    return dispersion;
                };

                // or in other words, emphasis on andness
                // exponential gratification (i^e)
                publicApi.lLSWeights = function (criteriaCount) {
                    var i, sum, weights;

                    sum = 0;
                    for (i = 1; i <= criteriaCount; ++i) {
                        sum = sum + (Math.pow(i, Math.E));
                    }

                    weights = [];
                    for (i = 1; i <= criteriaCount; ++i) {
                        weights[i - 1] = Math.pow(i, Math.E) / sum;
                    }

                    checkVector(weights);

                    return weights;
                };

                // or in other words, emphasis on orness
                publicApi.hLSWeights = function (criteriaCount) {
                    return owa.lLSWeights(criteriaCount).reverse();
                };

                publicApi.meanWeights = function (criteriaCount) {
                    var i, d, mean, weights;

                    mean = 1 / criteriaCount;

                    weights = [];
                    for (i = 0; i < criteriaCount; ++i) {
                        weights[i] = mean;
                    }

                    d = owa.dispersion(weights);

                    if (!equals(d, Math.log(criteriaCount), epsilon)) {
                        throw 'rounding error: [dispersion=' + d + '|log=' + Math.log(criteriaCount) + ']';
                    }

                    return weights;
                };

                publicApi.orderedArgs = function (vector) {
                    return vector.slice(0).sort().reverse();
                };

                publicApi.aggregateLS = function (criteria, weights, importance) {
                    var crit, i, ordered, res,
                        // only needed if importance is not null
                        andness, imp, multiplier, power, orness, sat;

                    checkVector(weights);
                    checkVectorRange(criteria);

                    if (criteria.length !== weights.length) {
                        throw 'criteria and weights must have the same amount of items';
                    }

                    if (importance) {
                        checkVectorRange(importance);

                        if (criteria.length !== importance.length) {
                            throw 'criteria and importance must have the same amount of items';
                        }

                        crit = [];
                        orness = owa.orness(weights);
                        andness = 1 - orness;

                        for (i = 0; i < importance.length; ++i) {
                            imp = importance[i];
                            sat = criteria[i];
                            multiplier = Math.max(imp, andness);
                            power = Math.max(imp, orness);
                            res = multiplier * Math.pow(sat, power);
                            crit[i] = res;
                        }
                    } else {
                        crit = criteria;
                    }

                    ordered = owa.orderedArgs(crit);
                    res = 0;
                    for (i = 0; i < ordered.length; ++i) {
                        res += ordered[i] * weights[i];
                    }

                    return res;
                };

                return publicApi;
            })();


            return {
                getOwa: function () {
                    return owa;
                }
            };
        }
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
    [
        function () {
            'use strict';
            var calculateCriteria, interpolateValue, getColor,getColorForCriteria;

            interpolateValue = function (indicatorValue, lowerBound, upperBound) {
                var max, min, lowerCriteriaValue, upperCriteriaValue, rate;
                max = Math.max(lowerBound.indicatorValue, upperBound.indicatorValue);
                min = Math.min(lowerBound.indicatorValue, upperBound.indicatorValue);
                lowerCriteriaValue = lowerBound.criteriaValue;
                upperCriteriaValue = upperBound.criteriaValue;
                rate = (max - indicatorValue) / (max - min);
                return upperCriteriaValue + ((lowerCriteriaValue - upperCriteriaValue) * rate);
            };

            calculateCriteria = function (indicatorValue, criteriaFunction) {
                var i, pre, suc, list = [];
                //check the format of the criteriaFunction
                if (!(criteriaFunction.lowerBoundary && criteriaFunction.upperBoundary && criteriaFunction.intervals)) {
                    throw new Error('CriteriaFunction is not valid');
                }
                list.push(criteriaFunction.lowerBoundary);
                list = list.concat(criteriaFunction.intervals);
                list.push(criteriaFunction.upperBoundary);
                if (criteriaFunction.lowerBoundary.indicatorValue > criteriaFunction.upperBoundary.indicatorValue) {
                    list.reverse();
                }
                //check if the indicatorValue is lower than the lowerBound

                if (indicatorValue <= list[0].indicatorValue) {
                    return list[0].criteriaValue;
                } else if (indicatorValue >= list[list.length - 1].indicatorValue) {
                    return list[list.length - 1].criteriaValue;
                } else {
                    //loop through the intervals...
                    for (i = 1; i < list.length; i++) {
                        pre = list[i - 1];
                        suc = list[i];
                        if (indicatorValue >= pre.indicatorValue && indicatorValue <= suc.indicatorValue) {
                            return interpolateValue(indicatorValue, pre, suc);
                        }
                    }
                    return interpolateValue(indicatorValue, suc, criteriaFunction.upperBoundary);
                }
            };

            getColorForCriteria = function (criteriaValue, criteriaFunction) {
                var i, interval = null, tmpInterval;
                if (criteriaValue === 0) {
                    return '#FF6543';
                }
                if (criteriaValue === 100) {
                    return '#B5F4BC';
                }

                if (criteriaFunction.intervals) {
                    for (i = 0; i < criteriaFunction.intervals.length; i++) {
                        tmpInterval = criteriaFunction.intervals[i];
                        if (criteriaValue < tmpInterval.criteriaValue) {
                            return getColor(tmpInterval, criteriaFunction);
                        }
                    }
                }
                return getColor(interval, criteriaFunction);
            };

            getColor = function (interval, criteriaFunction) {
                var tmpInterval, i, total = criteriaFunction.intervals.length, c;
                var index = -1;
                if (interval) {
                    for (i = 0; i < total; i++) {
                        tmpInterval = criteriaFunction.intervals[i];
                        if (tmpInterval.criteriaValue === interval.criteriaValue) {
                            index = i;
                        }
                    }
                }
                if (total === 0) {
//                E_ORANGE_SHERBERT;
                    c = '#FFC48C';
                } else if (total === 1) {
                    if (index === 0) {
//                    c = D_AFFINITY;
                        c = '#FF9F80';
                    } else {
//                    c = G_JAYANTHI;
                        c = '#FFF19E';
                    }
                } else if (total === 2) {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = '#FFBA6B';
                    } else if (index === 1) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = '#FFDC8A';
                    } else {
//                    c = H_HONEY_DO;
                        c = '#EFFAB4';
                    }
                } else if (total === 3) {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = '#FFBA6B';
                    } else if (index === 1) {
//                    c = E_ORANGE_SHERBERT;
                        c = '#FFC48C';
                    } else if (index === 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = '#FFDC8A';
                    } else {
//                    c = H_HONEY_DO;
                        c = '#EFFAB4';
                    }
                } else if (total === 4) {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = '#FFBA6B';
                    } else if (index === 1) {
//                    c = D_AFFINITY;
                        c = '#FF9F80';
                    } else if (index === 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = '#FFDC8A';
                    } else if (index === 3) {
//                    c = G_JAYANTHI;
                        c = '#FFF19E';
                    } else {
//                    c = H_HONEY_DO;
                        c = '#EFFAB4';
                    }
                } else if (total === 5) {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = '#FFBA6B';
                    } else if (index === 1) {
//                    c = D_AFFINITY;
                        c = '#FF9F80';
                    } else if (index === 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = '#FFDC8A';
                    } else if (index === 3) {
//                    c = G_JAYANTHI;
                        c = '#FFF19E';
                    } else if (index === 4) {
//                    c = H_HONEY_DO;
                        c = '#EFFAB4';
                    } else {
//                    c = I_SPLASH_OF_LIME;
                        c = '#D1F2A5';
                    }
                } else {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = '#FFBA6B';
                    } else if (index === 1) {
//                    c = D_AFFINITY;
                        c = '#FF9F80';
                    } else if (index === 2) {
//                    c = E_ORANGE_SHERBERT;
                        c = '#FFC48C';
                    } else if (index === 3) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = '#FFDC8A';
                    } else if (index === 4) {
//                    c = G_JAYANTHI;
                        c = '#FFF19E';
                    } else if (index === 5) {
//                    c = H_HONEY_DO;
                        c = '#EFFAB4';
                    } else {
//                    c = I_SPLASH_OF_LIME;
                        c = '#D1F2A5';
                    }
                }

                return c;

            };
            return {
                'calculateCriteria': calculateCriteria,
                'getColor': getColor,
                'getColorForCriteria':getColorForCriteria
            };
        }
    ]
    );
angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
).factory(
    'eu.crismaproject.worldstateAnalysis.services.FilesPersistanceService',
    [
        function () {
            'use strict';
            var persistCriteriaFunctions, persistDecisionStrategies;

            function download(text) {
                var bb;
                bb = new Blob([text], {type: 'text/plain'});
                //works in ff and in chrome
                window.open(window.URL.createObjectURL(bb));
            }

            persistCriteriaFunctions = function (criteriaFunctions) {
                download(angular.toJson(criteriaFunctions));
            };

            persistDecisionStrategies = function (decisionStrategies) {
                download(angular.toJson(decisionStrategies));
            };

            return {
                'persistCriteriaFunctions': persistCriteriaFunctions,
                'persistDecisionStrategies': persistDecisionStrategies
            };
        }
    ]
);
angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'eu.crismaproject.worldstateAnalysis.services.CriteriaFunction',
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
angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'eu.crismaproject.worldstateAnalysis.services.DecisionStrategies',
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

angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'eu.crismaproject.worldstateAnalysis.services.IcmmPersistanceService',
    [
        'eu.crismaproject.worldstateAnalysis.services.CriteriaFunction',
        'eu.crismaproject.worldstateAnalysis.services.DecisionStrategies',
        function (CF, DS) {
            'use strict';
            var persistCriteriaFunctions, persistDecisionStrategies;

            persistCriteriaFunctions = function (criteriaFunctions) {
                CF.update(criteriaFunctions);
            };

            persistDecisionStrategies = function (decisionStrategies) {
                DS.update(decisionStrategies);
            };

            return {
                'persistCriteriaFunctions': persistCriteriaFunctions,
                'persistDecisionStrategies': persistDecisionStrategies
            };
        }
    ]
    );