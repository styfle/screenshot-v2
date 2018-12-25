const { URL } = require('url');

function getUrlFromPath(pathname) {
    let url = pathname.slice(1);
    if (!url.startsWith('http')) {
        return 'https://' + url;
    }
    return url;
}

function isValidUrl(href) {
    try {
        const url = new URL(href);
        return url.hostname.includes('.');
    } catch(e) {
        console.error(e.message);
        return false;
    }
}

module.exports = { isValidUrl, getUrlFromPath };