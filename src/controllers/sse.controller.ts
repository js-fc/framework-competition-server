const SSEService = require('../services/sse.service')
import Client = require('../helpers/client')

class SSEController {
  async getSSE(request, response) {

    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    }
    response.writeHead(200, headers)

    const client: Client = SSEService.newClient(response)

    SSEService.sendToClientRetry(client, '5000')

    SSEService.sendToClientEventMessage(client, 'hello', 'Hello, friend')

    request.on('close', () => {
      console.log(`${client.id} Connection closed`);
      SSEService.deleteClient(client);
    });
  }
}

export = new SSEController()