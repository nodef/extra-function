/**
 * Gives a leading-edge throttled version of function.
 * @param x a function
 * @param t wait time [0 ms]
 */
function throttle(x: Function, t: number=0): Function {
  var a = null, n = 0;
  return (...as: any[]) => {
    if(n++==0) { x(...as); a = setTimeout(() => n = 0, t); }
    return a;
  };
}
export default throttle;
