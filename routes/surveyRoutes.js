const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url"); //default module in node.js, extract URL func
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

//const Survey = require("../models/Survey") 也可以這樣, 但attempt to build mongo collection with samename multiple times it will get errors
const Survey = mongoose.model("surveys"); //從mongo db 呼叫mongo surveys collection

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      //不用回傳recipients data 不然太大, 我們不需要 recipients 的資訊在前端展示
      recipients: false,
    });

    res.send(surveys);
  });

  //put this special route in the mailer so webhooks send us the post request could have this clues
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    //webhooks: receive information from third party api
    const p = new Path("/api/surveys/:surveyId/:choice"); //path-parser to match surveyId & choice using wildcard :surveyId/:choice
    //match would be null or a object
    //req.body is a event list
    events = _.chain(req.body) //chain all the events => 最大功能是chain 不同的lodash methods 減少中間變數
      .map(({ email, url }) => {
        //extract email & url from the event
        const match = p.test(new URL(url).pathname); //new URL(url).pathname 把url:http:fdeda/survayid/yes => survayid/yes 去掉domain
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() //去除不match 的event => undefined in new events array
      .uniqBy("email", "surveyId") //去除重複 duplicate email && surveyId
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId, //注意是用_id, mongodb 的專屬property
            recipients: {
              $elemMatch: { email: email, responded: false }, //直接在database做比對, 若比對成功就更新, 不要從database傳一個survey model進來, 太大
            },
          },
          {
            //$inc, $set => mongo operator
            //until update Survey that we would know what choise is
            $inc: { [choice]: 1 }, //increment, 在指定的[choice] += 1 => ["yes"] => yes, ["no"] => no, [choice] key interpolation
            $set: { "recipients.$.responded": true }, //.$ . means the index of elemMatch
            lastResponded: new Date(),
          }
        ).exec();
      }) //close .map
      .value(); //  _.chain in the end call value() to return newly process array, 不過這裡我們不需要此return 值, 只需要chain的過程
    console.log(events);
    res.send({}); //回應sendGrild 空白object
    //注意, 整個過程不用async 是因為我們不需回傳有意義的東西給sengrid, 因此不需等database exec完畢, 就可以res.send({})
    //不過記得任何有關db的操作都是async
  });

  // make sure user log in and have enough credits
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    //async  重要
    const { title, subject, body, recipients } = req.body; //bodyParser middleware, and es6 syntax

    const survey = new Survey({
      title, //title: title => title => es6 syntex
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })), //email.trim() 消除前後空格, map 裡面是一個轉化func, mail => object
      //origin => map((email) => { return { email: email.trim() }}) 變成 => ({email: email.trim()}), 因為只有一個expression, 拿掉return,
      //然後包裹在() 以免讓javascript 混淆{} 代表func block 還是object
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!, generate a mailer to send all mails, batch operation
    const mailer = new Mailer(survey, surveyTemplate(survey)); //merge survey instance and surveyTemplate(survey) template to one object
    //new Mailer(survey, surveyTemplate(survey)), first argument is designed to be a object, not neccessary a class instance
    try {
      await mailer.send(); //send mailer to email provider
      await survey.save();
      req.user.credits -= 1; //每發一封減一塊錢, 這裡的一封是指一個survay
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
//Alough mailers is just one item, sengrid help us to send it to all recipients, and customize bottom link to know who click the vote in the future
//we just send one mailer, sengrid will do the rest, let sengrid tell us who click the bottom
