import * as express from 'express';
const app = express();
// routes = require('./routes/index')

const host = '127.0.0.1'
const port = 7000

console.log(`Server listens http://${host}:${port}`)

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use('/api', routes)

// app.listen(port, host, () =>
//   console.log(`Server listens http://${host}:${port}`)
// )