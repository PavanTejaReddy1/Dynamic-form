const { login, signup, addForm, getForms, deleteForm, getFormDetails } = require("../controllers/user.controller");
const express = require("express");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/addForm/:id", addForm);
authRouter.get("/getForms/:id", getForms);
authRouter.delete("/deleteForm/:id/:index", deleteForm);
authRouter.get("/getFormDetails/:id/:index", getFormDetails);

module.exports = authRouter;