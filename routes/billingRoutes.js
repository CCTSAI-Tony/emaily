const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey); //用到前面的keys當作paramater, require("stripe") is a func
const requireLogin = require("../middlewares/requireLogin");
//npm module stripe is a helper to handle token in backend and stripe_checkout is to create form in frontend

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500, //double check the amount with stripe
      currency: "usd",
      description: "$5 for 5 credits", //marks
      source: req.body.id, //stripe token get from frontend stripe form
    });
    //上面charge 成功 才會做下面的, 同屬一個async func, 回傳的charge 會有transaction id, 但我們用不到
    req.user.credits += 5;
    const user = await req.user.save(); // req.user.save() returns the updated user model

    res.send(user); //傳送user model json file
  });
};
// warning: by default, express server doesn't parse the request payload by post request, so we need to install a module to help
// import body-parser middleware, so the payload  is available as req.body
// passport middleware 會轉換 req.user to user model; req.user 就是mongo user model instance@@
// why use requireLogin in case cookie is expired in the backend althouth you still can access user information in frontend
// if no login, req.user will be undefined => error
// create own middleware => requireLogin,
// app.post or get... can load arbitrary numbers of callback func like middleware
