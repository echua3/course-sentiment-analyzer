import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  classID:  Number, 
  author: String,
  comments: [{ body: String, stars: Number}],
  date: { type: Date, default: Date.now }
});

const reviewModel = mongoose.model('Review Test', reviewSchema)
