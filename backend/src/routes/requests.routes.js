import express from "express";
import { userAuth } from "../middlewares/auth.js";
import User from "../models/user.js";
import ConnectionRequestModel from "../models/connection.request.js";
import * as sendEmail from "../utils/sendEmail.js";

const requestsRouter = express.Router();

//send request
requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //toUserId exists or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("Request can't be send to this user!!");
      }

      //check for valid status
      const isAllowed = ["ignored", "interested"];
      const validStatus = isAllowed.includes(status);
      if (!validStatus) {
        throw new Error("Invalid Request status");
      }
      //check for A to B and B to A
      const existingRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res.status(400).send({
          message: "Connection Request already exists!!",
          data: existingRequest,
        });
      }

      const connection = await new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connection.save();

      if (status === "interested") {
        const emailSubject = "New Connection Request";
        const emailBody = `${req.user.firstName} is ${status} in connecting with you.`;
        try {
          const emailRes = await sendEmail.run(
            emailSubject,
            emailBody,
            toUser.emailId
          );
          console.log(
            `Email sent to ${toUser.emailId}:`,
            JSON.stringify(emailRes, null, 2)
          );
        } catch (emailErr) {
          console.error(
            `Error sending email to ${toUser.emailId}: ${emailErr.message}`
          );
        }
      }

      // message
      let message;
      if (status === "interested") {
        message = `${req.user.firstName} is interested in ${toUser.firstName}`;
      } else if (status === "ignored") {
        message = `${req.user.firstName} has ignored ${toUser.firstName}`;
      }

      res.json({
        message: message,
        data: data,
      });
    } catch (err) {
      res.json({
        message: "Error Occured",
        data: err.message,
      });
    }
  }
);

//review request
requestsRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { requestId, status } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("status not allowed");
      }

      const requestsData = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!requestsData) {
        throw new Error("Connection request not found");
      }

      requestsData.status = status;
      const data = await requestsData.save();

      res.json({ message: `Connection request ${status}`, data: data });
    } catch (err) {
      res.status(400).json({
        message: "Error occured : ",
        data: err.message,
      });
    }
  }
);

export { requestsRouter };
