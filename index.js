const timeout = (time, ...values) => new Promise((resolve) => setTimeout(() => resolve(...values), time));
const callback = (el, ...values) => new Promise((resolve) => resolve(el(...values)));
const isNum = (el) => typeof el === 'number';
const execute = (curr) => (...args) => isNum(curr) ? timeout(curr, ...args) : callback(curr, ...args);

module.exports = (values) => new Promise(
    (resolve, reject) => values
        .reduce(
            (prev, curr) => prev.then(execute(curr), reject),
            Promise.resolve(false)
        )
        .then(resolve, reject)
);