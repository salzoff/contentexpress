import express from 'express';
import bodyParser from 'body-parser';
import { validate } from 'express-jsonschema';
import GiataService from '../service/GiataService';
import schema from '../schemes/listRequest.scheme';
import hotelRouter from "./HotelController";
const giataService = new GiataService();

const listController  = {
    getList(params) {
        return giataService.getList(params);
    }
};

const listRouter = express.Router();
listRouter.use(bodyParser.json());
listRouter.use(bodyParser.urlencoded({ extended: true }));
listRouter.post('/list', validate({body: schema}), (req, res, next) => {
    listController.getList(req.body)
        .then(response => res.json(response))
        .catch(next);

});

listRouter.post('/list', (req, res, next) => {
    throw new Error('Error occured during request');
});

export default listRouter;