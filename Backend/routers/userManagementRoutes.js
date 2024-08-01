require('dotenv').config();
const express = require('express');
const permissions = require('../utills/Permissions')
const {authenticateToken, authenticateRole} = require("../middlewares/authMiddleware")
const {User,Role,Permission} = require('../models/models');
const {getUsers, getUser, searchUser, addUser, updateUserRole, delUser} = require('../controllers/userController');



const app = express.Router();


app.use(authenticateRole([permissions.manageUsers,  permissions.manageRoles]))

app.get("/users", getUsers);

app.post("/users/add", addUser);

app.get("/users/search", searchUser);

app.get("/users/:id", getUser);

app.post("/users/:id/editrole", updateUserRole);

app.post("/users/:id/del", delUser);



module.exports = {usermanagementRouter:app}