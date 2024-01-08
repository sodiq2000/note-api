const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require("../models/Users");

require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    const usersData = users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
      };
    });

    res
      .status(200)
      .json({ message: "users retrieved successfully!", data: usersData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({message: `No user with id: ${id}`});

    const user = await UserModel.findById(id);
    const { _id, name, email } = user
    res
      .status(200)
      .json({ message: "user retrieved successfully!", data: {id: _id, name, email} });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const oldUser = await UserModel.findOne({ email })

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist!" })

        const confirmPassword = await bcrypt.compare(password, oldUser.password)

        if (!confirmPassword) return res.status(400).json({ message: 'Invalid credentials' })

        const token = await jwt.sign({ email: oldUser.email, id: oldUser._id }, SECRET_KEY, { expiresIn: '2h' })

        res.status(200).json({ message: 'User loggedin successfully!', data: token})
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'})
    }
}

const signup = async (req, res) => {
    const { email, password, firstname, lastname } = req.body

  try {
      const oldUser = await UserModel.findOne({ email })

      if (oldUser) return res.status(400).json({ message: 'User already exists!' })

      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await UserModel.create({ email: email, password: hashedPassword, name: `${firstname} ${lastname}` })

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
      console.log(error)
  }
};

module.exports = { getAllUsers, getSingleUser, signin, signup }
