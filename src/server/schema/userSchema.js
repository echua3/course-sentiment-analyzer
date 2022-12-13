const { Schema } = require('mongoose');
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
     userID:  {
         type: String,
         lowercase: true,
         required: [true, "Your userID cannot be blank!"],
         index: true,
         unique: true
     },
     firstName: {
         type: String,
         required: [true, "You have to have a first name!"]
     },
     lastName: String,
     degreeType: {
          type: String,
          default: 'Undergraduate'
     },
     firstInterest: {
        type: String,
        default: ''
     },
     secondInterest: {
        type: String,
        default: ''
     },
     thirdInterest: {
        type: String,
        default: ''
     },
     reviewIDs: [String],
     courseIDs: [String],
     reviewUpvoteIDs: [String],
     reviewDownvoteIDs: [String],
     dept: String
  });

userSchema.plugin(uniqueValidator, {message: 'UserID is already taken.'});

const userModel = mongoose.model('Users', userSchema)
module.exports = { userModel }
