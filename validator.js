function isValidUrl(str) {
    try {
        const url = new URL(str);
        return url.hostname.includes('.');
    } catch(e) {
        return false;
    }
}

module.exports = { isValidUrl };