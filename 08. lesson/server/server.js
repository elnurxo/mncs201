const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const productRoutes = require("./src/routes/productRoutes.js");
const apiKeyMiddleware = require("./src/middleware/apiKeyMiddleware.js");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// API Key Middleware
app.use(apiKeyMiddleware);

// Routes
app.use("/api", productRoutes);

// Base endpoint
app.get("/api", (_, response) => {
  response.send("Welcome to our API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
