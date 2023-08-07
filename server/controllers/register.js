const passport = require("passport");
const User = require("../models/user");

const renderRegister = async (req, res) => {
  res.render("register");
};

const saveUser = (req, res) => {
  console.log(req.body);
  User.register({ username: req.body.username }, req.body.password, (err) => {
    if (err) {
      console.log("Error while registering user: " + err);
      res.send(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res
          .status(201)
          .json({ path: "/login", status: "registration successful" });
      });
    }
  });
};

module.exports = {
  renderRegister,
  saveUser,
};
