import * as funcxion from "../src";




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
