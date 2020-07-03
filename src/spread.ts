function spread(x: Function): Function {
  return (as: any[]) => x(...as);
}
export default spread;
