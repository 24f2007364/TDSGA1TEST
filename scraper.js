const { chromium } = require('playwright');

const seeds = [48,49,50,51,52,53,54,55,56,57];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/seed=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a,b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
