const ResultService = require('../services/result.service'),
  SSEService = require('../services/sse.service')

import Client = require('../helpers/client')

class ResultController {
  async getResult(req, res) {
    req.result = await ResultService.getResult(req)
    if (req.query.id) {
      if (req.result.hasOwnProperty(req.query.id))
        return res
          .status(200)
          .send({ data: req.result[req.query.id] })
      else
        return res
          .status(404)
          .send({ message: 'Host not found.' })
    } else if (!req.result)
      return res
        .status(404)
        .send({ message: 'Result not found.' })
    res.status(200).send(req.result)
  }

  async createResult(req, res) {
    let result = await ResultService.createResult(req.body, req.params.resultId, req.params.frameworkId);

    // const client: Client = SSEService.constructor.getClient(req.params.resultId)
    // const clients = SSEService.constructor.getClients()
    // let b = clients.get('01')

    // SSEService.sendToClientEventMessage(b, 'task1', b.id)
    const clients = SSEService.constructor.getClient(req.params.resultId)

    //SSEService.sendToClientEventMessage(clients, 'result', req.params.frameworkId)
    SSEService.sendToClientEventMessage(clients, 'result', req.params.frameworkId)
    return res.status(200).send({a: clients.id})

    //return res.status(200).send(result)
    if (req.body.user && req.body.user.id) {
      if (req.users.hasOwnProperty(req.body.user.id))
        return res
          .status(409)
          .send({ message: 'User already exists.' })

      req.users[req.body.user.id] = req.body.user

      let result = await ResultService.createUser(req.users)

      if (result) return res.status(200).send(result)
      else
        return res
          .status(500)
          .send({ message: 'Unable create user.' })
    } else
      return res
        .status(400)
        .send({ message: 'Bad request.' })
  }

  async updateResult(req, res) {
    if (req.body.user && req.body.user.id) {
      if (!req.users.hasOwnProperty(req.body.user.id))
        return res
          .status(404)
          .send({ message: 'User not found.' })

      req.users[req.body.user.id] = req.body.user

      let result = await ResultService.updateUser(req.users)

      if (result) return res.status(200).send(result)
      else
        return res
          .status(500)
          .send({ message: 'Unable update user.' })
    } else
      return res
        .status(400)
        .send({ message: 'Bad request.' })
  }

  async deleteResult(req, res) {
    if (req.query.id) {
      if (req.users.hasOwnProperty(req.query.id)) {
        delete req.users[req.query.id]

        let result = await ResultService.deleteUser(
          req.users
        )

        if (result) return res.status(200).send(result)
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

export = new ResultController()