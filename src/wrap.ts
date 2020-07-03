function wrap(x: Function, i: number=0, I: number=x.length, pre: any[]=[], suf: any[]=[]): Function {
  return (...args: any[]) => x(...pre, ...args.slice(i, I), ...suf);
}
export default wrap;
