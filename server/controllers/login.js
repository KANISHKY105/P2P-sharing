const passport = require("passport");
const User = require("../models/user");

const logUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });



  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        // console.log(req.user);
        res.status(200).json({ path: "/", status: "Login successful" });
      });
    }
  });
}


module.exports = {
  logUser
};
