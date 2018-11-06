angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
    ).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.worldstateRankingTableDirectiveController',
    [
        '$scope',
        '$filter',
        'ngTableParams',
        'de.cismet.crisma.ICMM.Worldstates',
        'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
        'eu.myclimateservice.csis.scenario-analysis.services.AnalysisService',
        'ngDialog',
        function ($scope, $filter, NgTableParams, Worldstates, ccs, as, ngDialog) {
            'use strict';
            var $this;

            $this = this;
            $this.getOrderedProperties = function (obj) {
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

            $this.extractIndicators = function (worldstate) {
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

            $this.getCriteriaVectorForWorldstate = function (ws, critFunc) {
                var indicators, criterias, i;
                indicators = $this.extractIndicators(ws);
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

            $this.getCritAndWeightVector = function (dec, criteria) {
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

            $this.createTableItem = function (ws) {
                var i, crit, critWeight, score, newTableItem, item;
                if ($scope.criteriaFunction && $scope.decisionStrategy) {
                    crit = $this.getCriteriaVectorForWorldstate(ws, $scope.criteriaFunction);
                    critWeight = $this.getCritAndWeightVector($scope.decisionStrategy, crit);
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

            $this.addMissingColumns = function (ws) {
                var i, indicator, indicators, exists = false;
                indicators = $this.extractIndicators(ws);
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

            $this.insertAtCorrectTablePosition = function (tableArr, newTableItem) {
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

            $this.addWorldstateToTableData = function (ws) {
                var newTableItem;
                $this.addMissingColumns(ws);
                newTableItem = $this.createTableItem(ws);
                // we need to find out the insertion point...
                if (!$scope.tableData) {
                    $scope.tableData = [];
                }
                $this.insertAtCorrectTablePosition($scope.tableData, newTableItem);
//                $this.refreshTable();
            };

            $this.removeWorldstateFromTableData = function (ws) {
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
//                    $this.refreshTable();
                    } else {
                        console.error('Could not remove worldstate ' + ws + ' from ranking table');
                    }
                }
            };

            $this.updateWorldstateTableData = function (ws) {
                var tableItem, i, newTableItem;
                newTableItem = $this.createTableItem(ws);
                for (i = 0; i < $scope.tableData.length; i++) {
                    tableItem = $scope.tableData[i];
                    if (tableItem.ws.id === ws.id) {
                        $this.removeWorldstateFromTableData(tableItem.ws);
                        break;
                    }
                }
                $this.insertAtCorrectTablePosition($scope.tableData, newTableItem);
            };

            $this.refreshTable = function () {
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

            $this.addMissingWoldstatesToTable = function (oldWorldStates) {
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
                            $this.addWorldstateToTableData(ws);
                        }
                    }
                }
            };

            $this.removeMissingWorldstatesFromTable = function (oldWorldstates) {
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
                        $this.removeWorldstateFromTableData(ws);
                    }
                }
            };

            $this.worldstateWatchCallback = function (newVal, oldVal) {
//                if (newVal === oldVal || !oldVal) {
                if (newVal === oldVal || !oldVal) {
                    return;
                }
                $this.removeMissingWorldstatesFromTable(oldVal);

                if ($scope.worldstates && $scope.worldstates.length > 0 && $scope.criteriaFunction && $scope.decisionStrategy) {
                    $this.addMissingWoldstatesToTable(oldVal);
                    $this.refreshTable();
                }
            };

            $this.decisionStrategyWatchCallback = function (newVal, oldVal) {
                var ws, newTableItem, i = 0, newTableData = [];
                if (!angular.equals(newVal, oldVal) && $scope.worldstates && $scope.worldstates.length > 0) {
                    if ($scope.criteriaFunction && $scope.decisionStrategy) {
                        if (!$scope.tableData || $scope.tableData.length === 0) {
                            for (i = 0; i < $scope.worldstates.length; i++) {
                                $this.addWorldstateToTableData($scope.worldstates[i]);
                            }
                        } else {
                            // we need to re-calculate and re-index the tableData...
                            for (i = 0; i < $scope.tableData.length; i++) {
                                ws = $scope.tableData[i].ws;
                                newTableItem = $this.createTableItem(ws);
                                $this.insertAtCorrectTablePosition(newTableData, newTableItem);
                            }
                            $scope.tableData = newTableData;
                        }
                        $this.refreshTable();
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
            $scope.$watch('worldstates', $this.worldstateWatchCallback, true);

            $scope.$watch('decisionStrategy', $this.decisionStrategyWatchCallback, true);

            $scope.$watch('criteriaFunction', $this.decisionStrategyWatchCallback, true);
        }
    ]
    );