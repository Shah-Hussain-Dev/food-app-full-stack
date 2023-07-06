const admin = require("firebase-admin");
require("dotenv").config();
const cors = require("cors");
const functions = require("firebase-functions");

const serviceAccount = require("./serviceAccountKey.json");
const express = require("express");
const app = express();

// Body parser for json response
app.use(express.json());

// cors origin
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//   api endpoints

app.get("/", function (req, res) {
  res.send("HI there");
});


const userRoute = require("./routes/user");

app.use("/api/users", userRoute);




exports.app = functions.https.onRequest(app);
