const serverSettings = {
  port: process.env.PORT || 8002,
  basePath: process.env.BASE_PATH || ''
}
const httpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  TOKEN_EXPIRED: 409,
  UNKNOWN_ERROR: 520,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  ADMIN_REQUIRE: 406
}
const configType = {
  GENRE: 1,
  NATION: 2,
  PEOPLE: 3,
  LABEL: 4,
  STUDIO: 5,
  LANGUAGE: 6
}
const cmsConfig = {
  url: process.env.CMS_BE_URL || 'http://localhost:8001'
}
const dbSettings = {
  db: process.env.DB || 'btl-web',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  repl: process.env.DB_REPLS || '',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(',') : [
    '127.0.0.1:27017'
  ]
}
const serverHelper = function () {
  const jwt = require('jsonwebtoken')
  const crypto = require('crypto')
  const secretKey = process.env.SECRET_KEY || '2312'
  const TOKEN_TIME = process.env.TOKEN_TIME || '1d'
  const password = 'b{m\\c;zG"ut?j_3C!Q@M'
  const path = require('path')
  const multer = require('multer')
  const Cryptr = require('cryptr')
  const cryptr = new Cryptr(password)

  function decodeToken (token) {
    return jwt.decode(token)
  }

  function encrypt (text) {
    return cryptr.encrypt(text)
  }

  function decrypt (encrypted) {
    return cryptr.decrypt(encrypted)
  }

  function genToken (obj, expiresIn = TOKEN_TIME) {
    return jwt.sign(obj, secretKey, { expiresIn })
  }

  console.log(genToken({ name: 'worker-appserver' }, '100y'))

  function verifyToken (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        err ? reject(new Error(err)) : resolve(decoded)
      })
    })
  }

  function encryptPassword (password) {
    return crypto.createHash('sha256').update(password, 'binary').digest('base64')
  }


  function generateHash (str) {
    return crypto.createHash('md5').update(str).digest('hex')
  }

  function isValidToken (token) {
    const user = decodeToken(token)
    const now = Date.now() / 1000
    if (user && user._id && user.exp > now) {
      return user
    }
    return null
  }
  function stringToSlug (str) {
    const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ'
    const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy'
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(RegExp(from[i], 'gi'), to[i])
    }

    str = str.toLowerCase()
        .trim()
        .replace(/[^a-z0-9 \-]/g, '')
        .replace(/-+/g, '')

    return str
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fName = file.originalname.split('.')
      const ext = fName.pop()
      const name = `${fName.join('')}-${uniqueSuffix}.${ext}`
      file.pathCustom = `/${name}`
      cb(null, name)
    }

  })
  const upload = multer({ storage: storage })
  return {
    decodeToken,
    encryptPassword,
    verifyToken,
    genToken,
    generateHash,
    isValidToken,
    encrypt,
    decrypt,
    stringToSlug,
    upload
  }
}
module.exports = {
  dbSettings,
  serverHelper: serverHelper(),
  serverSettings,
  httpCode,
  configType,
  cmsConfig,
}
