const jsonwebtoken = require("jsonwebtoken");

module.exports = {
    signAccessToken: (userId) => {
      return new Promise((resolve, reject) => {
        const payload = {}
        const secret = "my secret token"
        const options = {
          expiresIn: '1h',
          issuer: 'kumusadia.com',
          audience: userId,
        }
        jsonwebtoken.sign(payload, secret, options, (err, token) => {
          if (err) {
            console.log(err.message)
            reject(err)
            return
          }
          resolve(token)
        })
      })
    },
}