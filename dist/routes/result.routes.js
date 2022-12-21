var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express'), router = express.Router(), ResultController = require('../controllers/result.controller'), ResultService = require('../services/result.service');
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    //let data = await ResultService.getResult(req)
    let data = 1;
    if (data) {
        req.result = data;
        next();
    }
    else
        return res
            .status(500)
            .send({ message: 'Error while getting result' });
}));
router
    .route('/:resultId/framework/:frameworkId')
    .get(ResultController.getResult)
    .post(ResultController.createResult)
    .put(ResultController.updateResult)
    .delete(ResultController.deleteResult);
module.exports = router;
//# sourceMappingURL=result.routes.js.map