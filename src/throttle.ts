import debounce from './debounce';

/**
 * Gives a throttled version of function.
 * @param x a function
 * @param t wait time [0 ms]
 */
function throttle(x: Function, t: number=0): Function {
  return debounce(x, t, t);
}
export default throttle;
// TODO
// https://www.npmjs.com/package/throttle-debounce
// https://www.npmjs.com/package/throttleit
