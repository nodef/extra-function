/**
 * Composes functions together, that pipe forward the result.
 * @param xs functions (f, g)
 * @returns (f |> g), or g(f(x))
 */
function composeRight(...xs: Function[]): Function {
  return (...as: any[]) => {
    var a = as;
    for(var x of xs)
      a = x(a);
    return a;
  };
}
export default composeRight;
// https://stackoverflow.com/questions/1457140/haskell-composition-vs-fs-pipe-forward-operator
