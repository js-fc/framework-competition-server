const express = require('express'), router = express.Router(), usersRoutes = require('./users.routes'), hostsRoutes = require('./hosts.routes');
router.use('/users', usersRoutes);
router.use('/hosts', hostsRoutes);
module.exports = router;
//# sourceMappingURL=index.js.map