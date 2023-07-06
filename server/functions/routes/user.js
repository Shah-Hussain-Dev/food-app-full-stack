const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res
      .status(500)
      .send({ msg: "You are not allowed to access without token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const tokenVerification = await admin.auth().verifyIdToken(token);
    if (!tokenVerification) {
      return res.status(500).json({ msg: "UnAuthorized access" });
    }
    return res.status(200).json({ success: true, data: tokenVerification });
  } catch (error) {
    return res.send({
      success: false,
      msg: `Error while verifying token :${error}`,
    });
  }
});
module.exports = router;
