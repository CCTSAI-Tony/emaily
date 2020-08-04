const passport = require("passport");

module.exports = (app) => {
  // passport will redeem data from google once user grant the permit
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      //passport.authenticate 也是一個middleware 但專注於特定route的request
      scope: ["profile", "email"],
    })
  );
  //app.get(route, func, callback func)
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  //google 回傳的data會傳到"/auth/google/callback 然後經由passport處理 goole 回傳user的data
  //之後回傳res.redirect 使browser 轉到另一個頁面

  app.get("/api/logout", (req, res) => {
    req.logout(); //passport attached logout func to the req object, and reset the cookie and delete req.user
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
