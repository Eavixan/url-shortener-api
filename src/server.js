const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/shorten", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "Server is healthy",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});