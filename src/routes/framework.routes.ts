const express = require('express'),
  router = express.Router(),
  FrameworkController = require('../controllers/framework.controller'),
  FrameworkService = require('../services/framework.service')

router.use(async (req, res, next) => {
  // let data = await FrameworkService.getFramework(req)
  // let data = req.params;
  next()
  // if (data) {
  //   req.framework = data
  //   next()
  // } else
  //   return res
  //     .status(500)
  //     .send({ message: 'Error while getting framework' })
})

router
  .route('/:frameworkId')
  .get(FrameworkController.getFramework)
  .post(FrameworkController.createFramework)
  .put(FrameworkController.updateFramework)
  .delete(FrameworkController.deleteFramework)

export = router