import { Router } from 'express';

import Controller from '../controllers/Controller';

const router: Router = Router();

const { info, importFTPData } = Controller.controllers.tasks;

router.route('/info').get(info);
router.route('/import-ftp-data').get(importFTPData);

export default router;