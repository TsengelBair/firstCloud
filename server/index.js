// import express from "express";
// import config from "config";
// import mongoose from "mongoose";
// import cors from "cors";
// import registrationRouter from "./routes/auth.routes.js";

// const PORT = config.get("serverPort") || 5000;
// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/api/auth", registrationRouter);
// const start = async () => {
//   try {
//     await mongoose.connect(config.get("dbUrl"));
//     app.listen(PORT, () => {
//       console.log(`Server started on port ${PORT}`);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// start();

const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const registrationRouter = require("./routes/auth.routes.js");
const { uploadFile } = require("./routes/file.routes.js");

const PORT = config.get("serverPort") || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", registrationRouter);
const start = async () => {
  try {
    await uploadFile();
    await mongoose.connect(config.get("dbUrl"));
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
