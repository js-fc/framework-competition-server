const express = require('express'),
    router = express.Router(),
    sseRoutes = require('./sse.routes'),
    sseClientsRoutes = require('./sse.clients.routes'),
    sseHostRoutes = require('./sse.host.routes')

router.use('/', sseRoutes)
router.use('/clients', sseClientsRoutes)
router.use('/host', sseHostRoutes)

export = router