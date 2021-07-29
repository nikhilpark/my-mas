const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const User = require("../models/userData");

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", (req, res) => {
  res.send("works");
});

userRouter.post("/signup", async (req, res) => {
  const { username, email, password, bday } = req.body;
  const userExists = await User.findOne({ username: username });
  const emailExists = await User.findOne({ email: email });
  if (!userExists && !emailExists) {
    bcrypt.genSalt(10, (_err, salt) => {
      bcrypt.hash(password, salt, null, async (err, hash) => {
        if (err) throw err;
        let hashedPassword = hash;
        const docs = await User.create({
          username: username,
          email: email,
          password: hashedPassword,
          bday: bday,
        });
        console.log(docs);
      });
    });
  } else {
    console.log("Username or email taken");
  }
});

// userRouter.post("/signin")

module.exports = userRouter;
