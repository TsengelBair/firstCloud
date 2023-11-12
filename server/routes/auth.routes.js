// import { Router } from "express";
// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import { check, validationResult } from "express-validator";
// import jwt from "jsonwebtoken";
// import config from "config";

// const router = new Router();

// router.post(
//   "/registration",
//   [
//     check("email", "Uncorrect email").isEmail(),
//     check(
//       "password",
//       "Password must be longer than 5 and shorter than 12"
//     ).isLength({ min: 6, max: 12 }),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const errorMessages = errors.array().map((error) => error.msg);
//         return res.status(400).json(errorMessages);
//       }
//       const { email, password } = req.body;
//       const candidate = await User.findOne({ email });
//       if (candidate) {
//         return res
//           .status(400)
//           .json({ message: `User with email ${email} already exist` });
//       }
//       const hashPassword = await bcrypt.hash(password, 5);
//       const user = new User({ email, password: hashPassword });
//       await user.save();
//       return res
//         .status(200)
//         .json({ message: "User has been succesfully created" });
//     } catch (e) {
//       console.log(e);
//       return res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: `User with email ${email} doesn't exist` });
//     }
//     const isValidPass = bcrypt.compareSync(password, user.password);
//     if (!isValidPass) {
//       return res.status(400).json({ message: "Uncorrect password" });
//     }
//     const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
//       expiresIn: "1h",
//     });

//     return res.status(200).json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({ message: "Server error, come back later" });
//   }
// });

// export default router;

const { Router } = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = Router();

router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 5 and shorter than 12"
    ).isLength({ min: 6, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json(errorMessages);
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = new User({ email, password: hashPassword });
      await user.save();
      return res
        .status(200)
        .json({ message: "User has been succesfully created" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} doesn't exist` });
    }
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      return res.status(400).json({ message: "Uncorrect password" });
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error, come back later" });
  }
});

module.exports = router;
