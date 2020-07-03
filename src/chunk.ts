function chunk(x: Function, n: number=x.length): Function {
  var as = [], vss = [];
  return (...vs: any[]) => {
    vss.push(...vs);

  };
}
export default chunk;
// array.chunk.map
