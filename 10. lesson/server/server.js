const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan"); //logging, monitoring - winston
const dotenv = require("dotenv");
dotenv.config();

const productRoutes = require("./src/routes/productRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");

const apiKeyMiddleware = require("./src/middleware/apiKeyMiddleware.js");
const { startDatabase } = require("./src/config/database.js");
const { cookie } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for now, configure later
  crossOriginEmbedderPolicy: false, // Disable for now, can enable for cross-origin resources
  frameguard: { action: "deny" }, // Prevent clickjacking by denying embedding of the app
  xssFilter: true, // Enable XSS filter to block basic XSS attacks
  hidePoweredBy: true, // Remove the X-Powered-By header to prevent revealing stack info
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // Limit information sent in HTTP referrer
}));

app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, //max-request - 100
});
app.use(limiter);

// API Key Middleware (custom)
app.use(apiKeyMiddleware);

const startServer = async () => {
  try {
    await startDatabase(); // Ensure DB is connected before starting the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit if database connection fails
  }
};

startServer();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Base endpoint
app.get("/api", (_, response) => {
  response.send("Welcome to our API!");
});
