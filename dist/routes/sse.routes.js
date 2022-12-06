var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express'), router = express.Router(), SSEController = require('../controllers/sse.controller'), SSEService = require('../services/sse.service');
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    //let data = await SSEService.getSSE()
    let data = { a: 222 };
    if (data) {
        req.sse = data;
        next();
    }
    else
        return res
            .status(500)
            .send({ message: 'Error while getting users' });
}));
router
    .route('/')
    .get(SSEController.getSSE);
module.exports = router;
//# sourceMappingURL=sse.routes.js.map