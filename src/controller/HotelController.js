import express from 'express';
import bodyParser from 'body-parser';
import { validate } from 'express-jsonschema';
import GiataService from '../service/GiataService';
import * as schema from '../schemes/hotelRequest.scheme';
import config from "../config/index";
import { cacheMiddleware, doCache, cacheLogos } from '../helper/cache';
const giataService = new GiataService(config);

const hotelController  = {
    getHotel(params) {
        if (!params.show) {
            params.show = config.defaultSearchShow;
        }
        return giataService.getHotel(params);
    }
};

const hotelRouter = express.Router();
hotelRouter.use(bodyParser.json());
hotelRouter.use(bodyParser.urlencoded({ extended: true }));
//hotelRouter.use(cacheMiddleware);
hotelRouter.post('/hotel', validate({body: schema}), (req, res, next) => {
    const body = req.body;
    hotelController.getHotel(body)
        .then(response => {
            doCache(req.body, response);
            return Promise.resolve(response);
        })
        .then(response => res.json(response))
        .catch(next);
});

hotelRouter.post('/hotel', (req, res, next) => {
    throw new Error('Error occured during request');
});

export default hotelRouter;