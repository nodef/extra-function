/**
 * Gives a debounced version of function.
 * @param x a function
 * @param t delay time [0 ms]
 * @param tm max delay time [-1 => none]
 */
function debounce(x: Function, t: number=0, tm: number=-1): Function {
  var bs = null, hm = null, h = null;
  var fn = () => { x(...bs); hm = h = null; };
  return (...as: any[]) => {
    bs = as;
    if(tm>=0) hm = hm||setTimeout(fn, tm);
    if(tm<0 || t<tm) { clearTimeout(h); h = setTimeout(fn, t); }
    return hm||h;
  };
}
export default debounce;
