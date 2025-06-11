import User from "../models/user.model.js";
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

  // create new user
  const newUser = new User({
    username,
    email,
    password,
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

export default signUpUser;
