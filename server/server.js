const app = require("express")();
const server = require("http").createServer(app);
// mount socketio onto server
const io = require("socket.io")(server);
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const API_PORT = process.env.PORT || 7777;
// import models
require("./models/User");
require("./config/passportConfig");

const User = mongoose.model("User");
const router = require("express").Router();

// important environment variables
dotenv.config({ path: "./variables.env" });

// Use es6 promise for monogoose
mongoose.Promise = global.Promise;

// Connect to MongoDB database
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const db = mongoose.connection;
db.on("error", err => console.err(`🚫 🙉 🚫 🙉 🚫 🙉 🚫 🙉 ${err.message}`));
db.on("open", () => console.log("🎉 🎊  Databse connected! 🎉 🎊"));

app.use(require("express").static("../client/public"));
// Use body-parser middleware to append body to req object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionSettings = {
  cookie: {},
  resave: false,
  secret: process.env.SECRET,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sessionSettings.cookie.secure = true;
}

app.use(cookieParser());
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());

// Declare routes
app.use("/", require("./routes/index"));

const users = {};
// Create socket
io.on("connection", socket => {
  socket.on("login", (username, socketId) => {
    users[socketId] = username;
    socket.broadcast.emit("login", username);

    const onlineUsers = [...new Set(Object.values(users))];
    io.emit("online", onlineUsers);
  });

  socket.on("typing", (user, value) => {
    socket.broadcast.emit("typing", user, value);
  });

  socket.on("message", (user, msg, timestamp) => {
    io.emit("message", user, msg, timestamp);
  });

  socket.on("disconnect", () => {
    const socketId = socket.id;
    const username = users[socket.id];
    delete users[socketId];

    socket.broadcast.emit("logout", username);

    const onlineUsers = Object.values(users);
    io.emit("online", onlineUsers);
  });
});

server.listen(API_PORT, () =>
  console.log(`Listening on http://localhost:${API_PORT}`)
);
