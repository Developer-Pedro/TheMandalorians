const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const UsersController = require ('../CONTROLLERS/users');

//New Sign up
router.post("/signup",UsersController.new_signup);

//LOGGING IN 
router.post("/login", UsersController.user_login);

//Delete a User
router.delete("/:userId", UsersController.delete_a_user);

module.exports = router;
