const { parse } = require('url');
const { getScreenshot } = require('./chrome');
const { getContent } = require('./file');
const { isValidUrl } = require('./validator');

async function lambda(req, res) {
    let { httpVersion, method, url } = req;
    console.log(`${httpVersion} ${method} ${url}`);
    let { pathname = '/', query = {} } = parse(url || '', true);
    if (pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Screenshot as a service</h1><p>Please provide a path to a website</p>');
    } else {
        try {
            let url = pathname.slice(1);
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
            if (!isValidUrl(url)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/html');
                res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);
            } else {
                const filePath = await getScreenshot(url);
                const content = await getContent(filePath);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/png');
                res.end(content);
            }
        } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
            console.error(e.message);
        }
    }
};

module.exports = { lambda };