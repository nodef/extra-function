function spread(x: Function): Function {
  return (as: any[]) => x(...as);
}
