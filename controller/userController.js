const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
const registerUser = async(req, res, next) => {
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        //yup, joi, express validator

        const isExistingUser = await User.findOne({email: email});
        if(isExistingUser){
            return res
            .status(409)
            .json({errorMesage: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email,
            password
        });
        User.save(userData);
        res.json({message: "User registerd successfully"});
    } catch (error){
        next(error);
    }
};
//Login
const loginUser = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        //yup, joi, express validator

        const userDetails = await User.findOne({email: email});
        if(!userDetails){
            return res
            .status(409)
            .json({errorMesage: "User dosen't exists"});
        } 
        
        //compare password
        const isPasswordMached = await bcrypt.compare(
            password,
            userDetails.password
        );
        if(!isPasswordMached){
            return res
            .status(409)
            .json({errorMesage: "Invalid credentials"});
        }

        //jwt
        const token = jwt.sign(
            {userId: userDetails._id}, 
            process.env.SECRET_KEY,
            {expiresIn: "60h"}
        );

        res.json({
            message: "User logged in",
            token: token,
            name: userDetails.name,
        });
     
    } catch (error){
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
}