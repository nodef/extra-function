/**
 * Matches normal function, with name as $1 and parameters as $2.
 */
const RNORMAL = /^function*?\s+([^\(]*)\(([^\)]*)\)/;
export default RNORMAL;
