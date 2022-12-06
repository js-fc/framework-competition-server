const ULID = require("ulid");
const Client = require("../helpers/client");
class SSEService {
    static getUlid() {
        return ULID.ulid();
    }
    static getClients() {
        return SSEService.clients;
    }
    sendToAll(message, id) {
        SSEService.clients.forEach(client => {
            const data = `data: ${message}\nid: ${SSEService.getUlid()}\n\n`;
            client.res.write(data);
        });
    }
    sendToClient(client, message, id) {
        const data = `data: ${message}\nid: ${id}\n\n`;
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