import RARROW from './RARROW';
import RNORMAL from './RNORMAL';

/**
 * Gives signature of function.
 * @param x a function
 * @returns name(parameters)
 */
function signature(x: Function): string {
  var s = x.toString();
  var m = RNORMAL.exec(s)||RARROW.exec(s);
  return `${m[1]}(${m[2].trim()})`;
}
export default signature;
