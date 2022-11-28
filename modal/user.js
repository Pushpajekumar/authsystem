const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname:{
        typeof: String,
        default: null
    },
    lastname:{
        typeof: String,
        default: null
    },
    email:{
        typeof: String,
        unique: true
    },
    password:{
        typeof: String,
    },
    // This will be assignment
    token:{
        typeof: String,
        default: null
    }
})

module.exports = mongoose.model("user", UserSchema)

