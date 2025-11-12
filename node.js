// node.js
const express = require("express");
const path = require("path");
const axios = require("axios");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve images folder
app.use("/images", express.static(path.join(__dirname, "images")));

// Serve the JSON file
app.get("/api/tshirts", (req, res) => {
  const filePath = path.join(__dirname, "tshirts.json");
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
  } else {
    res.status(404).json({ message: "tshirts.json not found" });
  }
});

// Simple home page
app.get("/", (req, res) => {
  res.send(`
    <h1>👕 Shreys T-Shirts API</h1>
    <p>Status: <b>Active</b></p>
    <p>➡️ <a href="/api/tshirts">View All Products</a></p>
  `);
});

// Keep-alive ping
const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
setInterval(async () => {
  try {
    await axios.get(SELF_URL);
    console.log("✅ Server pinged successfully to stay awake.");
  } catch (err) {
    console.log("⚠️ Ping failed, retrying...");
  }
}, 10000); // every 10 seconds

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
