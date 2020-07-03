/**
 * Matches arrow function, with parameters as $2.
 */
const RARROW = /^()\(?([^\)=]*)\)?\s*=>/;
export default RARROW;
// https://github.com/inspect-js/is-arrow-function/blob/master/index.js
// https://www.npmjs.com/package/is-arrow-function
