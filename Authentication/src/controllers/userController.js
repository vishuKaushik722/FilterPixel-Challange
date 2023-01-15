const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "VISHU";

const signup = async (req, res) => {


    const {username, password} = req.body;

    try {

        const existinguser = await userModel.findOne({username : username});
        if(existinguser) {
            return res.status(400).json({message : "User Already exists"});
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            username : username,
            password : hashedPass,
        });

        const token = jwt.sign({username : result.username, id : result._id}, SECRET_KEY);
        res.status(201).json({user : result, token : token});

    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Something went wrong"})
    }


}

const signin = async (req, res) => {
    const {password, username} = req.body;

    try {

        const existinguser = await userModel.findOne({username : username});
        if(!existinguser) {
            return res.status(404).json({message : "User not found"});
        }

        const matchPass = await bcrypt.compare(password, existinguser.password);

        if(!matchPass) {
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({username : existinguser.username, id : existinguser._id}, SECRET_KEY);
        res.status(201).json({user : existinguser, token});

    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Something went wrong"});
    }
}

module.exports = {signup, signin};