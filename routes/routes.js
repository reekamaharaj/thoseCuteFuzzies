const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app){

    app.get("/scrape", function(req, res) {
        axios.get("https://www.lovemeow.com/").then(function(response) {
            const $ = cheerio.load(response.data);
            $("div .widget__head").each(function(i, element) {
                let result = {};
                result.title = $(this)
                    .children("a")
                    .attr("aria-label");
                result.link=$(this)
                    .children("a")
                    .attr("href");
                result.img = $(this)
                    .children("a")
                    .children("div")
                    .attr("data-runner-img-sd");

                db.Article.create(result)
                    .then(function(dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
        });
        res.send(200);
    });

    app.get("/", function(req, res) {
        db.Article.find().lean().then(function(data) {
            res.render("index", {message: "home", article: data});
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.get("/saved", function(req, res) {
        res.render("saved", {message: "saved"});
    });

    app.get("/login", function(req, res) {
        res.render("login" , {message: "login"});
    });

    app.get("/register", function(req, res) {
        res.render("register", {message: "register"});
    });

}