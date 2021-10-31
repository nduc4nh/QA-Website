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

  function getAllPermissionOfUser (user) {
    const allPermissionOfUser = {}
    const {
      roles,
      groups
    } = user;
    (roles || []).forEach(role => {
      const { permissions } = role
      permissions.forEach(per => {
        const {
          resources,
          create,
          read,
          delete: deletePer,
          update
        } = per;
        (resources || []).forEach(re => {
          const path = re.path.toLowerCase()
          if (!allPermissionOfUser[path]) {
            allPermissionOfUser[path] = {
              create,
              read,
              update,
              delete: deletePer
            }
          } else {
            if (create) {
              allPermissionOfUser[path].create = create
            }
            if (read) {
              allPermissionOfUser[path].read = read
            }
            if (update) {
              allPermissionOfUser[path].update = update
            }
            if (deletePer) {
              allPermissionOfUser[path].delete = deletePer
            }
          }
        })
      })
    });
    (groups || []).forEach(group => {
      const { roles: groupRoles } = group;
      (groupRoles || []).forEach(role => {
        (roles || []).forEach(role => {
          const { permissions } = role
          permissions.forEach(per => {
            const { resources } = per
            resources.forEach(re => {
              const {
                create,
                read,
                delete: deletePer,
                update
              } = re
              const path = re.path.toLowerCase()
              if (!allPermissionOfUser[path]) {
                allPermissionOfUser[path] = {
                  create,
                  read,
                  update,
                  delete: deletePer
                }
              } else {
                if (create) {
                  allPermissionOfUser[path].create = create
                }
                if (read) {
                  allPermissionOfUser[path].read = read
                }
                if (update) {
                  allPermissionOfUser[path].update = update
                }
                if (deletePer) {
                  allPermissionOfUser[path].delete = deletePer
                }
              }
            })
          })
        })
      })
    })
    return allPermissionOfUser
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

  return {
    decodeToken,
    encryptPassword,
    verifyToken,
    genToken,
    generateHash,
    isValidToken,
    getAllPermissionOfUser,
    encrypt,
    decrypt
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
