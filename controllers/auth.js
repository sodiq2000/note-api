const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/Users");

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist!" });

    const confirmPassword = await bcrypt.compare(password, oldUser.password);

    if (!confirmPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = await jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res
      .status(200)
      .json({ message: "User loggedin successfully!", data: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email: email,
      password: hashedPassword,
      name: `${firstname} ${lastname}`,
    });

    const token = await jwt.sign(
      { email: result.email, id: result._id },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res
      .status(201)
      .json({ message: "account created successfully!", data: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = { signin, signup };
