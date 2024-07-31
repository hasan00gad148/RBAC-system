require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.database_name, 
    process.env.database_username, process.env.database_password, {
  host: process.env.database_localhost,
  dialect: process.env.database_dialect,
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }, 
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });


const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
    permissionName: {
        type: DataTypes.STRING,
        allowNull: false
      },
  });
  
const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING
    },
  },{timestamps: true});





  Role.hasMany(User, { foreignKey: { name: 'role_id', allowNull: false } });
  User.belongsTo(Role, { foreignKey: { name: 'role_id', allowNull: false } });


  const RolePermission = sequelize.define('RolePermissions', {});
  Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'role_id' })
  Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permission_id' })


  User.hasMany(Article, { foreignKey: { name: 'user_id', allowNull: false } })
  Article.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false } })
 

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('All models were synchronized successfully with force.');
//   });


module.exports = {User, Article, Role,RolePermission ,Permission};