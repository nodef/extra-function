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
// https://github.com/lodash/lodash/blob/4.8.0-npm/debounce.js
// https://github.com/jashkenas/underscore/commit/9e3e067f5025dbe5e93ed784f93b233882ca0ffe
// https://css-tricks.com/debouncing-throttling-explained-examples/
// https://www.npmjs.com/package/debounce
// TODO
