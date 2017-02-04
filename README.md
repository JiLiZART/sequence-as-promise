[![Build Status](https://travis-ci.org/JiLiZART/sequence-as-promise.svg?branch=master)](https://travis-ci.org/JiLiZART/sequence-as-promise)
[![Code Climate](https://codeclimate.com/github/JiLiZART/sequence-as-promise/badges/gpa.svg)](https://codeclimate.com/github/JiLiZART/sequence-as-promise)
## Sequence as Promise
It's zero dependency and lightweight function that allows execute array of functions and promises in sequence and returns Promise

## What it do?
Behavior very similar to `Promise.all`, but all promises or functions executes in sequence.
Function executes promises with functions one by one and returns promise withresults array

this code
```js
promise1.then(() => promise2.then(() => promise3.then(callback))).then(done);
```

equivalent to
```js
const sequence = require('sequence-as-promise');

sequence([promise1, promise2, promise3, callback]).then(done);
```

## How to install

with npm
```shell
npm i --save sequence-as-promise
```

with yarn
```shell
yarn add sequence-as-promise
```

## Basic usage

We have array of functions with promises, and we need to execute all that functions in sequence

All these functions accepts two arguments, `(prevResult, results) => {}`

- `prevResult` the result of previous function or promise call
- `results` an array of results from previous functions or promises calls

```js
const sequence = require('sequence-as-promise');
sequence([
    Promise.resolve({status: true}),
    (prevResult/*{status: true}*/, results) => {
        return {moveCircleToMiddle: true};
    },
    (prevResult/*{moveCircleToMiddle: true}*/, results) => {
        return {showGrayCircle: true};
    },
    (prevResult/*{showGrayCircle: true}*/, results) => {
        return {showMicrophone: true};
    }
]).then((results) => console.log('all done', results))
```

## Functions that returns promise

Most standard use case is fetch dependant data one by one

```js
const sequence = require('sequence-as-promise');
sequence([
    fetchUser(32),
    (user) => {
        if (user && user.id === 1) {
            return fetchAdminUrls(user.id);
        }

        return fetchUserUrls(user.id);
    },
    (urls) => {//previous fetch resolved and passed as argument
        return urls.map(makeLink)
    }
]).then((results) => {
    const [user, _, links] = results;
    
    renderHTML(user, links);
});
```

## Handle errors

Any function or promise in sequence can throw an error, so we need handle it

```js
const sequence = require('sequence-as-promise');
sequence([
    fetchUser(32),
    (user) => {
        if (user && user.id === 1) {
            return fetchAdminUrls(user.id); //for instance this fetch throws server error
        }

        return fetchUserUrls(user.id);
    },
    (urls) => { //this will not be executed, because previous promise thorws error
        return urls.map(makeLink); 
    }
]).then(
    (results) => {
        const [user, _, links] = results;
        
        renderHTML(user, links);
    },
    (results) => {
        const error = results.pop(); //last item in results always be an error

        renderError(error);
    }
);
```

## More examples
But, if we need to call all that functions with primitive values between them (why not?).

```js
const sequence = require('sequence-as-promise');
sequence([
    () => {
        return {moveCircleToMiddle: true};
    },
    100,
    (prevResult/*100*/, results) => {
        return {showGrayCircle: prevResult};
    },
    (prevResult/*{showGrayCircle: 100}*/, results) => {
        return {showMicrophone: true};
    },
    500,
    (prev, values) => { // prev == 500
        return {moveCircleToTop: true};
    }
]).then((results) => console.log('all done', results))
```

Or we have Promises in that array of functions.

```js
const sequence = require('sequence-as-promise');
sequence([
    () => new Promise((resolve, reject) => {
        resolve({moveCircleToMiddle: true});
    }),
    () => {
        return {showGrayCircle: true};
    }
]).then(() => console.log('all done'))
```
