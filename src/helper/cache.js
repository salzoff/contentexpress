import cacheManager from 'cache-manager';
import fsStore from 'cache-manager-fs-binary';
import moment from 'moment';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
const ttl = 86400;
const cachePath = 'diskcache';
const memoryCache = cacheManager.caching({store: 'memory', ttl: ttl});
const diskCache = cacheManager.caching({
    store: fsStore,
    options: {
        reviveBuffers: true,
        binaryAsStream: true,
        ttl: ttl,
        path: cachePath,
        preventfill: true
    }
});

const cacheMiddleware = (req, res, next) => {
    const key = getKeyFromRequestBody(req.body);
    memoryCache.get(key, (err, result) => {
        if (!err && result) {
            res.json(result);
            return;
        }
        next();
    });
};

const doCache = (body, response) => {
    return new Promise((resolve, reject) => {
        const key = getKeyFromRequestBody(body);
        memoryCache.get(key, (err, result) => {
            if (!result) {
                memoryCache.set(key, response, {ttl}, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    resolve(result);
                });
            }
        });
    });
};

const cacheJsonToDiskCache = (key, value) => {
    return new Promise((resolve, reject) => {
        fs.readdir(cachePath, (err, data) => {
            data.forEach(entry => {
                if (path.extname(entry) === '.dat') {
                    fs.unlink(path.resolve(cachePath, entry), err => {});
                }
            });
        });
        diskCache.set(key, JSON.stringify(value), { ttl }, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

const cacheJsonToFile = (file, folder, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(cachePath, folder, file), JSON.stringify(data), 'utf-8', err => {
            if (err) {
                reject(`Update of ${file} failed`);
                return false;
            }
            resolve(data)
        });
    });
};

const loadCachedJsonFromFile = (file, folder) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(cachePath, folder, file), 'utf-8', (err, result) => {
            if (err) {
                reject(`Update of ${file} failed`);
                return false;
            }
            resolve(JSON.parse(result));
        });
    });
};

const cacheLogoFile = (key, logo) => {
    fs.writeFile(path.resolve(cachePath, 'logos', key + '.gif'), logo, (err, res) => {
        if (err) {
            console.log('Error while saving ' + key);
        }
    })
};

const cacheLogos = (tourOperatorCode, logos) => {
    Object.keys(logos).forEach((size) => {
        const key = `logo-${tourOperatorCode}-${size}`;
        diskCache.get(key, (err, result) => {
            if (!result) {
                axios.get(logos[size], {
                    responseType: 'arraybuffer'
                })
                    .then(response => {
                        const buffer = Buffer.from(response.data);
                        diskCache.set(key, {
                            binary: {
                                key: buffer
                            }
                        }, { ttl: ttl })
                    });
            }
        });
    });
};

const getKeyFromRequestBody = body => {
    const bodyValues = Object.assign({}, body);
    bodyValues.date = moment(bodyValues.date).format('YYYY-MM');
    return Object.values(bodyValues).join('-');
};

const clearCache = () => {
    memoryCache.reset();
};

export {
    cacheMiddleware,
    doCache,
    clearCache,
    cacheLogos,
    cacheJsonToFile,
    cacheJsonToDiskCache,
    cacheLogoFile,
    loadCachedJsonFromFile
};
