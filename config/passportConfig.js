const passport = require("passport");
const mongoose = require("mongoose");
// requires the model with Passport-Local Mongoose plugged in
const User = mongoose.model("User");

passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
