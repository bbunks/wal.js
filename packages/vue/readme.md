# @wal.js/vue

@wal.js/vue allows you to use wal.js in Vue. It adds a composable that takes a watcher and allows the value to be used in the template.

I am not great at Vue, so if you have any suggestions for improvements, please let me know. I would prefer to have the composable just let vue know it needs to rerender when the value changes, but I couldn't figure out how to do that.

## Install

Install from npm using your preferred package manage.

```
npm i @wal.js/vue
yarn add @wal.js/vue
pnpm i @wal.js/vue
```

## wal()

wal() is a composable that takes a watcher and returns a reactive value.

### Usage

```vue
<script setup>
import { ref, watchEffect } from 'vue';
import { CounterWatcher } from "../../stores/CounterStore";
import { wal } from "@wal.js/vue";

const count = wal(CounterWatcher);

function decrement() {
  CounterWatcher.value -= 1;
}

function increment() {
  CounterWatcher.value += 1;
}
</script>

<template>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center gap-4">
    <h1 class="text-xl font-bold">Vue Counter</h1>
    <div class="flex gap-2">
      <button
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        @click="decrement"
      >
        Decrement
      </button>
      <h2 class="text-xl font-bold">{{ count }}</h2>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        @mousedown="increment"
      >
        Increment
      </button>
    </div>
  </div>
</template>
```