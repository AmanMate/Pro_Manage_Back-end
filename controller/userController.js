const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
const registerUser = async(req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const formattedEmail = email.toLowerCase();

        if (!name || !email || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        //yup, joi, express validator

        const isExistingUser = await User.findOne({email: formattedEmail});
        if(isExistingUser){
            return res
            .status(409)
            .json({errorMesage: "User already exists"});
        }

        // User.updateOne()

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email: formattedEmail,
            password: hashedPassword,
        });

        await userData.save();
        
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
            userId: userDetails._id,
            name: userDetails.name,
        });
     
    } catch (error){
        next(error);
    }
}

//Update
const updateUser = async (req, res, next) => {
    try {
        const { name, email, oldEmail, oldPassword, newPassword } = req.body;
        
        if (!name || !email || !oldPassword || !newPassword) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        
        const formattedEmail = oldEmail.toLowerCase();

        const user = await User.findOne({ email: formattedEmail });
        if (!user) {
            return res.status(404).json({
                errorMessage: "User not found",
            });
        }

        const isOldPasswordMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordMatched) {
            return res.status(409).json({
                errorMessage: "Invalid old password",
            });
        }
        console.log(name);
        if(name!=user.name){
            user.name = name;
        }
        if(email!=oldEmail){
            user.email = email;
        }
        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.json({ message: "User updated successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
}