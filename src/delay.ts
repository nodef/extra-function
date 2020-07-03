/**
 * Gives a delayed version of function.
 * @param x a function
 * @param t delay time (ms)
 */
function delay(x: Function, t: number=0): Function {
  return (...as: any[]) => setTimeout(x, t, ...as);
}
export default delay;
