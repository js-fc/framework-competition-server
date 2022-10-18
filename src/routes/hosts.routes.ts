const express = require('express'),
   router = express.Router(),
   HostsController = require('../controllers/hosts.controller'),
   HostsService = require('../services/hosts.service')

router.use(async (req, res, next) => {
  let data = await HostsService.getHosts()

  if (data) {
    req.hosts = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting users' })
})

router
  .route('/')
  .get(HostsController.getHosts)
  .post(HostsController.createHost)
  .put(HostsController.updateHost)
  .delete(HostsController.deleteHost)

export = router