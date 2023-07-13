import mongoose from 'mongoose';

const ExcelSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Phone: {
    type: Number,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const ExcelModel = mongoose.model('ExcelSchema', ExcelSchema);
