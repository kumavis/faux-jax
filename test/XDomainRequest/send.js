var test = require('tape');
var XDomainRequest = require('../../lib/XDomainRequest/');

test('xdr.send() throws when body is not a string', function(t) {
  var xdr = new XDomainRequest();

  xdr.open('POST', '/');
  t.throws(xdr.send.bind(xdr, 9), Error, 'cannot set a body to non-string');
  t.end();
});

test('xdr.send() works with GET requests', function(t) {
  t.plan(2);
  var xdr = new XDomainRequest();

  xdr.onerror = function() {
    t.fail('should not receive an error event');
  };

  xdr.open('GET', '/');
  xdr.send();
  t.equal(xdr.requestBody, null, 'No requestBody set');
  t.equal(xdr.responseText, '', 'responseText is empty');
});

test('xdr.send() cannot set a body when using GET requests', function(t) {
  t.plan(3);
  var xdr = new XDomainRequest();

  xdr.onerror = function() {
    t.pass('received an error event');
  };

  xdr.open('GET', '/');
  xdr.send('WOO!');
  t.equal(xdr.requestBody, null, 'No requestBody not set');
  t.equal(xdr.responseText, '', 'responseText is empty');
});

test('xdr.send() works with POST requests, without a body', function(t) {
  t.plan(2);
  var xdr = new XDomainRequest();

  xdr.onerror = function() {
    t.fail('should not receive an error event');
  };

  xdr.open('POST', '/');
  xdr.send();
  t.equal(xdr.requestBody, null, 'requestBody not set');
  t.equal(xdr.responseText, '', 'responseText is empty');
});

test('xdr.send() works with POST requests, with a body', function(t) {
  t.plan(2);
  var xdr = new XDomainRequest();

  xdr.onerror = function() {
    t.fail('should not receive an error event');
  };

  xdr.open('POST', '/');
  xdr.send('WOO!');
  t.equal(xdr.requestBody, 'WOO!', 'requestBody matches');
  t.equal(xdr.responseText, '', 'responseText is empty');
});