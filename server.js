const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session"); // npm i express-session
const KnexStore = require("connect-session-knex")(session); // remember to curry and pass the session
const knex = require("./data/dbConfig");

const userRouter = require("./users/user-router");
const server = express();

const sessionsConfig = {
  name: "mmmmmCookie", //sid
  secret: "Nope it is a secret",

  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true
  },
  store: new KnexStore({
    knex: knex,
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 15
  }),
  resave: false,
  saveUninitialized: true // GDPR laws against setting cookies
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionsConfig));

server.use("/api/users", userRouter);

module.exports = server;
