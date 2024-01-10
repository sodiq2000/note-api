const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const auth = require('../middleware/auth')

const router = express.Router();

router.get("/all", auth, getAllUsers);
router.get("/:id", auth, getSingleUser);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);


module.exports = router;
