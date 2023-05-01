var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SSEService = require('../services/sse.service');
const SSEHostService = require('../services/sse.host.service');
const taskQueue = require("../queue/task-queue");
class SSEController {
    getSSE(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            };
            response.writeHead(200, headers);
            const client = SSEService.newClient(response);
            SSEService.sendToClientRetry(client, '5000');
            SSEService.sendToClientEventMessage(client, 'hello', 'Hello, friend');
            SSEService.sendToClientEventMessage(client, 'test', client.id);
            const clients = SSEService.constructor.getClients();
            let b = clients.get(client.id);
            SSEService.constructor.createTest(client.id); // Создаем тест
            SSEService.constructor.getFrameworks().then(result => {
                result.rows.forEach(framework => {
                    // console.log(JSON.stringify(framework))
                    taskQueue.push(`${client.id}:${framework.id}`);
                });
            }).then(() => taskQueue.forEach(task => {
                SSEService.sendToClientEventMessage(client, 'task', task);
                SSEHostService.constructor.newTest();
            }));
            taskQueue.forEach(framework => {
                SSEService.sendToClientEventMessage(client, 'framework', framework);
            });
            request.on('close', () => {
                console.log(`${client.id} Connection closed`);
                SSEService.deleteClient(client);
            });
        });
    }
}
module.exports = new SSEController();
//# sourceMappingURL=sse.controller.js.map