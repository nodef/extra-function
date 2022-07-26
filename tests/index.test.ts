import {sleep}         from "extra-sleep";
import * as funcxion   from "../src";
import {ARGUMENTS}     from "../src";
import {NOOP}          from "../src";
import {IDENTITY}      from "../src";
import {COMPARE}       from "../src";
import {is}            from "../src";
import {isAsync}       from "../src";
import {isGenerator}   from "../src";
import {signature}     from "../src";
import {name}          from "../src";
import {parameters}    from "../src";
import {arity}         from "../src";
import {bind}          from "../src";
import {negate}        from "../src";
import {memoize}       from "../src";
import {reverse}       from "../src";
import {spread}        from "../src";
import {unspread}      from "../src";
import {wrap}          from "../src";
import {unwrap}        from "../src";
import {compose}       from "../src";
import {composeRight}  from "../src";
import {curry}         from "../src";
import {curryRight}    from "../src";
import {delay}         from "../src";
import {limitUse}      from "../src";
import {debounce}      from "../src";
import {debounceEarly} from "../src";
import {throttle}      from "../src";
import {throttleEarly} from "../src";




// Config
jest.setTimeout(15000);




// 1. Basic tests.
test("example1", () => {
  var a = funcxion.composeRight(x => x*x, x => x+2);
  expect(a(10)).toBe(102);
  // → 102

  var a = funcxion.curry((x, y) => x+y);
  expect(a(2)(3)).toBe(5);
  // → 7

  var a = funcxion.unspread(Math.max);
  expect(a([2, 3, 1])).toBe(3);
  // → 1.25

  var b = funcxion.parameters((x, y) => x+y);
  expect(b).toStrictEqual(["x", "y"]);
  // → [ "x", "y" ]
});




test("ARGUMENTS", () => {
  var a = ARGUMENTS(1, 2);
  expect(a).toStrictEqual([1, 2]);
  var a = ARGUMENTS("a", "b");
  expect(a).toStrictEqual(["a", "b"]);
});


test("NOOP", () => {
  var a = NOOP(1, 2);
  expect(a).toBeUndefined();
  var a = NOOP("a", "b");
  expect(a).toBeUndefined();
});


test("IDENTITY", () => {
  var a = IDENTITY(1);
  expect(a).toBe(1);
  var b = IDENTITY("a");
  expect(b).toBe("a");
});


test("COMPARE", () => {
  var a = COMPARE(1, 2);
  expect(a).toBe(-1);
  var a = COMPARE(2, 2);
  expect(a).toBe(0);
  var a = COMPARE(3, 2);
  expect(a).toBe(1);
  var a = COMPARE("a", "b");
  expect(a).toBe(-1);
});


test("is", () => {
  var a = is(Object.keys);
  expect(a).toBe(true);
  var a = is(() => 0);
  expect(a).toBe(true);
  var a = is(async () => 0);
  expect(a).toBe(true);
  var a = is(0);
  expect(a).toBe(false);
});


test("isAsync", () => {
  var a = isAsync(async () => 0)
  expect(a).toBe(true);
  var a = isAsync(() => 0)
  expect(a).toBe(false);
});


test("isGenerator", () => {
  function* naturalNumbers() {
    for (var i=0;; ++i)
      yield i;
  }
  var a = isGenerator(naturalNumbers);
  expect(a).toBe(true);
  var a = isGenerator(() => 0);
  expect(a).toBe(false);
});


test("signature", () => {
  var a = signature(delay);
  expect(a).toBe("function delay(x, t)");
  var a = signature(debounce);
  expect(a).toBe("function debounce(x, t, T)");
});


test("name", () => {
  var a = name(delay);
  expect(a).toBe("delay");
  var a = name(debounce);
  expect(a).toBe("debounce");
});


test("parameters", () => {
  var a = parameters(delay);
  expect(a).toStrictEqual(["x", "t"]);
  var a = parameters(debounce);
  expect(a).toStrictEqual(["x", "t", "T"]);
});


test("arity", () => {
  var a = arity(() => 0);
  expect(a).toBe(0);
  var a = arity((x, y) => 0);
  expect(a).toBe(2);
});


test("bind.1", () => {
  var a  = [1];
  var fn = bind(Array.prototype.push, a);
  fn(2, 3, 4);  // push(2, 3, 4)
  expect(a).toStrictEqual([1, 2, 3, 4]);
});


test("bind.2", () => {
  var a  = [1, 2, 3, 4];
  var fn = bind(Array.prototype.splice, a, 1);
  fn(2);  // splice(1, 2)
  expect(a).toStrictEqual([1, 4]);
});


test("negate", () => {
  var fn = negate(isFinite);
  expect(fn(Infinity)).toBe(true);
  expect(fn(1)).toBe(false);
  var fn = negate(isNaN);
  expect(fn(1)).toBe(true);
  expect(fn(NaN)).toBe(false);
});


test("memoize.1", () => {
  var calls = 0;
  function factorialRec(n: number) {
    if (n<=1) return 1;
    return n * factorialRec(n-1);
  }
  function factorial(n: number) {
    ++calls;
    return factorialRec(n);
  }
  var fn = memoize(factorial);
  expect(fn(3)).toBe(6);
  expect(fn(4)).toBe(24);
  expect(fn(5)).toBe(120);
  expect(fn(3)).toBe(6);
  expect(fn(4)).toBe(24);
  expect(fn(5)).toBe(120);
  expect(calls).toBe(3);
});


test("memoize.2", () => {
  var calls = 0;
  function hypot(x: number, y: number) {
    ++calls;
    return Math.hypot(x, y);
  }
  function resolver(x: number, y: number) {
    return 4093*y + x;  // a hash
  }
  var fn = memoize(hypot, resolver);
  expect(fn(3,  4)).toBe(5);
  expect(fn(6,  8)).toBe(10);
  expect(fn(5, 12)).toBe(13);
  expect(fn(3,  4)).toBe(5);
  expect(fn(6,  8)).toBe(10);
  expect(fn(5, 12)).toBe(13);
  expect(calls).toBe(3);
});
// - https://en.wikipedia.org/wiki/Integer_triangle


test("reverse", () => {
  function divide(x: number, y: number) {
    return x/y;
  }
  var fd = reverse(divide);
  expect(fd(2, 4)).toBe(2);
  expect(fd(2, 6)).toBe(3);
  expect(fd(2, 8)).toBe(4);
  var array = [1];
  function push(...args: number[]) {
    array.push(...args);
  }
  var fp = reverse(push);
  fp(2, 3, 4);  // push(2, 3, 4) in reverse order
  expect(array).toStrictEqual([1, 4, 3, 2]);
});


test("spread", () => {
  function sum(x: number[]) {
    var a = 0;
    for (var v of x)
      a += v;
    return a;
  }
  var fn = spread(sum);
  expect(fn(1, 2, 3)).toBe(6);                      // sum([1, 2, 3])
  var array = [1];
  function concat(x: number[]) {
    return array.concat(x);
  }
  var fn = spread(concat);
  expect(fn(2, 3, 4)).toStrictEqual([1, 2, 3, 4]);  // concat([2, 3, 4])
});


test("unspread", () => {
  var fn = unspread(Math.min);
  expect(fn([7, 4, 9])).toBe(4);                        // Math.min(7, 4, 9)
  var fn = unspread((x, i, I) => x.slice(i, I));
  expect(fn([[1, 2, 3, 4], 2])).toStrictEqual([3, 4]);  // [1, 2, 3, 4].slice(2)
});


test("wrap", () => {
  var fn = wrap(Math.min, 1);
  expect(fn(100, 180, 130)).toBe(130);      // Math.min(180, 130)
  var fn = wrap(Math.min, 1, 3);
  expect(fn(100, 180, 130, 80)).toBe(130);  // Math.min(180, 130)
});


test("unwrap", () => {
  var fn = unwrap(Math.min, [100]);
  expect(fn(180, 130)).toBe(100);  // Math.min(100, 180, 130)
  var array = [1];
  var fn = unwrap((...vs) => array.push(...vs), [10], [10]);
  fn(1, 2, 3);                     // array.push(10, 1, 2, 3, 10)
  expect(array).toStrictEqual([1, 10, 1, 2, 3, 10]);
});


test("compose", () => {
  var fn = compose();
  expect(fn()).toBeUndefined();
  var fn = compose(Math.sqrt, Math.abs);
  expect(fn(-64)).toBe(8);    // Math.sqrt(Math.abs(-64))
  var fn = compose(Math.sqrt, Math.min);
  expect(fn(22, 9)).toBe(3);  // Math.sqrt(Math.min(22, 9))
});


test("composeRight", () => {
  var fn = composeRight();
  expect(fn()).toBeUndefined();
  var fn = composeRight(Math.abs, Math.sqrt);
  expect(fn(-64)).toBe(8);    // Math.sqrt(Math.abs(-64))
  var fn = composeRight(Math.min, Math.sqrt);
  expect(fn(22, 9)).toBe(3);  // Math.sqrt(Math.min(22, 9))
});


test("curry", () => {
  var sub = (x: number, y: number) => x - y;
  var fn  = curry(sub);
  expect(fn(2)(3)).toBe(-1);    // sub(2, 3)
  var fn  = curry(Math.min, 3);
  expect(fn(5)(8)(3)).toBe(3);  // Math.min(5, 8, 3)
});


test("curryRight", () => {
  var sub = (x: number, y: number) => x - y;
  var fn  = curryRight(sub);
  expect(fn(2)(3)).toBe(1);  // sub(3, 2)
  var array = [1];
  var push2 = (x: number, y: number) => array.push(x, y);
  var fn  = curryRight(push2, 2);
  fn(2)(3);                  // push2(3, 2)
  expect(array).toStrictEqual([1, 3, 2]);
});


test("delay.1", async () => {
  var count = 0;
  var fn = delay(() => ++count, 500);
  setTimeout(fn, 0);     // `count` incremented after 0.5s
  setTimeout(fn, 1000);  // `count` incremented after 1.5s
  setTimeout(() => expect(count).toBe(0), 200);
  setTimeout(() => expect(count).toBe(1), 700);
  setTimeout(() => expect(count).toBe(1), 1200);
  setTimeout(() => expect(count).toBe(2), 1700);
  setTimeout(() => expect(count).toBe(2), 2200);
  await sleep(10000);
});


test("delay.2", async () => {
  var count = 0;
  var fn = delay(() => ++count, 500);
  setTimeout(fn, 0);     // `count` incremented after 0.5s
  setTimeout(fn, 1000);  // `count` incremented after 1.5s
  setTimeout(fn, 2000);  // `count` incremented after 2.5s
  setTimeout(fn, 3000);  // `count` incremented after 3.5s
  setTimeout(() => expect(count).toBe(0), 200);
  setTimeout(() => expect(count).toBe(1), 700);
  setTimeout(() => expect(count).toBe(1), 1200);
  setTimeout(() => expect(count).toBe(2), 1700);
  setTimeout(() => expect(count).toBe(2), 2200);
  setTimeout(() => expect(count).toBe(3), 2700);
  setTimeout(() => expect(count).toBe(3), 3200);
  setTimeout(() => expect(count).toBe(4), 3700);
  setTimeout(() => expect(count).toBe(4), 4200);
  await sleep(10000);
});


test("limitUse.1", () => {
  var sum = 0;
  var add = (x: number) => sum += x;
  var fn  = limitUse(add, 0, 4);
  for (var i=0; i<10; ++i)
    fn(i);
  expect(sum).toBe(6);  // 0 + 1 + 2 + 3
});


test("limitUse.2", () => {
  var sum = 0;
  var add = (x: number) => sum += x;
  var fn  = limitUse(add, 4, 8);
  for (var i=0; i<10; ++i)
    fn(i);
  expect(sum).toBe(22);  // 4 + 5 + 6 + 7
});


test("debounce.1", async () => {
  var count = 0;
  var fn = debounce(() => ++count, 1500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 4000);
  setTimeout(fn, 5000);
  // `count` incremented after 3.5s
  // `count` incremented after 6.5s
  setTimeout(() => expect(count).toBe(0), 200);
  setTimeout(() => expect(count).toBe(0), 700);
  setTimeout(() => expect(count).toBe(0), 1200);
  setTimeout(() => expect(count).toBe(0), 1700);
  setTimeout(() => expect(count).toBe(0), 2200);
  setTimeout(() => expect(count).toBe(0), 2700);
  setTimeout(() => expect(count).toBe(0), 3200);
  setTimeout(() => expect(count).toBe(1), 3700);
  setTimeout(() => expect(count).toBe(1), 4200);
  setTimeout(() => expect(count).toBe(1), 4700);
  setTimeout(() => expect(count).toBe(1), 5200);
  setTimeout(() => expect(count).toBe(1), 5700);
  setTimeout(() => expect(count).toBe(1), 6200);
  setTimeout(() => expect(count).toBe(2), 6700);
  setTimeout(() => expect(count).toBe(2), 7200);
  await sleep(10000);
});


test("debounce.2", async () => {
  var count = 0;
  var fn = debounce(() => ++count, 1500);
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
  setTimeout(() => expect(count).toBe(0), 200);
  setTimeout(() => expect(count).toBe(0), 700);
  setTimeout(() => expect(count).toBe(0), 1200);
  setTimeout(() => expect(count).toBe(0), 1700);
  setTimeout(() => expect(count).toBe(0), 2200);
  setTimeout(() => expect(count).toBe(0), 2700);
  setTimeout(() => expect(count).toBe(0), 3200);
  setTimeout(() => expect(count).toBe(1), 3700);
  setTimeout(() => expect(count).toBe(1), 4200);
  setTimeout(() => expect(count).toBe(1), 4700);
  setTimeout(() => expect(count).toBe(1), 5200);
  setTimeout(() => expect(count).toBe(1), 5700);
  setTimeout(() => expect(count).toBe(1), 6200);
  setTimeout(() => expect(count).toBe(2), 6700);
  setTimeout(() => expect(count).toBe(2), 7200);
  await sleep(10000);
});


test("debounce.3", async () => {
  var count = 0;
  var fn = debounce(() => ++count, 1500, 3500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);
  setTimeout(fn, 4000);
  setTimeout(fn, 6000);
  // `count` incremented after 3.5s
  // `count` incremented after 5.5s
  // `count` incremented after 7.5s
  setTimeout(() => expect(count).toBe(0), 200);
  setTimeout(() => expect(count).toBe(0), 700);
  setTimeout(() => expect(count).toBe(0), 1200);
  setTimeout(() => expect(count).toBe(0), 1700);
  setTimeout(() => expect(count).toBe(0), 2200);
  setTimeout(() => expect(count).toBe(0), 2700);
  setTimeout(() => expect(count).toBe(0), 3200);
  setTimeout(() => expect(count).toBe(1), 3700);
  setTimeout(() => expect(count).toBe(1), 4200);
  setTimeout(() => expect(count).toBe(1), 4700);
  setTimeout(() => expect(count).toBe(1), 5200);
  setTimeout(() => expect(count).toBe(2), 5700);
  setTimeout(() => expect(count).toBe(2), 6200);
  setTimeout(() => expect(count).toBe(2), 6700);
  setTimeout(() => expect(count).toBe(2), 7200);
  setTimeout(() => expect(count).toBe(3), 7700);
  setTimeout(() => expect(count).toBe(3), 8200);
  await sleep(10000);
});


test("debounceEarly.1", async () => {
  var count = 0;
  var fn = debounceEarly(() => ++count, 1500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 4000);
  setTimeout(fn, 5000);
  // `count` incremented after 0s
  // `count` incremented after 4s
  setTimeout(() => expect(count).toBe(1), 200);
  setTimeout(() => expect(count).toBe(1), 700);
  setTimeout(() => expect(count).toBe(1), 1200);
  setTimeout(() => expect(count).toBe(1), 1700);
  setTimeout(() => expect(count).toBe(1), 2200);
  setTimeout(() => expect(count).toBe(1), 2700);
  setTimeout(() => expect(count).toBe(1), 3200);
  setTimeout(() => expect(count).toBe(1), 3700);
  setTimeout(() => expect(count).toBe(2), 4200);
  setTimeout(() => expect(count).toBe(2), 4700);
  await sleep(10000);
});


test("debounceEarly.2", async () => {
  var count = 0;
  var fn = debounceEarly(() => ++count, 1500);
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
  setTimeout(() => expect(count).toBe(1), 200);
  setTimeout(() => expect(count).toBe(1), 700);
  setTimeout(() => expect(count).toBe(1), 1200);
  setTimeout(() => expect(count).toBe(1), 1700);
  setTimeout(() => expect(count).toBe(1), 2200);
  setTimeout(() => expect(count).toBe(1), 2700);
  setTimeout(() => expect(count).toBe(1), 3200);
  setTimeout(() => expect(count).toBe(1), 3700);
  setTimeout(() => expect(count).toBe(2), 4200);
  setTimeout(() => expect(count).toBe(2), 4700);
  await sleep(10000);
});


test("debounceEarly.3", async () => {
  var count = 0;
  var fn = debounceEarly(() => ++count, 1500, 3500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);
  setTimeout(fn, 4000);
  setTimeout(fn, 6000);
  // `count` incremented after 0s
  // `count` incremented after 4s
  // `count` incremented after 6s
  setTimeout(() => expect(count).toBe(1), 200);
  setTimeout(() => expect(count).toBe(1), 700);
  setTimeout(() => expect(count).toBe(1), 1200);
  setTimeout(() => expect(count).toBe(1), 1700);
  setTimeout(() => expect(count).toBe(1), 2200);
  setTimeout(() => expect(count).toBe(1), 2700);
  setTimeout(() => expect(count).toBe(1), 3200);
  setTimeout(() => expect(count).toBe(1), 3700);
  setTimeout(() => expect(count).toBe(2), 4200);
  setTimeout(() => expect(count).toBe(2), 4700);
  setTimeout(() => expect(count).toBe(2), 5200);
  setTimeout(() => expect(count).toBe(2), 5700);
  setTimeout(() => expect(count).toBe(3), 6200);
  setTimeout(() => expect(count).toBe(3), 6700);
  await sleep(10000);
});


test("throttle.1", async () => {
  var count = 0;
  var fn = throttle(() => ++count, 2500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  // `count` incremented after 2.5s
  setTimeout(() => expect(count).toBe(0), 200);
  setTimeout(() => expect(count).toBe(0), 700);
  setTimeout(() => expect(count).toBe(0), 1200);
  setTimeout(() => expect(count).toBe(0), 1700);
  setTimeout(() => expect(count).toBe(0), 2200);
  setTimeout(() => expect(count).toBe(1), 2700);
  setTimeout(() => expect(count).toBe(1), 3200);
  await sleep(10000);
});


test("throttle.2", async () => {
  var count = 0;
  var fn = throttle(() => ++count, 2500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);
  setTimeout(fn, 4000);
  // `count` incremented after 2.5s
  // `count` incremented after 5.5s
  setTimeout(() => expect(count).toBe(0), 200);
  setTimeout(() => expect(count).toBe(0), 700);
  setTimeout(() => expect(count).toBe(0), 1200);
  setTimeout(() => expect(count).toBe(0), 1700);
  setTimeout(() => expect(count).toBe(0), 2200);
  setTimeout(() => expect(count).toBe(1), 2700);
  setTimeout(() => expect(count).toBe(1), 3200);
  setTimeout(() => expect(count).toBe(1), 3700);
  setTimeout(() => expect(count).toBe(1), 4200);
  setTimeout(() => expect(count).toBe(1), 4700);
  setTimeout(() => expect(count).toBe(1), 5200);
  setTimeout(() => expect(count).toBe(2), 5700);
  setTimeout(() => expect(count).toBe(2), 6200);
  await sleep(10000);
});


test("throttleEarly.1", async () => {
  var count = 0;
  var fn = throttleEarly(() => ++count, 2500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  // `count` incremented after 0s
  setTimeout(() => expect(count).toBe(1), 200);
  setTimeout(() => expect(count).toBe(1), 700);
  await sleep(10000);
});


test("throttleEarly.2", async () => {
  var count = 0;
  var fn = throttleEarly(() => ++count, 2500);
  setTimeout(fn, 0);
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);
  setTimeout(fn, 4000);
  // `count` incremented after 0s
  // `count` incremented after 3s
  setTimeout(() => expect(count).toBe(1), 200);
  setTimeout(() => expect(count).toBe(1), 700);
  setTimeout(() => expect(count).toBe(1), 1200);
  setTimeout(() => expect(count).toBe(1), 1700);
  setTimeout(() => expect(count).toBe(1), 2200);
  setTimeout(() => expect(count).toBe(1), 2700);
  setTimeout(() => expect(count).toBe(2), 3200);
  setTimeout(() => expect(count).toBe(2), 3700);
  setTimeout(() => expect(count).toBe(2), 4200);
  await sleep(10000);
});
