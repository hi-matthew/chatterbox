const express = require("express");
// const path = require("path");
const userController = require("../controllers/userController");
const utils = require("../utils");

const router = express.Router();

router.post(
  "/login",
  utils.loginValidationCriterion,
  userController.formValidator,
  userController.login
);
router.post(
  "/sign-up",
  utils.signupValidationCriterion,
  userController.formValidator,
  userController.registerNewUser
);
router.get("/user", userController.checkAuthentication, userController.getUser);

router.get("/logout", userController.logout);

module.exports = router;
