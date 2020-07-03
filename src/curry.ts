/**
 * Gives a curried version of function.
 * @param x a function
 * @param n number of arguments [all]
 */
function curry(x: Function, n: number=x.length): Function {
  return (...as: any[]) => {
    if(as.length>=n) return x(...as);
    else return curry((...bs: any[]) => x(...as, ...bs), n-as.length);
  };
}
export default curry;
