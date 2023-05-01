const SSEHostService = require('../services/sse.host.service')
import { IncomingMessage, ServerResponse } from 'http'
import Host = require('../helpers/host')
import taskQueue = require('../queue/task-queue')

const SseStream = require('ssestream').default;



class SSEHostController {
  async getSSEHost(request: IncomingMessage, response: ServerResponse) {
    console.log(2)
    const sseStream = new SseStream(request)
    sseStream.pipe(response)
    const pusher = setInterval(() => {
      sseStream.write({
        event: 'hello',
        data: new Date().toTimeString()

      })
      console.log(3)
    }, 1000)


    // const headers = {
    //   'Content-Type': 'text/event-stream',
    //   'Connection': 'keep-alive',
    //   'Cache-Control': 'no-cache'
    // }
    // response.writeHead(200, headers)

    // const host: Host = SSEHostService.newHost(response)
    // console.log("66666666666666666666666");
    // SSEHostService.sendToHostRetry(host, '5000')

    // SSEHostService.constructor.sendToHostEventMessage(host, 'hello', 'Hello, server')

    // SSEHostService.constructor.sendToHostEventMessage(host, 'host', host.id)

    // SSEHostService.constructor.newTest()

    request.on('close', () => {
      //console.log(`${host.id} Connection closed`);
      //SSEHostService.deleteHost(host);
    });
  }
}

export = new SSEHostController()