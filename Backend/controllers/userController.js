const {User,Role,Permission} = require('../models/models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

async function getUsers(req, res){

    try {
        let users =await User.findAll({   
         include: {
            model: Role,
            as: "Role",
            attributes: ["roleName"]
        }});
        users = users.map((user)=>user.toJSON());
        res.status(200).json({ok: true, users: users});
    } catch (error) {
        res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}






async function addUser(req, res){
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 8)
        const user = await User.create( { userName: req.body.username, email: req.body.email, 
             phone:req.body.phone, password: hashedpassword, role_id:req.body.role_id})
        if(user)
            return res.status(200).json({ok:true, user:user.toJSON()})
        else
            res.status(500).json({ok: false, message:"something went wrong"});
    } catch (error) {
        res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}




async function searchUser(req, res){

    try {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { id: req.query.identifier },
                    { email: req.query.identifier },
                    { userName: { [Op.like]: `%${ req.query.identifier}%`} }
                ]
            },
            include: {
                model: Role,
                as: "Role",
                attributes: ["roleName"]
            }
        });
        if(users)
            return res.status(200).json({ok:true, users:users.map(user => user.toJSON())});
        else
            res.status(404).json({ok: true, message:"user not found"});
    } catch (error) {
        res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }

}




async function getUser(req, res){
    try {
        const user = await User.findByPk(Number(req.params.id),
       { include: {
            model: Role,
            as: "Role",
            attributes: ["roleName"]
        }});
        if(user)
            return res.status(200).json({ok:true, user:user.toJSON()})
        else
            res.status(404).json({ok: true, message:"user not found"});
    } catch (error) {
        res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}






async function updateUserRole(req, res){
    try {
        const [updated] = await User.update({role_id:req.body.role_id}, {
            where: { id: req.params.id }
        });

        if (updated) 
            res.status(200).json({ok: true, message:"user updated successfully"});
        else 
            res.status(404).json({ok: false, message:"user not updated"});
        
    } catch (error) {
        res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}





async function delUser(req, res){
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) 
            res.status(200).json({ok: true, message:"user deleted successfully"});
        else 
            res.status(404).json({ok: false, message:"user not deleted "});

    } catch (error) {
        res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}





module.exports = {getUsers, getUser, searchUser, addUser, updateUserRole, delUser};