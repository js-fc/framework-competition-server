const express = require('express'),
    router = express.Router(),
    usersRoutes = require('./users.routes')

router.use('/users', usersRoutes)

export = router