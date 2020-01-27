const db = require('../data/db-config')
const bcrypt = require('bcryptjs')

module.exports = {
  get,
  getUser,
  signup
}

function get() {
  return db('users')
}

async function getUser(filter) {
  return db('users').where(filter).select('id', 'username', 'password').first
}

async function signup(creds) {
  const hashPassword = bcrypt.hashSync(creds.password, 13)
  creds.password = hashPassword

  const user = await db('users').insert(creds)
  return user
}
