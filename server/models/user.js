const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [false, "email must be provided"],
        unique: true,
    },
    password: {
        type: String,
        required: [false, "password must be provided"],
    },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate); // Use userSchema instead of UserSchema

module.exports = mongoose.model('User', userSchema);
