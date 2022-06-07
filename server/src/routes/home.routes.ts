import { Router } from 'express';

import Controller from '../controllers/Controller';

const router: Router = Router();

const { home } = Controller.controllers.home;

router.route('/')
    .get(home);


export default router;