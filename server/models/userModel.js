const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:         { type: String, required: true, unique: true },
    email:            { type: String, required: true, unique: true },
    password:         { type: String, required: true },
    goal:             { type: Number, required: true },
    weight:           { type: Number, required: true },
    height:           { type: Number, required: true },
    activityLevel:    { type: Number, required: true },
    gender:           { type: String, required: true },
    weightGainTarget: { type: Number, required: true },
    dateOfBirth:      { type: Date,   required: true },
    points:           { type: Number, default: 0 },
    persistentPoints: { type: Number, default: 0 },
    friends:          { type: Array,  default: [] },
    friendRequests:   { type: Array,  default: [] },
    lastOnline:       { type: Date,   default: Date.now },
    friendCode:       { type: String, default: '' },
    avatar:           { type: String, default: '' },
    googleId:         { type: String, default: '' },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;