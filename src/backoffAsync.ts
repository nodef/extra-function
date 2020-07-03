import waitAsync from './_waitAsync';

async function backoffAsyncRec(x: Function, as: any[], e: any, n: number, N: number, t: number, T: number, tf: number): Promise<any> {
  if(N>=0 && n>=N) throw e;
  if(T>=0 && t>=T) throw e;
  try { return x(...as, e); }
  catch(e) { await waitAsync(t); await backoffAsyncRec(x, as, e, n+1, N, t*tf, T, tf); }
}

/**
 * Gives exponential backoff retried version of function.
 * @param x a function
 * @param N maximum retries [-1 => none]
 * @param t initial retry time [1 ms]
 * @param T maximum retry time [-1 => none]
 * @param tf retry time factor [2]
 */
function backoffAsync(x: Function, N: number=-1, t: number=1, T: number=-1, tf: number=2): Function {
  return (...as: any[]) => backoffAsyncRec(x, as, null, 0, N, t, T, tf);
}
export default backoffAsync;
