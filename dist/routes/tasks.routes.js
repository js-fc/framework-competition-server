var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express'), router = express.Router(), TasksController = require('../controllers/tasks.controller'), TasksService = require('../services/tasks.service');
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let data = yield TasksService.getTasks(req);
    if (data) {
        req.tasks = data;
        next();
    }
    else
        return res
            .status(500)
            .send({ message: 'Error while getting tasks' });
}));
router
    .route('/')
    .get(TasksController.getTasks)
    .post(TasksController.createTask)
    .put(TasksController.updateTask)
    .delete(TasksController.deleteTask);
module.exports = router;
//# sourceMappingURL=tasks.routes.js.map