import userModel from '../model/user'
import firebase from '../../firebase'
import { createToken } from '../utils/jwtUtils'

const checkEmptyObject = (o) => {
  return (o && Object.keys(o).length === 0 && Object.getPrototypeOf(o) === Object.prototype)
}

module.exports = {
  loginWithFirebaseToken: async (req, res) => {
    const body = req.body
    firebase.validateIdToken(body.firebaseToken).then(tokenDecode => {
      const payload = {
        email: tokenDecode.email,
        name: tokenDecode.name,
        avatar: tokenDecode.picture
      }

      const jwtToken = createToken(payload)

      userModel.findOne({email: tokenDecode.email}, (err, doc) => {
        console.log(err, doc)

        if (checkEmptyObject(doc)) {
          if (doc.isDisable) {
            res.status(403).json({msg: 'User is invalid !!!'})
          } else {
            res.status(200).json({
              token: jwtToken,
              oldUser: true,
              ...payload
            })
          }
        } else {
          new userModel(payload).save().then(data => {
            res.status(200).json({
              token: jwtToken,
              oldUser: false,
              isDisable: false,
              ...payload
            })
          })
        }
      })
    }).catch(e => {
      console.error(e)
      res.status(500).json({error : e, msg: 'Token is invalid'})
    })

  },
  getUserAvailable: async (req, res) => {
    const pageNum = req.query.pageNum // limit = pageNo
    const pageNo = req.query.pageNo // skip = pageNum * (pageNo - 1)
    try {
      const count = await userModel.count({isDisable: false})
      const data = await userModel.find({isDisable: false}).skip(pageNum * (pageNo - 1)).limit(pageNo)
      res.status(200).json({
        pageNo: pageNo,
        pageNum: pageNum,
        count: count,
        data: data
      })
    } catch(e) {
      console.error(e)
      res.status(500).json({msg: 'ERROR !!!'})
    }
  }
}