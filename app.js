require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express()
const mongoose = require("mongoose")
const http = require('http');
const server = http.createServer(app);
const bodyParser = require("body-parser");
app.use(express.static('public'));
app.use(express.json());
const UserMiddleware = require("./middleware/UserMiddleware.jsx")
const AdminMiddleware = require("./middleware/AdminMiddleware.jsx")
const signInValidation = require("./validations/SignInValidation.jsx")
const { PORT, HOST, DB } = require("./constants/index");
const { AddUser, SignIn, me, AllUsers } = require("./controllers/UserController.jsx");
const { CreateTask, GetTasks, UpdateTask, GetAllTasks, DeleteTask } = require("./controllers/TaskController.jsx");


mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("conected to DB"))
    .catch((error) => console.log(error))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
}));

app.post("/create-user", AdminMiddleware, AddUser)
app.get("/me", UserMiddleware, me)
app.post("/sign-in", signInValidation, SignIn)
app.post("/create-task", UserMiddleware, CreateTask)
app.get("/get-tasks", UserMiddleware, GetTasks)
app.get("/get-all-tasks", GetAllTasks)
app.put("/update-task", UserMiddleware, UpdateTask)
app.post("/users", AdminMiddleware, AllUsers)
app.delete("/delete-task", DeleteTask)
server.listen(PORT, HOST, (error) => {
    if (error) {
        console.log(error)
    }
    console.log(`http://${HOST}:${PORT}`)
})