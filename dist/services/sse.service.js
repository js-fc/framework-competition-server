const ULID = require("ulid");
const Client = require("../helpers/client");
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