/**
 * Gives a debounced version of function.
 * @param x a function
 * @param t delay time [0 ms]
 * @param T max delay time [-1 => none]
 */
function debounce(x: Function, t: number=0, T: number=-1): Function {
  var bs = null, H = null, h = null;
  var fn = () => { x(...bs); H = h = null; };
  return (...as: any[]) => {
    bs = as;
    if(T>=0) H = H||setTimeout(fn, T);
    if(T<0 || t<T) { clearTimeout(h); h = setTimeout(fn, t); }
    return H||h;
  };
}
export default debounce;
