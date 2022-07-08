// TYPES
// =====

// Represents an async function (async function).
const AsyncFunction: Function = Object.getPrototypeOf(async function(){}).constructor;
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// Represents a generator function (function*).
const GeneratorFunction: Function = Object.getPrototypeOf(function*(){}).constructor;
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator




// CONSTANTS
// =========

/** Match normal function, with name as $1 and parameters as $2. */
const RNORMAL = /^function*?\s+([^\(]*)\(([^\)]*)\)/;
/** Match arrow function, with parameters as $2. */
const RARROW = /^()\(?([^\)=]*)\)?\s*=>/;


/**
 * Return the arguments passed as a array.
 * @param args arguments
 * @returns [...args]
 */
export function ARGUMENTS(...args: any[]): any[] {
  return args;
}


/**
 * Do nothing.
 */
export function NOOP(): void {
}


/**
 * Return the same (first) value.
 * @param v a value
 * @returns v
 */
export function IDENTITY<T>(v: T): T {
  return v;
}


/**
 * Compare two values.
 * @param a a value
 * @param b another value
 * @returns a<b: -1, a=b: 0, a>b: 1
 */
export function COMPARE<T>(a: T, b: T): number {
  return a<b? -1 : (a>b? 1 : 0);
}




// METHODS
// =======

// ABOUT
// -----

/**
 * Check if value is a function.
 * @param v a value
 * @returns is function?
 */
export function is(v: any): v is Function {
  return typeof v==='function';
}
// - https://www.npmjs.com/package/is-function


/**
 * Check if value is an async function.
 * @param v a value
 * @returns is async function?
 */
export function isAsync(v: any): boolean {
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
 */
export function isGenerator(v: any): v is GeneratorFunction {
  return v instanceof GeneratorFunction;
}
// - https://www.npmjs.com/package/is-generator
// - https://www.npmjs.com/package/is-generator-fn
// - https://www.npmjs.com/package/is-generator-function
// - https://stackoverflow.com/questions/16754956/check-if-function-is-a-generator
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction


/**
 * IGNORE: Check if value is an arrow function.
 * @param x a value
 * @returns is arrow function?
 */
function isArrow(x: any): boolean {
  if (typeof x!=='function') return false;
  else return RARROW.test(x.toString());
}


/**
 * Get the signature of a function.
 * @param x a function
 * @returns name(p, q, ...)
 */
export function signature(x: Function): string {
  var s = x.toString();
  var m = RNORMAL.exec(s) || RARROW.exec(s);
  return `${m[1]}(${m[2].trim()})`;
}


/**
 * Get the name of a function.
 * @param x a function
 * @returns name
 */
export function name(x: Function): string {
  if (x.name!=null) return x.name;
  var s = x.toString();
  var m = RNORMAL.exec(s) || RARROW.exec(s);
  return m[1];
}
// - https://github.com/sindresorhus/fn-name/blob/master/index.js
// - https://www.npmjs.com/package/fn-name


/**
 * Get the parameter names of a function.
 * @param x a function
 * @returns [p, q, ...]
 */
export function parameters(x: Function): string[] {
  var s = x.toString();
  var m = RNORMAL.exec(s) || RARROW.exec(s);
  return m[2]? m[2].trim().split(/[,\s]+/g) : [];
}


/**
 * Get the number of parameters of a function.
 * @param x a function
 * @returns |[p, q, ...]|
 */
export function arity(x: Function): number {
  return x.length;
}




// BINDING THIS
// ------------

/**
 * Generate a function with bound this-object, and optional prefix arguments.
 * @param x a function
 * @param thisArg this object to bind
 * @param prefix prefix arguments
 * @returns (...args) => this.x(...prefix, ...args)
 */
export function bind(x: Function, thisArg: any, ...prefix: any[]): Function {
  return x.bind(thisArg, ...prefix);
}




// RESULT MANIPULATION
// -------------------

/**
 * Generate a result-negated version of a function.
 * @param x a function
 * @returns (...args) => !x(...args)
 */
export function negate(x: Function): Function {
  return (...args: any[]) => !x(...args);
}




// RESULT CACHING
// --------------

/**
 * Resolve arguments into a unique key.
 * @param args arguments
 * @returns unique key
 */
export type Resolver = (...args: any[]) => any;


/**
 * Generate result-cached version of a function.
 * @param x a function
 * @param fr resolver ((...args) => unique key) [IDENTITY]
 * @param cache result cache [Map()]
 */
export function memoize(x: Function, fr: Resolver=null, cache: Map<any, any>=null): Function {
  var fr    = fr || IDENTITY;
  var cache = cache || new Map();
  return (...args: any[]) => {
    var k = fr(...args);
    if (cache.has(k)) return cache.get(k);
    var v = x(...args);
    cache.set(k, v);
    return v;
  };
}
// - https://www.npmjs.com/package/memoizee
// - https://www.npmjs.com/package/memoizerific




// PARAMETER MANIPULATION
// ----------------------

/**
 * Generate a parameter-reversed version of a function.
 * @param x a function
 * @returns (p, q, ...) => x(..., q, p)
 */
 export function reverse(x: Function): Function {
  return (...args: any[]) => x(...args.reverse());
}


/**
 * Generate a (first) parameter-spreaded version of a function.
 * @param x a function
 * @returns (p, q, ...) => x([p, q, ...])
 */
export function spread(x: Function): Function {
  return (...args: any[]) => x(args);
}


/**
 * Generate a (first) parameter-collapsed version of a function.
 * @param x a function
 * @returns ([p, q, ...]) => x(p, q, ...)
 */
export function unspread(x: Function): Function {
  return (args: any[]) => x(...args);
}


/**
 * Generate a parameter-wrapped version of a function.
 * @param x a function
 * @param start actual parameter start
 * @param end actual parameter end [end]
 * @returns (...args) => x(...args[start:end])
 */
export function wrap(x: Function, start: number, end: number=x.length): Function {
  return (...args: any[]) => x(...args.slice(start, end));
}


/**
 * Generate a parameter-unwrapped version of a function.
 * @param x a function
 * @param prefix prefix arguments
 * @param suffix suffix arguments []
 * @returns (...args) => x(...prefix, ...args, ...suffix)
 */
export function unwrap(x: Function, prefix: any[], suffix: any[]=[]): Function {
  return (...args: any[]) => x(...prefix, ...args, ...suffix);
}




// FUNCTIONAL BEHAVIOUR
// --------------------

/**
 * Compose functions together, in applicative order.
 * @param xs functions (f, g)
 * @returns (f o g), or f(g(x))
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
 */
export function composeRight(...xs: Function[]): Function {
  return (...args: any[]) => {
    if (xs.length===0) return;
    var a = xs[0](...args);
    for (var i=1, I=xs.length; i<I; i++)
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
 */
export function curry(x: Function, n: number=x.length): Function {
  return (...args: any[]) => {
    if (args.length>=n) return x(...args);
    else return curry((...rest: any[]) => x(...args, ...rest), n-args.length);
  };
}
// - https://www.npmjs.com/package/@spudly/curry


/**
 * Generate right-curried version of a function.
 * @param x a function
 * @param n number of parameters [all]
 * @returns (p)(q)(...) => x(..., q, p)
 */
export function curryRight(x: Function, n: number=x.length): Function {
  return curry(reverse(x), n);
}
// - https://www.npmjs.com/package/lodash.curryright




// TIME CONTROL
// ------------

/** Invocation control for time/rate-controlled functions. */
export interface InvocationControl {
  /** Disable invoking of target function. */
  clear: () => void;
  /** Immediately invoke target function. */
  flush: () => void;
}


/**
 * Generate delayed version of a function.
 * @param x a function
 * @param t delay time (ms)
 * @returns (...args) => invocation control
 */
export function delay(x: Function, t: number): Function {
  var savedArgs: any[];
  var h = null;
  function clear() { clearTimeout(h); h = null; }
  function flush() { x(...savedArgs); clear(); }
  return (...args: any[]): InvocationControl => {
    savedArgs = args;
    h = setTimeout(flush, t);
    return {clear, flush};
  }
}




// RATE CONTROL
// ------------

/**
 * Generate limited-use version of a function.
 * @param x a function
 * @param start usable from
 * @param end usable till (excluding) [-1 ⇒ end]
 * @returns (...args) => x(...args) from [start:end] calls
 */
export function limitUse(x: Function, start: number, end: number=-1): Function {
  var i = -1, a: any;
  return (...args: any[]) => {
    if ((++i<start)===(i<end)) return a;
    return a = x(...args);
  };
}
// - https://www.npmjs.com/package/one-time
// - https://www.npmjs.com/package/onetime
// - https://www.npmjs.com/package/once
// - https://lodash.com/docs/4.17.15#after
// - https://lodash.com/docs/4.17.15#before


/**
 * Generate debounced version of a function.
 * @param x a function
 * @param t delay time (ms)
 * @param T max delay time [-1 ⇒ none]
 * @returns (...args) => invocation control
 */
export function debounce(x: Function, t: number, T: number=-1): Function {
  var savedArgs: any[];
  var h = null, H = null;
  function clear() {
    clearTimeout(h);
    clearTimeout(H);
    h = H = null;
  }
  function flush() { x(...savedArgs); clear(); };
  return (...args: any[]): InvocationControl => {
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
 */
export function debounceEarly(x: Function, t: number, T: number=-1): Function {
  var h = null, H = null;
  function clear() { h = H = null; }
  function flush() { clear(); }
  return (...args: any[]): InvocationControl => {
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
 */
export function throttle(x: Function, t: number): Function {
  var savedArgs: any[];
  var h = null;
  function clear() { h = null; }
  function flush() { x(...savedArgs); clear(); }
  return (...args: any[]): InvocationControl => {
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
 */
export function throttleEarly(x: Function, t: number): Function {
  var h = null;
  function clear() { h = null; }
  function flush() { clear(); }
  return (...args: any[]): InvocationControl => {
    if (!h) x(...args);
    h = h || setTimeout(flush, t);
    return {clear, flush};
  };
}
// - https://www.npmjs.com/package/throttle-debounce
// - https://www.npmjs.com/package/throttleit


// TODO: Is a generator function better for this?
function backoffRetryRec(x: Function, args: any[], err: any, n: number, N: number, t: number, T: number, tf: number): void {
  if (N>=0 && n>=N) throw err;
  if (T>=0 && t>=T) throw err;
  try { return x(...args, err); }
  catch(e) { setTimeout(() => backoffRetryRec(x, args, e, n+1, N, t*tf, T, tf), t); }
}

/**
 * TODO: Generate exponential-backoff-retried version of a function.
 * @param x a function
 * @param N maximum retries (-1 ⇒ unlimited)
 * @param t initial retry time (1 ms)
 * @param T maximum retry time [-1 ⇒ none]
 * @param tf retry time factor [2]
 */
function backoffRetry(x: Function, N: number, t: number, T: number=-1, tf: number=2): Function {
  return (...args: any[]) => backoffRetryRec(x, args, null, 0, N, t, T, tf);
}
// - TODO
