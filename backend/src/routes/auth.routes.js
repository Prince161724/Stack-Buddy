import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { validateSignUpData } from "../utils/validation.js";
import { userAuth } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    const existingUser = await User.findOne({ emailId });

    if (existingUser) {
      return res.status(400).send("User already exists with this email");
    } else {
      await user.save();
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
        secure: process.env.ENVIROMENT === "dev" ? false : true,
        httpOnly: true,
        sameSite: process.env.ENVIROMENT === "prod" ? "none" : "lax",
      });
      res.json({
        message: "Signup successful and logged in!",
        data: user,
      });
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("ERROR: Invalid credentials!");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        secure: process.env.ENVIROMENT === "dev" ? false : true,
        httpOnly: true,
        sameSite: process.env.ENVIROMENT === "prod" ? "none" : "lax",
      });

      return res.json({
        message: "Login Successful!",
        data: user,
      });
    } else {
      return res.status(400).send("ERROR: Invalid password!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.ENVIROMENT === "prod",
    sameSite: process.env.ENVIROMENT === "prod" ? "none" : "lax",
  });

  res.send("Logout Successfull!!!!");
});

export { authRouter };
