import express from 'express';
import bodyParser from 'body-parser';
import { validate } from 'express-jsonschema';
import GiataService from '../service/GiataService';
import * as schema from '../schemes/hotelRequest.scheme';
const giataService = new GiataService();

const hotelController  = {
    getHotels(params) {
        return giataService.getHotels(params);
    }
};

const hotelRouter = express.Router();
hotelRouter.use(bodyParser.json());
hotelRouter.use(bodyParser.urlencoded({ extended: true }));
hotelRouter.post('/hotel', validate({body: schema}), (req, res) => {
    hotelController.getHotels(req.body)
        .then(response => res.json(response))
        .catch(error => res.send(error).status(500).end())
});

export default hotelRouter;