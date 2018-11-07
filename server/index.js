const app = require("express")();
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
require("dotenv").config();

const PORT = 4000;

app.use(bodyParser.json());

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

app.listen(PORT, () => console.log("listening on port: " + PORT));
