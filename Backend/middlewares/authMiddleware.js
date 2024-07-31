
const jwt = require('jsonwebtoken');
const {User, Role, Permission} = require('../models/models');


function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET,async (err, user_id) => {
      if (err) return res.sendStatus(403).json({ok:false, message: "wrong jwt token"});
     
      try {
        req.user = await User.findByPk(user_id);
        next();
      } catch (error) {
        return res.sendStatus(500).json({ok:false, message: "something went wrong, please try again later",error: error.message});
      } 
    });
}

function authenticateRole(permissions){
    return async (req, res, next) =>{

      try {
          if (!req.session.permissions || !req.session.permissions.length ) {
            const userRole = Role.findByPk(req.user.role_id);
            const rolePermissions = Permission.findAll({where: {role_id:userRole.id}})
            req.session.permissions = rolePermissions
          }

          const hasCommonPermission = permissions.some(element => req.session.permissions.includes(element));
    
          if (hasCommonPermission)
            next()
          else
            return res.sendStatus(401).json({ok:false, message: "not authorized"});
      } catch (error) {
        return res.sendStatus(500).json({ok:false, message: "something went wrong, please try again later",error: error.message});
      }

    }
}

module.exports = {authenticateToken, authenticateRole};