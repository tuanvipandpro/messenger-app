import jwtUtils from '../utils/jwtUtils'

const verifyJwtToken = (req, res, next) => {
  const token = req.headers['Authorization']

  if (!token) {
    res.status(403).json({status: 403, msg: 'A token is required for authentication !!!'})
  }

  try {
    const user = jwtUtils.validateToken(token)
    req.user = user
    next()
  } 
  catch(e) {
    res.status(401).json({status: 401, msg: 'Invalid token !!!'})
  }
}

module.exports = {
  verifyJwtToken
}