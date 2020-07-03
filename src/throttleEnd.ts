/**
 * Gives a falling-edge throttled version of function.
 * @param x a function
 * @param t wait time [0 ms]
 */
function throttleEnd(x: Function, t: number=0): Function {
  var a = null, n = 0;
  return (...as: any[]) => {
    if(n++===0) a = setTimeout(() => { x(...as); n = 0; }, t);
    return a;
  };
}
export default throttleEnd;
