const express = require("express");
const {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shortCode", getOriginalUrl);
router.put("/:shortCode", updateShortUrl);

module.exports = router;