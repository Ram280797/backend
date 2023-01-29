var express = require("express");
const { closeConnection, connectDb } = require("../../config");
const { authenticate } = require("../../lib/authorize");
const { mongodb } = require("mongodb");
var router = express.Router();

/* GET home page. */

router.post("/create", authenticate, async function (req, res, next) {
  try {
    const db = await connectDb();
    await db.collection("theater").insertOne(req.body);
    await closeConnection();
    res.json({ message: "Theater Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/movies/:rId", authenticate, async function (req, res, next) {
  try {
    const db = await connectDb();
    // const theater = await db
    //   .collection("theater")
    //   .findOne({ _id: mongodb.ObjectId(req.params.rId) });
    // if (theater) {
    //   console.log(theater);
    // }
    await db
      .collection("movies")
      .insertOne({ rId: mongodb.ObjectId(req.params.rId),...req.body });
    await closeConnection();
    res.json({ message: "movie Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
