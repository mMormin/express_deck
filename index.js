require("dotenv").config();
const express = require("express");
const session = require("express-session");
const router = require("./app/router");

const app = express();
const PORT = process.env.PORT || 1234;

app.set("view engine", "ejs");
app.set("views", "app/views");

app.use(express.static("public"));

app.use(
  session({
    secret: "Ceci est un s3cr3t même si tu peux le lire rn!",
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 },
  })
);

app.use((req, res, next) => {
  if (!req.session.deck) {
    req.session.deck = [];
  }
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
