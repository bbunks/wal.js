/** A function that will be called before the value of a watcher is updated */
type Rule<T> = ((newValue: T) => void) | ((newValue: T, oldValue: T) => void);
/** A function that will be called when the value of a watcher is updated */
type Listener<T> = (value: T) => void;

/**
 * A watch class
 */
export class Watcher<T> {
  //set types
  protected callbackFunctions: Listener<T>[];
  protected rules: Rule<T>[];
  protected InternalValue: T;

  //constructor
  /**
   * @constructor
   * @param {any} initialValue - The initial value of the watcher
   */
  constructor(initialValue: T) {
    this.callbackFunctions = [];
    this.rules = [];
    this.InternalValue = initialValue;
    this.triggerListeners = this.triggerListeners.bind(this);
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.addRule = this.addRule.bind(this);
    this.removeRule = this.removeRule.bind(this);
  }

  //functions
  /**
   * Add a function to be called when the value is updated
   *
   * @param {function} callback - The function to be called when the value is updated
   */
  addListener(callback: Listener<T>) {
    this.callbackFunctions.push(callback);
  }

  /**
   * Stop a function from being called when the value is updated
   *
   * @param {function} callback - The function to stop being called when the value is updated
   */
  removeListener(callback: Listener<T>) {
    this.callbackFunctions = this.callbackFunctions.filter(
      (ele) => ele !== callback
    );
  }

  /**
   * Add a rule to be called before the value is updated
   *
   * @param {function} callback - The function to be called when the value is updated
   */
  addRule(rule: Rule<T>) {
    this.rules.push(rule);
  }

  /**
   * Stop a rule from being called before the value is updated
   *
   * @param {function} callback - The function to stop being called when the value is updated
   */
  removeRule(callback: Rule<T>) {
    this.rules = this.rules.filter((ele) => ele !== callback);
  }

  /**
   * Run all listeners with the current value
   *
   * @param {function} callback - The function to stop being called when the value is updated
   */
  triggerListeners() {
    this.callbackFunctions.forEach(async (fn) => {
      fn(this.InternalValue);
    });
  }

  set value(value: T) {
    this.rules.forEach((rule) => {
      rule(value, this.InternalValue);
    });

    this.InternalValue = value;

    this.callbackFunctions.forEach(async (fn) => {
      fn(value);
    });
  }

  get value() {
    return this.InternalValue;
  }
}
