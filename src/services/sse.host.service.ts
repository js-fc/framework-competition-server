import ULID = require('ulid')
import Host = require('../helpers/host')

const nano = require('../couch-db/couch')
import taskQueue = require('../queue/task-queue')

class SSEHostService {

  static  hosts = new Map()
  static  hostQueue = []
  static  tests = new Map()
  static calibrationPull = new Map()



  static newTest() {
    const task = taskQueue[0]

    if (!task)
      return

    const host = SSEHostService.hostQueue[0]
    if (!host)
      return

    SSEHostService.hostQueue.shift()

    taskQueue.shift()

    SSEHostService.tests.set(task, host)
    SSEHostService.sendToHostEventMessage(host, 'test', task)
  }

  static hostCalibration(host: Host) {

    const frameworkId = '01GXVG6BDA4JP0ZWH9CT832BAN'

    const taskId = `${host.id}:framework:${frameworkId}`

    SSEHostService.calibrationPull.set(taskId, host)

    SSEHostService.tests.set(taskId, host)
    console.log('test', taskId)

    SSEHostService.sendToHostEventMessage(host, 'test', taskId)

  }


  static freeHost(testId, frameworkId) {
    const taskId = `${testId}:framework:${frameworkId}`
    const host = SSEHostService.tests.get(taskId)
    if (host.id === testId) {
      SSEHostService.tests.delete(taskId)
    }
    else {
      SSEHostService.calibrationPull.delete(taskId)
    }
    SSEHostService.hostQueue.push(host)
  }

  static getUlid() {
    return ULID.ulid()
  }

  static getHosts() {
    return SSEHostService.hosts
  }

  static getHost(hostId) {
    return SSEHostService.hosts.get(hostId)
  }

  static async createTest(hostId) {
    const db = nano.use('frameworks')
    const doc = { _id: `test:${hostId}`, date: (new Date).toISOString()}
    await db.insert(doc)
  }

  static getFrameworks() {
    return new Promise((res, rej) => {
      const db = nano.use('frameworks')
      db.partitionedList('framework', { include_docs: true }).then(frameworkList =>
        {
          return res(frameworkList)
        }).catch( err => res(err))
    })
  }

  sendToAllMessage(message: string, id: string) {
    SSEHostService.hosts.forEach(host => {
      const data = `data: ${message}\nid: ${SSEHostService.getUlid()}\n\n`
      host.res.write(data)
    });
  }

  sendToAllEventMessage(event: string, message: string, id: string) {
    SSEHostService.hosts.forEach(host => {
      const data = `event: ${event}\ndata: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
      host.res.write(data);
    });
  }

  sendToAllRetry(message: string, id: string) {
    SSEHostService.hosts.forEach(host => {
      const data = `retry: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
      host.res.write(data);
    });
  }

  sendToAll(message: string, id: string) {
    SSEHostService.hosts.forEach(host => {
      const data = `data: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
      host.res.write(data);
    });
  }

  static sendToHostMessage(host: Host, message: string) {
      const data = `data: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
      host.res.write(data);
  }

  static sendToHostEventMessage(host: Host, event: string, message: string) {
      const data = `event: ${event}\ndata: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
      host.res.write(data);
  }

  sendToHostRetry(host: Host, message: string) {
    const data = `retry: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
    host.res.write(data);
  }

  createHost(response: object) {
    return new Host(response, SSEHostService.getUlid())
  }

  newHost(response: object) {
    const host = new Host(response, SSEHostService.getUlid())
    SSEHostService.hosts.set(host.id, host)
    return host;
  }

  addHost(host: Host) {
    SSEHostService.hosts.set(host.id, host);
  }

  deleteHost(host: Host) {
    SSEHostService.hosts.delete(host.id);
  }
}

export = new SSEHostService()