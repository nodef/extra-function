import ID from './IDENTITY';
import type {combineFn} from './_types';

/**
 * Gives cached version of function.
 * @param x a function
 * @param fc combine function (..args)
 * @param map result cache
 */
function memoize(x: Function, fc: combineFn=null, map: Map<any, any>=null): Function {
  var fc = fc||ID, map = map||new Map();
  return (...as: any[]) => {
    var k = fc(...as);
    if(map.has(k)) return map.get(k);
    var v = x(...as);
    map.set(k, v);
    return v;
  };
}
export default memoize;
