import composeRight from './composeRight';

/**
 * Composes functions together, in applicative order.
 * @param xs functions (f, g)
 * @returns (f o g), or f(g(x))
 */
function compose(...xs: Function[]): Function {
  return composeRight(...xs.reverse());
}
export default compose;
// https://en.wikipedia.org/wiki/Function_composition
// http://learnyouahaskell.com/higher-order-functions
