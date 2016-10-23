[![Build Status](https://travis-ci.org/JiLiZART/sequence-as-promise.svg?branch=master)](https://travis-ci.org/JiLiZART/sequence-as-promise)
[![Code Climate](https://codeclimate.com/github/JiLiZART/sequence-as-promise/badges/gpa.svg)](https://codeclimate.com/github/JiLiZART/sequence-as-promise)
## Sequence as Promise
Is zero dependency, lightweight function that allows 
execute array of functions and promises in sequence and returns Promise

## What it do?
Behavior very similar to `Promise.all`, but all promises or functions executes in sequence.

this code
```js
promise1.then(promise2.then(promise3.then(callback)));
```

equivalent to
```js
const seq = require('sequence-as-promise');

seq([promise1, promise2, promise3]).then(callback);
```

## How to use

with npm
```shell
npm i --save sequence-as-promise
```

with yarn
```shell
yarn add sequence-as-promise
```

We have array of functions, and we need to execute all that functions in sequence

All these functions accepts two arguments, `(prev, values) => {}`

- `prev` the result of previous function call
- `values` an array of results from previous functions calls

```js
const seq = require('sequence-as-promise');
const values = [
    (prev, values) => {
        return {moveCircleToMiddle: true};
    },
    (prev, values) => {
        return {showGrayCircle: true};
    },
    (prev, values) => {
        return {showMicrophone: true};
    },
    (prev, values) => {
        return {moveCircleToTop: true};
    },
    (prev, values) => {
        return {pulseGrayCircle: true};
    },
    (prev, values) => {
        return {okText: 1};
    },
    (prev, values) => {
        return {okText: 2};
    },
    (prev, values) => {
        return {googleText: 1};
    },
    (prev, values) => {
        return {googleText: 2};
    }
];
seq(values).then(() => console.log('all done'))
```

## More examples
But, if we need to call all that functions with primitive values between them (why not?).

```js
const seq = require('sequence-as-promise');
const values = [
    () => {
        return {moveCircleToMiddle: true};
    },
    100,
    (prev, values) => { // prev == 100
        return {showGrayCircle: true};
    },
    () => {
        return {showMicrophone: true};
    },
    500,
    (prev, values) => { // prev == 500
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
seq(values).then(() => console.log('all done'))
```

Or we have Promises in that array of functions.

```js
const seq = require('sequence-as-promise');
const values = [
    () => new Promise((resolve, reject) => {
        resolve({moveCircleToMiddle: true});
    }),
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
seq(values).then(() => console.log('all done'))
```