const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Categories: {
            type: [String],
            required: true
    }
});

module.exports = mongoose.model('Employee',employeeSchema)