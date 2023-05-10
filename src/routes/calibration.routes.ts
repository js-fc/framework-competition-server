const express = require('express'),
  router = express.Router(),
  CalibrationController = require('../controllers/calibration.controller'),
  CalibrationService = require('../services/calibration.service')

router.use(async (req, res, next) => {
  //let data = await CalibrationService.getCalibration(req)
  //let data = 1
  next()
  // if (data) {
  //   req.calibration = data
  //   next()
  // } else
  //   return res
  //     .status(500)
  //     .send({ message: 'Error while getting calibration' })
})

router
  .route('/:calibrationId/framework/:frameworkId')
  .get(CalibrationController.getCalibration)
  .post(CalibrationController.createCalibration)
  .put(CalibrationController.updateCalibration)
  .delete(CalibrationController.deleteCalibration)

export = router