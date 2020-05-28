const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.lovemeow.com/").then(function (response) {
            const $ = cheerio.load(response.data);
            $("div .widget__head").each(function (i, element) {
                let result = {};
                result.title = $(this).children("a").attr("aria-label");
                result.link = $(this).children("a").attr("href");
                result.img = $(this)
                    .children("a")
                    .children("div")
                    .attr("data-runner-img-sd");

                db.Article.findOne({ title: result.title }, function ( err, found ) {
                    if (err) { console.log(err); }
                    if (found) { console.log("This has been saved"); } else {
                        db.Article.create(result)
                            .then(function (dbArticle) {})
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                });
            });
        });
        res.send(200);
    });

    app.get("/", function (req, res) {
        db.Article.find()
            .lean()
            .then(function (data) {
                res.render("index", { message: "home", article: data, nothing: "You should click the button for articles" });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/saved", function (req, res) {
        db.Article.find({ saved: true })
            .lean()
            .then(function (data) {
                res.render("saved", { message: "saved", article: data, nothing: "There are no saved articles right now :c"});
            });
    });

    app.get("/articles", function(req, res) {
        db.Article.find({})
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.parms.id })
            .populate("note")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
            .then(function(dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // app.get("/save", function(req, res) {
    //     db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
    //     .populate("saved")
    //     .then(function(dbArticle) {
    //         res.json(dbArticle);
    //     })
    //     .catch(function(err) {
    //         res.json(err);
    //     });
    //     console.log("saved article");
    // });

    app.get("/login", function (req, res) {
        res.render("login", { message: "login" });
    });

    app.get("/register", function (req, res) {
        res.render("register", { message: "register" });
    });
};
