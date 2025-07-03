const express = require("express");
const MainRouter = express.Router();
const UserRouter = require('./user');
const AccRouter = require("./accounts");

MainRouter.use("/user", UserRouter)

MainRouter.use("/account", AccRouter)



module.exports = MainRouter;
