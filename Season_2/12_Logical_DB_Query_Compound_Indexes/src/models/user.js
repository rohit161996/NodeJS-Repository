const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
        },
        lastName: {
            type: String,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address" + value);
                }
            }
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "Others"].includes(value)) {
                    throw new Error("Gender data is not Valid");
                }
            }
        },
        photoUrl: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("The photo URL is not valid");
                }
            }
        },
        about: {
            type: String,
            default: "This is a default about for the User"
        },
        skills: {
            type: [String],
        }
    },
    {
        timestamps: true,
    }
);

userSchema.index({firstName: 1});

userSchema.methods.getJWT = async function () {
    /* 
     * Reference to the user in this Schema 
     * this keyword only works with the function (){} signature 
     * It will not work with the ()=>{}, Arrow Functions
     */
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$790", {
        expiresIn: "1d"
    });

    return token;
}

userSchema.methods.validatePasswords = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
}

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
