const express = require("express");
// const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const utils = require("../utils");

const router = express.Router();

router.post(
  "/api/login",
  utils.loginValidationCriterion,
  authController.formValidator,
  userController.login
);
router.post(
  "/api/sign-up",
  utils.signupValidationCriterion,
  authController.formValidator,
  userController.registerNewUser
);
router.get(
  "/api/user",
  authController.checkAuthentication,
  userController.getUser
);

router.get("/api/logout", userController.logout);

module.exports = router;
