'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Watcher {
    //constructor
    /**
     * Used to wrap a value in a watcher.
     *
     * @constructor
     * @param {any} initialValue - The initial value of the watcher
     */
    constructor(initialValue) {
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
    addListener(callback) {
        this.callbackFunctions.push(callback);
    }
    /**
     * Stop a function from being called when the value is updated
     *
     * @param {function} callback - The function to stop being called when the value is updated
     */
    removeListener(callback) {
        this.callbackFunctions = this.callbackFunctions.filter((ele) => ele !== callback);
    }
    /**
     * Add a rule to be called before the value is updated
     *
     * @param {function} callback - The function to be called when the value is updated
     */
    addRule(rule) {
        this.rules.push(rule);
    }
    /**
     * Stop a rule from being called before the value is updated
     *
     * @param {function} callback - The function to stop being called when the value is updated
     */
    removeRule(callback) {
        this.rules = this.rules.filter((ele) => ele !== callback);
    }
    /**
     * Run all listeners with the current value
     *
     * @param {function} callback - The function to stop being called when the value is updated
     */
    triggerListeners() {
        this.callbackFunctions.forEach((fn) => __awaiter(this, void 0, void 0, function* () {
            fn(this.InternalValue);
        }));
    }
    set value(value) {
        this.rules.forEach((rule) => {
            rule(value, this.InternalValue);
        });
        this.InternalValue = value;
        this.callbackFunctions.forEach((fn) => __awaiter(this, void 0, void 0, function* () {
            fn(value);
        }));
    }
    get value() {
        return this.InternalValue;
    }
}

exports.Watcher = Watcher;
//# sourceMappingURL=index.js.map
