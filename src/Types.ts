/** A function that will be called before the value of a watcher is updated */
export type Rule<T> =
  | ((newValue: T) => void)
  | ((newValue: T, oldValue: T) => void);
/** A function that will be called when the value of a watcher is updated */
export type Listener<T> = (value: T) => void;
export type ComputedValue<T, S> = (value: T) => S;
