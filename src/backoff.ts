function backoffRec(x: Function, as: any[], e: any, n: number, N: number, t: number, T: number, tf: number): void {
  if(N>=0 && n>=N) throw e;
  if(T>=0 && t>=T) throw e;
  try { return x(...as, e); }
  catch(e) { setTimeout(() => backoffRec(x, as, e, n+1, N, t*tf, T, tf), t); }
}

/**
 * Gives exponential backoff retried version of function.
 * @param x a function
 * @param N maximum retries [-1 => none]
 * @param t initial retry time [1 ms]
 * @param T maximum retry time [-1 => none]
 * @param tf retry time factor [2]
 */
function backoff(x: Function, N: number=-1, t: number=1, T: number=-1, tf: number=2): Function {
  return (...as: any[]) => backoffRec(x, as, null, 0, N, t, T, tf);
}
export default backoff;
// TODO
