const fs = require('fs'),
  nano = require('../couch-db/couch')

class TestsService {
  getTests(testUlid) {
    return new Promise((resolve, reject) => {
      const db = nano.use('frameworks')
      db.partitionedList('test',{ include_docs: true, limit: 5, startkey: 'test:0', endkey: 'test:f'}).then(testList =>
      {
        return resolve(testList)
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

export = new TestsService()