const passport = require("passport");
const User = require("../models/user");

const renderLogin = async (req, res) => {
  res.render("login");
};

const logUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });



  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log(re.user);
        res.redirect('/');
      });
    }
  });
}


module.exports = {
  renderLogin,
  logUser,
};
