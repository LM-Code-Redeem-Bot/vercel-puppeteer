const fs = require('fs');
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

(async () => {
  await fs.promises.mkdir('public', { recursive: true });
  await fs.promises.writeFile('public/index.html', '<img src="/image.png">');

  const browser = await puppeteer.launch(process.env.AWS_EXECUTION_ENV ? {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  } : {
    args: [],
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  page.goto('https://www.google.co.in/');
  await page.screenshot({ path: 'public/image.png' });
  await browser.close();
})();
