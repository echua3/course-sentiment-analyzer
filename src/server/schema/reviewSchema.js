const { Schema } = require('mongoose');
const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_URI);
const reviewSchema = new Schema({  
   classID: {
        type: Number,
        required: [true, "Now how the hell did you get here?"]
   }, 
   author: {
        type: String,
        minLength: [2, "You can't have a pen name that is one character long."],
        maxLength: [100, "You can't have a pen name that is over a 100 characters long. Any chance you have a nickname?"],
        required: [true, "You need to start by authoring this so people can refer to it!"]
   },
   comment:{
        type: String,
        minLength: [7, "Your comment is too small to run through the sentiment analyzer, make it more than 6 characters!"],
        maxLength: [450, "Your comment is too large. Over 450 characters to be exact! See if you can trim down the message."],
        required: [true, "You need to add a review to you know your review!"]
   },
   stars: Number
});

const reviewModel = mongoose.model('Reviews', reviewSchema)
module.exports = { reviewModel }
