const express = require('express'),
  router = express.Router(),
  TestController = require('../controllers/test.controller'),
  TestService = require('../services/test.service')

router.use(async (req, res, next) => {
  // let data = await TestService.getTest(req)
  next()
  // let data = req.params
  // if (data) {
  //   req.test = data
  //   next()
  // } else
  //   return res
  //     .status(500)
  //     .send({ message: 'Error while getting test' })
})

router
  .route('/:testId')
  .get(TestController.getTest)
  .post(TestController.createTest)
  .put(TestController.updateTest)
  .delete(TestController.deleteTest)

export = router