const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  signup,
  signin,
} = require("../controllers/users");
const auth = require('../middleware/auth')

const router = express.Router();

router.post("/login", signin);
router.post("/signup", signup);

router.get("/secure/users/all", auth, getAllUsers);
router.get("/secure/users/:id", auth, getSingleUser);


module.exports = router;
