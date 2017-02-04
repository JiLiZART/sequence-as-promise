const isFunc = (el) => typeof el === 'function';
const isPromise = (el) => !!el && (typeof el === 'object' || isFunc(el)) && isFunc(el.then);
const isDefined = (el) => typeof el !== 'undefined';

/**
 * Transforms current value to Promise
 * @param {Promise|Function|Object} current
 * @param {Array} args for apply if current is function
 * @returns {Promise}
 */
const transform = (current, args) =>
    isFunc(current) ? promisify(current.apply(null, args)) : promisify(current);

/**
 * Resolve value as promise
 * @param value
 * @returns {Promise}
 */
const promisify = (value) =>
    isPromise(value) ? value : Promise.resolve(value);

/**
 * Appends result to results array
 * @param {Array} results
 */
const appender = (results) =>
    (result) => {
        isDefined(result) && results.push(result);

        return results;
    };

const process = (results, append) =>
    (prev, value) =>
        prev
            .then((result) => transform(value, [result, results])
                .then(append));

/**
 * Executes array of values as promise sequence
 * @param {Array} sequence
 * @param {Array} [results]
 * @returns {Promise}
 * @throws Error
 */
module.exports = (sequence, results = []) => new Promise(
    (resolve, reject) => {
        if (!Array.isArray(sequence)) throw 'promise-sequence expects array as first argument';

        return sequence
            .reduce(process(results, appender(results)), promisify())
            .then(
                () => resolve(results),
                (error) => reject(appender(results)(error))
            );
    }
);