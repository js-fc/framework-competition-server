import type { Express, Router, Request, Response } from 'express'

const express = require('express'),
   app: Express = express(),
   routes: Router = require('./routes/index'),
   routesSSE: Router = require('./routes/index.sse'),
   cors = require('cors')


const host = 'localhost'
const port = 7000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/api', routes)
app.use('/sse', routesSSE)

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)
