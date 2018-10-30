angular.module(
    'eu.myclimateservice.csis.scenario-analysis.controllers'
).controller(
    'eu.myclimateservice.csis.scenario-analysis.controllers.IndicatorCriteriaTableDirectiveController',
    [
        '$scope',
        '$filter',
        'de.cismet.crisma.ICMM.Worldstates',
        'ngTableParams',
        'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
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