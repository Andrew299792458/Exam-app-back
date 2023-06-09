const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = (req, res, next) => {
    const userRole = req.body.role;
    if (userRole === "admin") {
        const token = req.headers["x-access-token"]
        if (!token) {
            return res.status(403).send("Unauthorized");
        }
        try {
            const decodedUser = jwt.verify(token, process.env.TOKEN_KEY)
            req.user = decodedUser

        } catch (error) {
            console.log(error)
            return res.status(401).send("invalid Token")
        }
        return next()
    } else {
        res.status(403).json({ message: "Unauthorized access" });
    }
};
