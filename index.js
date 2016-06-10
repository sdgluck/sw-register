/* global Promise:false, define:false, module:false */

'use strict'

if (typeof define === 'function' && define.amd) {
  define('sw-register', function () {return register})
} else if (typeof module === 'object' && module.exports) {
  module.exports = register
} else {
  self.swRegister = register
}

function register (options, __mockNavigator) {
  if (__mockNavigator) {
    var self = { navigator: __mockNavigator }
    var navigator = self.navigator
  }

  try {self && self.navigator} catch (err) {
    return Promise.reject(new Error('Not a browser context'))
  }

  if (!('serviceWorker' in navigator)) {
    return Promise.reject(new Error('Service Workers unsupported'))
  }

  var serviceWorker = navigator.serviceWorker.controller

  return Promise.resolve()
    .then(function () {
      // Get existing service worker or get registration promise
      if (serviceWorker) return serviceWorker
      else if (!options) return navigator.serviceWorker.ready
    })
    .then(function (registration) {
      if (registration) {
        // Take this service worker that the registration returned
        serviceWorker = registration
      } else if (!registration && options) {
        // No registration but we have options to register one
        return navigator.serviceWorker
            .register(options.url, options)
            .then(function (registration) {
              options.forceUpdate && registration.update()
            })
      } else if (!registration && !options) {
        // No existing worker,
        // no registration that returned one,
        // no options to register one
        throw new Error(
          'no active service worker or configuration passed to install one'
        )
      }
    })
    .then(function () {
      return serviceWorker
    })
}
