const express = require('express'), router = express.Router(), usersRoutes = require('./users.routes'), hostsRoutes = require('./hosts.routes'), startRoutes = require('./start.routes'), tasksRoutes = require('./tasks.routes'), testsRoutes = require('./tests.routes'), taskRoutes = require('./task.routes'), testRoutes = require('./test.routes'), frameworksRoutes = require('./frameworks.routes'), frameworkRoutes = require('./framework.routes'), resultRoutes = require('./result.routes'), calibrationRoutes = require('./calibration.routes');
router.use('/users', usersRoutes);
router.use('/hosts', hostsRoutes);
router.use('/start', startRoutes);
router.use('/frameworks', frameworksRoutes);
router.use('/framework', frameworkRoutes);
router.use('/tasks', tasksRoutes);
router.use('/tests', testsRoutes);
router.use('/test', testRoutes);
router.use('/task', taskRoutes);
router.use('/result', resultRoutes);
router.use('/calibration', calibrationRoutes);
module.exports = router;
//# sourceMappingURL=index.js.map