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
manipulated with [reverse], [spread], [unspread]. [reverse] flips the order of
parameters, [spread] spreads the first array parameter of a function, and
[unspread] combines all parameters into the first parameter (array). If you want
some **functional** **behavior**, [compose], [composeRight], [curry], and
[curryRight] can be used. [composeRight] is also known as [pipe-forward
operator] or [function chaining]. If you are unfamiliar, [Haskell] is a great
purely functional language, and there is great [haskell beginner guide] to learn
from.

To control invocation **time** of a function, use [delay]. A function can be
**rate controlled** with [restrict], [debounce], [debounceEarly], [throttle],
[throttleEarly]. [debounce] and [debounceEarly] prevent the invocation of a
function during **hot** periods (when there are too many calls), and can be used
for example to issue AJAX request after user input has stopped (for certain
delay time). [throttle] and [throttleEarly] can be used to limit the rate of
invocation of a function, and can be used for example to minimize system usage
when a user is [constantly refreshing a webpage]. Except [restrict], all
*rate/time control* methods can be *flushed* (`flush()`) to invoke the target
function immediately, or *cleared* (`clear()`) to disable invocation of the
target function.

In addition, [is], [isAsync], [isGenerator], [name], and [length] obtain
metadata (about) information on a function. To attach a `this` to a function,
use [bind]. A few generic functions are also included: [ARGUMENTS], [NOOP],
[IDENTITY], [COMPARE].

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
| [name] | Get the name of a function. |
| [length] | Get the number of parameters of a function. |
|  |  |
| [bind] | Bind this-object, and optional prefix arguments to a function. |
|  |  |
| [call] | Invoke a function with specified this-object, and arguments provided individually. |
| [apply] | Invoke a function with specified this-object, and arguments provided as an array. |
|  |  |
| [is] | Check if value is a function. |
| [isAsync] | Check if value is an async function. |
| [isGenerator] | Check if value is a generator function. |
|  |  |
| [contextify] | Contextify a function by accepting the first parameter as this-object. |
| [decontextify] | Decontextify a function by accepting this-object as the first argument. |
|  |  |
| [negate] | Generate a result-negated version of a function. |
|  |  |
| [memoize] | Generate result-cached version of a function. |
|  |  |
| [reverse] | Generate a parameter-reversed version of a function. |
| [spread] | Generate a (first) parameter-spreaded version of a function. |
| [unspread] | Generate a (first) parameter-collapsed version of a function. |
| [attach] | Attach prefix arguments to leftmost parameters of a function. |
| [attachRight] | Attach suffix arguments to rightmost parameters of a function. |
|  |  |
| [compose] | Compose functions together, in applicative order. |
| [composeRight] | Compose functions together, such that result is piped forward. |
| [curry] | Generate curried version of a function. |
| [curryRight] | Generate right-curried version of a function. |
|  |  |
| [defer] | Generate deferred version of a function, that executes after the current stack has cleared. |
| [delay] | Generate delayed version of a function. |
|  |  |
| [restrict] | Generate restricted-use version of a function. |
| [restrictOnce] | Restrict a function to be used only once. |
| [restrictBefore] | Restrict a function to be used only upto a certain number of calls. |
| [restrictAfter] | Restrict a function to be used only after a certain number of calls. |
|  |  |
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
[![Coverage Status](https://coveralls.io/repos/github/nodef/extra-function/badge.svg?branch=master)](https://coveralls.io/github/nodef/extra-function?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4848d3e9557e4144c919/test_coverage)](https://codeclimate.com/github/nodef/extra-function/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/4848d3e9557e4144c919/maintainability)](https://codeclimate.com/github/nodef/extra-function/maintainability)


[ARGUMENTS]: https://nodef.github.io/extra-function/functions/ARGUMENTS.html
[NOOP]: https://nodef.github.io/extra-function/functions/NOOP.html
[IDENTITY]: https://nodef.github.io/extra-function/functions/IDENTITY.html
[COMPARE]: https://nodef.github.io/extra-function/functions/COMPARE.html
[is]: https://nodef.github.io/extra-function/functions/is.html
[isAsync]: https://nodef.github.io/extra-function/functions/isAsync.html
[isGenerator]: https://nodef.github.io/extra-function/functions/isGenerator.html
[name]: https://nodef.github.io/extra-function/functions/name.html
[bind]: https://nodef.github.io/extra-function/functions/bind.html
[negate]: https://nodef.github.io/extra-function/functions/negate.html
[memoize]: https://nodef.github.io/extra-function/functions/memoize.html
[reverse]: https://nodef.github.io/extra-function/functions/reverse.html
[spread]: https://nodef.github.io/extra-function/functions/spread.html
[unspread]: https://nodef.github.io/extra-function/functions/unspread.html
[compose]: https://nodef.github.io/extra-function/functions/compose.html
[composeRight]: https://nodef.github.io/extra-function/functions/composeRight.html
[curry]: https://nodef.github.io/extra-function/functions/curry.html
[curryRight]: https://nodef.github.io/extra-function/functions/curryRight.html
[delay]: https://nodef.github.io/extra-function/functions/delay.html
[debounce]: https://nodef.github.io/extra-function/functions/debounce.html
[debounceEarly]: https://nodef.github.io/extra-function/functions/debounceEarly.html
[throttle]: https://nodef.github.io/extra-function/functions/throttle.html
[throttleEarly]: https://nodef.github.io/extra-function/functions/throttleEarly.html
[restrict]: https://nodef.github.io/extra-function/functions/restrict.html
[length]: https://nodef.github.io/extra-function/functions/length.html
[call]: https://nodef.github.io/extra-function/functions/call.html
[apply]: https://nodef.github.io/extra-function/functions/apply.html
[contextify]: https://nodef.github.io/extra-function/functions/contextify.html
[decontextify]: https://nodef.github.io/extra-function/functions/decontextify.html
[attach]: https://nodef.github.io/extra-function/functions/attach.html
[attachRight]: https://nodef.github.io/extra-function/functions/attachRight.html
[defer]: https://nodef.github.io/extra-function/functions/defer.html
[restrictOnce]: https://nodef.github.io/extra-function/functions/restrictOnce.html
[restrictBefore]: https://nodef.github.io/extra-function/functions/restrictBefore.html
[restrictAfter]: https://nodef.github.io/extra-function/functions/restrictAfter.html
