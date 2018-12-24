const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url);
    const file = await page.screenshot();
    await browser.close();
    return file;
}

module.exports = { getScreenshot };