import express from 'express';
import bodyParser from 'body-parser';
import { validate } from 'express-jsonschema';
import GiataService from '../service/GiataService';
import * as schema from '../schemes/searchRequest.scheme';
import config from '../config';
import router from "../routes";
const giataService = new GiataService();

const searchController  = {
    getOffers(params) {
        if (!params.show) {
            params.show = config.defaultSearchShow;
        }
        return giataService.getOffers(params);
    }
};

const searchRouter = express.Router();
searchRouter.use(bodyParser.json());
searchRouter.use(bodyParser.urlencoded({ extended: true }));
searchRouter.post('/search', validate({body: schema}), (req, res, next) => {
   return searchController.getOffers(req.body)
        .then(response => res.json(response))
        .catch(next);
});
searchRouter.post('/search', (req, res, next) => {
    throw new Error('Error occured during request');
});

export default searchRouter;