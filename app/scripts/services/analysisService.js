angular.module(
    'eu.myclimateservice.csis.scenario-analysis.services'
).factory(
    'eu.myclimateservice.csis.scenario-analysis.services.AnalysisService',
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