const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();
const port = 3001;

connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World, Time to make an auth app");
});

app.use("/usr", userRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
