const Task = require("../models/Task.jsx")

exports.CreateTask = async (req, res) => {
    const data = req.body;
    const userId = req.user.id
    const task = new Task({
        ...data,
        userId
    });
    await task
        .save()
        .then((result) => {
            console.log("task created")
            res.status(201).json(result)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: "error create task" })
        })
    res.status(201)
}

exports.GetTasks = (req, res) => {

    const userId = req.user.id
    Task.find({ userId: userId })
        .then(async (tasks) => {
            console.log("get tasks")
            return res.status(200).json({ tasks })
        })
}

exports.GetAllTasks = (req, res) => {
    Task.find()
        .then(async (tasks) => {
            console.log("get tasks")
            return res.status(200).json({ tasks })
        })
}

exports.UpdateTask = async (req, res) => {
    const { status, title, description, id, updateAt } = req.body
    Task.findOne({ _id: id })
        .then(async (task) => {
            if (!task) {
                return res.status(402).json({ message: "Wrong changes" })
            }
            Task.findByIdAndUpdate(id, {
                status,
                title,
                description,
                updateAt
            }, { new: true })
                .then((task) => {
                    console.log("Task updated")
                    res.status(200).json({ task })
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({ message: "Error Updating task" })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Task changing failed" })
        })
}

exports.DeleteTask = async (req, res) => {
    const { id } = req.body
    Task.findOne({ _id: id })
        .then(async (task) => {
            if (!task) {
                return res.status(402).json({ message: "this task is not exist" })
            }
            Task.deleteOne({ _id: id })
                .then(task => {
                    console.log("Task deleted")
                    res.status(200).json({ message: "task deleted" })
                })
                .catch(err => {
                    res.status(500).json({ message: "Error deleting task" })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "task deleting failed" })
        })
}