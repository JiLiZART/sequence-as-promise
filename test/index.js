const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
const seq = require('../index.js');
const values = [
    (...args) => {
        console.log(...args);
        return {moveCircleToMiddle: true};
    },
    100,
    (...args) => {
        console.log(...args);
        return {showGrayCircle: true};
    },
    (...args) => {
        console.log(...args);
        return {showMicrophone: true};
    },
    500,
    (...args) => {
        console.log(...args);
        return {moveCircleToTop: true};
    },
    100,
    (...args) => {
        console.log(...args);
        return {pulseGrayCircle: true};
    },
    500,
    (...args) => {
        console.log(...args);
        return {okText: 1};
    },
    500,
    (...args) => {
        console.log(...args);
        return {okText: 2};
    },
    500,
    (...args) => {
        console.log(...args);
        return {googleText: 1};
    },
    500,
    (...args) => {
        console.log(...args);
        return {googleText: 2};
    }
];

describe('promise sequence', () => {
    it('should execute sequence', (done) => {
        seq(values).then((...args) => {
            console.log(args);

            done();
        })
    });
});