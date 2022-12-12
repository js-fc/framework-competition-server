const express = require('express'),
   router = express.Router(),
   TasksController = require('../controllers/tasks.controller'),
   TasksService = require('../services/tasks.service')

router.use(async (req, res, next) => {
  let data = await TasksService.getTasks(req)

  if (data) {
    req.tasks = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting tasks' })
})

router
  .route('/')
  .get(TasksController.getTasks)
  .post(TasksController.createTask)
  .put(TasksController.updateTask)
  .delete(TasksController.deleteTask)

export = router