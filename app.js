const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();
const port = 3001;

connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// User related routes
app.use("/usr", userRoutes);
app.use("/prod", productRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
