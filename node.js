// node.js
const express = require("express");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors"); // ✅ Import CORS

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for all routes
app.use(cors());

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

// Keep-alive (Render-safe)
const SELF_URL = process.env.RENDER_EXTERNAL_URL;
if (SELF_URL) {
  setInterval(async () => {
    try {
      await axios.get(SELF_URL);
      console.log("✅ External ping successful.");
    } catch {
      console.log("⚠️ Render blocks same-origin pings — safe to ignore.");
    }
  }, 600000); // every 10 minutes
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
