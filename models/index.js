import mongoose from 'mongoose';

import dotenv from 'dotenv'; 
const Denv = dotenv.config();
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const studentSchema = mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    value: {
      type: Number,
      require: true
    },
    lastModified: {
      type: Date,
      default: Date.now
    }
  });
  
  
 const studentModel =  mongoose.model('student', studentSchema, 'student');

export { db,studentModel };
