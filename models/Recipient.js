const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }, //responded 紀錄之前是否投過票
});

module.exports = recipientSchema;
//just report schema not collection cause this will be put in subcollection
