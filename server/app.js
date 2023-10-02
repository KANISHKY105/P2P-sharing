require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

const express = require("express");
const app = express();

const User = require("./models/user");
const connectDB = require("./db/connect");

const loginRouter = require("./routes/login"); // routes section
const registerRouter = require("./routes/register");
const signalingRouter = require("./routes/signaling"); 

const session = require("express-session"); // auth section
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function(request, accessToken, refreshToken, profile, cb) {
      // console.log("Google Strategy callback - profile:", profile);

      const email = profile.emails[0].value;

      try {
        let user = await User.findOne({ username: email });

        if (!user) {
          user = new User({ username: email });
          await user.save();
        }

        return cb(null, user);
      } catch (error) {
        console.error("Error finding or creating user:", error);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-hash -salt");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/signaling", signalingRouter);

// app.get('/signaling', (req, res) => {
//   res.send("Welcome")
// }); 

app.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/register" }),
  function (req, res) {
    console.log("Google authentication successful. Redirecting...");
    res.redirect("/");
  }
);

app.get("/", async(req, res) => {
  console.log(req.isAuthenticated());
  res.send("welcome to ClosedCoo");
});


// app.get("/protected", isAuth, (req, res) => {
//   res.send("protected page")
// }
// )
// app.get("/userinfo", (req, res) => {
//   res.send("welcome to userInfo page");
// });



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
