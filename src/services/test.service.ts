const fs = require('fs'),
  nano = require('../couch-db/couch')

class TestService {
  getTest(req) {
    const testUlid = req.params.testId
    return new Promise((resolve, reject) => {
      const db = nano.use('frameworks')
      db.get(`test:${testUlid}`, { include_docs: true }).then(test => {
        return resolve(test)
      }).catch( err => resolve(err))
    })
  }

  createTest(data) {
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

  updateTest(data) {
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

  deleteTest(data) {
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

export = new TestService()