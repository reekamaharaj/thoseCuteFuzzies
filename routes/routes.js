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
                result.saved = false;

                db.Article.findOne({ title: result.title }, function (
                    err,
                    found
                ) {
                    if (err) {
                        console.log(err);
                    }
                    if (found) {
                        console.log("This has been saved");
                    } else {
                        db.Article.create(result)
                            .then(function (dbArticle) {})
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                });
            });
            res.redirect("/");
        });
    });

    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.parms.id })
            .populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate(
                    { _id: req.params.id },
                    { note: dbNote._id },
                    { new: true }
                );
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.put("/articles/:id", function (req, res) {
        db.Article.updateOne({ _id: req.params.id }, { saved: req.body.saved })
            .populate("note")
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};
