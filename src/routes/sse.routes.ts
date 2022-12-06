const express = require('express'),
  router = express.Router(),
  SSEController = require('../controllers/sse.controller'),
  SSEService = require('../services/sse.service')

router.use(async (req, res, next) => {
  //let data = await SSEService.getSSE()
  let data = {a: 222}
  if (data) {
    req.sse = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting users' })
})

router
  .route('/')
  .get(SSEController.getSSE)

export = router