const mongoose = require("mongoose");
const { check, body } = require("express-validator/check");

const User = mongoose.model("User");

exports.loginValidationCriterion = [
  check("email", "Please provide a valid email address!")
    .isEmail()
    .normalizeEmail(),
  check("password", "Oops, it looks like you forgot to supply a password!")
    .not()
    .isEmpty()
];

exports.signupValidationCriterion = [
  check("username", "You need a username, silly! 😉")
    .not()
    .isEmpty(),
  body("username").custom(username => {
    return User.findOne({ username }).then(user =>
      user ? Promise.reject(new Error("That username is already taken!")) : true
    );
  }),
  check(
    "firstName",
    "How would we know what to call you, if you don't tell us your name!? 🙊"
  )
    .not()
    .isEmpty(),
  check(
    "lastName",
    "You seem important, so we want to keep tabs on your last name too! 😊"
  )
    .not()
    .isEmpty(),
  check("email", "Please use a valid email address! 📧")
    .isEmail()
    .normalizeEmail(),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Please type in a password!")
    .isLength({ min: 6 })
    .withMessage("Please use a password that's at least 6️⃣ characters long."),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Oops! It looks like your passwords don't match!");
    } else {
      return true;
    }
  })
];
