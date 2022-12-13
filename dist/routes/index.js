const express = require('express'), router = express.Router(), usersRoutes = require('./users.routes'), hostsRoutes = require('./hosts.routes'), startRoutes = require('./start.routes'), tasksRoutes = require('./tasks.routes'), taskRoutes = require('./task.routes'), frameworksRoutes = require('./frameworks.routes');
router.use('/users', usersRoutes);
router.use('/hosts', hostsRoutes);
router.use('/start', startRoutes);
router.use('/frameworks', frameworksRoutes);
router.use('/tasks', tasksRoutes);
router.use('/task', taskRoutes);
module.exports = router;
//# sourceMappingURL=index.js.map