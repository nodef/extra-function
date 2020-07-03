import RNAME from './RNAME';

/**
 * Gives name of function.
 * @param x a function
 */
function name(x: Function): string {
  return x.name || RNAME.exec(x.toString())[1] || '';
}
export default name;
