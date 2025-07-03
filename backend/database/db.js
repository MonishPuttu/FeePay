const mongoose = require('mongoose');
const { MONGOOSE_URL } = require("../env/config");

mongoose.connect(MONGOOSE_URL);


const User = new mongoose.Schema({
    username: {type:String, unique: true, required: true, trim:true, minlength:3, maxlength:30},
    password: {type:String, required: true, minlength:6},
    firstname: {type:String, trim:true, maxlength:50},
    lastname: {type:String, trim:true, maxlength:50}
})

const Accounts = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    balance: {type: Number, required: true}
})

const UserModel = mongoose.model("UserModel", User);
const AccountModel = mongoose.model("AccountModel", Accounts);

module.exports = { UserModel , AccountModel};