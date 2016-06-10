# sw-register

> Service Worker registration utility


Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/sw-register"><img alt="npm version" src="https://badge.fury.io/js/sw-register.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Register or retrieve a Service Worker that controls the page.

`sw-register` will always favour returning the active Service Worker over registering a new one.

## Import

```js
// ES6
import register from 'sw-register'

// CommonJS
var register = require('sw-register')

// RequireJS
define(['sw-register'], function (register) {/*...*/})
```

```html
<!-- Script, available as `window.swRegister` -->
<script src="/node_modules/sw-register/index.js"></script>
```

## Register

```js
const register = require('sw-register')

// Get existing worker
register().then((worker) => {
  const channel = new MessageChannel()
  worker.postMessage("Hey!", [channel.ports2])
})

// Register a worker from the client
// Worker scope depends on worker location/headers
// Read the Service Worker docs for more details
const registration = {
  url: '/sw.js',
  scope: '/'
}

register(registration).then((worker) => {
  const channel = new MessageChannel()
  worker.postMessage("Hey!", [channel.ports2])
})

// Catch registration error
register().catch((err) => {
  console.log(err.message)
})
```

## Usage

`register([options]) : Promise`

Register or retrieve a Service Worker.

- [__register__] {Object} Options object

Returns the Service Worker controller.

The options object should contain at least a `url`. All other available
options for registering a Service Worker can be passed in this object.

Example:

    register().then((worker) => {
      // do something with the worker
    }).catch((err) => {
      // you get here if:
      // - service workers unsupported
      // - no existing worker and no options given to register one
    })

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

## Author & License

`sw-register` was created by [Sam Gluck](https://twitter.com/sdgluck) and is released under the MIT license.
