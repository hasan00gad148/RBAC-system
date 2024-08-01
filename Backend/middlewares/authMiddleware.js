
const jwt = require('jsonwebtoken');
const {User, Role, Permission} = require('../models/models');


function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ok:false, message: "not authenticated"});
  
    jwt.verify(token, process.env.TOKEN_SECRET,async (err, data) => {
      if (err) return res.status(403).json({ok:false, message: "wrong jwt token"});

      try {
        req.user = await User.findByPk(Number(data.user_id));
        // console.log(req.user, data.user_id);
        req.user_role = await Role.findByPk(req.user.role_id);
        
        next();
      } catch (error) {
        return res.status(500).json({ok:false, message: "something went wrong, please try again later",error: error.message});
      } 
    });
}

function authenticateRole(permissions){
    return async (req, res, next) =>{
      try {

           
          let rolePermissions =await Permission.findAll({
            attributes: ['permissionName'],
            include: {
              model: Role,
              where: { id: req.user_role.id},
              }
          })
          rolePermissions = rolePermissions.map((permission) => permission.permissionName)


          const hasCommonPermission = permissions.some(element => rolePermissions.includes(element));
          console.log("Role permissions:  ", hasCommonPermission, rolePermissions, permissions)
          
          if (hasCommonPermission)
            next()
          else
            return res.status(401).json({ok:false, message: "not authorized"});
      } catch (error) {
        return res.status(500).json({ok:false, message: "something went wrong, please try again later",error: error.message});
      }

    }
}

module.exports = {authenticateToken, authenticateRole};