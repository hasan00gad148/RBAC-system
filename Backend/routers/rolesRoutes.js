require('dotenv').config();
const express = require('express');
const {getAllRoles, getAllPermissions} = require('../controllers/roleController');
const {authenticateToken, authenticateRole} = require("../middlewares/authMiddleware")
const permissions = require('../utills/Permissions')
const app = express.Router();



app.get("/roles",authenticateRole([permissions.manageUsers,  permissions.manageRoles]), getAllRoles);

app.get("/permissions",authenticateRole([permissions.manageUsers, permissions.manageRoles]), getAllPermissions);

module.exports = {rolesRouter:app}