const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const User = require("../models/userData");

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", (req, res) => {
  res.send("works");
});

userRouter.post("/signup", async (req, res) => {
  try {
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
          console.log(docs, "28");
          if (docs) {
            res.send({ status: "success", msg: "Signed up succesfully" })
          } else {
            res.send({ status: "failed", msg: "Error Occured" })
          }
        });
      });
    } else {
      res.send({ status: "failed", msg: "Username or email taken" });
    }
  }
  catch (err) {
    cosnole.log(err)
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user) {
      bcrypt.compare(password, user.password, (err, doc) => {
        if (err) {
          console.log(err)
          res.send({ status: "failed", msg: "Error occured!" })
        }
        if (doc) {
          res.send({ status: "success" })
        } else {
          res.send({ status: "failed", msg: "Incorrect password" })
        }
      })
    } else {
      res.send({ status: "failed", msg: "User not found" })
    }
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = userRouter;
