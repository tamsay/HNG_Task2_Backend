const express = require("express");
const router = express.Router();
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../public/Frontend/index.html"));
});

router.post("/contact-me", cors(), function (req, res, next) {
  const { name, phoneNumber, email, message, subject } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
  });

  const mailOptions = {
    from: name,
    to: process.env.EMAIL,
    subject: subject,
    text: `${name} <${email}> ${phoneNumber} \n ${message}`,
    auth: {
      user: process.env.EMAIL,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
      expires: 1484314697598,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res
        .status(500)
        .send({ message: "Something went wrong.", status: "failed" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({
        message: "Email successfully sent to recipient!",
        status: "success",
      });
    }
  });
});

module.exports = router;
