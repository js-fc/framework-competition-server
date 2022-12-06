const express = require('express'),
   router = express.Router(),
   FrameworksController = require('../controllers/frameworks.controller'),
   FrameworksService = require('../services/frameworks.service')

router.use(async (req, res, next) => {
  let data = await FrameworksService.getFrameworks()

  if (data) {
    req.frameworks = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting users' })
})

router
  .route('/')
  .get(FrameworksController.getFrameworks)
  .post(FrameworksController.createFramework)
  .put(FrameworksController.updateFramework)
  .delete(FrameworksController.deleteFramework)

export = router