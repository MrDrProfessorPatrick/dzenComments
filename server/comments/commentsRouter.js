import Router from 'express';

import controller from './commentsController.js';

const router = new Router();

router.get('/getposts', controller.getPost);
router.get('/getposts/:id', controller.getPostById);

export default router;