const SSEService = require('../services/sse.service')
const SSEHostService = require('../services/sse.host.service')
import { IncomingMessage, ServerResponse } from 'http'
import Client = require('../helpers/client')
import taskQueue = require('../queue/task-queue')

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
    SSEService.sendToClientEventMessage(client, 'test', client.id)

    SSEService.constructor.createTest(client.id) // Создаем тест

    SSEService.constructor.getFrameworks().then( result => {
      result.rows.forEach(framework =>
        taskQueue.push(`${client.id}:${framework.id}`)
      );
    }).then( () => {
      taskQueue.forEach(task => {
          SSEService.sendToClientEventMessage(client, 'task', task)
          SSEHostService.constructor.newTest()
      })
    })
    request.on('close', () => {
      console.log(`${client.id} Connection closed`);
      SSEService.deleteClient(client);
    });
  }
}

export = new SSEController()