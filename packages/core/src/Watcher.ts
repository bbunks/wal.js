import { Listener, ComputedValue, Rule } from "./Types";
/**
 * A watch class
 */
export class Watcher<T> {
  //set types
  protected callbackFunctions: Set<Listener<T>>;
  protected rules: Set<Rule<T>>;
  protected InternalValue: T;
  protected ComputedValues: Set<ComputedValue<T, any>>;

  //constructor
  /**
   * @constructor
   * @param {any} initialValue - The initial value of the watcher
   */
  constructor(initialValue: T) {
    this.callbackFunctions = new Set();
    this.rules = new Set();
    this.ComputedValues = new Set();
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
   * @returns {void} The returned function will remove the listener when called
   */
  addListener(callback: Listener<T>) {
    this.callbackFunctions.add(callback);

    return () => this.removeListener(callback);
  }

  /**
   * Stop a function from being called when the value is updated
   *
   * @param {function} callback - The function to stop being called when the value is updated
   */
  removeListener(callback: Listener<T>) {
    this.callbackFunctions.delete((ele) => ele !== callback);
  }

  /**
   * Add a rule to be called before the value is updated
   *
   * @param {function} callback - The function to be called when the value is updated
   * @returns {void} The returned function will remove the rule when called
   */
  addRule(rule: Rule<T>) {
    this.rules.add(rule);

    return () => this.removeRule(rule);
  }

  /**
   * Remove a rule from being called before the value is updated
   *
   * @param {function} callback - The function to stop being called when the value is updated
   */
  removeRule(callback: Rule<T>) {
    this.rules.delete(callback);
  }

  /**
   * Run all listeners with the current value
   *
   * @param {function} callback - The function to stop being called when the value is updated
   */
  triggerListeners() {
    this.callbackFunctions.forEach((fn) => {
      fn(this.InternalValue);
    });
  }

  set value(value: T) {
    this.rules.forEach((rule) => {
      rule(value, this.InternalValue);
    });

    this.InternalValue = value;

    this.callbackFunctions.forEach((fn) => {
      fn(value);
    });
  }

  get value() {
    return this.InternalValue;
  }
}
