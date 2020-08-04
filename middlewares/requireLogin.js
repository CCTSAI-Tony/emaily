module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }

  next();
};
// export a arrow func
//middleware: next() once middleware complete 把req 傳送給下一個
