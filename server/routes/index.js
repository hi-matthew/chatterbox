const express = require("express");
// const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const utils = require("../utils");

const router = express.Router();

router.post(
  "/login",
  utils.loginValidationCriterion,
  authController.formValidator,
  userController.login
);
router.post(
  "/sign-up",
  utils.signupValidationCriterion,
  authController.formValidator,
  userController.registerNewUser
);
router.get("/user", authController.checkAuthentication, userController.getUser);

router.get("/logout", userController.logout);

module.exports = router;
