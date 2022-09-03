import jwtUtils from '../utils/jwtUtils'

const verifyJwtToken = (req, res, next) => {
  const token = req.header('Authorization')

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

const jwtMiddleware = (req, res, next) => {
  const url = req.url

  if (url.startsWith('/api/')) {
    verifyJwtToken(req, res, next)
  } else {
    next()
  }

}

module.exports = {
  jwtMiddleware
}