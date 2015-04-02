var test = require('tape');

test('fauxJax intercepts http requests', function(t) {
  var fauxJax = require('../../');
  var http = require('http');

  fauxJax.install();

  fauxJax.once('request', function(req) {
    t.equal(req.requestURL, 'http://www.google.com/');
    t.deepEqual(req.requestHeaders, {
      connection: 'keep-alive',
      host: 'www.google.com'
    });
    t.equal(req.requestBody, null);
    t.equal(req.requestMethod, 'GET');
    req.respond(200, {
      XLOL: 'test'
    }, 'Hello! HTTP!');
  });

  http.request('http://www.google.com', function(res) {
    var chunks = [];
    res.on('data', function(chunk) {
      chunks.push(chunk);
    });

    res.on('end', function() {
      t.equal(res.statusCode, 200);
      t.equal(res.headers.xlol, 'test');
      t.equal(Buffer.concat(chunks).toString(), 'Hello! HTTP!');
      t.end();
    });
  }).end();
});
