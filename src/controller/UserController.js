import userModel from '../model/user'

module.exports = {
  createUser: (req, res) => {
    const dataObj = {
      email: 'tuanvipandpro@gmail.com',
      name: 'Tuấn Lê Minh',
      avatar: 'https://lh3.googleusercontent.com/ogw/AOh-ky1W_YktrFDiFWbRWXJEQHJLlBhKKqi2FtLu4mIa=s32-c-mo'
    }

    new userModel(dataObj).save()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error : e, msg: 'Something error !!!'})
    })
    res.status(200)
  }
}