const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index"));
app.post("/", (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log(firstName, lastName, email);
  const data = {
    // parameters defined by MailChimp
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const JSONdata = JSON.stringify(data);

  const options = {
    url: `https://${keys.mailchimpServer}.api.mailchimp.com/3.0/lists/${keys.mailchimpListID}`,
    method: "POST",
    headers: {
      Authorization: `${keys.mailchimpUsername} ${keys.mailchimpKey}`
    },
    body: JSONdata
  };

  request(options, (error, response, body) => {
    if (error) {
      res.render("failure");
    } else {
      response.statusCode === 200
        ? res.render("success")
        : res.render("failure");
    }
  });
});

app.post("/failure", (req, res) => res.redirect("/"));

app.listen(3000, () => console.log("🎉 Server is running on port 3000"));
