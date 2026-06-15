const express = require("express");
const {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shortCode", getOriginalUrl);
router.put("/:shortCode", updateShortUrl);
router.delete("/:shortCode", deleteShortUrl);

module.exports = router;