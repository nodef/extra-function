import RARROW from './RARROW';
import RNORMAL from './RNORMAL';

/**
 * Gives parameter names of function.
 * @param x a function
 */
function parameters(x: Function): string[] {
  var s = x.toString();
  var m = RNORMAL.exec(s)||RARROW.exec(s);
  return m[2]? m[2].trim().split(/[,\s]+/g) : [];
}
export default parameters;
