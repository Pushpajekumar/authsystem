const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname:{
        typeof: String,
    },
    lastname:{
        typeof: String,
    },
    email:{
        typeof: String,
    },
    password:{
        typeof: String
    },
    // This will be assignment
    token:{
        typeof: String,
    }
})

module.exports = mongoose.model("user", UserSchema)

