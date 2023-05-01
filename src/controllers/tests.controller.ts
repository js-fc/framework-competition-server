const TestsService = require('../services/tests.service'),
      SSEService = require('../services/sse.service')

class TestsController {
  getTests(req, res) {
    if (req.query.id) {
      if (req.tests.hasOwnProperty(req.query.id))
        return res
          .status(200)
          .send({ data: req.tests[req.query.id] })
      else
        return res
          .status(404)
          .send({ message: 'Host not found.' })
    } else if (!req.tests)
      return res
        .status(404)
        .send({ message: 'Tests not found.' })

    // req.tests.forEach(element => {

    // });

    req.tests.rows.forEach(test => {
      const doc = test.doc;
      SSEService.constructor.clients.forEach(client => {
        SSEService.sendToClientMessage(client, JSON.stringify(doc))
      })
    })
    res.status(200).send(req.tests)
  }

  async createTest(req, res) {
    if (req.body.user && req.body.user.id) {
      if (req.users.hasOwnProperty(req.body.user.id))
        return res
          .status(409)
          .send({ message: 'User already exists.' })

      req.users[req.body.user.id] = req.body.user

      let result = await TestsService.createUser(req.users)

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

  async updateTest(req, res) {
    if (req.body.user && req.body.user.id) {
      if (!req.users.hasOwnProperty(req.body.user.id))
        return res
          .status(404)
          .send({ message: 'User not found.' })

      req.users[req.body.user.id] = req.body.user

      let result = await TestsService.updateUser(req.users)

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

  async deleteTest(req, res) {
    if (req.query.id) {
      if (req.users.hasOwnProperty(req.query.id)) {
        delete req.users[req.query.id]

        let result = await TestsService.deleteUser(
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

export = new TestsController()