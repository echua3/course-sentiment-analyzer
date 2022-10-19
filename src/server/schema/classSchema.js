import mongoose from 'mongoose';
const { Schema } = mongoose;

const classSchema = new Schema({
  TermStartDate:  String, // String is shorthand for {type: String}
  SchoolName: String,
  CoursePrefix:   String,
  Term: String,
  Term_IDR: String,
  OfferingName: String,
  SectionName: String,
  Title: String,
  Credits: String,
  Department: String,
  Level: String,
  Status: String,
  DOW: String,
  DOWSort: String,
  TimeOfDay: String,
  SubDepartment: String,
  SectionRegRestrictions: String,
  SeatsAvailable: String,
  MaxSeats: String,
  OpenSeats: String,
  Waitlisted: String,
  IsWritingIntensive: String,
  AllDepartments: String,
  Instructors: String,
});

const classModel = mongoose.model('Class Test', classSchema)
