//#region TYPES
/**
 * unknown function type.
 * @params args arguments
 * @returns unknown value
 */
export type Function = (...args: unknown[]) => unknown;
//#endregion




//#region CONSTANTS
/**
 * Do nothing.
 * @param _args arguments (ignored)
 * @example
 * ```javascript
 * xfunction.NOOP(1, 2);
 * // → undefined
 *
 * xfunction.NOOP('a', 'b');
 * // → undefined
 * ```
 */
export function NOOP(..._args: unknown[]): void {}
// - https://lodash.com/docs/4.17.15#noop


/**
 * Return false.
 * @param _args arguments (ignored)
 * @returns false.
 * @example
 * ```javascript
 * xfunction.FALSE();
 * // → false
 * ```
 */
export function FALSE(..._args: unknown[]): false {
  return false;
}
// - https://www.npmjs.com/package/boolbase


/**
 * Return true.
 * @param _args arguments (ignored)
 * @returns true.
 * @example
 * ```javascript
 * xfunction.TRUE();
 * // → true
 * ```
 */
export function TRUE(..._args: unknown[]): true {
  return true;
}
// - https://www.npmjs.com/package/boolbase


/**
 * Return the same (first) value.
 * @param v a value
 * @returns v
 * @example
 * ```javascript
 * xfunction.IDENTITY(1);
 * // → 1
 *
 * xfunction.IDENTITY('a');
 * // → 'a'
 * ```
 */
export function IDENTITY<T>(v: T): T {
  return v;
}


/**
 * Compare two values.
 * @param a a value
 * @param b another value
 * @returns a<b: -1, a=b: 0, a>b: 1
 * @example
 * ```javascript
 * xfunction.COMPARE(1, 2);
 * // → -1
 *
 * xfunction.COMPARE(2, 1);
 * // → 1
 *
 * xfunction.COMPARE(1, 1);
 * // → 0
 */
export function COMPARE<T>(a: T, b: T): number {
  return a<b? -1 : (a>b? 1 : 0);
}


/**
 * Return the arguments passed as a array.
 * @param args arguments
 * @returns [...args]
 * @example
 * ```javascript
 * xfunction.ARGUMENTS(1, 2);
 * // → [1, 2]
 *
 * xfunction.ARGUMENTS('a', 'b');
 * // → ['a', 'b']
 * ```
 */
export function ARGUMENTS(...args: unknown[]): unknown[] {
  return args;
}
//#endregion




//#region METHODS (BUILTIN)
//#region ABOUT
/**
 * Get the name of a function.
 * @param x a function
 * @returns name
 * @example
 * ```javascript
 * import {delay, debounce} from "jsr:@nodef/extra-function";
 *
 * xfunction.name(delay);
 * // → 'delay'
 *
 * xfunction.name(debounce);
 * // → 'debounce'
 * ```
 */
export function name(x: Function): string {
  return x.name;
}
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// - https://www.npmjs.com/package/fn-name


/**
 * Get the number of parameters of a function.
 * @param x a function
 * @returns |[p, q, ...]| | x(p, q, ...)
 * @example
 * ```javascript
 * xfunction.length(() => 0);
 * // → 0
 *
 * xfunction.length((x, y) => 0);
 * // → 2
 * ```
 */
export function length(x: Function): number {
  return x.length;
}
export {length as arity};
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length
//#endregion




//#region BINDING
/**
 * Bind this-object, and optional prefix arguments to a function.
 * @param x a function
 * @param ths this object to bind
 * @param prefix prefix arguments
 * @returns (...args) => this.x(...prefix, ...args)
 * @example
 * ```javascript
 * var array  = [1];
 * var fn = xfunction.bind(Array.prototype.push, array);
 * fn(2, 3, 4);  // push(2, 3, 4)
 * array;
 * // → [1, 2, 3, 4]
 *
 * var array  = [1, 2, 3, 4];
 * var fn = xfunction.bind(Array.prototype.splice, array, 1);
 * fn(2);  // splice(1, 2)
 * array;
 * // → [1, 4]
 * ```
 */
export function bind(x: Function, ths: unknown, ...prefix: unknown[]): Function {
  return x.bind(ths, ...prefix);
}
// - https://underscorejs.org/#bind
// - https://lodash.com/docs/4.17.15#bind
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
//#endregion




//#region INVOCATION
/**
 * Invoke a function with specified this-object, and arguments provided individually.
 * @param x a function
 * @param ths this object to invoke with
 * @param args arguments
 * @returns this.x(...args)
 * @example
 * ```javascript
 * var array = [1];
 * xfunction.call(Array.prototype.push, array, 2, 3, 4);  // push(2, 3, 4)
 * array;
 * // → [1, 2, 3, 4]
 *
 * var array = [1, 2, 3, 4];
 * xfunction.call(Array.prototype.splice, array, 1, 2);  // splice(1, 2)
 * array;
 * // → [1, 4]
 * ```
 */
export function call(x: Function, ths: unknown=null, ...args: unknown[]): unknown {
  return x.call(ths, ...args);
}


/**
 * Invoke a function with specified this-object, and arguments provided as an array.
 * @param x a function
 * @param ths this object to invoke with
 * @param args arguments array
 * @returns this.x(...args)
 * @example
 * ```javascript
 * var array = [1];
 * xfunction.apply(Array.prototype.push, array, [2, 3, 4]);  // push(2, 3, 4)
 * array;
 * // → [1, 2, 3, 4]
 *
 * var array = [1, 2, 3, 4];
 * xfunction.apply(Array.prototype.splice, array, [1, 2]);  // splice(1, 2)
 * array;
 * // → [1, 4]
 * ```
 */
export function apply(x: Function, ths: unknown=null, args: unknown[]): unknown {
  return x.apply(ths, args);
}
//#endregion
//#endregion




//#region METHODS (CUSTOM)
//#region ABOUT
/**
 * Check if value is a function.
 * @param v a value
 * @returns is function?
 * @example
 * ```javascript
 * xfunction.is(Object.keys);
 * // → true
 *
 * xfunction.is(() => 0);
 * // → true
 *
 * xfunction.is(async () => 0);
 * // → true
 *
 * xfunction.is(0);
 * // → false
 * ```
 */
export function is(v: unknown): v is Function {
  return typeof v==="function";
}
// - https://www.npmjs.com/package/is-function


/**
 * Check if value is an async function.
 * @param v a value
 * @returns is async function?
 * @example
 * ```javascript
 * xfunction.isAsync(async () => 0);
 * // → true
 *
 * xfunction.isAsync(() => 0);
 * // → false
 * ```
 */
export function isAsync(v: unknown): boolean {
  const AsyncFunction = (async function () {}).constructor;
  return v instanceof AsyncFunction;
}
// - https://www.npmjs.com/package/is-async-function
// - https://www.npmjs.com/package/is-callback-function
// - https://davidwalsh.name/javascript-detect-async-function
// - https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction


/**
 * Check if value is a generator function.
 * @param v a value
 * @returns is generator function?
 * @example
 * ```javascript
 * function* naturalNumbers() {
 *   for (var i=0;; ++i)
 *     yield i;
 * }
 *
 * xfunction.isGenerator(naturalNumbers);
 * // → true
 *
 * xfunction.isGenerator(() => 0);
 * // → false
 * ```
 */
export function isGenerator(v: unknown): v is GeneratorFunction {
  const GeneratorFunction = (function* () {}).constructor;
  return v instanceof GeneratorFunction;
}
// - https://www.npmjs.com/package/is-generator
// - https://www.npmjs.com/package/is-generator-fn
// - https://www.npmjs.com/package/is-generator-function
// - https://stackoverflow.com/questions/16754956/check-if-function-is-a-generator
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
//#endregion




//#region CONTEXT
/**
 * Contextify a function by accepting the first parameter as this-object.
 * @param x a function
 * @returns (...args) => x(this, ...args)
 * @example
 * ```javascript
 * function count(x, value) {
 *   var a = 0;
 *   for (var v of x)
 *     if (v===value) ++a;
 *   return a;
 * }
 *
 * var fn = xfunction.contextify(count);
 *
 * fn.call([6, 3, 4, 3], 3);
 * // → 2
 *
 * fn.call([6, 1, 4, 3], 3);
 * // → 1
 * ```
 */
export function contextify(x: Function): Function {
  return function(this: unknown, ...args: unknown[]) { return x(this, ...args); };
}


/**
 * Decontextify a function by accepting this-object as the first argument.
 * @param x a function
 * @returns (this, ...args) => this.x(...args)
 * @example
 * ```javascript
 * function count(value) {
 *   var a = 0;
 *   for (var v of this)
 *     if (v===value) ++a;
 *   return a;
 * }
 *
 * var fn = xfunction.decontextify(count);
 *
 * fn([6, 3, 4, 3], 3);
 * // → 2
 *
 * fn([6, 1, 4, 3], 3);
 * // → 1
 * ```
 */
export function decontextify(x: Function): Function {
  return (ths: unknown=null, ...args: unknown[]) => x.call(ths, ...args);
}
//#endregion




//#region RESULT MANIPULATION
/**
 * Generate a result-negated version of a function.
 * @param x a function
 * @returns (...args) => !x(...args)
 * @example
 * ```javascript
 * var fn = xfunction.negate(isFinite);
 * fn(Infinity)
 * // → true
 * fn(1)
 * // → false
 *
 * var fn = xfunction.negate(isNaN);
 * fn(1);
 * // → true
 * fn(NaN);
 * // → false
 * ```
 */
export function negate(x: Function): Function {
  return (...args: unknown[]) => !x(...args);
}
//#endregion




//#region RESULT CACHING
/**
 * Resolve arguments into a unique key.
 * @param args arguments
 * @returns unique key
 */
export type Resolver = (...args: unknown[]) => unknown;


/**
 * Generate result-cached version of a function.
 * @param x a function
 * @param fr resolver ((...args) => unique key) [IDENTITY]
 * @param cache result cache [Map()]
 * @example
 * ```javascript
 * var calls = 0;
 *
 * function factorialRec(n: number) {
 *   if (n<=1) return 1;
 *   return n * factorialRec(n-1);
 * }
 *
 * function factorial(n: number) {
 *   ++calls;
 *   return factorialRec(n);
 * }
 *
 * var fn = xfunction.memoize(factorial);
 * fn(3);
 * // → 6
 * fn(4);
 * // → 24
 * fn(5);
 * // → 120
 * fn(3);
 * // → 6
 * fn(4);
 * // → 24
 * fn(5);
 * // → 120
 * calls;
 * // → 3
 *
 *
 * var calls = 0;
 *
 * function hypot(x: number, y: number) {
 *   ++calls;
 *   return Math.hypot(x, y);
 * }
 *
 * function resolver(x: number, y: number) {
 *   return 4093*y + x;  // a hash
 * }
 *
 * var fn = xfunction.memoize(hypot, resolver);
 * fn(3,  4);
 * // → 5
 * fn(6,  8);
 * // → 10
 * fn(5, 12);
 * // → 13
 * fn(3,  4);
 * // → 5
 * fn(6,  8);
 * // → 10
 * fn(5, 12);
 * // → 13
 * calls;
 * // → 3
 * ```
 */
export function memoize(x: Function, fr: Resolver | null=null, cache: Map<unknown, unknown> | null=null): Function {
  fr    = fr || IDENTITY;
  cache = cache || new Map();
  return (...args: unknown[]) => {
    const k = fr(...args);
    if (cache.has(k)) return cache.get(k);
    const v = x(...args);
    cache.set(k, v);
    return v;
  };
}
// - https://www.npmjs.com/package/memoizee
// - https://www.npmjs.com/package/memoizerific
//#endregion




//#region PARAMETER MANIPULATION
/**
 * Generate a parameter-reversed version of a function.
 * @param x a function
 * @returns (p, q, ...) => x(..., q, p)
 * @example
 * ```javascript
 * function divide(x, y) {
 *   return x/y;
 * }
 *
 * var fn = xfunction.reverse(divide);
 * fn(2, 4);
 * // → 2
 * fn(2, 6);
 * // → 3
 * fn(2, 8);
 * // → 4
 *
 *
 * var array = [1];
 *
 * function push(...args) {
 *   array.push(...args);
 * }
 *
 * var fn = xfunction.reverse(push);
 * fn(2, 3, 4);  // push(2, 3, 4) in reverse order
 * array;
 * // → [1, 4, 3, 2]
 * ```
 */
export function reverse(x: Function): Function {
  return (...args: unknown[]) => x(...args.reverse());
}
export {reverse as flip};


/**
 * Generate a (first) parameter-spreaded version of a function.
 * @param x a function
 * @returns (p, q, ...) => x([p, q, ...])
 * @example
 * ```javascript
 * function sum(x: number[]) {
 *   var a = 0;
 *   for (var v of x)
 *     a += v;
 *   return a;
 * }
 *
 * var fn = xfunction.spread(sum);
 * fn(1, 2, 3);  // sum([1, 2, 3])
 * // → 6
 *
 *
 * var array = [1];
 *
 * function concat(x: number[]) {
 *   return array.concat(x);
 * }
 *
 * var fn = xfunction.spread(concat);
 * fn(2, 3, 4);  // concat([2, 3, 4])
 * // → [1, 2, 3, 4]
 * ```
 */
export function spread(x: Function): Function {
  return (...args: unknown[]) => x(args);
}


/**
 * Generate a (first) parameter-collapsed version of a function.
 * @param x a function
 * @returns ([p, q, ...]) => x(p, q, ...)
 * @example
 * ```javascript
 * var fn = xfunction.unspread(Math.min);
 * fn([7, 4, 9]);  // Math.min(7, 4, 9)
 * // → 4
 *
 * var fn = xfunction.unspread((x, i, I) => x.slice(i, I));
 * fn([[1, 2, 3, 4], 2]);  // [1, 2, 3, 4].slice(2)
 * // → [3, 4]
 * ```
 */
export function unspread(x: Function): Function {
  return (args: unknown) => x(...(args as unknown[]));
}


/**
 * Attach prefix arguments to leftmost parameters of a function.
 * @param x a function
 * @param prefix prefix arguments
 * @returns (...args) => x(...prefix, ...args)
 * @example
 * ```javascript
 * var fn = xfunction.attach(Math.min, 100);
 * fn(180, 130);  // Math.min(100, 180, 130)
 * // → 100
 *
 * var array = [1];
 * var fn = xfunction.attach((...vs) => array.push(...vs), 10, 10);
 * fn(1, 2, 3);  // array.push(10, 10, 1, 2, 3)
 * array;
 * // → [1, 10, 10, 1, 2, 3]
 * ```
 */
export function attach(x: Function, ...prefix: unknown[]): Function {
  return (...args: unknown[]) => x(...prefix, ...args);
}
export {attach as partial};


/**
 * Attach suffix arguments to rightmost parameters of a function.
 * @param x a function
 * @param suffix suffix arguments
 * @returns (...args) => x(...args, ...suffix)
 * @example
 * ```javascript
 * var fn = xfunction.attachRight(Math.min, 100);
 * fn(180, 130);  // Math.min(180, 130, 100)
 * // → 100
 *
 * var array = [1];
 * var fn = xfunction.attachRight((...vs) => array.push(...vs), 10, 10);
 * fn(1, 2, 3);  // array.push(1, 2, 3, 10, 10)
 * array;
 * // → [1, 1, 2, 3, 10, 10]
 * ```
 */
export function attachRight(x: Function, ...suffix: unknown[]): Function {
  return (...args: unknown[]) => x(...args, ...suffix);
}
export {attachRight as partialRight};
//#endregion




//#region FUNCTIONAL BEHAVIOUR
/**
 * Compose functions together, in applicative order.
 * @param xs functions (f, g)
 * @returns (f o g), or f(g(x))
 * @example
 * ```javascript
 * var fn = xfunction.compose(Math.sqrt, Math.abs);
 * fn(-64);  // Math.sqrt(Math.abs(-64))
 * // → 8
 *
 * var fn = xfunction.compose(Math.sqrt, Math.min);
 * fn(22, 9);  // Math.sqrt(Math.min(22, 9))
 * // → 3
 * ```
 */
export function compose(...xs: Function[]): Function {
  return composeRight(...xs.reverse());
}
// - https://en.wikipedia.org/wiki/Function_composition
// - http://learnyouahaskell.com/higher-order-functions
// - https://www.npmjs.com/package/compose-function


/**
 * Compose functions together, such that result is piped forward.
 * @param xs functions (f, g)
 * @returns (f ▷ g), or g(f(x))
 * @example
 * ```javascript
 * var fn = xfunction.composeRight(Math.abs, Math.sqrt);
 * fn(-64);  // Math.sqrt(Math.abs(-64))
 * // → 8
 *
 * var fn = xfunction.composeRight(Math.min, Math.sqrt);
 * fn(22, 9);  // Math.sqrt(Math.min(22, 9))
 * // → 3
 * ```
 */
export function composeRight(...xs: Function[]): Function {
  return (...args: unknown[]) => {
    if (xs.length===0) return;
    let a = xs[0](...args);
    for (let i=1, I=xs.length; i<I; i++)
      a = xs[i](a);
    return a;
  };
}
// - https://stackoverflow.com/questions/1457140/haskell-composition-vs-fs-pipe-forward-operator
// - https://www.npmjs.com/package/chain-function


/**
 * Generate curried version of a function.
 * @param x a function
 * @param n number of parameters [all]
 * @returns (p)(q)(...) => x(p, q, ...)
 * @example
 * ```javascript
 * var sub = (x: number, y: number) => x - y;
 * var fn  = xfunction.curry(sub);
 * fn(2)(3);  // sub(2, 3)
 * // → -1
 *
 * var fn  = xfunction.curry(Math.min, 3);
 * fn(5)(8)(3);  // Math.min(5, 8, 3)
 * // → 3
 * ```
 */
export function curry(x: Function, n: number=x.length): Function {
  return (...args: unknown[]) => {
    if (args.length>=n) return x(...args);
    else return curry((...rest: unknown[]) => x(...args, ...rest), n-args.length);
  };
}
// - https://www.npmjs.com/package/@spudly/curry


/**
 * Generate right-curried version of a function.
 * @param x a function
 * @param n number of parameters [all]
 * @returns (p)(q)(...) => x(..., q, p)
 * @example
 * ```javascript
 * var sub = (x: number, y: number) => x - y;
 * var fn  = xfunction.curryRight(sub);
 * fn(2)(3);  // sub(3, 2)
 * // → 1
 *
 * var array = [1];
 * var push2 = (x: number, y: number) => array.push(x, y);
 * var fn  = xfunction.curryRight(push2, 2);
 * fn(2)(3);  // push2(3, 2)
 * array;
 * // → [1, 3, 2]
 * ```
 */
export function curryRight(x: Function, n: number=x.length): Function {
  return curry(reverse(x), n);
}
// - https://www.npmjs.com/package/lodash.curryright
//#endregion




//#region TIME CONTROL
/** Invocation control for time/rate-controlled functions. */
export interface InvocationControl {
  /** Disable invoking of target function. */
  clear: () => void;
  /** Immediately invoke target function. */
  flush: () => void;
}


/**
 * Generate deferred version of a function, that executes after the current stack has cleared.
 * @param x a function
 * @returns (...args) => invocation control
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.defer(() => ++count);
 * fn();
 * fn();
 * // `count` incremented after 0s
 * // `count` incremented after 0s
 * ```
 */
export function defer(x: Function): Function {
  return (...args: unknown[]): InvocationControl => {
    let h = setTimeout(flush, 0);
    function clear() { clearTimeout(h); h = 0; }
    function flush() { x(...args); clear(); }
    return {clear, flush};
  };
}


/**
 * Generate delayed version of a function.
 * @param x a function
 * @param t delay time (ms)
 * @returns (...args) => invocation control
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.delay(() => ++count, 500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * // `count` incremented after 0.5s
 * // `count` incremented after 1.5s
 *
 *
 * var count = 0;
 * var fn = xfunction.delay(() => ++count, 500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 3000);
 * // `count` incremented after 0.5s
 * // `count` incremented after 1.5s
 * // `count` incremented after 2.5s
 * // `count` incremented after 3.5s
 * ```
 */
export function delay(x: Function, t: number): Function {
  return (...args: unknown[]): InvocationControl => {
    let h = setTimeout(flush, t);
    function clear() { clearTimeout(h); h = 0; }
    function flush() { x(...args); clear(); }
    return {clear, flush};
  }
}
//#endregion




//#region RATE CONTROL (COUNT)
/**
 * Generate restricted-use version of a function.
 * @param x a function
 * @param start usable from
 * @param end usable till (excluding) [-1 ⇒ end]
 * @returns (...args) => x(...args) from [start:end] calls
 * @example
 * ```javascript
 * var sum = 0;
 * var add = (x: number) => sum += x;
 * var fn  = xfunction.restrict(add, 0, 4);
 * for (var i=0; i<10; ++i)
 *   fn(i);
 * sum;  // 0 + 1 + 2 + 3
 * // → 6
 *
 *
 * var sum = 0;
 * var add = (x: number) => sum += x;
 * var fn  = xfunction.restrict(add, 4, 8);
 * for (var i=0; i<10; ++i)
 *   fn(i);
 * sum;  // 4 + 5 + 6 + 7
 * // → 22
 * ```
 */
export function restrict(x: Function, start: number, end: number=-1): Function {
  let i = -1;
  return (...args: unknown[]) => {
    if ((++i<start)===(i<end || end<0)) return;
    return x(...args);
  };
}
// - https://www.npmjs.com/package/one-time
// - https://www.npmjs.com/package/onetime
// - https://www.npmjs.com/package/once
// - https://lodash.com/docs/4.17.15#after
// - https://lodash.com/docs/4.17.15#before


/**
 * Restrict a function to be used only once.
 * @param x a function
 * @returns (...args) => x(...args) from [0:1] calls
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.restrictOnce(x => ++count);
 * for (var i=0; i<10; ++i)
 *   fn(i);
 * count;
 * // → 1
 * ```
 */
export function restrictOnce(x: Function): Function {
  return restrict(x, 0, 1);
}
export {restrictOnce as once};
// - https://www.npmjs.com/package/one-time
// - https://www.npmjs.com/package/onetime
// - https://www.npmjs.com/package/once


/**
 * Restrict a function to be used only upto a certain number of calls.
 * @param x a function
 * @param n number of calls upto which it is usable
 * @returns (...args) => x(...args) from [0:n] calls
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.restrictBefore(x => ++count, 3);
 * for (var i=0; i<10; ++i)
 *   fn(i);
 * count;
 * // → 3
 * ```
 */
export function restrictBefore(x: Function, n: number): Function {
  return restrict(x, 0, n);
}
export {restrictBefore as before};
// - https://lodash.com/docs/4.17.15#before


/**
 * Restrict a function to be used only after a certain number of calls.
 * @param x a function
 * @param n number of calls after which it is usable
 * @returns (...args) => x(...args) from [n:end] calls
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.restrictAfter(x => ++count, 3);
 * for (var i=0; i<10; ++i)
 *   fn(i);
 * count;
 * // → 7
 * ```
 */
export function restrictAfter(x: Function, n: number): Function {
  return restrict(x, n);
}
export {restrictAfter as after};
// - https://lodash.com/docs/4.17.15#after
//#endregion




//#region RATE CONTROL (TIME)
/**
 * Generate debounced version of a function.
 * @param x a function
 * @param t delay time (ms)
 * @param T max delay time [-1 ⇒ none]
 * @returns (...args) => invocation control
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.debounce(() => ++count, 1500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 4000);
 * setTimeout(fn, 5000);
 * // `count` incremented after 3.5s
 * // `count` incremented after 6.5s
 *
 *
 * var count = 0;
 * var fn = xfunction.debounce(() => ++count, 1500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 500);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 1500);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 4000);
 * setTimeout(fn, 4500);
 * setTimeout(fn, 5000);
 * // `count` incremented after 3.5s
 * // `count` incremented after 6.5s
 *
 *
 * var count = 0;
 * var fn = xfunction.debounce(() => ++count, 1500, 3500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 3000);
 * setTimeout(fn, 4000);
 * setTimeout(fn, 6000);
 * // `count` incremented after 3.5s
 * // `count` incremented after 5.5s
 * // `count` incremented after 7.5s
 * ```
 */
export function debounce(x: Function, t: number, T: number=-1): Function {
  let savedArgs: unknown[];
  let h = 0, H = 0;
  function clear() {
    clearTimeout(h);
    clearTimeout(H);
    h = H = 0;
  }
  function flush() { x(...savedArgs); clear(); };
  return (...args: unknown[]): InvocationControl => {
    savedArgs = args;
    if (T>=0)  H = H || setTimeout(flush, T);
    if (T<0 || t<T) { clearTimeout(h); h = setTimeout(flush, t); }
    return {clear, flush};
  };
}
// - https://github.com/lodash/lodash/blob/4.8.0-npm/debounce.js
// - https://github.com/jashkenas/underscore/commit/9e3e067f5025dbe5e93ed784f93b233882ca0ffe
// - https://css-tricks.com/debouncing-throttling-explained-examples/
// - https://www.npmjs.com/package/debounce


/**
 * Generate leading-edge debounced version of a function.
 * @param x a function
 * @param t delay time (ms)
 * @param T max delay time [-1 ⇒ none]
 * @returns (...args) => invocation control
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.debounceEarly(() => ++count, 1500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 4000);
 * setTimeout(fn, 5000);
 * // `count` incremented after 0s
 * // `count` incremented after 4s
 *
 *
 * var count = 0;
 * var fn = xfunction.debounceEarly(() => ++count, 1500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 500);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 1500);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 4000);
 * setTimeout(fn, 4500);
 * setTimeout(fn, 5000);
 * // `count` incremented after 0s
 * // `count` incremented after 4s
 *
 *
 * var count = 0;
 * var fn = xfunction.debounceEarly(() => ++count, 1500, 3500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 3000);
 * setTimeout(fn, 4000);
 * setTimeout(fn, 6000);
 * // `count` incremented after 0s
 * // `count` incremented after 4s
 * // `count` incremented after 6s
 * ```
 */
export function debounceEarly(x: Function, t: number, T: number=-1): Function {
  let h = 0, H = 0;
  function clear() { h = H = 0; }
  function flush() { clear(); }
  return (...args: unknown[]): InvocationControl => {
    if (!h && !H) x(...args);
    if (T>=0)  H = H || setTimeout(flush, T);
    if (T<0 || t<T) { clearTimeout(h); h = setTimeout(flush, t); }
    return {clear, flush};
  };
}
// - https://github.com/lodash/lodash/blob/4.8.0-npm/debounce.js
// - https://github.com/jashkenas/underscore/commit/9e3e067f5025dbe5e93ed784f93b233882ca0ffe
// - https://css-tricks.com/debouncing-throttling-explained-examples/
// - https://www.npmjs.com/package/debounce


/**
 * Generate throttled version of a function.
 * @param x a function
 * @param t wait time (ms)
 * @returns (...args) => invocation control
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.throttle(() => ++count, 2500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * // `count` incremented after 2.5s
 *
 *
 * var count = 0;
 * var fn = xfunction.throttle(() => ++count, 2500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 3000);
 * setTimeout(fn, 4000);
 * // `count` incremented after 2.5s
 * // `count` incremented after 5.5s
 * ```
 */
export function throttle(x: Function, t: number): Function {
  let savedArgs: unknown[];
  let h = 0;
  function clear() { h = 0; }
  function flush() { x(...savedArgs); clear(); }
  return (...args: unknown[]): InvocationControl => {
    savedArgs = args;
    h = h || setTimeout(flush, t);
    return {clear, flush};
  };
}
// - https://www.npmjs.com/package/throttle-debounce
// - https://www.npmjs.com/package/throttleit


/**
 * Generate leading-edge throttled version of a function.
 * @param x a function
 * @param t wait time (ms)
 * @returns (...args) => invocation control
 * @example
 * ```javascript
 * var count = 0;
 * var fn = xfunction.throttleEarly(() => ++count, 2500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * // `count` incremented after 0s
 *
 *
 * var count = 0;
 * var fn = xfunction.throttleEarly(() => ++count, 2500);
 * setTimeout(fn, 0);
 * setTimeout(fn, 1000);
 * setTimeout(fn, 2000);
 * setTimeout(fn, 3000);
 * setTimeout(fn, 4000);
 * // `count` incremented after 0s
 * // `count` incremented after 3s
 * ```
 */
export function throttleEarly(x: Function, t: number): Function {
  let h = 0;
  function clear() { h = 0; }
  function flush() { clear(); }
  return (...args: unknown[]): InvocationControl => {
    if (!h) x(...args);
    h = h || setTimeout(flush, t);
    return {clear, flush};
  };
}
// - https://www.npmjs.com/package/throttle-debounce
// - https://www.npmjs.com/package/throttleit


// TODO: Is a generator function better for this?
// function backoffRetryRec(x: Function, args: unknown[], err: unknown, n: number, N: number, t: number, T: number, tf: number): void {
//   if (N>=0 && n>=N) throw err;
//   if (T>=0 && t>=T) throw err;
//   try { return x(...args, err); }
//   catch(e) { setTimeout(() => backoffRetryRec(x, args, e, n+1, N, t*tf, T, tf), t); }
// }

//
// TODO: Generate exponential-backoff-retried version of a function.
// @param x a function
// @param N maximum retries (-1 ⇒ unlimited)
// @param t initial retry time (1 ms)
// @param T maximum retry time [-1 ⇒ none]
// @param tf retry time factor [2]
//
// function backoffRetry(x: Function, N: number, t: number, T: number=-1, tf: number=2): Function {
//   return (...args: unknown[]) => backoffRetryRec(x, args, null, 0, N, t, T, tf);
// }
// - TODO
//#endregion
//#endregion
