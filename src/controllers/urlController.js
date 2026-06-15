const crypto = require("crypto");
const Url = require("../models/Url");

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const generateShortCode = () => {
    return crypto.randomBytes(4).toString("hex");
};

const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required",
            });
        }

        if (!isValidUrl(url)) {
            return res.status(400).json({
                message: "Please provide a valid URL",
            });
        }

        let shortCode = generateShortCode();

        while (await Url.findOne({ shortCode })) {
            shortCode = generateShortCode();
        }

        const newUrl = await Url.create({
            url,
            shortCode,
        });

        res.status(201).json(newUrl);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

const getOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const urlData = await Url.findOneAndUpdate(
            { shortCode },
            { $inc: { accessCount: 1 } },
            { new: true }
        );

        if (!urlData) {
            return res.status(404).json({
                message: "Short URL not found",
            });
        }

        res.status(200).json(urlData);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = {
    createShortUrl,
    getOriginalUrl,
};