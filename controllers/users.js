const mongoose = require('mongoose');
const UserModel = require("../models/Users");

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

const updateUser = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).status({ message: `No user with id: ${id}` })

    const updatedUser = req.body
    const User = await UserModel.findByIdAndUpdate(id, updatedUser, { new: true })
    res
      .status(200)
      .json({ message: "user updated successfully!", data: updatedUser });
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).status({ message: `No user with id: ${id}` });

    const User = await UserModel.findByIdAndDelete(id)
    res.status(200).json({ message: "user deleted successfully!" });

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
module.exports = { getAllUsers, getSingleUser, updateUser, deleteUser }
