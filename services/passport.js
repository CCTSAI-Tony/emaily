const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); //fetch from mongodb

passport.serializeUser((user, done) => {
  // input: 找到的user instance
  //當passport.use(new GoogleStrategy)找到user時, 會執行這個func, 順便幫我們生成cookie,
  done(null, user.id); //user.id => mongodp User id, primary key
});

passport.deserializeUser((id, done) => {
  //passport attached user to the req object
  //done 是callback func
  //database的操作, 一定要使用async 語句, ex: promise/then, async/await
  //若身上有cookie會直接run這個
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  //準備製作cookie 的前作業, 找到user, or 新增user
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, //若不設這個, request 經過heroku proxy 就不會是https
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser); //這裡done 要return 跟passport 說existingUser在這裡, 以利passport.serializeUser
      } //done(null 代表error object 選null 表示若出現error, 不需執行任何error func)

      const user = await new User({ googleId: profile.id }).save();
      done(null, user); //回報給passport, 這裡不用return, 猜想passport 內部已經知道此user了, 因為save() set a associated session
      //之後done(null, user)相當於 return 一個session
    } //done is a method called internally by the strategy implementation.
  )
);
//Used to automatically set session if you save() a doc that you got from a query with an associated session.
