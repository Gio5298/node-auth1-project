const express = require('express')
const router = express.Router()
const signIn = require('./user-model')
const bcrypt = require('bcryptjs')

router.get("/", async (req, res, next) => {
  const users = await Signup.get()
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
      const newUser = await Signup.signup(req.body)
      res.json(newUser)
  }
  catch(err) {
      next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let { username, password } = req.body
    const user = await signIn.getUser({ username })
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      res.status(200).json({
        message: `Welcome ${user.username}!`
      })
    } else {
      res.status(401).json({
        error: `Invalid credentials.`
      })
    }
  }
  catch(err) {
    next(err)
  }
})

module.exports = router;
