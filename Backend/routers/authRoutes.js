require('dotenv').config();
const express = require('express');

const {register, login, auth} = require('../controllers/authController');

const app = express.Router();


app.get("/auth", auth)
app.post('/register', register)
app.post("/login",login)

module.exports = {authRouter:app}