
const jwt = require('jsonwebtoken');
const {User, Role, Permission} = require('../models/models');


function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ok:false, message: "not authenticated"});
  
    jwt.verify(token, process.env.TOKEN_SECRET,async (err, data) => {
      if (err) return res.status(403).json({ok:false, message: "wrong jwt token"});

      try {
        req.user = await User.findByPk(Number(data.user_id));
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
              where: { id: req.user.role_id},
              }
          })
          rolePermissions = rolePermissions.map((permission) => permission.permissionName)

          console.log("Role permissions:  ", req.session.permissions )
          
          const hasCommonPermission = permissions.some(element => rolePermissions.includes(element));
    
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