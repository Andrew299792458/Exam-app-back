const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },
    createAt: { type: Date, default: null },
    updateAt: { type: Date, default: null },
    status: { type: String, default: null }
})

module.exports = mongoose.model("Task", taskSchema)