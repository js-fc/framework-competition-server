import type { Router } from "express";
import { Request, Response} from "express";

interface UserRequest extends Request {
  users: any;
}

const express = require('express'),
   router: Router = express.Router(),
   UserController = require('../controllers/users.controller'),
   UsersService = require('../services/users.service')

router.use(async (req: UserRequest, res, next) => {
  let data = await UsersService.getUsers()

  if (data) {
    req.users = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting users' })
})

router
  .route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser)

export = router