import RARROW from './RARROW';

/**
 * Checks is value is arrow function.
 * @param x a value
 */
function isArrow(x: any): boolean {
  if(typeof x!=='function') return false;
  else return RARROW.test(x.toString());
}
export default isArrow;
