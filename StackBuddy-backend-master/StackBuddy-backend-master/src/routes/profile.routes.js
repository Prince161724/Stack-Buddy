import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateEditProfileData } from "../utils/validation.js";
import userModel from "../models/user.js";
import Chat from "../models/chat.js";

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      message: "Profile data fetched successfully!!",
      data: user,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const validationResult = validateEditProfileData(req);
    if (!validationResult.isValid) {
      return res.status(400).send(validationResult.message);
    }

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    if (validationResult.isComplete) {
      loggedInUser.verified = true;
    }
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile is updated Successfully!!`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const chat = await Chat.findOneAndDelete({
      participants: { $all: [loggedInUser._id] },
    });
    const user = await userModel.deleteOne({ _id: loggedInUser._id });
    res.json({
      message: "Your account is deleted successfully!!",
      data: user,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export { profileRouter };
