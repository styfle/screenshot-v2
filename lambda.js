const { parse } = require('url');
const { getScreenshot } = require('./chrome');
const { isValidUrl } = require('./validator');

const examples = [
    '/google.com',
    '/zeit.co/blog?type=png',
    '/zeit.co/about?fullPage=true',
    '/ceriously.com?type=jpeg&quality=75&fullPage=true',
];

async function lambda(req, res) {
    let { httpVersion, method, url } = req;
    console.log(`${httpVersion} ${method} ${url}`);
    let { pathname = '/', query = {} } = parse(url || '', true);
    const { type='png', quality, fullPage=false } = query;
    if (pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>Screenshot as a service</h1>
        <p>Please provide a path to a website or choose one of the following:</p>
        <ul>
            ${examples.map(str => `<li><a href="${str}">${str}</a></li>`).join('\n')}
        </ul>
        `);
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
                const qual = /[0-9]+/.test(quality) ? parseInt(quality) : undefined;
                const file = await getScreenshot(url, type, qual, fullPage);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/' + type);
                res.end(file);
            }
        } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
            console.error(e.message);
        }
    }
};

module.exports = lambda;