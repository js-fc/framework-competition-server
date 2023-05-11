var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SSEHostService = require('../services/sse.host.service');
//const SseStream = require('ssestream').default;
class SSEHostController {
    getSSEHost(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // const sseStream = new SseStream(request)
            // sseStream.pipe(response)
            // const pusher = setInterval(() => {
            //   sseStream.write({
            //     event: 'hello',
            //     data: new Date().toTimeString()
            //   })
            // }, 1000)
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            };
            response.writeHead(200, headers);
            const host = SSEHostService.newHost(response);
            SSEHostService.sendToHostRetry(host, '5000');
            SSEHostService.constructor.sendToHostEventMessage(host, 'hello', 'Hello, server');
            SSEHostService.constructor.sendToHostEventMessage(host, 'host', host.id);
            SSEHostService.constructor.hostCalibration(host);
            request.on('close', () => {
                console.log(`${host.id} Connection closed`);
                SSEHostService.deleteHost(host);
            });
        });
    }
}
module.exports = new SSEHostController();
//# sourceMappingURL=sse.host.controller.js.map