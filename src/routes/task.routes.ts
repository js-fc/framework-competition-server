const express = require('express'),
  router = express.Router(),
  TaskController = require('../controllers/task.controller'),
  TaskService = require('../services/task.service')

router.use(async (req, res, next) => {
  let data = await TaskService.getTask(req)

  if (data) {
    req.task = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting task' })
})

router
  .route('/:taskId')
  .get(TaskController.getTask)
  .post(TaskController.createTask)
  .put(TaskController.updateTask)
  .delete(TaskController.deleteTask)

export = router