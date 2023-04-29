require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express()
const mongoose = require("mongoose")
const http = require('http');
const server = http.createServer(app);
const { PORT, HOST, DB } = require("./constants/index");


mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("conected to DB"))
    .catch((error) => console.log(error))

server.listen(PORT, HOST, (error) => {
    if (error) {
        console.log(error)
    }
    console.log(`http://${HOST}:${PORT}`)
})