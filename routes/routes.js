const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/saved", function(req, res) {
        res.render("saved");
    });

    app.get("/login", function(req, res) {
        res.send("login");
    });

    app.get("/register", function(req, res) {
        res.send("register");
    });

    app.get("/scrape", function(req, res) {
        axios.get("https://www.goodnewsnetwork.org/category/news/animals/").then(function(res) {
        let $ = cheerio.load(res.data);
            $("div .td-block-span6").each(function(i, element) {
                let result = {};
                result.title = $(this).children("a").attr("title");
                result.link = $(this).children("a").attr("href");
                result.img = $(this).children("img").attr("src");

                db.Article.create(result)
                .then(function (dbArticle){
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
            })
    });
    res.send("scrape");
    });
}

//boredpanda, lovemeow, the onion, 