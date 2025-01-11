//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(req, res) {
    var url_parts = url.parse(req.url);
    var path = url_parts.pathname;
    var query = url_parts.query;
    var queryObject = querystring.parse(query);

    if (path == '/comments' && req.method == 'POST') {
        console.log('POST');
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var POST = querystring.parse(body);
            console.log(POST);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Data received\n');
        });
    } else if (path == '/comments' && req.method == 'GET') {
        console.log('GET');
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('GET\n');
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('Page not found\n');
    }
}).listen(8080, '