const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index"));
app.post("/", (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log(firstName, lastName, email);
});

app.listen(3000, () => console.log("🎉 Server is running on port 3000"));
