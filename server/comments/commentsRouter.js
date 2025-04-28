import Router from 'express';

import controller from './commentsController.js';

const router = new Router();

router.get('/getposts', controller.getPost);

export default router;