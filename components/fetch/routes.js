const express = require("express");
const router = express.Router();
const eastbay = require("./eastbay");
const footlocker = require("./footlocker");

/* GET eastbay - products. */
router.get("/eastbay/products/list", async (req, res, next) => {
  const contextObject = {};
  try {
    const result = await eastbay.geProductsList(contextObject);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/footlocker/products/list", async (req, res, next) => {
  const contextObject = {};
  try {
    const result = await footlocker.geProductsList(contextObject);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
