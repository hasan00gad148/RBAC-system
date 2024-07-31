require('dotenv').config();

const jwt = require('jsonwebtoken');
const {User} = require('../models/models');
const bcrypt = require('bcrypt');







async function register(req, res, next) {
    try {
        const existingUser = await User.findOne({where: {email: req.body.email}})
        console.log(existingUser);
        if (existingUser)
            return res.status(409).json({ok:false, message:"User already registered"})

        const hashedpassword = await bcrypt.hash(req.body.password, 8)
        const user = await User.create({userName:req.body.username, password:hashedpassword, 
            email:req.body.email, phone:req.body.phone, role_id:3})

        console.log("user:  ",user.toJSON());
    
        const token = jwt.sign( {user_id:user.id}, process.env.TOKEN_SECRET, { expiresIn: '18000s' })
        return res.status(200).json({ok:true, user, token})
    } catch (error) {
        return res.status(500).json({ok:false, message:"something went wrong, please try again later", error:error.message})
    }
}


async function login(req, res, next) {
    try {
        const user = await User.findOne({where: {email: req.body.email}}) 
        if (!user)
            return res.status(401).json({ok:false, message:"User not found"})

        const isSame = await bcrypt.compare(req.body.password,user.password)
        if (!isSame)
            return res.status(401).json({ok:false, message:"wrong password or email"})

        const token = jwt.sign( {user_id:user.id}, process.env.TOKEN_SECRET, { expiresIn: '18000s' })
        return res.status(200).json({ok:true, user, token})
    } catch (error) {
        return res.status(500).json({ok:false, message:"something went wrong, please try again later", error:error.message})
    }
}



module.exports = {register, login}