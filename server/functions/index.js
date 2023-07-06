const admin = require("firebase-admin/app");
require("dotenv").config();
const cors = require("cors");
const serviceAccountKey = require("./serviceAccountKey.json");
const express = require("express");
const app = express();

// Body parser for json response
app.use(express.json());

// cors origin
app.use(cors({origin:true}))
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin","*");
    next();
})


// firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });


//   api endpoints

app.get("/", function(req, res){
    res.send("HI there")
})
  exports.app = functions.https.onRequest(app);