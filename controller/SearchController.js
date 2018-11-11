import express from 'express';
import bodyParser from 'body-parser';
import { validate } from 'express-jsonschema';
import GiataService from '../service/GiataService';
import * as schema from '../schemes/searchRequest.scheme';
import config from '../config';
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
searchRouter.post('/search', validate({body: schema}), (req, res) => {
    searchController.getOffers(req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).send(error).end())
});

export default searchRouter;