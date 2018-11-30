const keyMapping = {
    hotelName: 'hn',
    tourOperatorCode: 'vc',
    tourOperatorName: 'vn',
    giataId: 'gid',
    cityName: 'sn',
    cityId: 'si',
    destinationName: 'zn',
    destinationId: 'zi',
    countryName: 'ln',
    countryCode: 'lc',
    productCode: 'oc',
    category: 'hkat',
    catalogHotelId: 'khid',
    catalogId: 'katid',
    catalogName: 'kn',
    seasonType: 'st',
    climateGraphic: 'cli',
    seasonStart: 'ds',
    seasonEnd: 'de',
    catalogCode: 'katcode',
    images: 'pic',
    catalogCover: 'cv',
    providerLogo: 'vl'
};
const postFilterMapping = {
    katcode: 'CatalogCodes'
};

export default (req, res, next) => {
    let newBody = Object.assign({}, req.body);
    let postFilter = {};
    Object.keys(newBody).forEach(key => {
        if (keyMapping[key]) {
            newBody[keyMapping[key]] = newBody[key];
            delete newBody[key];
        }
        if (postFilterMapping[key]) {
            postFilter[postFilterMapping[key]] = newBody[key];
            delete newBody[key];
        }
    });
    req.postFilter = postFilter;
    req.body = newBody;
    next();
};
