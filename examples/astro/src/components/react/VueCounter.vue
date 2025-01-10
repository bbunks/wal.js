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
