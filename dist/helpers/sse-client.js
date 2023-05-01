var EventSource = require('eventsource');
class SSEClient {
    constructor() {
        this.connected = false;
    }
    Init() {
        console.log("11111111111111111");
        this.eventSource = new EventSource("http://localhost:7000/host");
        this.eventSource.onmessage = (event) => {
            console.log("123");
        };
        console.log("123");
        this.eventSource.addEventListener('hello', event => {
            console.log("222222222222222");
            this.connected = true;
            console.log(event);
        });
        this.eventSource.addEventListener('host', event => {
            console.log("333333333333333");
            //const data = JSON.parse(event.data);
            //this.hostID = data.id;
            console.log(event.data);
        });
        this.eventSource.addEventListener('test', event => {
            console.log("44444444444");
            const test = JSON.parse(event.data);
            //test.frameworkId = test._id.split(':')[3];
            console.log(event.data);
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