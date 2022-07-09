A collection of ways for transforming functions.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-function),
🌐 [Web](https://www.npmjs.com/package/extra-function.web),
📜 [Files](https://unpkg.com/extra-function/),
📰 [JSDoc](https://nodef.github.io/extra-function/),
📘 [Wiki](https://github.com/nodef/extra-function/wiki/).

A **function** is a **set of statements** that *performs a task* or *calculates*
*a value*. It can accept some **parameters**, and may define some **local**
**variables** necessary for performing the desired *operation*. These *parameters*
and *local variables* are contained in the **scope of the function**, and
*cannot* be accessed from the *outside*. However, a function can access
variables *external to itself* (as long as they are not *overridden*), such as
*global variables* or *variables* in the scope this function is *encapsulated*
*in*. A **nested function** can access *free variables* that are defined in
*outer scopes*, even when it is being *invoked* **away** from where it is
*defined*. It does this by **capturing** the *free variables* (by *reference*)
into a **closure** [(1)]. *Closure*, *arrow functions*, and more, are
*functional language features* based on [lambda calculus].

This package includes a number of methods to *transform functions*. This enables
you to obtain a desired function by transforming the behavior of existing
functions (*without actually executing them*). The **result** of a function can
be manipulated with [negate]. In case a *pure* function is expensive, its
results can **cached** with [memoize]. **Parameters** of a function can be
manipulated with [reverse], [spread], [unspread], [wrap], [unwrap]. [reverse]
flips the order of parameters, [spread] spreads the first array parameter of a
function, [unspread] combines all parameters into the first parameter (array),
[wrap] adds ignored parameters to the left/right of a function's parameters, and
[unwrap] removes common prefix and suffix parameters to a function (by passing
known constant values as prefix/suffix). If you want some **functional**
**behavior**, [compose], [composeRight], [curry], and [curryRight] can be used.
[composeRight] is also known as [pipe-forward operator] or [function chaining].
If you are unfamiliar, [Haskell] is a great purely functional language, and
there is great [haskell beginner guide] to learn from.

To control invocation **time** of a function, use [delay]. A function can be
**rate controlled** with [limitUse], [debounce], [debounceEarly], [throttle],
[throttleEarly]. [limitUse] controls the number of times a function can be
called, and is useful when you want to enforce a function to be called only
*once*, the first n times (*before*), or *after* n times. [debounce] and
[debounceEarly] prevent the invocation of a function during **hot** periods
(when there are too many calls), and can be used for example to issue AJAX
request after user input has stopped (for certain delay time). [throttle] and
[throttleEarly] can be used to limit the rate of invocation of a function, and
can be used for example to minimize system usage when a user is [constantly
refreshing a webpage]. Except [limitUse], all *rate/time control* methods can be
*flushed* (`flush()`) to invoke the target function immediately, or *cleared*
(`clear()`) to disable invocation of the target function.

In addition, [is], [isAsync], [isGenerator], [signature], [name], [parameters],
and [arity] obtain metadata (about) information on a function. To attach a
`this` to a function, use [bind]. A few generic functions are also included:
[ARGUMENTS], [NOOP], [IDENTITY], [COMPARE].

This package is available in both *Node.js* and *Web* formats. The web format is
exposed as `extra_function` standalone variable and can be loaded from [jsDelivr CDN].

[(1)]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
[lambda calculus]: https://en.wikipedia.org/wiki/Lambda_calculus
[pipe-forward operator]: https://stackoverflow.com/questions/1457140/haskell-composition-vs-fs-pipe-forward-operator
[function chaining]: https://www.npmjs.com/package/chain-function
[Haskell]: https://www.haskell.org
[haskell beginner guide]: http://learnyouahaskell.com
[constantly refreshing a webpage]: https://tenor.com/view/social-network-mark-zuckerberg-refresh-movie-jesse-eisenberg-gif-12095762
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-function.web/index.js

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

<br>


```javascript
const funcxion = require('extra-function');
// import * as funcxion from "extra-function";
// import * as funcxion from "https://unpkg.com/extra-function/index.mjs"; (deno)

var a = funcxion.composeRight(x => x*x, x => x+2);
a(10);
// → 102

var a = funcxion.curry((x, y) => x+y);
a(2)(3);
// → 7

var a = funcxion.unspread(Math.max);
a([2, 3, 1]);
// → 1.25

funcxion.parameters((x, y) => x+y);
// → [ 'x', 'y' ]
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [ARGUMENTS] | Return the arguments passed as a array. |
| [NOOP] | Do nothing. |
| [IDENTITY] | Return the same (first) value. |
| [COMPARE] | Compare two values. |
|  |  |
| [is] | Check if value is a function. |
| [isAsync] | Check if value is an async function. |
| [isGenerator] | Check if value is a generator function. |
| [signature] | Get the signature of a function. |
| [name] | Get the name of a function. |
| [parameters] | Get the parameter names of a function. |
| [arity] | Get the number of parameters of a function. |
|  |  |
| [bind] | Generate a function with bound this-object, and optional prefix arguments. |
|  |  |
| [negate] | Generate a result-negated version of a function. |
|  |  |
| [memoize] | Generate result-cached version of a function. |
|  |  |
| [reverse] | Generate a parameter-reversed version of a function. |
| [spread] | Generate a (first) parameter-spreaded version of a function. |
| [unspread] | Generate a (first) parameter-collapsed version of a function. |
| [wrap] | Generate a parameter-wrapped version of a function. |
| [unwrap] | Generate a parameter-unwrapped version of a function. |
|  |  |
| [compose] | Compose functions together, in applicative order. |
| [composeRight] | Compose functions together, such that result is piped forward. |
| [curry] | Generate curried version of a function. |
| [curryRight] | Generate right-curried version of a function. |
|  |  |
| [delay] | Generate delayed version of a function. |
|  |  |
| [limitUse] | Generate limited-use version of a function. |
| [debounce] | Generate debounced version of a function. |
| [debounceEarly] | Generate leading-edge debounced version of a function. |
| [throttle] | Generate throttled version of a function. |
| [throttleEarly] | Generate leading-edge throttled version of a function. |

<br>
<br>


## References

- [MDN Web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Lodash documentation](https://lodash.com/docs/4.17.15)
- [Underscore.js documentation](https://underscorejs.org/)
- [Function composition](https://en.wikipedia.org/wiki/Function_composition)
- [Debouncing and Throttling Explained Through Examples by David Corbacho](https://css-tricks.com/debouncing-throttling-explained-examples/)
- [Learn You a Haskell for Great Good!: Higher order functions by Miran Lipovaca](http://learnyouahaskell.com/higher-order-functions)
- [How to know if a function is async?](https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async)
- [Check if function is a generator](https://stackoverflow.com/questions/16754956/check-if-function-is-a-generator)
- [Haskell composition (.) vs F#'s pipe forward operator (|>)](https://stackoverflow.com/questions/1457140/haskell-composition-vs-fs-pipe-forward-operator)
- [JavaScript Detect Async Function by David Walsh](https://davidwalsh.name/javascript-detect-async-function)
- [is-function package by Stephen Sugden](https://www.npmjs.com/package/is-function)
- [is-async-function package by Jordan Harband](https://www.npmjs.com/package/is-async-function)
- [is-callback-function package by Charlike Mike Reagent](https://www.npmjs.com/package/is-callback-function)
- [is-generator-fn package by Sindre Sorhus](https://www.npmjs.com/package/is-generator-fn)
- [is-generator-function package by Jordan Harband](https://www.npmjs.com/package/is-generator-function)
- [fn-name package by Sindre Sorhus](https://www.npmjs.com/package/fn-name)
- [memoizee package by Mariusz Nowak](https://www.npmjs.com/package/memoizee)
- [memoizerific package by @thinkloop](https://www.npmjs.com/package/memoizerific)
- [compose-function package by Christoph Hermann](https://www.npmjs.com/package/compose-function)
- [chain-function package by Jason Quense](https://www.npmjs.com/package/chain-function)
- [@spudly/curry package by Stephen Sorensen](https://www.npmjs.com/package/@spudly/curry)
- [one-time package by Arnout Kazemier](https://www.npmjs.com/package/one-time)
- [onetime package by Sindre Sorhus](https://www.npmjs.com/package/onetime)
- [once package by Isaac Z. Schlueter](https://www.npmjs.com/package/once)
- [debounce package by @component](https://www.npmjs.com/package/debounce)
- [throttle-debounce package by Ivan Nikolić](https://www.npmjs.com/package/throttle-debounce)
- [throttleit package by @component](https://www.npmjs.com/package/throttleit)

<br>
<br>


[![](https://img.youtube.com/vi/vzfy4EKwG_Y/maxresdefault.jpg)](https://www.youtube.com/watch?v=vzfy4EKwG_Y)<br>
[![DOI](https://zenodo.org/badge/249692645.svg)](https://zenodo.org/badge/latestdoi/249692645)


[ARGUMENTS]: https://nodef.github.io/extra-function/modules.html#ARGUMENTS
[NOOP]: https://nodef.github.io/extra-function/modules.html#NOOP
[IDENTITY]: https://nodef.github.io/extra-function/modules.html#IDENTITY
[COMPARE]: https://nodef.github.io/extra-function/modules.html#COMPARE
[is]: https://nodef.github.io/extra-function/modules.html#is
[isAsync]: https://nodef.github.io/extra-function/modules.html#isAsync
[isGenerator]: https://nodef.github.io/extra-function/modules.html#isGenerator
[signature]: https://nodef.github.io/extra-function/modules.html#signature
[name]: https://nodef.github.io/extra-function/modules.html#name
[parameters]: https://nodef.github.io/extra-function/modules.html#parameters
[arity]: https://nodef.github.io/extra-function/modules.html#arity
[bind]: https://nodef.github.io/extra-function/modules.html#bind
[negate]: https://nodef.github.io/extra-function/modules.html#negate
[memoize]: https://nodef.github.io/extra-function/modules.html#memoize
[reverse]: https://nodef.github.io/extra-function/modules.html#reverse
[spread]: https://nodef.github.io/extra-function/modules.html#spread
[unspread]: https://nodef.github.io/extra-function/modules.html#unspread
[wrap]: https://nodef.github.io/extra-function/modules.html#wrap
[unwrap]: https://nodef.github.io/extra-function/modules.html#unwrap
[compose]: https://nodef.github.io/extra-function/modules.html#compose
[composeRight]: https://nodef.github.io/extra-function/modules.html#composeRight
[curry]: https://nodef.github.io/extra-function/modules.html#curry
[curryRight]: https://nodef.github.io/extra-function/modules.html#curryRight
[delay]: https://nodef.github.io/extra-function/modules.html#delay
[limitUse]: https://nodef.github.io/extra-function/modules.html#limitUse
[debounce]: https://nodef.github.io/extra-function/modules.html#debounce
[debounceEarly]: https://nodef.github.io/extra-function/modules.html#debounceEarly
[throttle]: https://nodef.github.io/extra-function/modules.html#throttle
[throttleEarly]: https://nodef.github.io/extra-function/modules.html#throttleEarly
