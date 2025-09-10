const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not Valid!");
    }
    else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("FirstName should be 4-50 characters");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not Valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not Valid");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ];

    /* Object.keys iterate through all the keys of the req.body &
     * checks for every field that it is included in the allowedEditFields or not??
     */
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    return isEditAllowed ? true : false;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}

