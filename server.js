//Dependancies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const exphbs = require("express-handlebars");

//Express setup
const PORT = 3000;
const app = express();

//Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
// require("./routes/routes")(app);

//Connect to Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

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
    res.send("scrape");
});

// Start the server
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});

module.exports = app;