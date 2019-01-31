import express from 'express';
import bodyParser from 'body-parser';
import { validate } from 'express-jsonschema';
import GiataService from '../service/GiataService';
import * as schema from '../schemes/searchRequest.scheme';
import config from '../config/index';
import requestTransform from '../helper/requestTransform';
import router from "../routes/index";
import {cacheLogos, cacheMiddleware, doCache} from '../helper/cache';
import hotelRouter from "./HotelController";
const giataService = new GiataService(config);

const searchController  = {
    getOffers(params, postFilter) {
        if (!params.show) {
            params.show = config.defaultSearchShow;
        }
        return giataService.getOffers(params, postFilter)
            .then(offers => {
                return new Promise((resolve, reject) => {
                    if (offers.count === 0 || Object.keys(postFilter).length === 0) {
                        return resolve(offers);
                    }
                    for (let key of Object.keys(postFilter)) {
                        if (offers.items.length === 0) {
                            break;
                        }
                        if (!offers.items[0][key]) {
                            continue;
                        }
                        offers.items = offers.items.filter(offer => {
                            return offer[key].indexOf(postFilter[key]) > -1;
                        });
                    }
                    offers.count = offers.items.length;
                    resolve(offers);
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
};

const searchRouter = express.Router();
searchRouter.use(bodyParser.json());
searchRouter.use(bodyParser.urlencoded({ extended: true }));
searchRouter.use(requestTransform);
searchRouter.use(cacheMiddleware);
searchRouter.post('/search', validate({body: schema}), (req, res, next) => {
   return searchController.getOffers(req.body, req.postFilter)
       .then(response => {
           doCache(req.body, response);
           return Promise.resolve(response);
       })
        .then(response => res.json(response))
        .catch(next);
});
searchRouter.post('/search', (req, res, next) => {
    throw new Error('Error occured during request');
});

export default searchRouter;