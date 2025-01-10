import { Ref, ref, UnwrapRef, watch, onWatcherCleanup, watchEffect } from "vue";
import { Watcher } from "@wal.js/core";

/**
 * A Vue composable used to convert a Watcher from wal.js to Vue refs.
 *
 * @constructor
 * @param {Watcher} watcher - A watcher that will be written to and read from
 */
export function wal<T>(
  watcher: Watcher<T>
): Ref<T, T> | Ref<UnwrapRef<T>, T | UnwrapRef<T>> {
  const value = ref<T>(watcher.value);

  watchEffect(() => {
    value.value = watcher.value;

    const unsubscribe = watcher.addListener((v) => {
      value.value = v;
    });
    onWatcherCleanup(() => {
      unsubscribe();
    });
  });

  return value;
}
