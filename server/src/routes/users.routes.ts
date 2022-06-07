import { Router } from 'express';

import Controller from '../controllers/Controller';

const router: Router = Router();

const { info, signup } = Controller.controllers.users;

router.route('/info').get(info);
router.route('/signup').post(signup);

export default router;