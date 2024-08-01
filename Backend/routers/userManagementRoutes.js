require('dotenv').config();
const express = require('express');
const permissions = require('../utills/Permissions')
const {authenticateToken, authenticateRole} = require("../middlewares/authMiddleware")
const {User,Role,Permission} = require('../models/models');
const {getUsers, getUser, searchUser, addUser, updateUserRole, delUser} = require('../controllers/userController');



const app = express.Router();


app.get("/users",authenticateRole([permissions.manageUsers,  permissions.manageRoles]), getUsers);

app.post("/users/add",authenticateRole([permissions.manageUsers,  permissions.manageRoles]), addUser);

app.get("/users/search",authenticateRole([permissions.manageUsers,  permissions.manageRoles]), searchUser);

app.get("/users/:id",authenticateRole([permissions.manageUsers,  permissions.manageRoles]), getUser);

app.post("/users/:id/editrole",authenticateRole([permissions.manageUsers,  permissions.manageRoles]), updateUserRole);

app.post("/users/:id/del",authenticateRole([permissions.manageUsers,  permissions.manageRoles]), delUser);



module.exports = {usermanagementRouter:app}