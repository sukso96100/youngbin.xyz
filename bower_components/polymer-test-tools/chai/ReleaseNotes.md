# Release Notes

## 1.9.1 / 2014-03-19 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - Migrate configuration options to new interface. (see notes)
- **Plugin Developers:** 
  - No changes required
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated dependencies. 

### Configuration

There have been requests for changes and additions to the configuration mechanisms
and their impact in the Chai architecture. As such, we have decoupled the 
configuration from the `Assertion` constructor. This not only allows for centralized
configuration, but will allow us to shift the responsibility from the `Assertion` 
constructor to the `assert` interface in future releases.

These changes have been implemented in a non-breaking way, but a depretiation
warning will be presented to users until they migrate. The old config method will 
be removed in either `v1.11.0` or `v2.0.0`, whichever comes first.

#### Quick Migration

```js
// change this:
chai.Assertion.includeStack = true;
chai.Assertion.showDiff = false;

// ... to this:
chai.config.includeStack = true;
chai.config.showDiff = false;
```

#### All Config Options

##### config.includeStack

- **@param** _{Boolean}_
- **@default** `false`

User configurable property, influences whether stack trace is included in 
Assertion error message. Default of `false` suppresses stack trace in the error 
message.

##### config.showDiff

- **@param** _{Boolean}_
- **@default** `true`

User configurable property, influences whether or not the `showDiff` flag 
should be included in the thrown AssertionErrors. `false` will always be `false`; 
`true` will be true when the assertion has requested a diff be shown.

##### config.truncateThreshold **(NEW)**

- **@param** _{Number}_
- **@default** `40`

User configurable property, sets length threshold for actual and expected values 
in assertion errors. If this threshold is exceeded, the value is truncated.

Set it to zero if you want to disable truncating altogether.

```js
chai.config.truncateThreshold = 0; // disable truncating
```

### Community Contributions

- [#228](http://github.com/chaijs/chai/pull/228) Deep equality check for memebers. [@duncanbeevers](http://github.com/duncanbeevers)
- [#247](http://github.com/chaijs/chai/pull/247) Proofreading. [@didorellano](http://github.com/didoarellano)
- [#244](http://github.com/chaijs/chai/pull/244) Fix `contain`/`include` 1.9.0 regression. [@leider](http://github.com/leider)
- [#233](http://github.com/chaijs/chai/pull/233) Improvements to `ssfi` for `assert` interface. [@refack](http://github.com/refack)
- [#251](http://github.com/chaijs/chai/pull/251) New config option: object display threshold. [@romario333](http://github.com/romario333)

Thank you to all who took time to contribute!

### Other Bug Fixes

- [#183](http://github.com/chaijs/chai/issues/183) Allow `undefined` for actual. (internal api)
- Update Karam(+plugins)/Istanbul to most recent versions.

## 1.9.0 / 2014-01-29 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required
- **Plugin Developers:** 
  - Review [#219](http://github.com/chaijs/chai/pull/219).
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated dependencies. 

### Community Contributions

- [#202](http://github.com/chaijs/chai/pull/201) Improve error message for .throw(). [@andreineculau](http://github.com/andreineculau)
- [#217](http://github.com/chaijs/chai/pull/217) Chai tests can be run with `--watch`. [@demands](http://github.com/demands)
- [#219](http://github.com/chaijs/chai/pull/219) Add overwriteChainableMethod utility. [@demands](http://github.com/demands)
- [#224](http://github.com/chaijs/chai/pull/224) Return error on throw method to chain on error properties. [@vbardales](http://github.com/vbardales)
- [#226](http://github.com/chaijs/chai/pull/226) Add `has` to language chains. [@duncanbeevers](http://github.com/duncanbeevers)
- [#230](http://github.com/chaijs/chai/pull/230) Support `{a:1,b:2}.should.include({a:1})` [@jkroso](http://github.com/jkroso)
- [#231](http://github.com/chaijs/chai/pull/231) Update Copyright notices to 2014 [@duncanbeevers](http://github.com/duncanbeevers)
- [#232](http://github.com/chaijs/chai/pull/232) Avoid error instantiation if possible on assert.throws. [@laconbass](http://github.com/laconbass)

Thank you to all who took time to contribute!

### Other Bug Fixes

- [#225](http://github.com/chaijs/chai/pull/225) Improved AMD wrapper provided by upstream `component(1)`.
- [#185](http://github.com/chaijs/chai/issues/185) `assert.throws()` returns thrown error for further assertions.
- [#237](http://github.com/chaijs/chai/pull/237) Remove coveralls/jscoverage, include istanbul coverage report in travis test.
- Update Karma and Sauce runner versions for consistent CI results. No more karma@canary.

## 1.8.1 / 2013-10-10 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - Refresh `node_modules` folder for updated dependencies. 
- **Plugin Developers:** 
  - No changes required
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated dependencies. 

### Browserify

This is a small patch that updates the dependency tree so browserify users can install
chai. (Remove conditional requires)

## 1.8.0 / 2013-09-18 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - See `deep.equal` notes.
- **Plugin Developers:** 
  - No changes required
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated dependencies. 

### Deep Equals

This version of Chai focused on a overhaul to the deep equal utility. The code for this
tool has been removed from the core lib and can now be found at: 
[chai / deep-eql](http://github.com/chaijs/deep-eql). As stated in previous releases,
this is part of a larger initiative to provide transparency, independent testing, and coverage for
some of the more complicated internal tools. 

For the most part `.deep.equal` will behave the same as it has. However, in order to provide a 
consistent ruleset across all types being tested, the following changes have been made and _might_
require changes to your tests.

**1.** Strict equality for non-traversable nodes according to [egal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).

_Previously:_ Non-traversable equal via `===`.

```js
expect(NaN).to.deep.equal(NaN);
expect(-0).to.not.deep.equal(+0);
```

**2.** Arguments are not Arrays (and all types must be equal):

_Previously:_ Some crazy nonsense that led to empty arrays deep equaling empty objects deep equaling dates.

```js
expect(arguments).to.not.deep.equal([]);
expect(Array.prototype.slice.call(arguments)).to.deep.equal([]);
```

- [#156](http://github.com/chaijs/chai/issues/156) Empty object is eql to empty array
- [#192](http://github.com/chaijs/chai/issues/192) empty object is eql to a Date object
- [#194](http://github.com/chaijs/chai/issues/194) refactor deep-equal utility

### CI and Browser Testing

Chai now runs the browser CI suite using [Karma](http://karma-runner.github.io/) directed at 
[SauceLabs](http://saucelabs.com/). This means we get to know where our browser support stands...
and we get a cool badge:

[![Selenium Test Status](http://saucelabs.com/browser-matrix/logicalparadox.svg)](http://saucelabs.com/u/logicalparadox)

Look for the list of browsers/versions to expand over the coming releases.

- [#195](http://github.com/chaijs/chai/issues/195) karma test framework

## 1.7.2 / 2013-06-27 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:** 
  - No changes required
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated dependencies. 

### Coverage Reporting

Coverage reporting has always been available for core-developers but the data has never been published
for our end users. In our ongoing effort to improve accountability this data will now be published via
the [coveralls.io](http://coveralls.io/) service. A badge has been added to the README and the full report
can be viewed online at the [chai coveralls project](http://coveralls.io/r/chaijs/chai). Furthermore, PRs 
will receive automated messages indicating how their PR impacts test coverage. This service is tied to TravisCI.

### Other Fixes

- [#175](http://github.com/chaijs/chai/issues/175) Add `bower.json`. (Fix ignore all)

## 1.7.1 / 2013-06-24 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:** 
  - No changes required
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated dependencies. 

### Official Bower Support

Support has been added for the Bower Package Manager ([bower.io])(http://bower.io/). Though
Chai could be installed via Bower in the past, this update adds official support via the `bower.json`
specification file. 

- [#175](http://github.com/chaijs/chai/issues/175) Add `bower.json`.

## 1.7.0 / 2013-06-17 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:** 
  - Review AssertionError update notice.
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated dependencies. 

### AssertionError Update Notice

Chai now uses [chaijs/assertion-error](http://github.com/chaijs/assertion-error) instead an internal
constructor. This will allow for further iteration/experimentation of the AssertionError constructor 
independant of Chai. Future plans include stack parsing for callsite support. 

This update constructor has a different constructor param signature that conforms more with the standard
`Error` object. If your plugin throws and `AssertionError` directly you will need to update your plugin 
with the new signature.

```js
var AssertionError = require('chai').AssertionError;

/**
 * previous
 *
 * @param {Object} options
 */

throw new AssertionError({
    message: 'An assertion error occurred'
  , actual: actual
  , expect: expect
  , startStackFunction: arguments.callee
  , showStack: true
});

/**
 * new
 *
 * @param {String} message
 * @param {Object} options
 * @param {Function} start stack function
 */

throw new AssertionError('An assertion error occurred', {
    actual: actual
  , expect: expect
  , showStack: true
}, arguments.callee);

// other signatures
throw new AssertionError('An assertion error occurred');
throw new AssertionError('An assertion error occurred', null, arguments.callee);
```

#### External Dependencies

This is the first non-developement dependency for Chai. As Chai continues to evolve we will begin adding
more; the next will likely be improved type detection and deep equality. With Chai's userbase continually growing
there is an higher need for accountability and documentation. External dependencies will allow us to iterate and
test on features independent from our interfaces. 

Note: The browser packaged version `chai.js` will ALWAYS contain all dependencies needed to run Chai.

### Community Contributions

- [#169](http://github.com/chaijs/chai/pull/169) Fix deep equal comparison for Date/Regexp types. [@katsgeorgeek](http://github.com/katsgeorgeek)
- [#171](http://github.com/chaijs/chai/pull/171) Add `assert.notOk()`. [@Bartvds](http://github.com/Bartvds)
- [#173](http://github.com/chaijs/chai/pull/173) Fix `inspect` utility. [@domenic](http://github.com/domenic)

Thank you to all who took the time to contribute!

## 1.6.1 / 2013-06-05 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:** 
  - No changes required.
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated developement dependencies. 

### Deep Equality

Regular Expressions are now tested as part of all deep equality assertions. In previous versions
they silently passed for all scenarios. Thanks to [@katsgeorgeek](http://github.com/katsgeorgeek) for the contribution.

### Community Contributions

- [#161](http://github.com/chaijs/chai/pull/161) Fix documented name for assert interface's isDefined method. [@brandonpayton](http://github.com/brandonpayton)
- [#168](http://github.com/chaijs/chai/pull/168) Fix comparison equality of two regexps for when using deep equality. [@katsgeorgeek](http://github.com/katsgeorgeek)

Thank you to all who took the time to contribute!

### Additional Notes

- Mocha has been locked at version `1.8.x` to ensure `mocha-phantomjs` compatibility.

## 1.6.0 / 2013-04-29 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:** 
  - No changes required.
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated developement dependencies. 

### New Assertions

#### Array Members Inclusion

Asserts that the target is a superset of `set`, or that the target and `set` have the same members.
Order is not taken into account. Thanks to [@NickHeiner](http://github.com/NickHeiner) for the contribution.

```js
// (expect/should) full set
expect([4, 2]).to.have.members([2, 4]);
expect([5, 2]).to.not.have.members([5, 2, 1]);

// (expect/should) inclusion
expect([1, 2, 3]).to.include.members([3, 2]);
expect([1, 2, 3]).to.not.include.members([3, 2, 8]);

// (assert) full set
assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');

// (assert) inclusion 
assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');

```

#### Non-inclusion for Assert Interface

Most `assert` functions have a negative version, like `instanceOf()` has a corresponding `notInstaceOf()`. 
However `include()` did not have a corresponding `notInclude()`. This has been added.

```js
assert.notInclude([ 1, 2, 3 ], 8);
assert.notInclude('foobar', 'baz');
```

### Community Contributions

- [#140](http://github.com/chaijs/chai/pull/140) Restore `call`/`apply` methods for plugin interface. [@RubenVerborgh](http://github.com/RubenVerborgh)
- [#148](http://github.com/chaijs/chai/issues/148)/[#153](http://github.com/chaijs/chai/pull/153) Add `members` and `include.members` assertions. [#NickHeiner](http://github.com/NickHeiner)

Thank you to all who took time to contribute!

### Other Bug Fixes

- [#142](http://github.com/chaijs/chai/issues/142) `assert#include` will no longer silently pass on wrong-type haystack.
- [#158](http://github.com/chaijs/chai/issues/158) `assert#notInclude` has been added.
- Travis-CI now tests Node.js `v0.10.x`. Support for `v0.6.x` has been removed. `v0.8.x` is still tested as before.

## 1.5.0 / 2013-02-03 

### Migration Requirements

The following changes are required if you are upgrading from the previous version:

- **Users:** 
  - _Update [2013-02-04]:_ Some users may notice a small subset of deep equality assertions will no longer pass. This is the result of 
  [#120](http://github.com/chaijs/chai/issues/120), an improvement to our deep equality algorithm. Users will need to revise their assertions
  to be more granular should this occur. Further information: [#139](http://github.com/chaijs/chai/issues/139).
- **Plugin Developers:** 
  - No changes required.
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated developement dependencies.

### Community Contributions

- [#126](http://github.com/chaijs/chai/pull/126): Add `eqls` alias for `eql`. [@RubenVerborgh](http://github.com/RubenVerborgh)
- [#127](http://github.com/chaijs/chai/issues/127): Performance refactor for chainable methods. [@RubenVerborgh](http://github.com/RubenVerborgh)
- [#133](http://github.com/chaijs/chai/pull/133): Assertion `.throw` support for primitives. [@RubenVerborgh](http://github.com/RubenVerborgh)
- [#137](http://github.com/chaijs/chai/issues/137): Assertion `.throw` support for empty messages. [@timnew](http://github.com/timnew)
- [#136](http://github.com/chaijs/chai/pull/136): Fix backward negation messages when using `.above()` and `.below()`. [@whatthejeff](http://github.com/whatthejeff)

Thank you to all who took time to contribute!

### Other Bug Fixes

- Improve type detection of `.a()`/`.an()` to work in cross-browser scenarios.
- [#116](http://github.com/chaijs/chai/issues/116): `.throw()` has cleaner display of errors when WebKit browsers.
- [#120](http://github.com/chaijs/chai/issues/120): `.eql()` now works to compare dom nodes in browsers.


### Usage Updates

#### For Users

**1. Component Support:** Chai now included the proper configuration to be installed as a 
[component](http://github.com/component/component). Component users are encouraged to consult
[chaijs.com](http://chaijs.com) for the latest version number as using the master branch
does not gaurantee stability. 

```js
// relevant component.json
  devDependencies: {
    "chaijs/chai": "1.5.0"
  }
```

Alternatively, bleeding-edge is available:

    $ component install chaijs/chai

**2. Configurable showDiff:** Some test runners (such as [mocha](http://visionmedia.github.com/mocha/)) 
include support for showing the diff of strings and objects when an equality error occurs. Chai has 
already included support for this, however some users may not prefer this display behavior. To revert to 
no diff display, the following configuration is available:

```js
chai.Assertion.showDiff = false; // diff output disabled
chai.Assertion.showDiff = true; // default, diff output enabled
```

#### For Plugin Developers

**1. New Utility - type**: The new utility `.type()` is available as a better implementation of `typeof` 
that can be used cross-browser. It handles the inconsistencies of Array, `null`, and `undefined` detection.

- **@param** _{Mixed}_ object to detect type of
- **@return** _{String}_ object type

```js
chai.use(function (c, utils) {
  // some examples
  utils.type({}); // 'object'
  utils.type(null); // `null'
  utils.type(undefined); // `undefined`
  utils.type([]); // `array`
});
```

#### For Core Contributors

**1. Browser Testing**: Browser testing of the `./chai.js` file is now available in the command line 
via PhantomJS. `make test` and Travis-CI will now also rebuild and test `./chai.js`. Consequently, all 
pull requests will now be browser tested in this way. 

_Note: Contributors opening pull requests should still NOT include the browser build._

**2. SauceLabs Testing**: Early SauceLab support has been enabled with the file `./support/mocha-cloud.js`.
Those interested in trying it out should create a free [Open Sauce](http://saucelabs.com/signup/plan) account
and include their credentials in `./test/auth/sauce.json`.
