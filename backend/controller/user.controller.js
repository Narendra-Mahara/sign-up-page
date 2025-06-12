import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  // check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }
  // check if email already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // hash password before saving
  const hash = await bcrypt.hash(password, 10);

  // create new user
  const newUser = new User({
    username,
    email,
    password: hash,
  });
  // save user to database
  const savedUser = await newUser.save();
  if (!savedUser) {
    return res.status(500).json({ message: "Error saving user" });
  }

  const { _id, username: savedUsername, email: savedEmail } = savedUser;

  // send response
  res.status(201).json({
    id: _id,
    username: savedUsername,
    email: savedEmail,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are requried!" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User with this email doesnot exists" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Wrong password!" });
  }

  // generate jwt token
  const token = await jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return res.status(200).json({
    message: "User logged in successfully!",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      jwtToken: token,
    },
  });
};
export { signUpUser, loginUser };
