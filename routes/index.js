import express from 'express';
import listRouter from '../controller/ListController';
import searchRouter from '../controller/SearchController';

const router = express.Router();

router.use('/', listRouter);
router.use('/', searchRouter);

export default router;