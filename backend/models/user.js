const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photos: {
        type: Array,
        required: true
    },
    loggedDives: {
        type: Array,
        required: true
    },
    diveSitesAdded: {
        type: Array,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    profilePhotoURL: {
        type: String,
        required: false
    },
})

userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports = mongoose.model("User", userSchema, "users")