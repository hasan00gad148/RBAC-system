require('dotenv').config();

const jwt = require('jsonwebtoken');
const {User, Role} = require('../models/models');
const bcrypt = require('bcrypt');




async function auth(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ok:false, message: "not authenticated"});
  
    jwt.verify(token, process.env.TOKEN_SECRET,async (err, data) => {
      if (err) return res.status(403).json({ok:false, message: "wrong jwt token"});

      try {
        let user = await User.findByPk(Number(data.user_id));
        // console.log(req.user, data.user_id);
        
        
        if (user){
            const role = await Role.findByPk(user.role_id);
            user = user.toJSON();
            user.role = role.roleName;
            return res.status(200).json({ok:true, user:user})
        }
      } catch (error) {
        return res.status(500).json({ok:false, message: "something went wrong, please try again later",error: error.message});
      } 
    });
}


async function register(req, res, next) {
    try {
        const existingUser = await User.findOne({where: {email: req.body.email}})
        console.log(existingUser);
        if (existingUser)
            return res.status(409).json({ok:false, message:"User already registered"})

        const hashedpassword = await bcrypt.hash(req.body.password, 8)
        const user = await User.create({userName:req.body.username, password:hashedpassword, 
            email:req.body.email, phone:req.body.phone, role_id:3})
        const role = await Role.findByPk(user.role_id)
        user.role = role.roleName;
        console.log("user:  ",user.toJSON());
    
        const token = jwt.sign( {user_id:user.id}, process.env.TOKEN_SECRET, )
        return res.status(200).json({ok:true, user, token})
    } catch (error) {
        return res.status(500).json({ok:false, message:"something went wrong, please try again later", error:error.message})
    }
}


async function login(req, res, next) {
    try {
        let user = await User.findOne({where: {email: req.body.email}}) 
        if (!user)
            return res.status(401).json({ok:false, message:"User not found"})

        const isSame = await bcrypt.compare(req.body.password,user.password)
        if (!isSame)
            return res.status(401).json({ok:false, message:"wrong password or email"})

        const token = jwt.sign( {user_id:user.id}, process.env.TOKEN_SECRET,)
        user = user.toJSON()
        const role = await Role.findByPk(user.role_id)
        user.role = role.roleName;
        return res.status(200).json({ok:true, user:user, token})
    } catch (error) {
        return res.status(500).json({ok:false, message:"something went wrong, please try again later", error:error.message})
    }
}



module.exports = {register, login,auth}