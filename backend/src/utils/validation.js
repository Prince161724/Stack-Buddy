import validator from "validator";
const DEFAULT_IMAGE_URL =
  "https://res.cloudinary.com/dnisexrvt/image/upload/v1766629395/boy-with-hoodie-that-says-hes-boy_1230457-43316_fdnxeq.jpg";

const validateSignUpData = (req) => {
  const isAllowed = ["firstName", "lastName", "emailId", "password"];
  const data = Object.keys(req.body).every((key) => isAllowed.includes(key));
  if (!data) {
    throw new Error("Invalid signup data.");
  }
  const { firstName, lastName, emailId, password } = req.body;
  const errors = [];

  if (!firstName) errors.push("First name can't be empty");
  if (!lastName) errors.push("Last name can't be empty");
  if (!emailId) errors.push("Email ID can't be empty");
  if (!password) errors.push("Password can't be empty");

  if (emailId && !validator.isEmail(emailId)) {
    errors.push("Invalid Email format");
  }

  if (password && !validator.isStrongPassword(password)) {
    errors.push(
      "Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
    );
  }

  if (errors.length) {
    throw new Error(errors.join(" "));
  }
};

const validateEditProfileData = (req) => {
  const isAllowed = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const requiredFields = ["firstName", "lastName", "age", "gender", "photoUrl"];

  // Check if all fields in the request body are allowed to be edited
  const isEditable = Object.keys(req.body).every((field) =>
    isAllowed.includes(field)
  );

  if (!isEditable) {
    return { isValid: false, message: "Invalid fields in request" };
  }

  // Check if all required fields are present and not empty
  const missingFields = requiredFields.filter(
    (field) => !req.body[field] || req.body[field].toString().trim() === ""
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
      isComplete: false,
    };
  }

  // Check for empty age
  if (isNaN(req.body.age) || req.body.age < 18) {
    return {
      isValid: false,
      message: "Age must be a number and at least 18",
      isComplete: false,
    };
  }

  // Check if image is the same as default
  if (req.body.photoUrl === DEFAULT_IMAGE_URL) {
    return {
      isValid: false,
      message: "Please upload a profile picture Dont Use Default Image",
      isComplete: false,
    };
  }

  // If all checks pass, return true and isComplete true
  return { isValid: true, message: "Profile data is valid", isComplete: true };
};

export { validateSignUpData, validateEditProfileData };
