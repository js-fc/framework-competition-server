const express = require('express'),
  router = express.Router(),
  SSEHostController = require('../controllers/sse.host.controller'),
  SSEHostService = require('../services/sse.host.service')

router.use(async (req, res, next) => {
  next()
})

router
  .route('/')
  .get(SSEHostController.getSSEHost)

export = router