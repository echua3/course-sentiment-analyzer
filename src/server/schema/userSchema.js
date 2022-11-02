import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  userID:  String, // String is shorthand for {type: String}
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  dept: [String],
  userType: String,
  interests: [String],
  courseExpectation: [String],
  reviews: [Number],
  });

const userModel = mongoose.model('User Test', userSchema)
