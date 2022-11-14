const { Schema } = require('mongoose');
const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_URI);
const reviewSchema = new Schema({  
     classID: {
          type: Number,
          required: [true, "Now how the hell did you get here?"]
     },
     comment:{
          type: String,
          minLength: [7, "Your comment is too small to run through the sentiment analyzer, make it more than 6 characters!"],
          maxLength: [450, "Your comment is too large. Over 450 characters to be exact! See if you can trim down the message."],
          required: [true, "You need to add a review to you know your review!"]
     },
     difficulty: {
          type: Number,
          default: 0
     },
     score: Number,
     helpfulness: {
          type: Number,
          default: 0
     },
     date: Date
});

const reviewModel = mongoose.model('Reviews', reviewSchema)
module.exports = { reviewModel }
