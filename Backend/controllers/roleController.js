const {User,Role,Permission} = require('../models/models');



async function getAllRoles(req, res){
    try {
        const roles =await Role.findAll();
        console.log("roles", roles);
        return res.status(200).json({ok:true, roles:roles});
    } catch (error) {
        return res.status(500).json({ok:false, message:"something went wrong, please try again later" ,error:error.message});
    }
}

async function getAllPermissions(req, res){
    try {
        const permissions = await Permission.findAll();
        return res.status(200).json({ok:true, permissions:permissions});
    } catch (error) {
        return res.status(500).json({ok:false, message:"something went wrong, please try again later" ,error:error.message});
    }
}

module.exports = {getAllRoles, getAllPermissions}