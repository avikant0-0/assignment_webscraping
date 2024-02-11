const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
app.get("/fetchalldata", async (req, res) => {
  const codename = ["BANKNIFTY", "CNXIT", "NSE Index", "CNXAUTO", "CNXPHARMA"];
  console.log("Started fetching data");
  try {
    const html = await axios.get(
      "https://economictimes.indiatimes.com/markets/live-coverage?from=mdr"
    );

    let $ = cheerio.load(html.data);

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
      let value = $(".listTable.indicesTable  tbody tr  td.w100");

      const IndexName = $(indexName[i]).text();
      const PercentageChange = $(percentChange[j]).text();
      const AdvancedProgress_high = $(advProgress_hightxt[i]).text();
      const AdvancedProgress_low = $(advProgress_lowtxt[i]).text();
      const Imageurl = `https://marketcharts.indiatimes.com/sparkline?symbol=${codename[i]}&exchange=NSE&entity=index&width=90&height=40&chartmode=intraday`;
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
