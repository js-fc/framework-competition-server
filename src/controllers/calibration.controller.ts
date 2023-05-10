const CalibrationService = require('../services/calibration.service'),
  SSEService = require('../services/sse.service'),
  SSEHostService = require('../services/sse.host.service')

import Client = require('../helpers/client')

class CalibrationController {
  async getCalibration(req, res) {
    req.calibration = await CalibrationService.getCalibration(req)
    if (req.query.id) {
      if (req.calibration.hasOwnProperty(req.query.id))
        return res
          .status(200)
          .send({ data: req.calibration[req.query.id] })
      else
        return res
          .status(404)
          .send({ message: 'Host not found.' })
    } else if (!req.calibration)
      return res
        .status(404)
        .send({ message: 'Calibration not found.' })
    res.status(200).send(req.calibration)
  }

  async createCalibration(req, res) {
    let calibration = await CalibrationService.createCalibration(req.body, req.params.calibrationId, req.params.frameworkId);

    // const client: Client = SSEService.constructor.getClient(req.params.calibrationId)
    // const clients = SSEService.constructor.getClients()
    // let b = clients.get('01')

    // SSEService.sendToClientEventMessage(b, 'task1', b.id)

    const clients = SSEService.constructor.getClient(req.params.calibrationId)

    //SSEService.sendToClientEventMessage(clients, 'calibration', req.params.frameworkId)
    SSEService.sendToClientEventMessage(clients, 'calibration', req.params.frameworkId)
    SSEHostService.constructor.freeHost(`${req.params.calibrationId}:framework:${req.params.frameworkId}`)
    SSEHostService.constructor.newTest()
    return res.status(200).send({a: clients.id})

    //return res.status(200).send(calibration)
    if (req.body.user && req.body.user.id) {
      if (req.users.hasOwnProperty(req.body.user.id))
        return res
          .status(409)
          .send({ message: 'User already exists.' })

      req.users[req.body.user.id] = req.body.user

      let calibration = await CalibrationService.createUser(req.users)

      if (calibration) return res.status(200).send(calibration)
      else
        return res
          .status(500)
          .send({ message: 'Unable create user.' })
    } else
      return res
        .status(400)
        .send({ message: 'Bad request.' })
  }

  async updateCalibration(req, res) {
    if (req.body.user && req.body.user.id) {
      if (!req.users.hasOwnProperty(req.body.user.id))
        return res
          .status(404)
          .send({ message: 'User not found.' })

      req.users[req.body.user.id] = req.body.user

      let calibration = await CalibrationService.updateUser(req.users)

      if (calibration) return res.status(200).send(calibration)
      else
        return res
          .status(500)
          .send({ message: 'Unable update user.' })
    } else
      return res
        .status(400)
        .send({ message: 'Bad request.' })
  }

  async deleteCalibration(req, res) {
    if (req.query.id) {
      if (req.users.hasOwnProperty(req.query.id)) {
        delete req.users[req.query.id]

        let calibration = await CalibrationService.deleteUser(
          req.users
        )

        if (calibration) return res.status(200).send(calibration)
        else
          return res
            .status(500)
            .send({ message: 'Unable delete user.' })
      } else
        return res
          .status(404)
          .send({ message: 'User not found.' })
    } else
      return res
        .status(400)
        .send({ message: 'Bad request.' })
  }
}

export = new CalibrationController()