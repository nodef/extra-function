import {assertEquals} from "jsr:@std/assert";
import {sleep} from "jsr:@nodef/extra-sleep";
import {
  type Function,
  NOOP,
  TRUE,
  FALSE,
  IDENTITY,
  COMPARE,
  ARGUMENTS,
  name,
  length,
  bind,
  call,
  apply,
  is,
  isAsync,
  isGenerator,
  contextify,
  decontextify,
  negate,
  memoize,
  reverse,
  spread,
  unspread,
  attach,
  attachRight,
  compose,
  composeRight,
  curry,
  curryRight,
  defer,
  delay,
  restrict,
  restrictOnce,
  restrictBefore,
  restrictAfter,
  debounce,
  debounceEarly,
  throttle,
  throttleEarly,
} from "./index.ts";
import * as xfunction from "./index.ts";




//#region TEST CONFIG
// jest.retryTimes(3);
// jest.setTimeout(15000);
// - https://stackoverflow.com/a/71599782/1413259
// - https://stackoverflow.com/a/49864436/1413259
//#endregion




// 1. Basic tests.
Deno.test("example1", () => {
  const a = xfunction.composeRight(((x: number) => x*x) as Function, ((x: number) => x+2) as Function);
  assertEquals(a(10), 102);
  // → 102
  const b = xfunction.curry(((x: number, y: number) => x+y) as Function);
  assertEquals((b(2) as Function)(3), 5);
  // → 7
  const c = xfunction.unspread(Math.max as Function);
  assertEquals(c([2, 3, 1]), 3);
  // → 1.25
});




//#region TEST CONSTANTS
Deno.test("NOOP", () => {
  const a = NOOP(1, 2);
  assertEquals(a, undefined);
  const b = NOOP("a", "b");
  assertEquals(b, undefined);
});


Deno.test("FALSE", () => {
  const a = FALSE();
  assertEquals(a, false);
});


Deno.test("TRUE", () => {
  const a = TRUE();
  assertEquals(a, true);
});


Deno.test("IDENTITY", () => {
  const a = IDENTITY(1);
  assertEquals(a, 1);
  const b = IDENTITY("a");
  assertEquals(b, "a");
});


Deno.test("COMPARE", () => {
  const a = COMPARE(1, 2);
  assertEquals(a, -1);
  const b = COMPARE(2, 2);
  assertEquals(b, 0);
  const c = COMPARE(3, 2);
  assertEquals(c, 1);
  const d = COMPARE("a", "b");
  assertEquals(d, -1);
});


Deno.test("ARGUMENTS", () => {
  const a = ARGUMENTS(1, 2);
  assertEquals(a, [1, 2]);
  const b = ARGUMENTS("a", "b");
  assertEquals(b, ["a", "b"]);
});
//#endregion




//#region TEST METHODS (BUILTIN)
//#region TEST ABOUT
Deno.test("name", () => {
  const a = name(delay as Function);
  assertEquals(a, "delay");
  const b = name(debounce as Function);
  assertEquals(b, "debounce");
});


Deno.test("length", () => {
  const a = length(() => 0);
  assertEquals(a, 0);
  const b = length((_x, _y) => 0);
  assertEquals(b, 2);
});
//#endregion




//#region TEST BINDING
Deno.test("bind", () => {
  const array1 = [1];
  const fn1 = bind(Array.prototype.push, array1);
  fn1(2, 3, 4);  // push(2, 3, 4)
  assertEquals(array1, [1, 2, 3, 4]);
  const array2 = [1, 2, 3, 4];
  const fn2 = bind(Array.prototype.splice as Function, array2, 1);
  fn2(2);  // splice(1, 2)
  assertEquals(array2, [1, 4]);
});
//#endregion




//#region TEST INVOCATION
Deno.test("call", () => {
  const array1 = [1];
  call(Array.prototype.push, array1, 2, 3, 4);  // push(2, 3, 4)
  assertEquals(array1, [1, 2, 3, 4]);
  const array2 = [1, 2, 3, 4];
  call(Array.prototype.splice as Function, array2, 1, 2);  // splice(1, 2)
  assertEquals(array2, [1, 4]);
});


Deno.test("apply", () => {
  const array1 = [1];
  apply(Array.prototype.push, array1, [2, 3, 4]);  // push(2, 3, 4)
  assertEquals(array1, [1, 2, 3, 4]);
  const array2 = [1, 2, 3, 4];
  apply(Array.prototype.splice as Function, array2, [1, 2]);  // splice(1, 2)
  assertEquals(array2, [1, 4]);
});
//#endregion
//#endregion




//#region TEST METHODS (CUSTOM)
//#region TEST ABOUT
Deno.test("is", () => {
  const a = is(Object.keys);
  assertEquals(a, true);
  const b = is(() => 0);
  assertEquals(b, true);
  const c = is(async () => 0);
  assertEquals(c, true);
  const d = is(0);
  assertEquals(d, false);
});


Deno.test("isAsync", () => {
  const a = isAsync(async () => 0);
  assertEquals(a, true);
  const b = isAsync(() => 0);
  assertEquals(b, false);
});


Deno.test("isGenerator", () => {
  function* naturalNumbers() {
    for (let i=0;; ++i)
      yield i;
  }
  const a = isGenerator(naturalNumbers);
  assertEquals(a, true);
  const b = isGenerator(() => 0);
  assertEquals(b, false);
});
//#endregion




//#region TEST CONTEXT
Deno.test("contextify", () => {
  function count(x: number[], value: number) {
    let a = 0;
    for (const v of x)
      if (v===value) ++a;
    return a;
  }
  const fn = contextify(count as Function);
  assertEquals(fn.call([6, 3, 4, 3], 3), 2);
  assertEquals(fn.call([6, 1, 4, 3], 3), 1);
});


Deno.test("decontextify", () => {
  function count(this: number[], value: number) {
    let a = 0;
    for (const v of this)
      if (v===value) ++a;
    return a;
  }
  const fn = decontextify(count as Function);
  assertEquals(fn([6, 3, 4, 3], 3), 2);
  assertEquals(fn([6, 1, 4, 3], 3), 1);
});
//#endregion




//#region TEST RESULT MANIPULATION
Deno.test("negate", () => {
  const fn1 = negate(isFinite as Function);
  assertEquals(fn1(Infinity), true);
  assertEquals(fn1(1), false);
  const fn2 = negate(isNaN as Function);
  assertEquals(fn2(1), true);
  assertEquals(fn2(NaN), false);
});
//#endregion




//#region TEST RESULT CACHING
Deno.test("memoize.1", () => {
  let calls = 0;
  function factorialRec(n: number): number {
    if (n<=1) return 1;
    return n * factorialRec(n-1);
  }
  function factorial(n: number): number {
    ++calls;
    return factorialRec(n);
  }
  const fn = memoize(factorial as Function);
  assertEquals(fn(3), 6);
  assertEquals(fn(4), 24);
  assertEquals(fn(5), 120);
  assertEquals(fn(3), 6);
  assertEquals(fn(4), 24);
  assertEquals(fn(5), 120);
  assertEquals(calls, 3);
});


Deno.test("memoize.2", () => {
  let calls = 0;
  function hypot(x: number, y: number) {
    ++calls;
    return Math.hypot(x, y);
  }
  function resolver(x: number, y: number): number {
    return 4093*y + x;  // a hash
  }
  const fn = memoize(hypot as Function, resolver as Function);
  assertEquals(fn(3,  4), 5);
  assertEquals(fn(6,  8), 10);
  assertEquals(fn(5, 12), 13);
  assertEquals(fn(3,  4), 5);
  assertEquals(fn(6,  8), 10);
  assertEquals(fn(5, 12), 13);
  assertEquals(calls, 3);
});
// - https://en.wikipedia.org/wiki/Integer_triangle
//#endregion




//#region TEST PARAMETER MANIPULATION
Deno.test("reverse", () => {
  function divide(x: number, y: number) {
    return x/y;
  }
  const fn1 = reverse(divide as Function);
  assertEquals(fn1(2, 4), 2);
  assertEquals(fn1(2, 6), 3);
  assertEquals(fn1(2, 8), 4);
  const array = [1];
  function push(...args: number[]) {
    array.push(...args);
  }
  const fn2 = reverse(push as Function);
  fn2(2, 3, 4);  // push(2, 3, 4) in reverse order
  assertEquals(array, [1, 4, 3, 2]);
});


Deno.test("spread", () => {
  function sum(x: number[]) {
    let a = 0;
    for (const v of x)
      a += v;
    return a;
  }
  const fn1 = spread(sum as Function);
  assertEquals(fn1(1, 2, 3), 6);  // sum([1, 2, 3])
  const array = [1];
  function concat(x: number[]) {
    return array.concat(x);
  }
  const fn2 = spread(concat as Function);
  assertEquals(fn2(2, 3, 4), [1, 2, 3, 4]);  // concat([2, 3, 4])
});


Deno.test("unspread", () => {
  const fn1 = unspread(Math.min as Function);
  assertEquals(fn1([7, 4, 9]), 4);  // Math.min(7, 4, 9)
  const fn2 = unspread(((x: number[], i: number, I: number) => x.slice(i, I)) as Function);
  assertEquals(fn2([[1, 2, 3, 4], 2]), [3, 4]);  // [1, 2, 3, 4].slice(2)
});


Deno.test("attach", () => {
  const fn1 = attach(Math.min as Function, 100);
  assertEquals(fn1(180, 130), 100);  // Math.min(100, 180, 130)
  const array = [1];
  const fn2 = attach(((...vs: number[]) => array.push(...vs)) as Function, 10, 10);
  fn2(1, 2, 3);  // array.push(10, 10, 1, 2, 3)
  assertEquals(array, [1, 10, 10, 1, 2, 3]);
});


Deno.test("attachRight", () => {
  const fn1 = attachRight(Math.min as Function, 100);
  assertEquals(fn1(180, 130), 100);  // Math.min(180, 130, 100)
  const array = [1];
  const fn2 = attachRight(((...vs: number[]) => array.push(...vs)) as Function, 10, 10);
  fn2(1, 2, 3);  // array.push(1, 2, 3, 10, 10)
  assertEquals(array, [1, 1, 2, 3, 10, 10]);
});
//#endregion




//#region TEST FUNCTIONAL BEHAVIOUR
Deno.test("compose", () => {
  const fn1 = compose();
  assertEquals(fn1(), undefined);
  const fn2 = compose(Math.sqrt as Function, Math.abs as Function);
  assertEquals(fn2(-64), 8);    // Math.sqrt(Math.abs(-64))
  const fn3 = compose(Math.sqrt as Function, Math.min as Function);
  assertEquals(fn3(22, 9), 3);  // Math.sqrt(Math.min(22, 9))
});


Deno.test("composeRight", () => {
  const fn1 = composeRight();
  assertEquals(fn1(), undefined);
  const fn2 = composeRight(Math.abs as Function, Math.sqrt as Function);
  assertEquals(fn2(-64), 8);    // Math.sqrt(Math.abs(-64))
  const fn3 = composeRight(Math.min as Function, Math.sqrt as Function);
  assertEquals(fn3(22, 9), 3);  // Math.sqrt(Math.min(22, 9))
});


Deno.test("curry", () => {
  const sub = (x: number, y: number) => x - y;
  const fn1  = curry(sub as Function);
  assertEquals((fn1(2) as Function)(3), -1);    // sub(2, 3)
  const fn2  = curry(Math.min as Function, 3);
  assertEquals(((fn2(5) as Function)(8) as Function)(3), 3);  // Math.min(5, 8, 3)
});


Deno.test("curryRight", () => {
  const sub = (x: number, y: number) => x - y;
  const fn1  = curryRight(sub as Function);
  assertEquals((fn1(2) as Function)(3), 1);  // sub(3, 2)
  const array = [1];
  const push2 = (x: number, y: number) => array.push(x, y);
  const fn2  = curryRight(push2 as Function, 2);
  (fn2(2) as Function)(3);                  // push2(3, 2)
  assertEquals(array, [1, 3, 2]);
});
//#endregion




//#region TEST TIME CONTROL
Deno.test("defer", async () => {
  let count = 0;
  const fn = defer(() => ++count);
  fn();  // `count` incremented after 0s
  fn();  // `count` incremented after 0s
  assertEquals(count, 0);
  setTimeout(() => assertEquals(count, 2), 200);
  await sleep(10000);
});


Deno.test("delay.1", async () => {
  let count = 0;
  const fn = delay(() => ++count, 500);
  setTimeout(fn, 0);     // `count` incremented after 0.5s
  setTimeout(fn, 1000);  // `count` incremented after 1.5s
  setTimeout(() => assertEquals(count, 0), 200);
  setTimeout(() => assertEquals(count, 1), 700);
  setTimeout(() => assertEquals(count, 1), 1200);
  setTimeout(() => assertEquals(count, 2), 1700);
  setTimeout(() => assertEquals(count, 2), 2200);
  await sleep(10000);
});


Deno.test("delay.2", async () => {
  let count = 0;
  const fn = delay(() => ++count, 500);
  setTimeout(fn, 0);     // `count` incremented after 0.5s
  setTimeout(fn, 1000);  // `count` incremented after 1.5s
  setTimeout(fn, 2000);  // `count` incremented after 2.5s
  setTimeout(fn, 3000);  // `count` incremented after 3.5s
  setTimeout(() => assertEquals(count, 0), 200);
  setTimeout(() => assertEquals(count, 1), 700);
  setTimeout(() => assertEquals(count, 1), 1200);
  setTimeout(() => assertEquals(count, 2), 1700);
  setTimeout(() => assertEquals(count, 2), 2200);
  setTimeout(() => assertEquals(count, 3), 2700);
  setTimeout(() => assertEquals(count, 3), 3200);
  setTimeout(() => assertEquals(count, 4), 3700);
  setTimeout(() => assertEquals(count, 4), 4200);
  await sleep(10000);
});
//#endregion




//#region TEST RATE CONTROL (COUNT)
Deno.test("restrict.1", () => {
  let sum = 0;
  const add = (x: number) => sum += x;
  const fn  = restrict(add as Function, 0, 4);
  for (let i=0; i<10; ++i)
    fn(i);
  assertEquals(sum, 6);  // 0 + 1 + 2 + 3
});


Deno.test("restrict.2", () => {
  let sum = 0;
  const add = (x: number) => sum += x;
  const fn  = restrict(add as Function, 4, 8);
  for (let i=0; i<10; ++i)
    fn(i);
  assertEquals(sum, 22);  // 4 + 5 + 6 + 7
});


Deno.test("restrictOnce", () => {
  let count = 0;
  const fn = restrictOnce(_x => ++count);
  for (let i=0; i<10; ++i)
    fn(i);
  assertEquals(count, 1);
});


Deno.test("restrictBefore", () => {
  let count = 0;
  const fn = restrictBefore(_x => ++count, 3);
  for (let i=0; i<10; ++i)
    fn(i);
  assertEquals(count, 3);
});


Deno.test("restrictAfter", () => {
  let count = 0;
  const fn = restrictAfter(_x => ++count, 3);
  for (let i=0; i<10; ++i)
    fn(i);
  assertEquals(count, 7);
});
//#endregion




//#region TEST RATE CONTROL (TIME)
Deno.test("debounce.1", async () => {
  let count = 0;
  const fn = debounce(() => ++count, 1500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 4000);
  setTimeout(fn, 5000);
  // `count` incremented after 3.5s
  // `count` incremented after 6.5s
  setTimeout(() => assertEquals(count, 0), 200);
  setTimeout(() => assertEquals(count, 0), 700);
  setTimeout(() => assertEquals(count, 0), 1200);
  setTimeout(() => assertEquals(count, 0), 1700);
  setTimeout(() => assertEquals(count, 0), 2200);
  setTimeout(() => assertEquals(count, 0), 2700);
  setTimeout(() => assertEquals(count, 0), 3200);
  setTimeout(() => assertEquals(count, 1), 3700);
  setTimeout(() => assertEquals(count, 1), 4200);
  setTimeout(() => assertEquals(count, 1), 4700);
  setTimeout(() => assertEquals(count, 1), 5200);
  setTimeout(() => assertEquals(count, 1), 5700);
  setTimeout(() => assertEquals(count, 1), 6200);
  setTimeout(() => assertEquals(count, 2), 6700);
  setTimeout(() => assertEquals(count, 2), 7200);
  await sleep(10000);
});


Deno.test("debounce.2", async () => {
  let count = 0;
  const fn = debounce(() => ++count, 1500);
  setTimeout(fn, 0);
  setTimeout(fn, 500);
  setTimeout(fn, 1000);
  setTimeout(fn, 1500);
  setTimeout(fn, 2000);
  setTimeout(fn, 4000);
  setTimeout(fn, 4500);
  setTimeout(fn, 5000);
  // `count` incremented after 3.5s
  // `count` incremented after 6.5s
  setTimeout(() => assertEquals(count, 0), 200);
  setTimeout(() => assertEquals(count, 0), 700);
  setTimeout(() => assertEquals(count, 0), 1200);
  setTimeout(() => assertEquals(count, 0), 1700);
  setTimeout(() => assertEquals(count, 0), 2200);
  setTimeout(() => assertEquals(count, 0), 2700);
  setTimeout(() => assertEquals(count, 0), 3200);
  setTimeout(() => assertEquals(count, 1), 3700);
  setTimeout(() => assertEquals(count, 1), 4200);
  setTimeout(() => assertEquals(count, 1), 4700);
  setTimeout(() => assertEquals(count, 1), 5200);
  setTimeout(() => assertEquals(count, 1), 5700);
  setTimeout(() => assertEquals(count, 1), 6200);
  setTimeout(() => assertEquals(count, 2), 6700);
  setTimeout(() => assertEquals(count, 2), 7200);
  await sleep(10000);
});


Deno.test("debounce.3", async () => {
  let count = 0;
  const fn = debounce(() => ++count, 1500, 3500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);
  setTimeout(fn, 4000);
  setTimeout(fn, 6000);
  // `count` incremented after 3.5s
  // `count` incremented after 5.5s
  // `count` incremented after 7.5s
  setTimeout(() => assertEquals(count, 0), 200);
  setTimeout(() => assertEquals(count, 0), 700);
  setTimeout(() => assertEquals(count, 0), 1200);
  setTimeout(() => assertEquals(count, 0), 1700);
  setTimeout(() => assertEquals(count, 0), 2200);
  setTimeout(() => assertEquals(count, 0), 2700);
  setTimeout(() => assertEquals(count, 0), 3200);
  setTimeout(() => assertEquals(count, 1), 3700);
  setTimeout(() => assertEquals(count, 1), 4200);
  setTimeout(() => assertEquals(count, 1), 4700);
  setTimeout(() => assertEquals(count, 1), 5200);
  setTimeout(() => assertEquals(count, 2), 5700);
  setTimeout(() => assertEquals(count, 2), 6200);
  setTimeout(() => assertEquals(count, 2), 6700);
  setTimeout(() => assertEquals(count, 2), 7200);
  setTimeout(() => assertEquals(count, 3), 7700);
  setTimeout(() => assertEquals(count, 3), 8200);
  await sleep(10000);
});


Deno.test("debounceEarly.1", async () => {
  let count = 0;
  const fn = debounceEarly(() => ++count, 1500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 4000);
  setTimeout(fn, 5000);
  // `count` incremented after 0s
  // `count` incremented after 4s
  setTimeout(() => assertEquals(count, 1), 200);
  setTimeout(() => assertEquals(count, 1), 700);
  setTimeout(() => assertEquals(count, 1), 1200);
  setTimeout(() => assertEquals(count, 1), 1700);
  setTimeout(() => assertEquals(count, 1), 2200);
  setTimeout(() => assertEquals(count, 1), 2700);
  setTimeout(() => assertEquals(count, 1), 3200);
  setTimeout(() => assertEquals(count, 1), 3700);
  setTimeout(() => assertEquals(count, 2), 4200);
  setTimeout(() => assertEquals(count, 2), 4700);
  await sleep(10000);
});


Deno.test("debounceEarly.2", async () => {
  let count = 0;
  const fn = debounceEarly(() => ++count, 1500);
  setTimeout(fn, 0);
  setTimeout(fn, 500);
  setTimeout(fn, 1000);
  setTimeout(fn, 1500);
  setTimeout(fn, 2000);
  setTimeout(fn, 4000);
  setTimeout(fn, 4500);
  setTimeout(fn, 5000);
  // `count` incremented after 0s
  // `count` incremented after 4s
  setTimeout(() => assertEquals(count, 1), 200);
  setTimeout(() => assertEquals(count, 1), 700);
  setTimeout(() => assertEquals(count, 1), 1200);
  setTimeout(() => assertEquals(count, 1), 1700);
  setTimeout(() => assertEquals(count, 1), 2200);
  setTimeout(() => assertEquals(count, 1), 2700);
  setTimeout(() => assertEquals(count, 1), 3200);
  setTimeout(() => assertEquals(count, 1), 3700);
  setTimeout(() => assertEquals(count, 2), 4200);
  setTimeout(() => assertEquals(count, 2), 4700);
  await sleep(10000);
});


Deno.test("debounceEarly.3", async () => {
  let count = 0;
  const fn = debounceEarly(() => ++count, 1500, 3500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);
  setTimeout(fn, 4000);
  setTimeout(fn, 6000);
  // `count` incremented after 0s
  // `count` incremented after 4s
  // `count` incremented after 6s
  setTimeout(() => assertEquals(count, 1), 200);
  setTimeout(() => assertEquals(count, 1), 700);
  setTimeout(() => assertEquals(count, 1), 1200);
  setTimeout(() => assertEquals(count, 1), 1700);
  setTimeout(() => assertEquals(count, 1), 2200);
  setTimeout(() => assertEquals(count, 1), 2700);
  setTimeout(() => assertEquals(count, 1), 3200);
  setTimeout(() => assertEquals(count, 1), 3700);
  setTimeout(() => assertEquals(count, 2), 4200);
  setTimeout(() => assertEquals(count, 2), 4700);
  setTimeout(() => assertEquals(count, 2), 5200);
  setTimeout(() => assertEquals(count, 2), 5700);
  setTimeout(() => assertEquals(count, 3), 6200);
  setTimeout(() => assertEquals(count, 3), 6700);
  await sleep(10000);
});


Deno.test("throttle.1", async () => {
  let count = 0;
  const fn = throttle(() => ++count, 2500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  // `count` incremented after 2.5s
  setTimeout(() => assertEquals(count, 0), 200);
  setTimeout(() => assertEquals(count, 0), 700);
  setTimeout(() => assertEquals(count, 0), 1200);
  setTimeout(() => assertEquals(count, 0), 1700);
  setTimeout(() => assertEquals(count, 0), 2200);
  setTimeout(() => assertEquals(count, 1), 2700);
  setTimeout(() => assertEquals(count, 1), 3200);
  await sleep(10000);
});


Deno.test("throttle.2", async () => {
  let count = 0;
  const fn = throttle(() => ++count, 2500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);
  setTimeout(fn, 4000);
  // `count` incremented after 2.5s
  // `count` incremented after 5.5s
  setTimeout(() => assertEquals(count, 0), 200);
  setTimeout(() => assertEquals(count, 0), 700);
  setTimeout(() => assertEquals(count, 0), 1200);
  setTimeout(() => assertEquals(count, 0), 1700);
  setTimeout(() => assertEquals(count, 0), 2200);
  setTimeout(() => assertEquals(count, 1), 2700);
  setTimeout(() => assertEquals(count, 1), 3200);
  setTimeout(() => assertEquals(count, 1), 3700);
  setTimeout(() => assertEquals(count, 1), 4200);
  setTimeout(() => assertEquals(count, 1), 4700);
  setTimeout(() => assertEquals(count, 1), 5200);
  setTimeout(() => assertEquals(count, 2), 5700);
  setTimeout(() => assertEquals(count, 2), 6200);
  await sleep(10000);
});


Deno.test("throttleEarly.1", async () => {
  let count = 0;
  const fn = throttleEarly(() => ++count, 2500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  // `count` incremented after 0s
  setTimeout(() => assertEquals(count, 1), 200);
  setTimeout(() => assertEquals(count, 1), 700);
  await sleep(10000);
});


Deno.test("throttleEarly.2", async () => {
  let count = 0;
  const fn = throttleEarly(() => ++count, 2500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);
  setTimeout(fn, 4000);
  // `count` incremented after 0s
  // `count` incremented after 3s
  setTimeout(() => assertEquals(count, 1), 200);
  setTimeout(() => assertEquals(count, 1), 700);
  setTimeout(() => assertEquals(count, 1), 1200);
  setTimeout(() => assertEquals(count, 1), 1700);
  setTimeout(() => assertEquals(count, 1), 2200);
  setTimeout(() => assertEquals(count, 1), 2700);
  setTimeout(() => assertEquals(count, 2), 3200);
  setTimeout(() => assertEquals(count, 2), 3700);
  setTimeout(() => assertEquals(count, 2), 4200);
  await sleep(10000);
});
//#endregion
//#endregion
