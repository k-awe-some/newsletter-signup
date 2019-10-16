const express = require("express");
const request = require("request");

const app = express();
app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index"));

app.listen(3000, () => console.log("🎉 Server is running on port 3000"));
