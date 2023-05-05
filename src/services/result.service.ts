const fs = require('fs'),
  nano = require('../couch-db/couch')

class ResultService {
  getResult(req) {
    const resultUlid = req.params.resultId
    const frameworkUlid = req.params.frameworkId
    return new Promise((resolve, reject) => {
      const db = nano.use('frameworks')
      db.get(`${resultUlid}:framework:${frameworkUlid}`).then(result =>
        {
          return resolve(result)
        }).catch( err => resolve(err))
    })
  }

  async createResult(data: object, resultUlid: string, frameworkUlid: string) {
    const db = nano.use('frameworks')
    return db.insert(data, `${resultUlid}:framework:${frameworkUlid}`)
  }

  updateResult(data) {
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

  deleteResult(data) {
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

export = new ResultService()