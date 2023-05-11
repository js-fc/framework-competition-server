var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express'), router = express.Router(), CalibrationController = require('../controllers/calibration.controller'), CalibrationService = require('../services/calibration.service');
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    //let data = await CalibrationService.getCalibration(req)
    //let data = 1
    next();
    // if (data) {
    //   req.calibration = data
    //   next()
    // } else
    //   return res
    //     .status(500)
    //     .send({ message: 'Error while getting calibration' })
}));
router
    .route('/:calibrationId/framework/:frameworkId')
    .get(CalibrationController.getCalibration)
    .post(CalibrationController.createCalibration)
    .put(CalibrationController.updateCalibration)
    .delete(CalibrationController.deleteCalibration);
module.exports = router;
//# sourceMappingURL=calibration.routes.js.map