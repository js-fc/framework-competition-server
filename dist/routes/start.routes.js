var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express'), router = express.Router(), StartController = require('../controllers/start.controller'), StartService = require('../services/start.service');
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let data = yield StartService.getStart();
    if (data) {
        req.start = data;
        next();
    }
    else
        return res
            .status(500)
            .send({ message: 'Error while getting users' });
}));
router
    .route('/')
    .get(StartController.getStart);
module.exports = router;
//# sourceMappingURL=start.routes.js.map