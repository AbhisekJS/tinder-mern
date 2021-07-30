// initialize mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define the Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    imgUrl:{
        type: String
    }
},{
    timestamps: true,
})

// Initialize the model Schema
const User = mongoose.model('User', userSchema)

module.exports = User;