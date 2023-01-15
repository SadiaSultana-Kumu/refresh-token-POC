const express = require('express')
const mongoose = require("mongoose");
const router = express.Router()
const User = mongoose.model("User")
const { signAccessToken } = require('../lib/utils')

router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const doesExist = await User.findOne({email: email})
        console.log(doesExist);
        const user = new User({email, password})
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id)
        res.send({accessToken})
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    res.send("hello from login")
})

router.post('/refresh-token', async (req, res, next) => {
    res.send("hello from refresh token")
})

router.delete('/logout', async (req, res, next) => {
    res.send("hello from logout")
})

module.exports = router