const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRouter = require("./routes/apiRoutes");
const authController = require("./controllers/auth/authController");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use the PORT variable from .env or default to 3000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// api route
app.post("/signin", authController.login);
app.use("/api", apiRouter);
app.use((req, res) => {
  return res.send("route note found");
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
