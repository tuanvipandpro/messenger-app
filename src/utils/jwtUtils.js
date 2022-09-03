import {sign, verify} from 'jsonwebtoken'

const privateKey = 'wJPGpSvuWwB.oUtbaL2fE1Q5eQYn3v4JBtXocfvOW'
const expiresIn = '10h'

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