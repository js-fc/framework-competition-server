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
            SSEService.sendToClientEventMessage(client, 'task', client.id);
            const clients = SSEService.constructor.getClients();
            let b = clients.get(client.id);
            SSEService.sendToClientEventMessage(client, 'task1', b.id);
            request.on('close', () => {
                console.log(`${client.id} Connection closed`);
                SSEService.deleteClient(client);
            });
        });
    }
}
module.exports = new SSEController();
//# sourceMappingURL=sse.controller.js.map