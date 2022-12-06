Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express'), app = express(), routes = require('./routes/index'), routesSSE = require('./routes/index.sse'), cors = require('cors');
const host = '127.0.0.1';
const port = 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', routes);
app.use('/sse', routesSSE);
app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
//# sourceMappingURL=app.js.map