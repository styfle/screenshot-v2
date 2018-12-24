const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    const res = await page.goto(url);
    const filePath = await page.screenshot();
    console.log(filePath);
    return filePath;
}

module.exports = { getScreenshot };