// TYPES
// =====

const AsyncFunction: Function = Object.getPrototypeOf(async function(){}).constructor;
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

const GeneratorFunction: Function = Object.getPrototypeOf(function*(){}).constructor;
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator




// CONSTANTS
// =========

/**
 * Return the arguments passed as a array.
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
 */
export function is(v: any): v is Function {
  return typeof v==='function';
}
// - https://www.npmjs.com/package/is-function


/**
 * Check if value is a async function.
 * @param v a value
 */
export function isAsync(v: any): v is Function {
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
 * Match normal function, with name as $1 and parameters as $2.
 */
const RNORMAL = /^function*?\s+([^\(]*)\(([^\)]*)\)/;

/**
 * Match arrow function, with parameters as $2.
 */
const RARROW = /^()\(?([^\)=]*)\)?\s*=>/;

/**
 * IGNORE: Check if value is an arrow function.
 * @param x a value
 */
function isArrow(x: any): boolean {
  if (typeof x!=='function') return false;
  else return RARROW.test(x.toString());
}


/**
 * Get the signature of a function.
 * @param x a function
 * @returns name(parameters)
 */
export function signature(x: Function): string {
  var s = x.toString();
  var m = RNORMAL.exec(s) || RARROW.exec(s);
  return `${m[1]}(${m[2].trim()})`;
}


/**
 * Get the name of a function.
 * @param x a function
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
 */
export function parameters(x: Function): string[] {
  var s = x.toString();
  var m = RNORMAL.exec(s) || RARROW.exec(s);
  return m[2]? m[2].trim().split(/[,\s]+/g) : [];
}


/**
 * Get the number of parameters of a function.
 * @param x a function
 */
export function arity(x: Function): number {
  return x.length;
}




// PARAMETER MANIPULATION
// ----------------------

/**
 * Generate a (first) parameter-spreaded version of a function.
 * @param x a function
 * @returns (...args) => x(args)
 */
export function spread(x: Function): Function {
  return (...args: any[]) => x(args);
}


/**
 * Generate a (first) parameter-collapsed version of a function.
 * @param x a function
 * @returns (args) => x(...args)
 */
export function unspread(x: Function): Function {
  return (args: any[]) => x(...args);
}


/**
 * Generate a parameter-wrapped version of a function.
 * @param x a function
 * @param prefix prefix parameters
 * @param suffix suffix parameters []
 * @returns (...args) => x(...prefix, ...args, ...suffix)
 */
export function wrap(x: Function, prefix: any[], suffix: any[]=[]): Function {
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
 * @returns (f |> g), or g(f(x))
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
 * @param n number of arguments [all]
 */
export function curry(x: Function, n: number=x.length): Function {
  return (...args: any[]) => {
    if (args.length>=n) return x(...args);
    else return curry((...rest: any[]) => x(...args, ...rest), n-args.length);
  };
}
// - https://www.npmjs.com/package/@spudly/curry


/**
 * TODO: use flip(). Generate right-curried version of a function.
 * @param x a function
 * @param n number of arguments [all]
 */
export function curryRight(x: Function, n: number=x.length): Function {
  return (...args: any[]) => {
    if (args.length>=n) return x(...args.reverse());
    else return curryRight((...rest: any[]) => x(...args.reverse(), ...rest.reverse()), n-args.length);
  };
}
// - https://www.npmjs.com/package/lodash.curryright




// CACHING
// -------

// TODO: Key generator? Hash generator? Use default hash generator?
type Combiner = (...args: any[]) => any;


/**
 * Generate cached version of a function.
 * @param x a function
 * @param fc arguments combiner ((..args) => key) [IDENTITY]
 * @param cache result cache [new Map()]
 */
export function memoize(x: Function, fc: Combiner=null, cache: Map<any, any>=null): Function {
  var fc    = fc || IDENTITY;
  var cache = cache || new Map();
  return (...args: any[]) => {
    var k = fc(...args);
    if (cache.has(k)) return cache.get(k);
    var v = x(...args);
    cache.set(k, v);
    return v;
  };
}
// - https://www.npmjs.com/package/memoizee
// - https://www.npmjs.com/package/memoizerific




// TIME CONTROL
// ------------

/**
 * Generate delayed version of a function.
 * @param x a function
 * @param t delay time (ms)
 */
export function delay(x: Function, t: number): Function {
  return (...args: any[]) => setTimeout(x, t, ...args);
}




// RATE CONTROL
// ------------

/**
 * Generate limited times callable version of a function.
 * @param x a function
 * @param n called after [0 times]
 * @param N called till [-1 => till end]
 */
export function limit(x: Function, n: number=0, N: number=-1): Function {
  var i = -1, a: any;
  return (...args: any[]) => {
    if (++i<n || (N>=0 && i>=N)) return a;
    else return a = x(...args);
  };
}
// - https://www.npmjs.com/package/one-time
// - https://www.npmjs.com/package/onetime
// - https://www.npmjs.com/package/once


/**
 * Generate debounced version of a function.
 * @param x a function
 * @param t delay time [0 ms]
 * @param T max delay time [-1 => none]
 */
export function debounce(x: Function, t: number=0, T: number=-1): Function {
  var bs = null, H = null, h = null;
  var fn = () => { x(...bs); H = h = null; };
  return (...args: any[]) => {
    bs = args;
    if (T>=0) H = H||setTimeout(fn, T);
    if (T<0 || t<T) { clearTimeout(h); h = setTimeout(fn, t); }
    return H||h;
  };
}
// - https://github.com/lodash/lodash/blob/4.8.0-npm/debounce.js
// - https://github.com/jashkenas/underscore/commit/9e3e067f5025dbe5e93ed784f93b233882ca0ffe
// - https://css-tricks.com/debouncing-throttling-explained-examples/
// - https://www.npmjs.com/package/debounce
// - TODO


/**
 * Generate leading-edge debounced version of a function.
 * @param x a function
 * @param t delay time [0 ms]
 * @param T max delay time [-1 => none]
 */
export function debounceEarly(x: Function, t: number=0, T: number=-1): Function {
  var H = null, h = null;
  var fn = () => { H = h = null; };
  return (...args: any[]) => {
    if (H==null && h==null) x(...args);
    if (T>=0) H = H||setTimeout(fn, T);
    if (T<0 || t<T) { clearTimeout(h); h = setTimeout(fn, t); }
    return H||h;
  };
}


/**
 * Generate throttled version of a function.
 * @param x a function
 * @param t wait time [0 ms]
 */
export function throttle(x: Function, t: number=0): Function {
  return debounce(x, t, t);
}
// - TODO
// - https://www.npmjs.com/package/throttle-debounce
// - https://www.npmjs.com/package/throttleit


/**
 * Generate leading-edge throttled version of a function.
 * @param x a function
 * @param t wait time [0 ms]
 */
export function throttleEarly(x: Function, t: number=0): Function {
  return debounceEarly(x, t, t);
}
// - TODO


function backoffRec(x: Function, as: any[], e: any, n: number, N: number, t: number, T: number, tf: number): void {
  if (N>=0 && n>=N) throw e;
  if (T>=0 && t>=T) throw e;
  try { return x(...as, e); }
  catch(e) { setTimeout(() => backoffRec(x, as, e, n+1, N, t*tf, T, tf), t); }
}

/**
 * Generate exponential backoff retried version of a function.
 * @param x a function
 * @param N maximum retries [-1 => none]
 * @param t initial retry time [1 ms]
 * @param T maximum retry time [-1 => none]
 * @param tf retry time factor [2]
 */
export function backoff(x: Function, N: number=-1, t: number=1, T: number=-1, tf: number=2): Function {
  return (...args: any[]) => backoffRec(x, args, null, 0, N, t, T, tf);
}
// - TODO
