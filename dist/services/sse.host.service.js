var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ULID = require("ulid");
const Host = require("../helpers/host");
const nano = require('../couch-db/couch');
const taskQueue = require("../queue/task-queue");
class SSEHostService {
    static newTest() {
        const task = taskQueue[0];
        if (!task)
            return;
        const host = SSEHostService.hostQueue[0];
        if (!host)
            return;
        console.log('New Test');
        SSEHostService.hostQueue.shift();
        taskQueue.shift();
        SSEHostService.tests.set(task, host);
        SSEHostService.sendToHostEventMessage(host, 'test', task);
    }
    static getUlid() {
        return ULID.ulid();
    }
    static getHosts() {
        return SSEHostService.hosts;
    }
    static getHost(hostId) {
        return SSEHostService.hosts.get(hostId);
    }
    static createTest(hostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = nano.use('frameworks');
            const doc = { _id: `test:${hostId}`, date: (new Date).toISOString() };
            yield db.insert(doc);
        });
    }
    static getFrameworks() {
        return new Promise((res, rej) => {
            const db = nano.use('frameworks');
            db.partitionedList('framework', { include_docs: true }).then(frameworkList => {
                return res(frameworkList);
            }).catch(err => res(err));
        });
    }
    sendToAllMessage(message, id) {
        SSEHostService.hosts.forEach(host => {
            const data = `data: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
            host.res.write(data);
        });
    }
    sendToAllEventMessage(event, message, id) {
        SSEHostService.hosts.forEach(host => {
            const data = `event: ${event}\ndata: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
            host.res.write(data);
        });
    }
    sendToAllRetry(message, id) {
        SSEHostService.hosts.forEach(host => {
            const data = `retry: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
            host.res.write(data);
        });
    }
    sendToAll(message, id) {
        SSEHostService.hosts.forEach(host => {
            const data = `data: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
            host.res.write(data);
        });
    }
    static sendToHostMessage(host, message) {
        const data = `data: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
        host.res.write(data);
    }
    static sendToHostEventMessage(host, event, message) {
        const data = `event: ${event}\ndata: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
        host.res.write(data);
    }
    sendToHostRetry(host, message) {
        const data = `retry: ${message}\nid: ${SSEHostService.getUlid()}\n\n`;
        host.res.write(data);
    }
    createHost(response) {
        return new Host(response, SSEHostService.getUlid());
    }
    newHost(response) {
        const host = new Host(response, SSEHostService.getUlid());
        // const host = new Host(response, '01')
        SSEHostService.hostQueue.push(host);
        SSEHostService.hosts.set(host.id, host);
        return host;
    }
    addHost(host) {
        SSEHostService.hosts.set(host.id, host);
    }
    deleteHost(host) {
        SSEHostService.hosts.delete(host.id);
    }
}
SSEHostService.hosts = new Map();
SSEHostService.hostQueue = [];
SSEHostService.tests = new Map();
module.exports = new SSEHostService();
//# sourceMappingURL=sse.host.service.js.map