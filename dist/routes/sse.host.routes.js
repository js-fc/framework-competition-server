var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express'), router = express.Router(), SSEHostController = require('../controllers/sse.host.controller'), SSEHostService = require('../services/sse.host.service');
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    next();
}));
router
    .route('/')
    .get(SSEHostController.getSSEHost);
module.exports = router;
//# sourceMappingURL=sse.host.routes.js.map