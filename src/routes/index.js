import express from 'express';
import listRouter from '../controller/ListController';
import searchRouter from '../controller/SearchController';
import hotelRouter from '../controller/HotelController';

const router = express.Router();

router.use('/', listRouter);
router.use('/', searchRouter);
router.use('/', hotelRouter);
router.post('*', (req, res, next) => {
    throw new Error('NotFound');
});

router.use((err, req, res, next) => {
    if (err === 'NotFound') {
        res.status(404).send('Route not found');
    }
    if (err.name === 'JsonSchemaValidation') {
        res.status(400).json(err.validations.body);
    } else {
        next(err);
    }
});
router.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
export default router;