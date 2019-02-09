const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");

const User = mongoose.model("User");

exports.formValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({ errors: errors.array() });
    return;
  }
  // If there is no username field that means we're logging in and not signing up, so we can skip the congratultions message.
  if (!req.body.username) {
    next();
    return;
  }
  // Congratulatory message for new user sign-up
  res.send("🎉 Congratulations! You're officially a Chatterbox member! 🎉");
  next();
};

exports.registerNewUser = (req, res) => {
  console.log(req.body);
  const formatter = new User();
  const user = new User({
    username: req.body.username,
    firstName: formatter.sentenceCaseName(req.body.firstName),
    lastName: formatter.sentenceCaseName(req.body.lastName),
    email: req.body.email,
    // A pre hook is utilized to hash the user password upon save
    // Visit User model for more details
    passwordHash: req.body.password,
    dateCreated: new Date(),
    isOnline: false
  });
  user.save();
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const match = await bcrypt.compare(req.body.password, user.passwordHash);
    req.login(user, err => (err ? console.error(err) : res.send("Success!")));
  } else {
    res.send({
      errors: [
        {
          param: "password",
          msg:
            "Either your password and/or username is invalid. Please try again!"
        }
      ]
    });
  }
};

exports.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.send("false");
};

exports.getUser = (req, res) => {
  const { firstName, lastName, username, email, dateCreated, _id } = req.user;
  res.send({ firstName, lastName, username, email, dateCreated, _id });
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("You are now logged out!");
};
