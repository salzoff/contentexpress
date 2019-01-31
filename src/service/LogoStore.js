import config from '../config';
import axios from 'axios';
import fs from 'fs';
import { cacheJsonToFile, cacheJsonToDiskCache, cacheLogoFile, loadCachedJsonFromFile } from '../helper/cache';

let instance;
export default class LogoStore {
    constructor() {
        if (instance) {
            return instance;
        }
        this.logos = {};
        this.loadCachedUrls();
        instance = this;
    }

    updateCacheUrls(providerList) {
        cacheJsonToFile('providerList.json', 'logos', providerList)
            .then(() => {
                this.initLogoCache(providerList);
            })
            .catch(e => {
                console.log('Error while caching URLs:' + e);
            })
    }

    loadCachedUrls() {
        loadCachedJsonFromFile('providerlist.json', 'logos')
            .then(providerList => {
                this.initLogoCache(providerList);
            })
            .catch(e => {
                console.log('Error while loading cached URLs:' + e);
            })
    }

    prepareLogoCache(providerList) {
        providerList.forEach(provider => {
            this.logos[`logo-${provider.Code}-small`] = provider.LogoSmall;
            this.logos[`logo-${provider.Code}-medium`] = provider.LogoMedium;
            this.logos[`logo-${provider.Code}-large`] = provider.LogoLarge;
            this.logos[`logo-${provider.Code}-xlarge`] = provider.LogoXLarge;
        });
        cacheJsonToDiskCache('logoUrls', this.logos);
    }

    getLogo(providerCode, size = 'large') {
        const key = `logo-${providerCode}-${size}`;
        if (!this.logos[key]) {
            return Promise.reject();
        }
        if (typeof this.logos[key] === 'string') {
            return axios.get(this.logos[key], {
                responseType: 'arraybuffer'
            })
                .then(response => {
                    const buffer = Buffer.from(response.data);
                    cacheLogoFile(key, buffer);
                    this.logos[key] = buffer;
                    return buffer;
                })
                .catch(e => {
                    console.log(e);
                    return false;
                })
        } else {
            return Promise.resolve(this.logos[key]);
        }

    }

    initLogoCache(providerList) {
        this.logos = {};
        this.prepareLogoCache(providerList);
    }
};