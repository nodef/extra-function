/**
 * Gives a leading-edge debounced version of function.
 * @param x a function
 * @param t delay time [0 ms]
 * @param tm max delay time [-1 => none]
 */
function debounceEarly(x: Function, t: number=0, tm: number=-1): Function {
  var hm = null, h = null;
  var fn = () => { hm = h = null; };
  return (...as: any[]) => {
    if(hm==null && h==null) x(...as);
    if(tm>=0) hm = hm||setTimeout(fn, tm);
    if(tm<0 || t<tm) { clearTimeout(h); h = setTimeout(fn, t); }
    return hm||h;
  };
}
export default debounceEarly;
