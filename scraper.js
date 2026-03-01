const { chromium } = require('playwright');

const seeds =  [48,49,50,51,52,53,54,55,56,57];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    await page.goto(url);

    // Wait for table
    await page.waitForSelector("#table td");

    const numbers = await page.$$eval("#table td", cells =>
      cells.map(c => parseInt(c.textContent.trim(), 10))
           .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a,b) => a + b, 0);

    console.log(`Seed ${seed} count:`, numbers.length);
    console.log(`Seed ${seed} sum:`, pageSum);

    grandTotal += pageSum;
  }

  await browser.close();
console.log('24f2007364@ds.study.iitm.ac.in ')
  // IMPORTANT: Only number for grader
  console.log(grandTotal);
})();
