import { Watcher } from "@wal.js/core";

export const CounterWatcher = new Watcher(0);

CounterWatcher.addListener((value) => {
  console.log("CounterWatcher changed:", value);
});
