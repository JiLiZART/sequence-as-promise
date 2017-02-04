const chai = require('chai');

chai.use(require('chai-as-promised'));
chai.should();

const sequence = require('../index.js');
const timeout = (time, value) => new Promise((resolve) => setTimeout(() => resolve(value), time / 10));
const rejection = (time, value) => new Promise((_, reject) => setTimeout(() => reject(value), time / 10));

describe('promise sequence', () => {
    it('should execute sequence', (done) => {
        const values = [
            () => ({moveCircleToMiddle: true}),
            () => ({showGrayCircle: true}),
            () => ({showMicrophone: true}),
            () => ({moveCircleToTop: true}),
            () => ({pulseGrayCircle: true}),
            () => ({okText: 1}),
            () => ({okText: 2}),
            () => ({googleText: 1}),
            () => ({googleText: 2})
        ];

        const result = [
            {moveCircleToMiddle: true},
            {showGrayCircle: true},
            {showMicrophone: true},
            {moveCircleToTop: true},
            {pulseGrayCircle: true},
            {okText: 1},
            {okText: 2},
            {googleText: 1},
            {googleText: 2}
        ];

        const promise = sequence(values);

        promise.should.be.fulfilled.and.become(result).notify(done);
    });

    it('should execute sequence with primitive values', (done) => {
        const valuesWithPrimitives = [
            () => ({moveCircleToMiddle: true}),
            100,
            () => ({showGrayCircle: true}),
            () => ({showMicrophone: true}),
            '500',
            () => ({moveCircleToTop: true}),
            '100',
            () => ({pulseGrayCircle: true}),
            () => ({okText: 1}),
            () => ({okText: 2}),
            () => ({googleText: 1}),
            () => ({googleText: 2}),
            []
        ];

        const resultWithPrimitives = [
            {moveCircleToMiddle: true},
            100,
            {showGrayCircle: true},
            {showMicrophone: true},
            '500',
            {moveCircleToTop: true},
            '100',
            {pulseGrayCircle: true},
            {okText: 1},
            {okText: 2},
            {googleText: 1},
            {googleText: 2},
            []
        ];

        const promise = sequence(valuesWithPrimitives);

        promise.should.be.fulfilled.and.become(resultWithPrimitives).notify(done);
    });

    it('should execute sequence with promises', (done) => {
        const resultWithPromises = [
            {moveCircleToMiddle: true},
            {foo: true}, //1
            {showGrayCircle: true},
            {showMicrophone: true},
            {bar: true}, //4
            {moveCircleToTop: true},
            {pulseGrayCircle: true}
        ];

        const promise = sequence([
            () => (resultWithPromises[0]),
            timeout(10, resultWithPromises[1]),
            () => (resultWithPromises[2]),
            () => (resultWithPromises[3]),
            timeout(50, resultWithPromises[4]),
            () => (resultWithPromises[5]),
            timeout(10),
            () => (resultWithPromises[6])
        ]);

        promise.should.be.fulfilled.and.become(resultWithPromises).notify(done);
    });

    it('should execute sequence with functions that return promises', (done) => {
        const resultWithPromises = [
            {moveCircleToMiddle: true},
            {foo: true}, //1
            {showGrayCircle: true},
            {showMicrophone: true},
            {bar: true}, //4
            {moveCircleToTop: true},
            {pulseGrayCircle: true}
        ];

        const promise = sequence([
            () => (resultWithPromises[0]),
            () => timeout(10, resultWithPromises[1]),
            () => (resultWithPromises[2]),
            () => (resultWithPromises[3]),
            () => timeout(50, resultWithPromises[4]),
            () => (resultWithPromises[5]),
            () => timeout(10),
            () => (resultWithPromises[6])
        ]);

        promise.should.be.fulfilled.and.become(resultWithPromises).notify(done);
    });

    it('should execute sequence with rejected promise', (done) => {
        const resultWithRejected = [
            {moveCircleToMiddle: true},
            {error: true}
        ];

        const promise = sequence([
            () => (resultWithRejected[0]),
            timeout(10),
            rejection(10, resultWithRejected[1]),
            () => ({showGrayCircle: true}),
            () => ({showMicrophone: true})
        ]);

        promise.should.be.rejected.and.become(resultWithRejected).notify(done);
    });

    it('should execute sequence with function that throws an error', (done) => {
        const resultWithRejected = [
            {moveCircleToMiddle: true},
            'test error'
        ];

        const promise = sequence([
            () => (resultWithRejected[0]),
            timeout(10),
            () => {
                throw resultWithRejected[1]
            },
            () => ({showMicrophone: true})
        ]);

        promise.should.be.rejected.and.become(resultWithRejected).notify(done);
    });

    it('should execute sequence of promises and last function', (done) => {
        const expectedResult = [
            {foo: true},
            {bar: true},
            {last: true}
        ];

        const promise = sequence([
            timeout(20, expectedResult[0]),
            timeout(20, expectedResult[1]),
            () => (expectedResult[2])
        ]);

        promise.should.be.fulfilled.and.become(expectedResult).notify(done);
    });
});