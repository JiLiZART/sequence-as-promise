const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
const seq = require('../index.js');
const timeout = (time) => new Promise((resolve) => setTimeout(() => resolve(), time))
const values = [
    () => {
        return {moveCircleToMiddle: true};
    },
    () => {
        return {showGrayCircle: true};
    },
    () => {
        return {showMicrophone: true};
    },
    () => {
        return {moveCircleToTop: true};
    },
    () => {
        return {pulseGrayCircle: true};
    },
    () => {
        return {okText: 1};
    },
    () => {
        return {okText: 2};
    },
    () => {
        return {googleText: 1};
    },
    () => {
        return {googleText: 2};
    }
];
const valuesWithDelays = [
    () => {
        return {moveCircleToMiddle: true};
    },
    100,
    () => {
        return {showGrayCircle: true};
    },
    () => {
        return {showMicrophone: true};
    },
    500,
    () => {
        return {moveCircleToTop: true};
    },
    100,
    () => {
        return {pulseGrayCircle: true};
    },
    500,
    () => {
        return {okText: 1};
    },
    500,
    () => {
        return {okText: 2};
    },
    500,
    () => {
        return {googleText: 1};
    },
    500,
    () => {
        return {googleText: 2};
    }
];

const valuesWithPromises = [
    () => {
        return {moveCircleToMiddle: true};
    },
    timeout(100),
    () => {
        return {showGrayCircle: true};
    },
    () => {
        return {showMicrophone: true};
    },
    timeout(500),
    () => {
        return {moveCircleToTop: true};
    },
    timeout(100),
    () => {
        return {pulseGrayCircle: true};
    },
    timeout(500),
    () => {
        return {okText: 1};
    },
    timeout(500),
    () => {
        return {okText: 2};
    },
    timeout(500),
    () => {
        return {googleText: 1};
    },
    timeout(500),
    () => {
        return {googleText: 2};
    }
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

describe('promise sequence', () => {
    it('should execute sequence of functions', () => {
        return seq(values).then((res) => {
            expect(res).to.be.eql(result);
        });
    });

    it('should execute sequence of functions with delay', () => {
        return seq(valuesWithDelays).then((res) => {
            expect(res).to.be.eql(result);
        });
    });

    it('should execute sequence of functions with promises', () => {
        return seq(valuesWithPromises).then((res) => {
            expect(res).to.be.eql(result);
        });
    });
});