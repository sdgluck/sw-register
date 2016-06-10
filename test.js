var test = require('tape')
var sinon = require('sinon')

var navigator = {
  serviceWorker: {
    register: function () {}
  }
}

test('register typeof function', function (t) {
  t.equal(typeof register, 'function')
  t.end()
})

test('no args gets existing controller', function (t) {
  t.end()
})

test('with options registers new worker', function (t) {
  var sw = sinon.spy(navigator.serviceWorker, 'register')

  var registration = {
    url: 'url',
    scope: 'scope',
    forceUpdate: false
  }

  register().then(function () {
    t.equal(true, navigator.serviceWorker.register.calledWith({
      url: 'url',
      scope: 'scope',
      forceUpdate: false
    }))
    navigator.serviceWorker.restore()
    t.end()
  })
})
