const express = require('express'), router = express.Router(), usersRoutes = require('./users.routes'), hostsRoutes = require('./hosts.routes'), startRoutes = require('./start.routes'), tasksRoutes = require('./tasks.routes'), taskRoutes = require('./task.routes'), frameworksRoutes = require('./frameworks.routes'), frameworkRoutes = require('./framework.routes'), resultRoutes = require('./result.routes');
router.use('/users', usersRoutes);
router.use('/hosts', hostsRoutes);
router.use('/start', startRoutes);
router.use('/frameworks', frameworksRoutes);
router.use('/framework', frameworkRoutes);
router.use('/tasks', tasksRoutes);
router.use('/task', taskRoutes);
router.use('/result', resultRoutes);
module.exports = router;
//# sourceMappingURL=index.js.map