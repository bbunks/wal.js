# @wal.js/react

@wal.js/react allows you to use wal.js in React. It adds a hook that takes a watcher. The hook keeps the state of the watcher in sync with the component.

## Install

Install from npm using your preferred package manage.

```
npm i @wal.js/react
yarn add @wal.js/react
pnpm i @wal.js/react
```

## wal()

wal() is a composable that takes a watcher and returns a reactive value.

### Usage

```tsx
import { Watcher } from "@wal.js/core";
import { useWatcher } from "@wal.js/react";

export const CounterWatcher = new Watcher(0);

export default function Counter() {
  useWatcher(CounterWatcher);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">React Counter</h1>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onMouseDown={() => (CounterWatcher.value -= 1)}
        >
          Decrement
        </button>
        <h2 className="text-xl font-bold">{CounterWatcher.value}</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onMouseDown={() => (CounterWatcher.value += 1)}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
```