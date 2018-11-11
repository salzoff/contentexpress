import express from 'express';
import bodyParser from 'body-parser';
import { validate } from 'express-jsonschema';
import GiataService from '../service/GiataService';
import * as schema from '../schemes/listRequest.scheme';
const giataService = new GiataService();

const listController  = {
    getList(params) {
        return giataService.getList(params);
    }
};

const listRouter = express.Router();
listRouter.use(bodyParser.json());
listRouter.use(bodyParser.urlencoded({ extended: true }));
listRouter.post('/list', validate({body: schema}), (req, res) => {
    listController.getList(req.body)
        .then(response => res.json(response))
        .catch(error => res.send(error).status(500).end())
});

export default listRouter;