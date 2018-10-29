'use strict';

describe('CriteriaCalculationService Test Suite', function () {
    var criteriaCalcService, criteriaFunction;

    criteriaFunction = {
        lowerBoundary: {
            indicatorValue: 100,
            criteriaValue: 0
        },
        upperBoundary: {
            indicatorValue: 0,
            criteriaValue: 100
        },
        intervals: [
            {
                indicatorValue: 75,
                criteriaValue: 25
            },{
                indicatorValue: 50,
                criteriaValue: 50
            },{
                indicatorValue: 25,
                criteriaValue: 75
            }]
    }

    beforeEach(function () {
        module('eu.myclimateservice.csis.scenario-analysis.services');
    });

    beforeEach(inject([
        'eu.myclimateservice.csis.scenario-analysis.services.CriteriaCalculationService',
        function (ccs) {
            criteriaCalcService = ccs;
        }
    ]));

    it('should be defined', function () {
        expect(criteriaCalcService).toBeDefined();
    });

    describe('Test CriteriaCalculationService', function () {

        it('should calculate criteria values', function () {
            
            expect(criteriaCalcService.calculateCriteria(200,criteriaFunction)).toEqual(0);
            
            expect(criteriaCalcService.calculateCriteria(0,criteriaFunction)).toEqual(100);
            
            expect(criteriaCalcService.calculateCriteria(50,criteriaFunction)).toEqual(50);
            expect(criteriaCalcService.calculateCriteria(50.5,criteriaFunction)).toEqual(49.5);
            expect(criteriaCalcService.calculateCriteria(50.25,criteriaFunction)).toEqual(49.75);
            
            expect(criteriaCalcService.calculateCriteria(90,criteriaFunction)).toEqual(10);
            expect(criteriaCalcService.calculateCriteria(10,criteriaFunction)).toEqual(90);
        });

    });
});