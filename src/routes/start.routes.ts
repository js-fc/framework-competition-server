const express = require('express'),
   router = express.Router(),
   StartController = require('../controllers/start.controller'),
   StartService = require('../services/start.service')

router.use(async (req, res, next) => {
  let data = await StartService.getStart()

  if (data) {
    req.start = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting users' })
})

router
  .route('/')
  .get(StartController.getStart)

export = router