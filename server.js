const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

//for other files
const handlebars = require("express-handlebars");
const cheerio = require("cheerio");
const axios = require("axios");

const PORT = 3000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

require("./routes/routes")(app);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});

module.exports = app;