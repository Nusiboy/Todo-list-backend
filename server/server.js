const express = require("express");
const app = express();
const mongoose = require("mongoose");
const doRoutes = require("./routes/doRoute");
const userRoutes = require("./routes/userRoute");
const PORT = 3005;
const cors = require("cors");
require("dotenv").config();

mongoose
.connect(
  "mongodb+srv://shahar:1234@cluster0d.r9tiokt.mongodb.net/?retryWrites=true&w=majority")
  
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err.message);
  });
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use(express.json());
  app.use("/todos", doRoutes);
  app.use("/users", userRoutes);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  