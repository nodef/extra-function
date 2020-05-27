import AsyncFunction from './AsyncFunction';

/**
 * Checks if value is async function.
 * @param v a value
 */
function isAsync(v: any): boolean {
  return v instanceof AsyncFunction;
}
export default isAsync;
// https://www.npmjs.com/package/is-async-function
// https://www.npmjs.com/package/is-callback-function
// https://davidwalsh.name/javascript-detect-async-function
// https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
