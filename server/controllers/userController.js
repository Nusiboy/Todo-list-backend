const User = require("../modles/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.users = (req, res) => {
  User.find({}).then((data) => {
    res.send(data);
  });
};
exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const userExists = await User.findOne({ userName, email });
    if (userExists) {
      return res.status(401).send("User already exists");
    }
    const newUser = await User.create({ userName, email, password });
    res.status(200).send("Created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.login = async (req, res) => {
  const { userName, email, password } = req.body;
  const userExists = await User.findOne({ userName, email });
  if (!userExists) {
    return res.status(401).json("No user");
  }
  const passwordIsValid = bcrypt.compare(password, userExists.password);
  if (!passwordIsValid) return res.status(401).json("password incorrect");
  const { userName: tokenUsername, _id, email: tokenEmail } = userExists;
  const token = jwt.sign(
    { userName: tokenUsername, _id, email: tokenEmail },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.json({ token }).status(200);
};


exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(202).send("Deleted user with ID: " + req.params.id);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
