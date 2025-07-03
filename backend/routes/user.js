const express = require("express");
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const { UserModel, AccountModel } = require("../database/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../env/config");
const zod = require("zod");
const Authmiddleware = require("../middlewares/middleware")


const signupValidation = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

const signinValidation = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateValidation = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
})

UserRouter.post("/signup", async (req, res) => {

    const { success, data, error } = signupValidation.safeParse(req.body);

    if(!success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            errors: error.errors 
        })
    } 

    const { username, firstname, lastname, password } = data;

       try {
        const existingUser = await UserModel.findOne({username});
    
        if(existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
    
        const user = await UserModel.create({
            username, password: hashedpassword, firstname, lastname
        });

        const userId = user._id

        await AccountModel.create({
            userId,
            balance: (Math.random() * 10000) + 1
        })

         res.status(201).json({
            message: "User has been created successfully"
        })
    
       } catch(e) {

        console.log("error during signup", e);
        res.status(500).json({
            message: "sever not responding"
        })
    }
})
    
UserRouter.post("/signin", async (req, res) => {
    
    const { success, data, error } = signinValidation.safeParse(req.body);
    
    if(!success) {
        return res.status(411).json({
            message: "Incorrect inputs",
            errors: error.errors
        })
    } 

    const { username, password } = data;

    try{
        const existingUser = await UserModel.findOne({username});
    
        if(!existingUser) {
            return res.status(401).json({
               message: "User does not exist"
           })
        }
    
        const storedhash = existingUser.password;
        const verifiedpassword = await bcrypt.compare(password, storedhash);
        const userId = existingUser._id;
    
        if(verifiedpassword) {
            const token = jwt.sign({userId}, JWT_SECRET);
            res.status(202).json({
                message: "User has been signed in",
                token: token
            })
        }

    } catch(e) {

        console.log("error while signin", e);
        res.status(500).json({
            message: "server not responding"
        })
    } 
})

UserRouter.put("/update", Authmiddleware, async (req, res) => {

    const { success, data, error } = updateValidation.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Incorrect credentials",
            errors: error.errors
        })
    } 

    const { firstname, lastname, password } = data;

    if(!firstname && !lastname && !password) {
        return res.status(400).json({
            message: "No UpdateFields provided"
        })
    }

    try {
        const _id = req.userId;
        const UpdateFields = {};

        if(firstname || lastname) {
            UpdateFields.firstname = firstname;
            UpdateFields.lastname = lastname;
        } 

        if(password) {
            const hashedpassword = await bcrypt.hash(password, 10);
            UpdateFields.password = hashedpassword;
        }

        const UpdatedUser = await UserModel.findByIdAndUpdate(_id, 
            {$set: UpdateFields}, {new: true})
        
        if(!UpdatedUser) {
            return res.status(403).json({
                message: "Unable to update users"
            })
        }
        res.status(200).json({
            message: "User updated successfully",
        });

    } catch(e) {
        console.log("error while updating", e);
        res.status(500).json({
            message: "server not responding"
        })
    }
})

UserRouter.get("/bulk", async(req, res) => {

    try {
        const { firstname } = req.query;
         
        if(!firstname) {
            return res.status(400).json({
                message: "User details required"
            });
        }

        const filter = {}
        if(firstname) filter.firstname = { $regex: new RegExp(firstname, "i")};
        // if(lastname) filter.lastname = { $regex: new RegExp(lastname, "i")};

        const user = await UserModel.find(filter);

        if(!user.length) {
            return res.status(404).json({
                message: "No users found"
            });
        }

        const userList = user.map(user => ({
            firstname: user.firstname,
            // lastname: user.lastname,
            userId: user._id
        }));

        res.status(200).json({
            message: "User details found",
            users: userList
        });

    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Server not responding"
        });
    }
})



module.exports = UserRouter;

