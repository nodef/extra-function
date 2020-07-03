/**
 * Gives a leading-edge debounced version of function.
 * @param x a function
 * @param t delay time [0 ms]
 * @param T max delay time [-1 => none]
 */
function debounceEarly(x: Function, t: number=0, T: number=-1): Function {
  var H = null, h = null;
  var fn = () => { H = h = null; };
  return (...as: any[]) => {
    if(H==null && h==null) x(...as);
    if(T>=0) H = H||setTimeout(fn, T);
    if(T<0 || t<T) { clearTimeout(h); h = setTimeout(fn, t); }
    return H||h;
  };
}
export default debounceEarly;
