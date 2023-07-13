import mongoose from 'mongoose';

const ExcelSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    },
    Gender:{
        type: Boolean,
        required: true
    },
    Message:{
        type: Number,
        required: true
    },
},{timestamps: true}
)

module.exports = mongoose.model("ExcelSchema",ExcelSchema)