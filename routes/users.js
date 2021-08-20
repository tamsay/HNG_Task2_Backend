var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond wewew22 a reeeeser");
});

module.exports = router;
