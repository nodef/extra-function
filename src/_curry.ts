/**
 * Gives a curried version of function.
 * @param x a function
 * @param n number of arguments (all)
 */
function curry(x: Function, n: number=x.length): Function {
  var a = [];
  return () => {
    Array.prototype.push(a, arguments);
    if(a.length<n) return;
    return x.apply(null, a.slice(0, n));
  };
}
export default curry;
