require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/auth.router");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

const PORT = process.env.PORT || 4000

app.use("/auth", authRouter);

app.listen(PORT, () => console.log("server running at", PORT));

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to DB"))
.catch(() => console.log("failed to connect DB"))
