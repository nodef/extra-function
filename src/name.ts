import RARROW from './RARROW';
import RNORMAL from './RNORMAL';

/**
 * Gives name of function.
 * @param x a function
 */
function name(x: Function): string {
  if(x.name!=null) return x.name;
  var s = x.toString();
  var m = RNORMAL.exec(s)||RARROW.exec(s);
  return m[1];
}
export default name;
// https://github.com/sindresorhus/fn-name/blob/master/index.js
// https://www.npmjs.com/package/fn-name
