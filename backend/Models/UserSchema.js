const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
 
    firstName:{
        type:String,
        required:true
    },
    lastName:String,
    roles:String,
    age:Number,
    email: {type:String, index: true, required:true, unique: true},
    password: {type:String, required:true},
})

module.exports = mongoose.model("user",UserSchema)