const { validationResult } = require("express-validator/check");

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

exports.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.send("false");
};
