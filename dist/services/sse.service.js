const ULID = require("ulid");
const Client = require("../helpers/client");
class SSEService {
    static getUlid() {
        return ULID.ulid();
    }
    static getClients() {
        return SSEService.clients;
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
        SSEService.clients.push(client);
        return client;
    }
    addClient(client) {
        SSEService.clients.push(client);
    }
    deleteClient(client) {
        SSEService.clients = SSEService.clients.filter(item => item.id !== client.id);
    }
}
SSEService.clients = [];
module.exports = new SSEService();
//# sourceMappingURL=sse.service.js.map