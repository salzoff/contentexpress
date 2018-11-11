import querystring from 'querystring';
import axios from 'axios';
import config from '../config';
import Catalog from '../model/Catalog';
import { parseStringSync } from 'xml2js-parser';

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
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    const obj = parseStringSync(response.data, {
                        attrkey: '',
                        charkey: '_',
                        explicitRoot: false,
                        mergeAttrs: true
                    });
                    console.log(JSON.stringify(obj));
                    const mappedResult = this.mapper[params.list](obj);
                    resolve(mappedResult);
                })
                .catch(error => {
                    reject(error);
                })
            });
    }

    getOffers(params) {
        let url = `${this.baseQueryUrl}sc=search&`;
        url += querystring.stringify(params);
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    const obj = parseStringSync(response.data);
                    obj.result.data.forEach(offer => {
                        console.log(response.data);
                    });
                    resolve(obj);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
    get mapper() {
        return {
            country(data) {
                return data.CountryList.lr.map(entry => ({
                    name: entry.ln[0],
                    code: entry.lc[0]
                }));
            },
            destination(data) {
                return data.DestinationList.zr.map(entry => ({
                    name: entry.zn[0],
                    code: entry.zi[0],
                    country: entry.lc[0]
                }));
            },
            city(data) {
                return data.CityList.sr.map(entry => ({
                    name: entry.sn[0],
                    code: entry.si[0],
                    destination: entry.zi[0]
                }));
            },
            provider(data) {
                return data.ProviderList.pr.map(entry => ({
                    code: entry.vc[0],
                    name: entry.vn[0],
                    providerLogo: entry.provider_logo[0].provider_logo_url
                }));
            },
            catalog(data) {
                return data.CatalogList.cr.map(entry => new Catalog(entry));
            },
            language(data) {
                return data.CatalogLanguageList.language;
            },
            geocode(data) {
                return data.GeocodeList.GeoData;
            },
            address(data) {

            },
            giataid(data) {
                return data.GiataIdList.GiataID;
            }
        };
    }
};
