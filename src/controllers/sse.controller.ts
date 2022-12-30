const SSEService = require('../services/sse.service')
import { IncomingMessage, ServerResponse } from 'http'
import Client = require('../helpers/client')

class SSEController {
  async getSSE(request: IncomingMessage, response: ServerResponse) {

    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    }
    response.writeHead(200, headers)

    const client: Client = SSEService.newClient(response)

    SSEService.sendToClientRetry(client, '5000')

    SSEService.sendToClientEventMessage(client, 'hello', 'Hello, friend')
    SSEService.sendToClientEventMessage(client, 'task', client.id)

    const clients = SSEService.constructor.getClients()
    let b = clients.get(client.id)

    SSEService.sendToClientEventMessage(client, 'task1', b.id)

    request.on('close', () => {
      console.log(`${client.id} Connection closed`);
      SSEService.deleteClient(client);
    });
  }
}

export = new SSEController()