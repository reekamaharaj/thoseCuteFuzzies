const db = require("./models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {
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
}
