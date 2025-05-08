const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../Models/User");
const catchAsync = require("./../utility/catchAsync");

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    //check if user exists
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      //return res.status(400).json({ error: "Email already exists" });
      const err = new Error("Email already exists");
      err.status = 400;
      throw err;
    }

    //hash the password
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedpassword,
    });

    await user.save();

    //generate JWT token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ token, user: { id: user._id, email: user.email } });
  })
);

router.post(
  "/login",
  catchAsync(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      //return res.status(400).json({ error: "user doesn't exists" });
      const err = new Error("user doesn't exist");
      err.status = 400;
      throw err;
    }
    const password_match = await bcrypt.compare(password, user.password);
    if (password_match) {
      //generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const decoded = jwt.decode(token);
      console.log(decoded);
      const expiresAt = decoded.exp * 1000;

      return res
        .status(200)
        .json({
          token,
          expiresAt,
          user: { id: user._id, email: user.email, role: user.role },
        });
    } else {
      //return res.status(400).json({ error: "Incorrect password" });
      const err = new Error("Incorrect password");
      err.status = 400;
      throw err;
    }
  })
);

module.exports = router;
