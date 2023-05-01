const express = require('express'),
   router = express.Router(),
   TestsController = require('../controllers/tests.controller'),
   TestsService = require('../services/tests.service')

router.use(async (req, res, next) => {
  let data = await TestsService.getTests(req)

  if (data) {
    req.tests = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting tests' })
})

router
  .route('/')
  .get(TestsController.getTests)
  .post(TestsController.createTest)
  .put(TestsController.updateTest)
  .delete(TestsController.deleteTest)

export = router