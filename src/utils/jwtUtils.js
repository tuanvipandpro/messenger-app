import {sign, verify} from 'jsonwebtoken'

const privateKey = process.env.TOKEN_KEY
const expiresIn = process.env.TOKEN_EXPIRES

module.exports = {
  createToken: (data) => {
    const payload = {
      createdAt: new Date(),
      ...data
    }

    const token = sign(payload, privateKey, {
      expiresIn: expiresIn
    })

    return token
  },
  validateToken: (token) => {
    try {
      const decodedToken =  verify(token, privateKey)
      return decodedToken
    }
    catch (e) {
      console.error(e)
      return e
    }
  }
}