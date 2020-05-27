import GeneratorFunction from './GeneratorFunction';

/**
 * Checks if value is generator function.
 * @param v a value
 */
function isGenerator(v: any): boolean {
  return v instanceof GeneratorFunction;
}
export default isGenerator;
// https://www.npmjs.com/package/is-generator
// https://www.npmjs.com/package/is-generator-fn
// https://www.npmjs.com/package/is-generator-function
// https://stackoverflow.com/questions/16754956/check-if-function-is-a-generator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
