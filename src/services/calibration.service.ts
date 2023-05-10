const fs = require('fs'),
  nano = require('../couch-db/couch')

class CalibrationService {
  getCalibration(req) {
    const calibrationUlid = req.params.calibrationId
    const frameworkUlid = req.params.frameworkId
    return new Promise((resolve, reject) => {
      const db = nano.use('frameworks')
      db.get(`${calibrationUlid}:calibration:${frameworkUlid}`).then(calibration =>
        {
          return resolve(calibration)
        }).catch( err => resolve(err))
    })
  }

  async createCalibration(data: object, calibrationUlid: string, frameworkUlid: string) {
    const db = nano.use('frameworks')
    return db.insert(data, `${calibrationUlid}:calibration:${frameworkUlid}`)
  }

  updateCalibration(data) {
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

  deleteCalibration(data) {
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

export = new CalibrationService()