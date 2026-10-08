const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Query = require("./models/Query");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cyber Assist Backend is Running");
});

app.post("/api/queries", async (req, res) => {
  try {
    const { name, email, query } = req.body;

    if (!name || !email || !query) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newQuery = await Query.create({
      name,
      email,
      query,
    });

    res.status(201).json({
      message: "Query saved successfully",
      query: newQuery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.get("/api/queries", async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });

    res.status(200).json(queries);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch queries",
    });
  }
});

const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });