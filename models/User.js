const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: "Please type in a unique username",
    lowercase: true,
    trim: true,
    unique: true
  },
  firstName: {
    type: String,
    required: "Please type in a first name",
    trim: true
  },
  lastName: {
    type: String,
    required: "Please type in a last name",
    trim: true
  },
  email: {
    type: String,
    required: "Please type in a valid email address",
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: "Please provide a secure password",
    trim: true
  },
  dateCreated: {
    type: Date
  }
});

userSchema.pre("save", async function hashPassword(next) {
  const user = this;
  const hash = await bcrypt
    .hash(user.passwordHash, 10)
    .catch(err => console.error(err));
  user.passwordHash = hash;
  next();
});

userSchema.methods.sentenceCaseName = function(name) {
  const formattedName = name[0].toUpperCase() + name.substring(1).toLowerCase();
  return formattedName;
};

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
