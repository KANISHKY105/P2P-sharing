require("dotenv").config();
require("express-async-errors");
const cors = require('cors');

const express = require("express");
const app = express();

const User = require("./models/user");
const connectDB = require("./db/connect");

const loginRouter = require("./routes/login");  // routes section
const registerRouter = require("./routes/register");



const session = require("express-session"); // auth section
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { isAuth, isAdmin } = require("./middleware/authMiddleware");

const notFoundMiddleware = require("./middleware/not-found");


app.use(cors()); 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});




app.use("/login", loginRouter);
app.use("/register", registerRouter);



app.get("/", (req, res) => {
  res.send("welcome to ClosedCoo");
});



app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
