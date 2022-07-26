import {sleep}         from "extra-sleep";
import * as funcxion   from "../src";
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
  // var a = signature(delay);
  // expect(a).toBe("function delay(x, t)");
  // var a = signature(debounce);
  // expect(a).toBe("function debounce()");
});


test("name", () => {
  // var a = name(delay);
  // expect(a).toBe("delay");
  // var a = name(debounce);
  // expect(a).toBe("debounce");
});


test("parameters", () => {
  // var a = parameters(delay);
  // expect(a).toStrictEqual(["x", "t"]);
  // var a = parameters(debounce);
  // expect(a).toStrictEqual(["x", "t", "T"]);
});


test("arity", () => {
  // var a = arity(negate);
  // expect(a).toBe(1);
  // var a = arity(curry);
  // expect(a).toBe(2);
  // var a = arity(limitUse);
  // expect(a).toBe(3);
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
  var fn = compose(Math.sqrt, Math.abs);
  expect(fn(-64)).toBe(8);    // Math.sqrt(Math.abs(-64))
  var fn = compose(Math.sqrt, Math.min);
  expect(fn(22, 9)).toBe(3);  // Math.sqrt(Math.min(22, 9))
});


test("composeRight", () => {
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
  var fn = delay(() => ++count, 50);
  setTimeout(fn, 0);    // `count` incremented after 50 ms
  setTimeout(fn, 100);  // `count` incremented after 150 ms
  setTimeout(() => expect(count).toBe(0), 20);
  setTimeout(() => expect(count).toBe(1), 70);
  setTimeout(() => expect(count).toBe(1), 120);
  setTimeout(() => expect(count).toBe(2), 170);
  setTimeout(() => expect(count).toBe(2), 220);
  await sleep(1000);
});


test("delay.2", async () => {
  var count = 0;
  var fn = delay(() => ++count, 50);
  setTimeout(fn, 0);    // `count` incremented after 50 ms
  setTimeout(fn, 100);  // `count` incremented after 150 ms
  setTimeout(fn, 200);  // `count` incremented after 250 ms
  setTimeout(fn, 300);  // `count` incremented after 350 ms
  setTimeout(() => expect(count).toBe(0), 20);
  setTimeout(() => expect(count).toBe(1), 70);
  setTimeout(() => expect(count).toBe(1), 120);
  setTimeout(() => expect(count).toBe(2), 170);
  setTimeout(() => expect(count).toBe(2), 220);
  setTimeout(() => expect(count).toBe(3), 270);
  setTimeout(() => expect(count).toBe(3), 320);
  setTimeout(() => expect(count).toBe(4), 370);
  setTimeout(() => expect(count).toBe(4), 420);
  await sleep(1000);
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
  var fn = debounce(() => ++count, 150);
  setTimeout(fn, 0);
  setTimeout(fn, 100);
  setTimeout(fn, 200);
  setTimeout(fn, 400);
  setTimeout(fn, 500);
  // `count` incremented after 350 ms
  // `count` incremented after 650 ms
  setTimeout(() => expect(count).toBe(0), 20);
  setTimeout(() => expect(count).toBe(0), 70);
  setTimeout(() => expect(count).toBe(0), 120);
  setTimeout(() => expect(count).toBe(0), 170);
  setTimeout(() => expect(count).toBe(0), 220);
  setTimeout(() => expect(count).toBe(0), 270);
  setTimeout(() => expect(count).toBe(0), 320);
  setTimeout(() => expect(count).toBe(1), 370);
  setTimeout(() => expect(count).toBe(1), 420);
  setTimeout(() => expect(count).toBe(1), 470);
  setTimeout(() => expect(count).toBe(1), 520);
  setTimeout(() => expect(count).toBe(1), 570);
  setTimeout(() => expect(count).toBe(1), 620);
  setTimeout(() => expect(count).toBe(2), 670);
  setTimeout(() => expect(count).toBe(2), 720);
  await sleep(1000);
});


test("debounce.2", async () => {
  var count = 0;
  var fn = debounce(() => ++count, 150);
  setTimeout(fn, 0);
  setTimeout(fn, 50);
  setTimeout(fn, 100);
  setTimeout(fn, 150);
  setTimeout(fn, 200);
  setTimeout(fn, 400);
  setTimeout(fn, 450);
  setTimeout(fn, 500);
  // `count` incremented after 350 ms
  // `count` incremented after 650 ms
  setTimeout(() => expect(count).toBe(0), 20);
  setTimeout(() => expect(count).toBe(0), 70);
  setTimeout(() => expect(count).toBe(0), 120);
  setTimeout(() => expect(count).toBe(0), 170);
  setTimeout(() => expect(count).toBe(0), 220);
  setTimeout(() => expect(count).toBe(0), 270);
  setTimeout(() => expect(count).toBe(0), 320);
  setTimeout(() => expect(count).toBe(1), 370);
  setTimeout(() => expect(count).toBe(1), 420);
  setTimeout(() => expect(count).toBe(1), 470);
  setTimeout(() => expect(count).toBe(1), 520);
  setTimeout(() => expect(count).toBe(1), 570);
  setTimeout(() => expect(count).toBe(1), 620);
  setTimeout(() => expect(count).toBe(2), 670);
  setTimeout(() => expect(count).toBe(2), 720);
  await sleep(1000);
});


test("debounceEarly.1", async () => {
  var count = 0;
  var fn = debounceEarly(() => ++count, 150);
  setTimeout(fn, 0);
  setTimeout(fn, 100);
  setTimeout(fn, 200);
  setTimeout(fn, 400);
  setTimeout(fn, 500);
  // `count` incremented after 0 ms
  // `count` incremented after 400 ms
  setTimeout(() => expect(count).toBe(1), 20);
  setTimeout(() => expect(count).toBe(1), 70);
  setTimeout(() => expect(count).toBe(1), 120);
  setTimeout(() => expect(count).toBe(1), 170);
  setTimeout(() => expect(count).toBe(1), 220);
  setTimeout(() => expect(count).toBe(1), 270);
  setTimeout(() => expect(count).toBe(1), 320);
  setTimeout(() => expect(count).toBe(1), 370);
  setTimeout(() => expect(count).toBe(2), 420);
  setTimeout(() => expect(count).toBe(2), 470);
  await sleep(1000);
});


test("debounceEarly.2", async () => {
  var count = 0;
  var fn = debounceEarly(() => ++count, 150);
  setTimeout(fn, 0);
  setTimeout(fn, 50);
  setTimeout(fn, 100);
  setTimeout(fn, 150);
  setTimeout(fn, 200);
  setTimeout(fn, 400);
  setTimeout(fn, 450);
  setTimeout(fn, 500);
  // `count` incremented after 0 ms
  // `count` incremented after 400 ms
  setTimeout(() => expect(count).toBe(1), 20);
  setTimeout(() => expect(count).toBe(1), 70);
  setTimeout(() => expect(count).toBe(1), 120);
  setTimeout(() => expect(count).toBe(1), 170);
  setTimeout(() => expect(count).toBe(1), 220);
  setTimeout(() => expect(count).toBe(1), 270);
  setTimeout(() => expect(count).toBe(1), 320);
  setTimeout(() => expect(count).toBe(1), 370);
  setTimeout(() => expect(count).toBe(2), 420);
  setTimeout(() => expect(count).toBe(2), 470);
  await sleep(1000);
});


test("throttle.1", async () => {
  var count = 0;
  var fn = throttle(() => ++count, 250);
  setTimeout(fn, 0);
  setTimeout(fn, 100);
  setTimeout(fn, 200);
  // `count` incremented after 250 ms
  setTimeout(() => expect(count).toBe(0), 20);
  setTimeout(() => expect(count).toBe(0), 70);
  setTimeout(() => expect(count).toBe(0), 120);
  setTimeout(() => expect(count).toBe(0), 170);
  setTimeout(() => expect(count).toBe(0), 220);
  setTimeout(() => expect(count).toBe(1), 270);
  setTimeout(() => expect(count).toBe(1), 320);
  await sleep(1000);
});


test("throttle.2", async () => {
  var count = 0;
  var fn = throttle(() => ++count, 250);
  setTimeout(fn, 0);
  setTimeout(fn, 100);
  setTimeout(fn, 200);
  setTimeout(fn, 300);
  setTimeout(fn, 400);
  // `count` incremented after 250 ms
  // `count` incremented after 550 ms
  setTimeout(() => expect(count).toBe(0), 20);
  setTimeout(() => expect(count).toBe(0), 70);
  setTimeout(() => expect(count).toBe(0), 120);
  setTimeout(() => expect(count).toBe(0), 170);
  setTimeout(() => expect(count).toBe(0), 220);
  setTimeout(() => expect(count).toBe(1), 270);
  setTimeout(() => expect(count).toBe(1), 320);
  setTimeout(() => expect(count).toBe(1), 370);
  setTimeout(() => expect(count).toBe(1), 420);
  setTimeout(() => expect(count).toBe(1), 470);
  setTimeout(() => expect(count).toBe(1), 520);
  setTimeout(() => expect(count).toBe(2), 570);
  setTimeout(() => expect(count).toBe(2), 620);
  await sleep(1000);
});


test("throttleEarly.1", async () => {
  var count = 0;
  var fn = throttleEarly(() => ++count, 250);
  setTimeout(fn, 0);
  setTimeout(fn, 100);
  setTimeout(fn, 200);
  // `count` incremented after 0 ms
  setTimeout(() => expect(count).toBe(1), 20);
  setTimeout(() => expect(count).toBe(1), 70);
  await sleep(1000);
});


test("throttleEarly.2", async () => {
  var count = 0;
  var fn = throttleEarly(() => ++count, 250);
  setTimeout(fn, 0);
  setTimeout(fn, 100);
  setTimeout(fn, 200);
  setTimeout(fn, 300);
  setTimeout(fn, 400);
  // `count` incremented after 0 ms
  // `count` incremented after 300 ms
  setTimeout(() => expect(count).toBe(1), 20);
  setTimeout(() => expect(count).toBe(1), 70);
  setTimeout(() => expect(count).toBe(1), 120);
  setTimeout(() => expect(count).toBe(1), 170);
  setTimeout(() => expect(count).toBe(1), 220);
  setTimeout(() => expect(count).toBe(1), 270);
  setTimeout(() => expect(count).toBe(2), 320);
  setTimeout(() => expect(count).toBe(2), 370);
  setTimeout(() => expect(count).toBe(2), 420);
  await sleep(1000);
});
