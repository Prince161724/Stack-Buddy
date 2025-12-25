import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login to access this resource");
    }
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedData;
    const user = await User.findById(_id);

    if (!user) {
      res.status(401).send("Unauthorised access");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

export { userAuth };
