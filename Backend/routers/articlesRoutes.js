require('dotenv').config();
const express = require('express');
const {
    getArticles, addArticle,  searchArticle,
    userArticles, getArticle, editArticle, delArticle
}= require('../controllers/articleController');

const {authenticateRole} = require("../middlewares/authMiddleware")

const permissions = require('../utills/Permissions')





const app = express.Router();





app.get("/articles", authenticateRole([permissions.manageContent,permissions.viewContent]),getArticles)

app.post("/articles/add",authenticateRole([permissions.manageContent,permissions.createContent]),addArticle)

app.get("/articles/search",authenticateRole([permissions.manageContent,permissions.viewContent]),searchArticle)

app.get("/articles/user/",authenticateRole([permissions.manageContent,permissions.viewContent]),userArticles)

app.get("/articles/:id",authenticateRole([permissions.manageContent,permissions.viewContent]),getArticle)

app.post("/articles/:id/edit",authenticateRole([permissions.manageContent,permissions.editContent]),editArticle)

app.post("/articles/:id/del",authenticateRole([permissions.manageContent,permissions.deleteContent]),delArticle)



module.exports = {articlesRoutes:app}