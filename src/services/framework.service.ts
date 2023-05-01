const fs = require('fs'),
  nano = require('../couch-db/couch')

class FrameworkService {
  getFramework(req) {
    return new Promise((res, rej) => {
      const db = nano.use('frameworks')
      const frameworkUlid = req.params.frameworkId
      db.get(`framework:${frameworkUlid}`).then( framework => {
        return res(framework)
      }).catch(err => res(err))
    })
  }

  createFramework(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        'data.json',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false)

          return res({ message: 'User created.' })
        }
      )
    })
  }

  updateFramework(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        'data.json',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false)

          return res({ message: 'User updated.' })
        }
      )
    })
  }

  deleteFramework(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        'data.json',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false)
          return res({ message: 'User deleted.' })
        }
      )
    })
  }
}

export = new FrameworkService()