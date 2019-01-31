import express from 'express';
import LogoStore from '../service/LogoStore';
import config from '../config/index';
import searchRouter from "./SearchController";
const logoStore = new LogoStore();

const logoRouter = express.Router();
logoRouter.get('/logo/:providercode/:size?', (req, res, next) => {
    logoStore.getLogo(req.params.providercode.toUpperCase(), req.params.size)
        .then(logo => {
            res.set({
                'Content-Type': 'image/gif',
                'Content-Length': logo.length
            });
            res.send(logo);
        })
        .catch(next);
});

logoRouter.post('/search', (req, res, next) => {
    throw new Error('Error occured during request');
});

export default logoRouter;