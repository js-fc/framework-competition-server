import { Express, Router, Request, Response } from 'express'

const express = require('express'),
   app: Express = express(),
   routes: Router = require('./routes/index')

const host = '127.0.0.1'
const port = 7000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)