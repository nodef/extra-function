import debounceEarly from './debounceEarly';

/**
 * Gives a leading-edge throttled version of function.
 * @param x a function
 * @param t wait time [0 ms]
 */
function throttleEarly(x: Function, t: number=0): Function {
  return debounceEarly(x, t, t);
}
export default throttleEarly;
// TODO
