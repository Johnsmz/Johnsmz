const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 800;
http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname == "/") {
        pathname = "/index.html"
    }
    console.log("Request for " + pathname + " received.");
    var mimeType = getMimeType(pathname);
    if (mimeType) {
        response.writeHead(200, {
            'Content-Type': mimeType
        });
    } else {
        response.writeHead(404, {
            'Content-Type': 'text/html'
        });
        response.end('File not found.');
        return;
    }
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            response.end();
        } else {
            response.write(data);
            response.end();
        }
    });
}).listen(port);

function getMimeType(pathname) {
    var extension = pathname.substr(pathname.lastIndexOf('.') + 1);
    var mimeTypes = {
        'js': 'text/javascript',
        'css': 'text/css',
        'html': 'text/html',
        'jpg': 'img/jpeg',
        'png': 'img/png',
        'gif': 'img/gif',
    };
    return mimeTypes[extension];
}

console.log(`Server running at http://0.0.0.0:${port}/`);