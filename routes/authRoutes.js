const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); //passport attached logout func to the req object, reset the cookie and delete req.user
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user); //for testing
  });
};