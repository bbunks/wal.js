export declare class Watcher<T> {
    protected callbackFunctions: ((value: T) => void)[];
    protected rules: (((newValue: T) => void) | ((newValue: T, oldValue: T) => void))[];
    protected InternalValue: T;
    /**
     * Used to wrap a value in a watcher.
     *
     * @constructor
     * @param {any} initialValue - The initial value of the watcher
     */
    constructor(initialValue: T);
    /**
     * Add a function to be called when the value is updated
     *
     * @param {function} callback - The function to be called when the value is updated
     */
    addListener(callback: (value: T) => void): void;
    /**
     * Stop a function from being called when the value is updated
     *
     * @param {function} callback - The function to stop being called when the value is updated
     */
    removeListener(callback: (value: T) => void): void;
    /**
     * Add a rule to be called before the value is updated
     *
     * @param {function} callback - The function to be called when the value is updated
     */
    addRule(rule: (value: T) => void): void;
    /**
     * Stop a rule from being called before the value is updated
     *
     * @param {function} callback - The function to stop being called when the value is updated
     */
    removeRule(callback: (value: T) => void): void;
    /**
     * Run all listeners with the current value
     *
     * @param {function} callback - The function to stop being called when the value is updated
     */
    triggerListeners(): void;
    set value(value: T);
    get value(): T;
}
