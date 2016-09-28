[![Build Status](https://travis-ci.org/JiLiZART/sequence-as-promise.svg?branch=master)](https://travis-ci.org/JiLiZART/sequence-as-promise)
## Sequence as Promise
Executes array of functions and promises in sequence and returns Promise

## How to use
We have array of functions, and we need to execute all that functions in sequence

All these functions accepts two arguments, `function (value, results) {}`

- `value` the result of previous function call
- `results` an array of results previous functions calls


```js
const seq = require('sequence-as-promise');
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
seq(values).then(() => console.log('all done'))
```

## More examples
But, if we need to call all that functions with delays between them.

```js
const seq = require('sequence-as-promise');
const values = [
    () => {
        return {moveCircleToMiddle: true};
    },
    100, // 100ms delay
    () => {
        return {showGrayCircle: true};
    },
    () => {
        return {showMicrophone: true};
    },
    500, // 500ms delay
    () => {
        return {moveCircleToTop: true};
    },
    100, // 100ms delay
    () => {
        return {pulseGrayCircle: true};
    },
    500, // 500ms delay
    () => {
        return {okText: 1};
    },
    500, // 500ms delay
    () => {
        return {okText: 2};
    },
    500, // 500ms delay
    () => {
        return {googleText: 1};
    },
    500, // 500ms delay
    () => {
        return {googleText: 2};
    }
];
seq(values).then(() => console.log('all done'))
```

Or we have Promise in that array of functions.

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