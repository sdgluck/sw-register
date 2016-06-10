var test = require('tape')
var sinon = require('sinon')

var navigator = {
  serviceWorker: {
    controller: 'controller',
    register: function () {}
  }
}

var register = require('./index')

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

test('with options registers new worker', function (t) {
  var sw = sinon.spy(navigator.serviceWorker, 'register')

  var registration = {
    url: 'url',
    scope: 'scope',
    forceUpdate: false
  }

  register().then(function () {
    var calledWith = navigator.serviceWorker.register.calledWith({
      url: 'url',
      scope: 'scope',
      forceUpdate: false
    })
    t.equal(true, calledWith)
    navigator.serviceWorker.restore()
    t.end()
  })
})
