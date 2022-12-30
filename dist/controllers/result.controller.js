var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ResultService = require('../services/result.service'), SSEService = require('../services/sse.service');
class ResultController {
    getResult(req, res) {
        if (req.query.id) {
            if (req.result.hasOwnProperty(req.query.id))
                return res
                    .status(200)
                    .send({ data: req.result[req.query.id] });
            else
                return res
                    .status(404)
                    .send({ message: 'Host not found.' });
        }
        else if (!req.result)
            return res
                .status(404)
                .send({ message: 'Result not found.' });
        res.status(200).send(req.params.resultId);
    }
    createResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield ResultService.createResult(req.body, req.params.resultId, req.params.frameworkId);
            // const client: Client = SSEService.constructor.getClient(req.params.resultId)
            // const clients = SSEService.constructor.getClients()
            // let b = clients.get('01')
            // SSEService.sendToClientEventMessage(b, 'task1', b.id)
            const clients = SSEService.constructor.getClient(req.params.resultId);
            SSEService.sendToClientEventMessage(clients, 'result', clients.id);
            return res.status(200).send({ a: clients.id });
            //return res.status(200).send(result)
            if (req.body.user && req.body.user.id) {
                if (req.users.hasOwnProperty(req.body.user.id))
                    return res
                        .status(409)
                        .send({ message: 'User already exists.' });
                req.users[req.body.user.id] = req.body.user;
                let result = yield ResultService.createUser(req.users);
                if (result)
                    return res.status(200).send(result);
                else
                    return res
                        .status(500)
                        .send({ message: 'Unable create user.' });
            }
            else
                return res
                    .status(400)
                    .send({ message: 'Bad request.' });
        });
    }
    updateResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.user && req.body.user.id) {
                if (!req.users.hasOwnProperty(req.body.user.id))
                    return res
                        .status(404)
                        .send({ message: 'User not found.' });
                req.users[req.body.user.id] = req.body.user;
                let result = yield ResultService.updateUser(req.users);
                if (result)
                    return res.status(200).send(result);
                else
                    return res
                        .status(500)
                        .send({ message: 'Unable update user.' });
            }
            else
                return res
                    .status(400)
                    .send({ message: 'Bad request.' });
        });
    }
    deleteResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.id) {
                if (req.users.hasOwnProperty(req.query.id)) {
                    delete req.users[req.query.id];
                    let result = yield ResultService.deleteUser(req.users);
                    if (result)
                        return res.status(200).send(result);
                    else
                        return res
                            .status(500)
                            .send({ message: 'Unable delete user.' });
                }
                else
                    return res
                        .status(404)
                        .send({ message: 'User not found.' });
            }
            else
                return res
                    .status(400)
                    .send({ message: 'Bad request.' });
        });
    }
}
module.exports = new ResultController();
//# sourceMappingURL=result.controller.js.map