const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    age: { type: Number, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    role: { type: String, default: null },
    createAt: { type: String, default: null }
})

module.exports = mongoose.model("User", userSchema)