import cacheManager from 'cache-manager';
import fsStore from 'cache-manager-fs-binary';
import moment from 'moment';
const ttl = 86400
const memoryCache = cacheManager.caching({store: 'memory', ttl: ttl});
const diskCache = cacheManager.caching({
    store: fsStore,
    options: {
        reviveBuffers: true,
        binaryAsStream: true,
        ttl: 86400 /* seconds */,
        path: 'diskcache',
        preventfill: true
    }
});

const cacheMiddleware = (req, res, next) => {

        const key = getKeyFromRequestBody(req.body);
        memoryCache.get(key, (err, result) => {
            if (!err && result) {
                console.log('true');
                res.json(result);
                return;
            }
            next();
        });
};

const doCache = (body, response) => {
    return new Promise((resolve, reject) => {
        const key = getKeyFromRequestBody(body);
        memoryCache.set(key, response, {ttl}, (err, result) => {
            if (err) {
                console.log(err);
            }
            resolve(result);
        });
    });
};

const cacheLogos = (tourOperatorCode, logos) => {
    return;
    Object.keys(logos).forEach(logo => {
        const key = `logo-${tourOperatorCode}-${key}`;
        fsStore.set()
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
    cacheLogos
};
