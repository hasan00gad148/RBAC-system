

const {Article,User} = require('../models/models');
const { Op } = require('sequelize');
const roles = require('../utills/Roles');





async function getArticles(req, res){
    try {
        let articles =await Article.findAll({  order: [
            ['createdAt', 'DESC']
          ],  include: [{
            model: User,
          }]});
        articles = articles.map((article)=>article.toJSON());
        return res.status(200).json({ok: true, articles: articles});
    } catch (error) {
        return res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}








async function addArticle(req, res){
    try {
        const article = await Article.create({title: req.body.title, content:req.body.content, user_id:req.user.id})
        if(article)
            return res.status(200).json({ok:true, article:article.toJSON()})
        else
            return res.status(500).json({ok: false, message:"something went wrong"});
    } catch (error) {
        return res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}








async function searchArticle(req, res){
    try {
        const articles = await Article.findAll({
            where: {
                [Op.or]: [
                    { id: req.query.identifier },
                    { title: { [Op.like]: `%${ req.query.identifier}%`} },
                ]
            }
        });
        if(articles)
            return res.status(200).json({ok:true, articles:articles.map(article => article.toJSON())});
        else
            return res.status(404).json({ok: true, message:"article not found"});
    } catch (error) {
        return res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }

}









async function userArticles(req, res){
    try {
        const articles = await Article.findAll({
            order: [
                ['createdAt', 'DESC']
              ],
            where: {user_id: Number(req.user.id)}
        });
        if(articles)
            return res.status(200).json({ok:true, articles:articles.map(article => article.toJSON())});
        else
            return res.status(404).json({ok: true, message:"article not found"});
    } catch (error) {
        return res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }

}








async function getArticle(req, res){
    try {
        const article = await Article.findByPk(Number(req.params.id));
        if(article)
            return res.status(200).json({ok:true, article:article.toJSON()})
        else
            return res.status(404).json({ok: true, message:"article not found"});
    } catch (error) {
        return res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}








async function editArticle(req, res){
    try {
        const article = await Article.findByPk(Number(req.params.id));
        if(!article)
           return res.status(404).json({ok: true, message:"article not found"});

        if (article.user_id === req.user.id){        
            const [updated] = await Article.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) 
                return res.status(200).json({ok: true, message:"article updated successfully"});
            else 
                return res.status(500).json({ok: true, message:"something went wrong!!!, please try again later "});
        }
        else
            return res.status(403).json({ok: false, message:"not authorized"});
    } catch (error) {
        return res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}







async function delArticle(req, res){
    try {
        const article = await Article.findByPk(Number(req.params.id));
        if(!article)
           return res.status(404).json({ok: true, message:"article not found"});

        if (article.user_id === req.user.id || req.user_role.roleName === roles.admin) {

            const deleted = await Article.destroy({
                where: { id: req.params.id }
            });
            if (deleted) 
                return res.status(200).json({ok: true, message:"article deleted successfully"});
            else 
            return res.status(404).json({ok: true, message:"article not found"});
        }
        else
            return res.status(403).json({ok: false, message:"not authorized"});
    } catch (error) {
        return res.status(500).json({ok: false, message:"something went wrong, please try again later", error: error.message});
    }
}


module.exports = {
            getArticles, addArticle,  searchArticle,
            userArticles, getArticle, editArticle, delArticle
        }