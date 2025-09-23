const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);

connectDB()
    .then(() => {
        console.log("Database Connected Successfully");
        app.listen(3000, () => {
            console.log("Server is Up and Running");
        })
    })
    .catch(err => {
        console.log("Database cannot be connected");
    })