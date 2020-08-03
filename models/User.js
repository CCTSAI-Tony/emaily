const mongoose = require("mongoose");
const { Schema } = mongoose; //distructuring

const userSchema = new Schema({
  googleId: String, //tell schema the googleId property's value must be a string
  credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema); //build collection, collection, schema
