[![Build Status](https://travis-ci.org/JiLiZART/promise-sequence.svg?branch=master)](https://travis-ci.org/JiLiZART/promise-sequence)
# promise-sequence
Выполняет массив функций как последовательность промисов

## Как использовать
у нас есть массив функций, и нам нужно выполнить все эти функции последовательно
```js
const seq = require('promise-sequence');
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

## Больше примеров
Или нам нужно выполнить последовательность функций с паузами между вызовами.

```js
const seq = require('promise-sequence');
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

Или у нас есть массив из функций и промисов, нужно вызвать все последовательно включая промисы.

```js
const seq = require('promise-sequence');
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

## Аргументы коллбэка

В каждую функцию последовательности передаются следующие аргументы

- Результат вызова предидушей функции
- Массив результатов вызовов функций последовательности

```js
function (value, results) {}
```