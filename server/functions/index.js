const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// Body parser for our json data
app.use(express.json());

// cross origin

const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// api endpoints

app.get("/", (req, res) => {
  return res.send("hello world");
});

const userRoute = require("./routes/user.js");
app.use("/api/users", userRoute);

// const productRoute = require("./routes/product.js");
// app.use("/api/", productRoute);

const cartRoute = require("./routes/cart");
app.use("/api/cart", cartRoute);

exports.app = functions.https.onRequest(app);
