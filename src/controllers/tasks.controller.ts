const TasksService = require('../services/tasks.service'),
      SSEService = require('../services/sse.service')

class TasksController {
  getTasks(req, res) {
    if (req.query.id) {
      if (req.tasks.hasOwnProperty(req.query.id))
        return res
          .status(200)
          .send({ data: req.tasks[req.query.id] })
      else
        return res
          .status(404)
          .send({ message: 'Host not found.' })
    } else if (!req.tasks)
      return res
        .status(404)
        .send({ message: 'Tasks not found.' })
    const data = `data: ${JSON.stringify(req.tasks)}\nid: ${SSEService.constructor.getUlid()}\n\n`;
    // SSEService.constructor.clients.forEach(client => {
    //   console.log('11');
    //   client.res.write(data);
    // });
    res.status(200).send({ data: data})
  }

  async createTask(req, res) {
    if (req.body.user && req.body.user.id) {
      if (req.users.hasOwnProperty(req.body.user.id))
        return res
          .status(409)
          .send({ message: 'User already exists.' })

      req.users[req.body.user.id] = req.body.user

      let result = await TasksService.createUser(req.users)

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

  async updateTask(req, res) {
    if (req.body.user && req.body.user.id) {
      if (!req.users.hasOwnProperty(req.body.user.id))
        return res
          .status(404)
          .send({ message: 'User not found.' })

      req.users[req.body.user.id] = req.body.user

      let result = await TasksService.updateUser(req.users)

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

  async deleteTask(req, res) {
    if (req.query.id) {
      if (req.users.hasOwnProperty(req.query.id)) {
        delete req.users[req.query.id]

        let result = await TasksService.deleteUser(
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

export = new TasksController()