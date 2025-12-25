import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      match: /^[a-zA-Z\s\-]+$/,
    },
    lastName: {
      type: String,
      required: true,
      match: /^[a-zA-Z\s\-]+$/,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender can be only male, female and other",
      },
      // default: "other",
    },
    photoUrl: {
      type: String,
      default: "https://res.cloudinary.com/dnisexrvt/image/upload/v1766629395/boy-with-hoodie-that-says-hes-boy_1230457-43316_fdnxeq.jpg",
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid Photo URL " + value);
        }
      },
    },
    about: {
      type: String,
      default: "I am about section",
    },
    skills: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 10;
        },
        message: "The skills array exceeds the maximum length of 10.",
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//indexing
userSchema.index({ firstName: 1, lastName: 1 });

// schema methods
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
