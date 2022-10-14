import * as express from 'express';
import {router as usersRoutes} from './users.routes';

export const router = express.Router();

router.use('/users', usersRoutes)

