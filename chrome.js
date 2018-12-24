const { Chromeless } = require('chromeless');

async function getScreenshot(url) {
    const chromeless = new Chromeless();
    const filePath = await chromeless.goto(url).screenshot();
    console.log(filePath);
    await chromeless.end();
    return filePath;
}

module.exports = { getScreenshot };