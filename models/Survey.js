const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], //put schemas to stands for suncollections
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" }, //reference link
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model("surveys", surveySchema);
// foreign key: _user: { type: Schema.Types.ObjectId, ref: 'User' },
//one to many => recipients: [RecipientSchema] => sub document collection
//why we set a collection structure like this all the reason is mongo db's one document top limit size is 4mb
//we can make survay has subcollection but user can't, otherwise, one user document may oversize easily
