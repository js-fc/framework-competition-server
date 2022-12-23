import ULID = require('ulid')
import Client = require('../helpers/client')

class SSEService {
  static  clients = new Map();

  static getUlid() {
    return ULID.ulid();
  }

  static getClients() {
    return SSEService.clients;
  }

  static getClient(clientId) {
    return SSEService.clients.get(clientId);
  }

  sendToAllMessage(message: string, id: string) {
    SSEService.clients.forEach(client => {
      const data = `data: ${message}\nid: ${SSEService.getUlid()}\n\n`;
      client.res.write(data);
    });
  }

  sendToAllEventMessage(event: string, message: string, id: string) {
    SSEService.clients.forEach(client => {
      const data = `event: ${event}\ndata: ${message}\nid: ${SSEService.getUlid()}\n\n`;
      client.res.write(data);
    });
  }

  sendToAllRetry(message: string, id: string) {
    SSEService.clients.forEach(client => {
      const data = `retry: ${message}\nid: ${SSEService.getUlid()}\n\n`;
      client.res.write(data);
    });
  }

  sendToAll(message: string, id: string) {
    SSEService.clients.forEach(client => {
      const data = `data: ${message}\nid: ${SSEService.getUlid()}\n\n`;
      client.res.write(data);
    });
  }

  sendToClientMessage(client: Client, message: string) {
      const data = `data: ${message}\nid: ${SSEService.getUlid()}\n\n`;
      client.res.write(data);
  }

  sendToClientEventMessage(client: Client, event: string, message: string) {
      const data = `event: ${event}\ndata: ${message}\nid: ${SSEService.getUlid()}\n\n`;
      client.res.write(data);
  }

  sendToClientRetry(client: Client, message: string) {
    const data = `retry: ${message}\nid: ${SSEService.getUlid()}\n\n`;
    client.res.write(data);
  }

  createClient(response: object) {
    return new Client(response, SSEService.getUlid())
  }

  newClient(response: object) {
    // const client = new Client(response, SSEService.getUlid())
    const client = new Client(response, '01')
    SSEService.clients.set(client.id, client);
    return client;
  }

  addClient(client: Client) {
    SSEService.clients.set(client.id, client);
  }

  deleteClient(client: Client) {
    SSEService.clients.delete(client.id);
  }
}

export = new SSEService()