const express = require("express");
const moment = require("moment");
// const moment = require("moment");
const router = express.Router();
const CoinSchema = require("../models/coin");

// module.exports = router.get("/", async (req, res, next) => {
//   try {
//     const coins = await CoinSchema.find();
//     res.json(coins);
//   } catch (err) {
//     res.send("Err" + err);
//   }
// });

// module.exports = router.post("/", async (req, res) => {
//   const coins = new CoinSchema({
//     name: req.body.name,
//     buy: req.body.buy,
//   });

//   try {
//     const coinPost = await coins.save();
//     res.json(coinPost);
//   } catch (err) {
//     res.send("Error");
//   }
// });

module.exports = router.get("/:name", async (req, res) => {
  const coinName = { buy: [], time: [] };
  //   console.log(coinName);
  try {
    const coins = await CoinSchema.find({ name: req.params.name })
      .sort({ time: 1 })
      .limit(1440);
    // for (let i of coins) {
    //   if (i["name"] === req.params.name) {
    //     coinName.push(i);
    //
    //   //   console.log(coinName);
    // }
    coins.forEach((item) => {
      // console.log(item);
      // coinName.push({ name: item.name, buy: item.buy, time: item.time });
      coinName["buy"].push(item.buy);
      coinName["time"].push(moment.utc(item.time).local().toString());
    });

    res.send(coinName);
    // console.log(coinName.buy.length);
  } catch (error) {
    console.log(error);
  }
});
