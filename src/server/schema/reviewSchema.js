import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  sectionID:  String, // String is shorthand for {type: String}
  stars: String,
  initialReview:   String,
  author: String,
});

const reviewModel = mongoose.model('Review Test', reviewSchema)
