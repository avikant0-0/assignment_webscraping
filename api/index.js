const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
app.get("/fetchalldata", async (req, res) => {
  console.log("Started fetching data");
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://economictimes.indiatimes.com/markets/live-coverage"
    );
    // Scroll to the bottom of the page
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        let distance = 100;

        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    const html = await page.content();

    let $ = cheerio.load(html);

    let array = [];

    for (let i = 0, j = 1, k = 0; i < 5; i++, j += 2, k += 3) {
      let indexName = $(".listTable.indicesTable  tbody tr  .w175 h3 a");
      let percentChange = $(".listTable.indicesTable  tbody tr  td.green");
      let change = $(".listTable.indicesTable  tbody tr  td.w100.green");
      let advProgress_hightxt = $(
        ".listTable.indicesTable  tbody tr  td.adv_dec .high_txt"
      );
      let advProgress_lowtxt = $(
        ".listTable.indicesTable  tbody tr  td.adv_dec .low_txt"
      );
      let imgUrl = $(".listTable.indicesTable  tbody tr  td img");
      let value = $(".listTable.indicesTable  tbody tr  td.w100");

      // console.log("indexName:", $(indexName[i]).text());
      // console.log("percentageChange:", $(percentChange[j]).text());
      // console.log("advancedProgress_high:", $(advProgress_hightxt[i]).text());
      // console.log("advancedProgress_low:", $(advProgress_lowtxt[i]).text());
      // console.log("imageUrl:", $(imgUrl[i]).attr("src")); //Lazy Loading
      // console.log("value:", $(value[k]).text()); //Multiple of 3
      // console.log("change:", $(change[i]).text());

      const IndexName = $(indexName[i]).text();
      const PercentageChange = $(percentChange[j]).text();
      const AdvancedProgress_high = $(advProgress_hightxt[i]).text();
      const AdvancedProgress_low = $(advProgress_lowtxt[i]).text();
      const Imageurl = $(imgUrl[i]).attr("src");
      const Value = $(value[k]).text();
      const Change = $(change[i]).text();
      array.push([
        IndexName,
        Value,
        Change,
        PercentageChange,
        Imageurl,
        AdvancedProgress_high,
        AdvancedProgress_low,
      ]);
    }
    console.log(array);
    // return array;
    res.json(array);
  } catch (err) {
    console.log(err);
  }
});
