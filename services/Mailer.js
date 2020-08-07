const sendgrid = require("sendgrid");
const helper = sendgrid.mail; //可以這樣 {mail} = sendgrid, but for convention, we call helper
const keys = require("../config/keys");
//es6 class, { subject, recipients } => destructuring from model class
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super(); //javascript 繼承都要加super()在第一行

    this.sgApi = sendgrid(keys.sendGridKey); //charecter property
    this.from_email = new helper.Email("o660086@tamu.edu");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients); // this.formatAddresses =>it's own instance method

    this.addContent(this.body); //用到parent class 的instance method(因為自己沒有overwriten), 因為繼承所以也變成自己的instance method
    //this.addContent(this.body) => rigister the body to mailer content
    this.addClickTracking(); //若子class 的instance method 與parent class 名字一樣, this.method 會用到自己建立的method
    this.addRecipients();
  }

  //recipients is a array of recipient objects
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      //destructuring {mail} property 來當作參數
      //recipients.map 裡面對應的都是一個一個recipient object
      //map( ({email})  ) ==>, es6 destructuring {email} 外面一定要在多加一個(), 不然arror fun 會報錯
      return new helper.Email(email); //helper does the formatting
    });
  }

  addClickTracking() {
    //enable the track link => custome the bottom link
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true); //default setting

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    //register this.recipients to the mailer
    const personalize = new helper.Personalization();

    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    //making a api request is always a async request
    //instance method
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(), //把mailer 內容 轉化成json
    });

    const response = await this.sgApi.API(request);
    return response; //response 其實用不到, 但async way 我們必須return to 告知這個promise 結束
  }
}

module.exports = Mailer;
