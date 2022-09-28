# wal.js (watch and listen)

wal.js allows you to watch a value and then add listeners for when the value updates. The motivation behind this project was to create a way to easily listen to values of objects as they are updated, and then be able trigger actions as needed.

## Install

Install from npm using your prefer package manage.

```
npm i wal.js
yarn add wal.js
pnpm i wal.js
```

## Watcher

Watchers are essentially variables. You can read and store any value, but you get the benefits of making decisions about what happens before and after setting the value.

### Create a new watcher

Watcher is a class. Call the constructor with the initial value as the only argument.

```javascript
import { Watcher } from "wal.js";

const pageIndexWatcher = new Watcher(1);
```

## Value

### Read the watcher value

To read the watcher value, you just need to reference the .value.

```javascript
const pageIndexWatcher = new Watcher(1);

console.log(pageIndexWatcher.value); // 1
```

### Update the watcher value

To update the watcher value, set the value equal to something new.

```javascript
const pageIndexWatcher = new Watcher(1);

console.log(pageIndexWatcher.value); // 1

// This updates the value
pageIndexWatcher.value = 2;

console.log(pageIndexWatcher.value); // 2
```

Note: in order for everything to work as intended, you need to set the actual value. It is not recomended to set a child of the value. If you need to set a child, you can call `triggerListeners()` to let the watcher know you updated its value.

## Listeners

Listeners are functions that are called whenever the value is updated successfully. Whenever the value is updated, it will call all the functions with the new value as the first argument.

### Add a listener

`addListener` is used to add a listener to the watcher. Call it with a reference to a function as the argument.

```javascript
const pageIndexWatcher = new Watcher(1);

//create watcher rules
function printPageToConsole(index: number) {
  console.log(index);
}
pageIndexWatcher.addListener(printPageToConsole);

pageIndexWatcher.value = 2; // This will log 2 to the console.
pageIndexWatcher.value = 3; // This will log 3 to the console.
```

### Remove a listener

To stop a listener from triggering, call `removeListener` with a reference to the original function.

```javascript
const pageIndexWatcher = new Watcher(1);

function printPageToConsole(index: number) {
  console.log(index);
}
pageIndexWatcher.addListener(printPageToConsole);

pageIndexWatcher.value = 2; // This will log 2 to the console.

pageIndexWatcher.removeListener(printPageToConsole);

pageIndexWatcher.value = 3; // This will update the value but not print to console
```

### Trigger listeners

`triggerListeners` will run all functions with the current value.

```javascript
const pageIndexWatcher = new Watcher(1);

//create watcher rules
function printPageToConsole(index: number) {
  console.log(index);
}
pageIndexWatcher.addListener(printPageToConsole);

pageIndexWatcher.value = 2; // This will log 2 to the console.
pageIndexWatcher.value = 3; // This will log 3 to the console.
```

## Rules

Rules are similar to listeners, The difference is the functions are ran before the value is set. This means that you can throw errors to prevent data from being set to the value.

### Add a rule

The `addRule` function is used to add rules. It takes a function as its only argument and returns nothing. When you throw an exception in a rule, it will stop the value from being written.

```javascript
const pageIndexWatcher = new Watcher(1);

function isNum(value) {
  if (typeof value !== "number") throw "The value is not set to a number";
}

pageIndexWatcher.addRule(isNum);

pageIndexWatcher.value = "Hello world!"; // Uncaught: The value is not set to a number
```

### Remove a rule

The `removeRule` function will stop a function from being called. It takes a function as its aonly argument.

```javascript
pageIndexWatcher.removeRule(isNum);
```
