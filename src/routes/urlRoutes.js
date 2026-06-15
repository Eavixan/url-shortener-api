const express = require("express");
const {
  createShortUrl,
  getOriginalUrl,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shortCode", getOriginalUrl);

module.exports = router;