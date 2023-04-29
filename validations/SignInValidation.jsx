const { check } = require("express-validator")

const signInValidation = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail().normalizeEmail()
        .withMessage("Not Correct Email"),

    check("password")
        .notEmpty()
        .withMessage("password required")
        .isLength({ min: 3 })
        .withMessage("password must be min 3 Symbol"),
]

module.exports = signInValidation