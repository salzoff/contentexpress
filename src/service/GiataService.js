import querystring from 'querystring';
import axios from 'axios';
import config from '../config/index';
import { parseStringSync, parseString } from 'xml2js';
import templates from '../templates/index';


axios.defaults.responseType = 'document';
let instance;
export default class GiataService {
    constructor() {
        if (instance) {
            return instance;
        }
        Object.defineProperty(this, 'giataBaseUrl', {
            value: config.giataBaseUrl
        });
        Object.defineProperty(this, 'giataUser', {
            value: config.giataUser
        });
        Object.defineProperty(this, 'giataPassword', {
            value: config.giataPassword
        });
        instance = this;
    }

    get baseQueryUrl() {
        return `${this.giataBaseUrl}?uid=${this.giataUser}&pwd=${this.giataPassword}&`;
    }

    getList(params) {
        let url = `${this.baseQueryUrl}sc=list&`;
        url += querystring.stringify(params);
        return axios.get(url)
            .then(response => this.getPromisedParserForResponse(response))
            .then(obj => {
                const parsedResult = templates[`${params.list}List`].evaluate(obj);
                return parsedResult;
            });
    }

    getOffers(params) {
        let url = `${this.baseQueryUrl}sc=search&`;
        url += querystring.stringify(params);
        return axios.get(url)
            .then(response => this.getPromisedParserForResponse(response))
            .then(obj => {
                const parsedResult = templates[`hotelList`].evaluate(obj);
                return (Object.assign({
                    count: obj.found[0]
                }, {
                    items: parsedResult
                }));
            });
    }

    getHotel(params) {
        let url = `${this.baseQueryUrl}sc=hotel&`;
        url += querystring.stringify(params);
        return axios.get(url)
            .then(response => this.getPromisedParserForResponse(response))
            .then(obj => {
                const parsedResult = templates[`hotelList`].evaluate(obj);
                return parsedResult;
            });
    }

    getPromisedParserForResponse(response) {
        return new Promise((resolve, reject) => {
            parseString(response.data, {
                attrkey: '',
                charkey: 'v',
                explicitRoot: false,
                mergeAttrs: true
            },(err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};
