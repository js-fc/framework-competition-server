const express = require('express'),
  router = express.Router(),
  ResultController = require('../controllers/result.controller'),
  ResultService = require('../services/result.service')

router.use(async (req, res, next) => {
  //let data = await ResultService.getResult(req)
  //let data = 1
  next()
  // if (data) {
  //   req.result = data
  //   next()
  // } else
  //   return res
  //     .status(500)
  //     .send({ message: 'Error while getting result' })
})

router
  .route('/:resultId/framework/:frameworkId')
  .get(ResultController.getResult)
  .post(ResultController.createResult)
  .put(ResultController.updateResult)
  .delete(ResultController.deleteResult)

export = router