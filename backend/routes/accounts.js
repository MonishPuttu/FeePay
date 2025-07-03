const express = require("express");
const Authmiddleware = require("../middlewares/middleware");
const { AccountModel } = require("../database/db");
const { default: mongoose } = require("mongoose");
const AccRouter = express.Router();


AccRouter.get("/balance", Authmiddleware, async(req, res) => {
    const userId = req.userId;
    
    try {
        currUser = await AccountModel.findOne({userId})
        res.status(200).json({
            message: (`Your current balance is: ${currUser.balance}`)
        })

        if (!currUser) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

    } catch(e) { 
        console.log(e)
        res.status(500).json({
            message: "server not responding"
        })
    }
})

AccRouter.post("/transfer", Authmiddleware, async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    const fromAcc = await AccountModel.findOne({userId: req.userId}).session(session);

    if (!fromAcc || fromAcc.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAcc = await AccountModel.findOne({userId: to}).session(session);

    if(!toAcc) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }

    await AccountModel.updateOne({userId: req.userId}, { $inc: {balance:-amount}}).session(session);
    await AccountModel.updateOne({userId: to}, { $inc: { balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transaction successful"
    })

})


module.exports = AccRouter;
