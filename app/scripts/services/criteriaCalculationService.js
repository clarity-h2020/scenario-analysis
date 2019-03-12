angular.module(
    'eu.myclimateservice.csis.scenario-analysis.services'
    ).factory(
    'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
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
                if (!criteriaFunction || criteriaFunction === null || !(criteriaFunction.lowerBoundary && criteriaFunction.upperBoundary && criteriaFunction.intervals)) {
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