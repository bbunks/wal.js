import { useSyncExternalStore } from "react";
import { Watcher } from "@wal.js/core";

/**
 * A react hook used to convert a Watcher from wal.js to react states.
 *
 * @constructor
 * @param {Watcher} watcher - A watcher that will be written to and read from
 */
export function useWatcher<T>(watcher: Watcher<T>) {
  return useSyncExternalStore(
    watcher.addListener,
    () => watcher.value,
    () => watcher.value
  );
}
