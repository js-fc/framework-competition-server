Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express'), app = express(), routes = require('./routes/index'), routesSSE = require('./routes/index.sse'), cors = require('cors');
const host = '127.0.0.1';
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', routes);
app.use('/sse', routesSSE);
const SseStream = require('ssestream').default;
app.get('/host', (req, res) => {
    console.log('new connection');
    const sseStream = new SseStream(req);
    sseStream.pipe(res);
    const pusher = setInterval(() => {
        sseStream.write({
            event: 'server-time',
            data: new Date().toTimeString()
        });
    }, 1000);
    res.on('close', () => {
        console.log('lost connection');
        clearInterval(pusher);
        sseStream.unpipe(res);
    });
});
app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
//# sourceMappingURL=app.js.map