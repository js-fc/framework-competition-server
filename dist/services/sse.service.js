var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ULID = require("ulid");
const Client = require("../helpers/client");
const nano = require('../couch-db/couch');
class SSEService {
    static getUlid() {
        return ULID.ulid();
    }
    static getClients() {
        return SSEService.clients;
    }
    static getClient(clientId) {
        return SSEService.clients.get(clientId);
    }
    static createTest(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = nano.use('frameworks');
            const doc = { _id: `test:${clientId}`, date: (new Date).toISOString() };
            yield db.insert(doc);
        });
    }
    static getFrameworks() {
        return new Promise((res, rej) => {
            const db = nano.use('frameworks');
            db.partitionedList('framework', { include_docs: true }).then(frameworkList => {
                return res(frameworkList);
            }).catch(err => res(err));
        });
    }
    sendToAllMessage(message, id) {
        SSEService.clients.forEach(client => {
            const data = `data: ${message}\nid: ${SSEService.getUlid()}\n\n`;
            client.res.write(data);
        });
    }
    sendToAllEventMessage(event, message, id) {
        SSEService.clients.forEach(client => {
            const data = `event: ${event}\ndata: ${message}\nid: ${SSEService.getUlid()}\n\n`;
            client.res.write(data);
        });
    }
    sendToAllRetry(message, id) {
        SSEService.clients.forEach(client => {
            const data = `retry: ${message}\nid: ${SSEService.getUlid()}\n\n`;
            client.res.write(data);
        });
    }
    sendToAll(message, id) {
        SSEService.clients.forEach(client => {
            const data = `data: ${message}\nid: ${SSEService.getUlid()}\n\n`;
            client.res.write(data);
        });
    }
    sendToClientMessage(client, message) {
        const data = `data: ${message}\nid: ${SSEService.getUlid()}\n\n`;
        client.res.write(data);
    }
    sendToClientEventMessage(client, event, message) {
        const data = `event: ${event}\ndata: ${message}\nid: ${SSEService.getUlid()}\n\n`;
        client.res.write(data);
    }
    sendToClientRetry(client, message) {
        const data = `retry: ${message}\nid: ${SSEService.getUlid()}\n\n`;
        client.res.write(data);
    }
    createClient(response) {
        return new Client(response, SSEService.getUlid());
    }
    newClient(response) {
        const client = new Client(response, SSEService.getUlid());
        // const client = new Client(response, '01')
        SSEService.clients.set(client.id, client);
        return client;
    }
    addClient(client) {
        SSEService.clients.set(client.id, client);
    }
    deleteClient(client) {
        SSEService.clients.delete(client.id);
    }
}
SSEService.clients = new Map();
module.exports = new SSEService();
//# sourceMappingURL=sse.service.js.map