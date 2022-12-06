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
            setInterval(() => {
                SSEService.sendToClient(client, JSON.stringify(headers), SSEService.constructor.getUlid());
            }, 1000);
            // const data = `data: ${JSON.stringify({a: SSEService.getUlid()})}\n\n`;
            // console.log(`${clientId} Connection open`);
            // SSEService.constructor.clients.push(newClient);
            request.on('close', () => {
                console.log(`${client.id} Connection closed`);
                SSEService.deleteClient(client);
            });
            // if (req.query.id) {
            //   if (req.hosts.hasOwnProperty(req.query.id))
            //     return res
            //       .status(200)
            //       .send({ data: req.hosts[req.query.id] })
            //   else
            //     return res
            //       .status(404)
            //       .send({ message: 'Host not found.' })
            // } else if (!req.hosts) {
            //   return res
            //     .status(404)
            //     .send({ message: 'Hosts not found.' })
            // }
            // const result = await SSEService.getSSE()
            //return res.status(200).send({ data: req.sse, data2: req.aa })
        });
    }
}
module.exports = new SSEController();
//# sourceMappingURL=sse.controller.js.map