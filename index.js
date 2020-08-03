const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport"); //只要執行這個文件, 這個require 不會return anything, passport.js 沒有export任何東西, 所以不用assign a variable
// const authRoutes = require("./routes/authRoutes"); //authRoutes is a func
// authRoutes(app); //執行 "./routes/authRoutes"

mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.json());
app.use(
  //pass in to middleware to modefy request, 在這裡就是建立/extract cookie, passport 也是一個middleware
  cookieSession({
    //extract cookie and assign it to req.session
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey], //解開cookie 的key
  })
);

app.use(passport.initialize()); //tell passport use cookie
app.use(passport.session()); //tell passport use cookie
require("./routes/authRoutes")(app); //精簡版 執行./routes/authRoutes" func

const PORT = process.env.PORT || 5000; //dev
app.listen(PORT);
