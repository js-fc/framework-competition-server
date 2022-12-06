const express = require('express'),
    router = express.Router(),
    sseRoutes = require('./sse.routes'),
    sseClientsRoutes = require('./sse.clients.routes')

router.use('/', sseRoutes)
router.use('/clients', sseClientsRoutes)

export = router