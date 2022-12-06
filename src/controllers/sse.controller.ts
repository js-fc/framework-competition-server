const SSEService = require('../services/sse.service')
import Client = require('../helpers/client')

class SSEController {
  async getSSE(request, response) {

    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    }
    response.writeHead(200, headers);

    const client: Client = SSEService.newClient(response);

    setInterval(() => {
      SSEService.sendToClient(client, JSON.stringify(headers), SSEService.constructor.getUlid())
    },1000)
    // const data = `data: ${JSON.stringify({a: SSEService.getUlid()})}\n\n`;



    // console.log(`${clientId} Connection open`);
    // SSEService.constructor.clients.push(newClient);

    request.on('close', () => {
      console.log(`${client.id} Connection closed`);
      SSEService.deleteClient(client);
    });

    // if (req.query.id) {
    //   if (req.hosts.hasOwnProperty(req.query.id))
    //     return res
    //       .status(200)
    //       .send({ data: req.hosts[req.query.id] })
    //   else
    //     return res
    //       .status(404)
    //       .send({ message: 'Host not found.' })
    // } else if (!req.hosts) {
    //   return res
    //     .status(404)
    //     .send({ message: 'Hosts not found.' })
    // }
    // const result = await SSEService.getSSE()
    //return res.status(200).send({ data: req.sse, data2: req.aa })
  }
}

export = new SSEController()