const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const planSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    price:{
        type: String,
        required: true 
    },
    duration:{
        type: Number,
        required: true 
    }
});

const Plan = mongoose.model('PLAN', planSchema);
module.exports = Plan;