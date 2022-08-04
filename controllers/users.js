const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
}

module.exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registered = await User.register(user, password);
    req.login(registered, err => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/user/register");
  }
}

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
}

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back!")
  const redirectUrl = res.locals.returnTo || '/campgrounds';
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success', "Successfully logged out");
    res.redirect("/campgrounds");
  });
}