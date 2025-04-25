import Router from 'express';

import controller from './commentsController.js';

const router = new Router();

router.get('/getpost', controller.getPost);

export default router;