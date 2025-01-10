import { Watcher } from "./Watcher.js";
import { Listener } from "./Types.js";

export class ComputeVal<T, S> extends Watcher<S> implements Watcher<S> {
  protected InternalValue: S;
  protected cachedInput: T;
  protected parentWatcher: Watcher<T>;
  protected isComputed: boolean;
  protected computation: (parentValue: T) => S;

  constructor(computation: (parentValue: T) => S, parentWatcher: Watcher<T>) {
    super(computation(parentWatcher.value));
    this.computation = computation;
    this.isComputed = false;
    this.cachedInput = parentWatcher.value;
    this.parentWatcher = parentWatcher;

    // this is ignored for speed. When accessing the value, it will be computed and will never be null
    //@ts-ignore
    this.InternalValue = null;

    this.computeValue = this.computeValue.bind(this);
    this.triggerListeners = this.triggerListeners.bind(this);
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.addRule = this.addRule.bind(this);
    this.removeRule = this.removeRule.bind(this);

    parentWatcher.addListener((val: T) => {
      if (this.cachedInput !== val) {
        this.isComputed = false;
      }
    });
  }

  protected computeValue() {
    if (!this.isComputed && this.callbackFunctions.size > 0) {
      this.InternalValue = this.computation(this.parentWatcher.value);
      this.isComputed = true;
    }
  }

  addListener(callback: Listener<S>) {
    this.computeValue();
    return super.addListener(callback);
  }

  set value(value: S) {
    throw new Error("You cannot set the value of a computed value");
  }

  get value(): S {
    if (!this.isComputed) {
      this.InternalValue = this.computation(this.parentWatcher.value);
      this.isComputed = true;
    }
    return this.InternalValue;
  }
}
