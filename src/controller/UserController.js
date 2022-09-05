import userModel from '../model/user'
import firebase from '../../firebase'
import { createToken } from '../utils/jwtUtils'
import { checkEmptyObject } from '../utils/commonUtils'

module.exports = {
  loginWithFirebaseToken: async (req, res) => {
    const body = req.body
    firebase.validateIdToken(body.firebaseToken).then(tokenDecode => {
      const payload = {
        email: tokenDecode.email,
        name: tokenDecode.name,
        avatar: tokenDecode.picture,
      }

      const jwtToken = createToken(payload)

      userModel.findOne({email: tokenDecode.email}, (err, doc) => {
        if (err) console.error(err)

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
          new userModel({isDisable: false , ...payload}).save().then(data => {
            res.status(200).json({
              token: jwtToken,
              oldUser: false,
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
    const pageNum = req.query.pageNum // limit = pageNum
    const pageNo = req.query.pageNo // skip = pageNum * (pageNo - 1)

    if (pageNo <= 0 || pageNum <= 0) {
      res.status(400).json({msg: 'Params is not invalid !!!'})
    }

    try {
      const count = await userModel.count({isDisable: false})
      const data = await userModel.find({isDisable: false}).skip(pageNum * (pageNo - 1)).limit(pageNum)
      res.status(200).json({
        pageNo: pageNo,
        pageNum: pageNum,
        count: count,
        data: data.filter(e => e.email != req.user.email)
      })
    } catch(e) {
      console.error(e)
      res.status(500).json({msg: 'ERROR !!!'})
    }
  }
}