const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
//use this file we can use relative link to connect the express server
//create react app server doesen't exist in production, we use npm build to save in express server
