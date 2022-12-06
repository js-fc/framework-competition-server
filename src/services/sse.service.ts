import ULID = require('ulid')
import Client = require('../helpers/client')

class SSEService {
  static  clients = [];

  static getUlid() {
    return ULID.ulid();
  }

  static getClients() {
    return SSEService.clients;
  }

  sendToAll(message: string, id: string) {
    SSEService.clients.forEach(client => {
      const data = `data: ${message}\nid: ${SSEService.getUlid()}\n\n`;
      client.res.write(data);
    });
  }

  sendToClient(client: Client, message: string, id: any) {
      const data = `data: ${message}\nid: ${id}\n\n`;
      client.res.write(data);
  }

  createClient(response: object) {
    return new Client(response, SSEService.getUlid())
  }

  newClient(response: object) {
    const client = new Client(response, SSEService.getUlid())
    SSEService.clients.push(client)
    return client;
  }

  addClient(client: Client) {
    SSEService.clients.push(client)
  }

  deleteClient(client: Client) {
    SSEService.clients = SSEService.clients.filter(item => item.id !== client.id)
  }
}

export = new SSEService()