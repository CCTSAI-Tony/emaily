const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport"); //只要執行這個文件, 這個require 不會return anything, passport.js 沒有export任何東西, 所以不用assign a variable
// const authRoutes = require("./routes/authRoutes"); //authRoutes is a func
// authRoutes(app); //執行 "./routes/authRoutes"

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());
//這裡三個middleware 會加工經過此server的任何一個request
app.use(
  //pass in to middleware to modefy request, 在這裡就是建立/extract cookie, passport 也是一個middleware
  cookieSession({
    //extract cookie and assign it to req.session
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey], //解開cookie 的key
  })
);

app.use(passport.initialize());
app.use(passport.session()); //tell passport use cookie
//initialize() setups the functions to serialize/deserialize the user data from the request like cookie.
//passport.session() is another middleware that alters the request object and change the 'user' value
//that is currently the session id (from the client cookie) into the true deserialized user object=> here transfer to user model

require("./routes/authRoutes")(app); //精簡版 執行./routes/authRoutes" func
require("./routes/billingRoutes")(app);

//cause in production, no more react server, it be included in express server, so we need to do some settings
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build")); //middleware, if want to find static file => go to this path/folder to find something

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000; //dev
app.listen(PORT);
