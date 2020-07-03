/**
 * Gives a limited times callable function,
 * @param x a function
 * @param n called after [0 times]
 * @param N called till [-1 => till end]
 */
function limit(x: Function, n: number=0, N: number=-1): Function {
  var i = -1, a: any;
  return (...as: any[]) => {
    if(++i<n || (N>=0 && i>=N)) return a;
    else return a = x(...as);
  };
}
export default limit;
