function unspread(x: Function): Function {
  return (...as: any[]) => x(as);
}
