//var EventSource = require('eventsource');
const fs = require('fs'), spawn = require('child_process').spawn;
EventSource = require('eventsource');
class SSEClient {
    constructor() {
        this.connected = false;
    }
    Init() {
        this.eventSource = new EventSource("http://localhost:8080/sse/host");
        this.eventSource.onmessage = (event) => {
        };
        this.eventSource.addEventListener('hello', event => {
            this.connected = true;
        });
        this.eventSource.addEventListener('host', event => {
            this.hostID = event.data;
        });
        this.eventSource.addEventListener('test', event => {
            const data = event.data.split(':');
            const test = data[0];
            const framework = data[2];
            //const progToOpen = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',[`https://js-fc.github.io/js-framework-competition/all.html?framework=${framework}&test=${test}`]);
            const progToOpen = spawn('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', [`https://js-fc.github.io/js-framework-competition/all.html?framework=${framework}&test=${test}`]);
        });
        this.eventSource.addEventListener('close', event => {
            const reason = JSON.parse(event.data);
            console.log(reason);
            this.eventSource.close();
        });
    }
}
module.exports = new SSEClient();
//# sourceMappingURL=sse-client.js.map