# strfnr

Painless string find and replace. Find search patterns in a string and:
* replace it
* remove it
* add text before it
* add text after it
* find its character offset within the string

## When should you use this?
JavaScript developers have a tendency to reinvent the wheel. strfnr should only used
when you want to find and replace:

* using **multiple** criteria
* **one pattern**, or fall back to **another pattern** if the first does nothing

You should NOT use strfnr if:
* you want to replace only one string (use [`String.prototype.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) instead)
* you want to replace **different search patterns** with **different replacement patterns**

## Installation
This package works with bost CommonJS and ESM projects. No need to worry about pesky
module errors!

```bash
npm install strfnr
```

TypeScript types are bundled with the package.

## Usage
To match the first occurrence of a search pattern, use `stringMatch`.
```js
import { stringMatch } from 'strfnr';
// Or for CommonJS,
// const { stringMatch } = require('strfnr');

const str = 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?';
const match = stringMatch(str, 'wood');
```

To match all occurrences of a search pattern, use `stringMatches`.
```js
import { stringMatches } from 'strfnr';
// Or for CommonJS,
// const { stringMatches } = require('strfnr');

const str = 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?';
const matches = stringMatches(str, 'wood');
```

You can then:
* `remove(): this` – Remove that occurrence of the string
* `replace( text: string ): this` – Replace that occurrence of the string with a new string
* `before( text: string ): this` – Prepend the matched string(s) with a new string
* `after(): this` – Append the matched string(s) with a new string
* `final(): string` – Get the final string. Equal to `toString()`.

All functions except `final()` (and `toString()`) return the match object, so you can
chain complex actions, such as appending *and* prepending text, in one statement.

### Example
Picking up from the above:

```js
console.log(matches.replace("cat").final());
// How much cat would a catchuck chuck if a catchuck could chuck cat?

// Direct-to-string conversion also works.
console.log(`${matches.after("dog")}`);
// How much catdog would a catdogchuck chuck if a catdogchuck could chuck catdog?

console.log(`${matches.before("mouse")}`);
// How much mousecatdog would a mousecatdogchuck chuck if a mousecatdogchuck could chuck mousecatdog?

console.log(`${matches.remove()}`);
// How much mousedog would a mousedogchuck chuck if a mousedogchuck could chuck mousedog?
// Note how anything added by `before` or `after` is not removed.
```

### Offsets
You can get the offsets using `match.offset`. For single matches, this will return a single
offset. For multiple matches, this will return an array of offsets. Each offset has the
following properties:
* `start: number` – The character offset of the start of the match
* `end: number` – The character offset of the end of the match
* `filter: string | RegExp | RegExpLike` – The search pattern that matched that offset

```js
import { stringMatches } from 'strfnr';

const str = "The sixth sick sheik's sixth sick sheep";
const matches = stringMatches(str, 'sixth');

console.log(matches.offset);
// [
//    { start: 4, end: 9, filter: 'sixth' },
//    { start: 23, end: 28, filter: 'sixth' }
// ]
```

Any modification done with the functions defined above will accordingly update the
offsets.

### RegExpLike
RegExpLike refers to any object with a `source` and, if applicable, `flags` property.
This is useful when you want to use a filter that comes from a JSON object or other
serialized format.

### Edge cases
Invalid filters get skipped. Zero-matches can occur if this is the case. Zero matches
have an `offset` of `null` (for single matches) or `[]` (for multiple matches).
Attempting to mutate it with any function does nothing. The string will remain
unmodified.

Passing anything that isn't a string as the first variable will return `null`.
Unlike the case where the filters are invalid, this will cause access attempts
(i.e. `match.replace()`) to throw errors.

## Development
Just clone, install packages, and test away.
```bash
git clone https://github.com/ChlodAlejandro/strfnr.git
npm i
```

GitHub Actions will test every pull request and master branch commit. Any coverage less
than 100% will cause a status check error.

## License
[3-Clause BSD License](https://opensource.org/license/bsd-3-clause/).
