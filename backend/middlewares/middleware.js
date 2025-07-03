const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const { JWT_SECRET } = require('../env/config');


function Authmiddleware (req, res, next) {

    const token = req.headers['authorization'].split(' ')[1];

    try{
        const decodedtoken = jwt.verify(token, JWT_SECRET);

        if(!decodedtoken) {
           return res.status(401).send("Invalid token")
        } 
        
        req.userId = decodedtoken.userId;
        next();

    } catch(e) {
        res.status(403).json({
            message: " unable to authorize "
        })
    }
}

module.exports = Authmiddleware;