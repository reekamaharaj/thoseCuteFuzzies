const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const handlebars = require("express-handlebars");

//for other files

const cheerio = require("cheerio");
const axios = require("axios");

const db = require("./models");

const PORT = 3000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

require("./routes/routes")(app);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});

module.exports = app;