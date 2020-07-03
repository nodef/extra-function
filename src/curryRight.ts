/**
 * Gives right curried version of function.
 * @param x a function
 * @param n number of arguments [all]
 */
function curryRight(x: Function, n: number=x.length): Function {
  return (...as: any[]) => {
    if(as.length>=n) return x(...as.reverse());
    else return curryRight((...bs: any[]) => x(...as.reverse(), ...bs.reverse()), n-as.length);
  };
}
export default curryRight;
// https://www.npmjs.com/package/lodash.curryright
