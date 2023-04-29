require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../models/User.jsx")

exports.AddUser = (req, res) => {
    const data = req.body;
    User.findOne({ email: data.email })
        .then(async (user) => {
            if (user) {
                return res.status(403).json({ message: "Email already exists" });
            } else {
                const encryptedPassword = await bcrypt.hash(data.password, 10)
                const userData = {
                    ...data,
                    password: encryptedPassword
                }
                const user = new User(userData);
                user
                    .save()
                    .then((result) => {
                        res.status(201).json(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ message: "Error creating user" });
                    });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Error finding user" });
        });
}

exports.SignIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(async (user) => {
            if (!user) {
                return res.status(402).json({ message: "Wrong email or password" })
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (isPasswordCorrect) {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                }, process.env.TOKEN_KEY,
                    {
                        expiresIn: "30d"
                    })
                return res.status(200).json({ user, token })
            } else {
                res.status(402).json({ message: "Wrong password or email" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: "Error finding user" })
        })
}

exports.me = (req, res) => {
    console.log("authorized")
    try {
        User.findOne({ email: req.user.email })
            .then((user) => {
                res.status(200).json({ user })
            })
            .catch(() => {
                res.status(500).json({ message: "Error finding user" })
            })
    } catch (error) {
        return res.status(401).send("invalid Token")
    }
}

exports.AllUsers = (req, res) => {
    try {
        User.find()
            .then((users) => {
                res.status(200).json({ users })
            })
            .catch(() => {
                res.status(500).json({ message: "Error finding user" })
            })
    } catch (error) {
        return res.status(401).send("invalid Token")
    }
}