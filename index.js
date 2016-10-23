const isFunc = (el) => typeof el === 'function';
const isPromise = (el) => !!el && (typeof el === 'object' || isFunc(el)) && isFunc(el.then);
const isDefined = (el) => typeof el !== 'undefined';

/**
 * Transforms current value to Promise
 * @param curr
 * @param values
 * @param {Function} append
 * @param result
 * @returns {Promise}
 */
const transform = (curr, values, append, result) => {
    if (isPromise(curr)) return curr;
    if (isFunc(curr)) return Promise.resolve(curr(result, values));

    return Promise.resolve(curr);
};

/**
 * Executes array of values as promise sequence
 * @param {Array} seq
 * @returns {Promise}
 * @throws Error
 */
module.exports = (seq) => new Promise(
    (resolve, reject) => {
        const values = [], append = (result) => {
            if (isDefined(result)) values.push(result);
        };

        if (!Array.isArray(values)) {
            throw new Error('promise-sequence expects array as first argument');
        }

        seq
            .reduce(
                (prev, curr) => prev.then(
                    (result) => transform(curr, values, append, result).then(append, append)
                ),
                Promise.resolve()
            )
            .then(() => resolve(values), () => reject(values))
    }
);