const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add Username"],
        unique: [true, "Username already taken"]
    },
    email: {
        type: String,
        required: [true, "Please add Email"],
        unique: [true, "Email already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add password"],
    },
    isAdmin: {
        type: Boolean
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema)