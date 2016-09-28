const isNum = (el) => typeof el === 'number';
const isFunc = (el) => typeof el === 'function';
const isPromise = (el) => !!el && (typeof el === 'object' || isFunc(el)) && isFunc(el.then);
const isDefined = (el) => typeof el !== 'undefined';

/**
 * Wraps time into timeout promise
 * @param {Number} time
 * @param {*} value
 * @returns {Promise}
 */
const timeout = (time, value) => {
    console.log('timeout', time);
    return new Promise(
        (resolve) => {
            setTimeout(() => resolve(value), time)
        }
    );
};

/**
 * Wraps callback function into promise
 * @param {Function} func
 * @param {*} prevResult
 * @param {Array} results
 * @param {Function} pushResult
 * @returns {Promise}
 */
const callback = (func, prevResult, results, pushResult) => {
    const result = func(prevResult, results);
    pushResult(result);

    return new Promise(
        (resolve) => {
            resolve(result);
        }
    );
};

const promise = (el, pushResult) => {
    return el.then((result) => {
        pushResult(result);
    });
};

/**
 *
 * @param curr
 * @param results
 * @returns {Promise}
 * @throws Error
 */
const execute = (curr, results) => (prevResult) => {
    const pushResult = (result) => {
        if (isDefined(result)) results.push(result);
    };

    if (isNum(curr)) return timeout(curr, prevResult);
    if (isPromise(curr)) return promise(curr, pushResult);
    if (isFunc(curr)) return callback(curr, prevResult, results, pushResult);

    throw new Error('Invalid value given in sequence, expected number, promise or function');
};

/**
 * Executes array of values as promise sequence
 * @param {Array} values
 * @returns {Promise}
 * @throws Error
 */
module.exports = (values) => new Promise(
    (resolve, reject) => {
        const results = [];

        if (!Array.isArray(values)) {
            throw new Error('promise-sequence expects array as first argument');
        }

        values
            .reduce(
                (prev, curr) => prev.then(execute(curr, results), reject),
                Promise.resolve()
            )
            .then((...args) => resolve(results), () => reject(results))
    }
);