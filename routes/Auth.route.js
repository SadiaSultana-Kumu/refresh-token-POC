const express = require('express')
const createError = require('http-errors')
const mongoose = require("mongoose");
const router = express.Router()
const User = mongoose.model("User")
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../lib/utils')

router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const doesExist = await User.findOne({ email: email })
        const user = new User({ email, password })
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)
        res.send({ accessToken, refreshToken })
    } catch (error) {
        console.log("error--> 20", error);
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw createError.NotFound('User not registered')
        const isMatch = await user.isValidPassword(req.body.password)
        if (!isMatch)
            throw createError.Unauthorized('Username/password not valid')

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)
        res.send({ accessToken, refreshToken })
    } catch (error) {
        console.log("error--> 37", error);
        next(error)
    }
})

router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
  
        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        res.send({ accessToken: accessToken, refreshToken: refToken })
      } catch (error) {
        next(error)
      }
})

router.delete('/logout', async (req, res, next) => {
    res.send("hello from logout")
})

module.exports = router