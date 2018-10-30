angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
    ).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.IcmmContextProviderDirectiveController',
    [
        '$scope',
        'de.cismet.collidingNameService.Nodes',
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.crisma.ICMM.services.icmm',
        'eu.myclimateservice.csis.scenario-analysis.services.CriteriaFunction',
        'eu.myclimateservice.csis.scenario-analysis.services.DecisionStrategies',
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

//            Worldstates.query({level: 3, fields: 'id,name,key,iccdata,actualaccessinfo, actualaccessinfocontenttype, categories', deduplicate: false}, function (data) {
//                data.forEach(function (ws) {
//                    ws = Icmm.convertToCorrectIccDataFormat(ws);
//                });
//                $scope.worldstates = data;
//            });

            $scope.criteriaFunctions = [];
//            CF.query(function (data) {
//                if (data.length > 0) {
//                    $scope.criteriaFunctions = data;
//                }
//            });
//            $scope.selectedCriteriaFunction = $scope.criteriaFunctions[0];
            $scope.showDsPersistSpinner = false;
            $scope.showDsPersistDone = false;
            $scope.decisionStrategies = [];
//            DS.query(function (data) {
//                $scope.decisionStrategies = data || [];
//            });

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
//            $scope.treeNodes = Nodes.query(function () {
//            });


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


