// Express & DB Imp
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Utils Imp
const passport = require("passport");
const { checkReturnTo } = require("../middleware");

const catchAsync = require("../utils/catchAsync");

//Controllers Imp
const users = require("../controllers/users");

router.route("/register")
  .get(users.renderRegisterForm)
  .post(catchAsync(users.registerUser))

router.route("/login")
  .get(users.renderLoginForm)
  .post(checkReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/user/login" }), catchAsync(users.login))

router.route("/logout")
  .get(users.logout)


module.exports = router;