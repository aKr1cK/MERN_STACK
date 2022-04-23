const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true 
    },
    phone:{
        type: Number,
        required: true 
    },
    work:{
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true 
    },
    cpassword:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        required: true 
    },
    currentPlan:{
        type: String,
        required: true
    },
    isPlanActive:{
        type: Boolean,
        required: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 4);
        this.cpassword = await bcrypt.hash(this.cpassword, 4);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRETKEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;
