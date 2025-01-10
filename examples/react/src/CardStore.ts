import { Watcher } from "@wal.js/core";

export const CardStoreWatcher = new Watcher(0);

CardStoreWatcher.addListener((v) => {
  console.log("CardStoreWatcher changed", v);
});
