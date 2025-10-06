import express, { query } from "express";
import { userAuth } from "../middlewares/auth.js";
import Requests from "../models/connection.request.js";
import User from "../models/user.js";
import ConnectionRequestModel from "../models/connection.request.js";

const userRouter = express.Router();

userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const requests = await Requests.find({
      toUserId: loggedInUserId,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "photoUrl"]);

    res.json({
      message: "All requests fetched!!",
      data: requests,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error Occcured : ",
      data: err.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    // console.log(loggedInUserId);
    const connections = await Requests.find({
      $or: [
        {
          toUserId: loggedInUserId,
          status: "accepted",
        },
        {
          fromUserId: loggedInUserId,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName", "photoUrl"])
      .populate("toUserId", ["firstName", "lastName", "photoUrl"]);

    const data = connections.map((connection) => {
      const otherUser =
        connection.fromUserId._id.toString() === loggedInUserId.toString()
          ? connection.toUserId
          : connection.fromUserId;

      return {
        connectionId: connection._id,
        user: {
          _id: otherUser._id,
          firstName: otherUser.firstName,
          lastName: otherUser.lastName,
          photoUrl: otherUser.photoUrl,
        },
      };
    });

    if (!data || data.length === 0) {
      return res.status(400).json({ message: "No connections found!!" });
    }

    res.json({
      message: "Connections fetched!!",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error Occurred ",
      data: err.message,
    });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const connectionRequests = await Requests.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hiddenUserFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hiddenUserFromFeed.add(req.fromUserId.toString());
      hiddenUserFromFeed.add(req.toUserId.toString());
    });

    const feed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Feed fetched!!",
      data: feed,
    });
  } catch (err) {
    res.status(400).json({
      message: "error occurred !!",
      data: err.message,
    });
  }
});

userRouter.delete(
  "/user/connection/remove/:connectionId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const connectionId = req.params.connectionId;

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: connectionId,
        status: "accepted",
        $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message:
            "Connection not found or you don't have permission to remove it.",
        });
      }

      await ConnectionRequestModel.findByIdAndDelete(connectionId);

      res.json({
        message: "Connection successfully removed",
        data: connectionRequest,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error occurred while removing connection",
        error: err.message,
      });
    }
  }
);
export { userRouter };
