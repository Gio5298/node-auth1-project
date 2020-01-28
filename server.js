const express = require('express');
const helmet = require('helmet');
const dbConfig = require('./data/db-config')
const userRouter = require('./user/user-router')
const session = require('express-session')
const KnexConnectionStore = require('connect-session-knex')(session)

const server = express()

server.use(helmet());
server.use(express.json())
server.use(
  session({
      name: "session_name",
      secret: "my name is peter parker",
      cookie: {
          maxAge: 1000 * 60 * 15,
          secure: true,
      },
      httpOnly: true,
      resave: false,
      saveUninitialized: false,
      store: new KnexConnectionStore({
          knex: dbConfig,
          createtable: true
      })
  }))

server.use('/', (req, res, next) => {
  res.json({
    message: 'HI there!'
  })
});

module.exports = server;
