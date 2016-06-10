var test = require('tape')
var sinon = require('sinon')
var _register = require('./index')

var navigator = {
  serviceWorker: {
    controller: 'controller',
    register: function () {return Promise.resolve()}
  }
}

var register = function (arg) {
  return _register.call(_register, arg, navigator)
}

test('register typeof function', function (t) {
  t.equal(typeof register, 'function')
  t.end()
})

test('no args gets existing controller', function (t) {
  register().then(function (worker) {
    t.equal('controller', worker)
    t.end()
  })
})

test('no args no existing controller throws', function (t) {
  navigator.serviceWorker.controller = null
  register().catch(function (err) {
    t.equal(err.message, 'no active service worker or configuration passed to install one')
    t.end()
  })
})

test('with options registers new worker', function (t) {
  var spy = sinon.spy(navigator.serviceWorker, 'register')

  var registration = {
    url: 'url',
    scope: 'scope',
    forceUpdate: false
  }

  register(registration).then(function () {
    var calledWith = spy.calledWith('url', registration)
    navigator.serviceWorker.register.restore()
    t.equal(true, calledWith)
    t.end()
  })
})
