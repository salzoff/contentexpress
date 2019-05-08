require('dotenv').config();
let localConfig = false;
const config = {
    develop: {
        giataBaseUrl: 'http://www.giata-xml.de',
        giataUser: process.env.GIATA_USER,
        giataPassword: process.env.GIATA_PASSWORD,
        port: process.env.PORT || 7070,
        defaultSearchShow: 'gid,hn,hk,sn,si,zn,zi,ln,lc,vc,vn,vid,oc,kn,katid,ks,ps,khid,kst,pics150,pics320,pics800,text,lk,cli,cld,ds,de,cv,vl,tt,ttc,katcode,geo,adr,fact'
    },
    production: {
        giataBaseUrl: 'http://www.giata-xml.de',
        giataUser: process.env.GIATA_USER,
        giataPassword: process.env.GIATA_PASSWORD,
        port: process.env.PORT || 7070,
        defaultSearchShow: 'gid,hn,hk,sn,si,zn,zi,ln,lc,vc,vn,vid,oc,kn,katid,ks,ps,khid,kst,pics150,pics320,pics800,text,lk,cli,cld,ds,de,cv,vl,tt,ttc,katcode,geo,adr,fact'
    }
};

let exportConfig = {};
if (process.env.NODE_ENV === 'production') {
    exportConfig = config.production;
} else {
    try {
        localConfig = require('./local.config.js');
    } catch(e) {}
    if (localConfig) {
        exportConfig = Object.assign(exportConfig, config.develop, localConfig.default);
    } else {
        exportConfig = Object.assign(exportConfig, config.develop, {
            giataUser: process.env.GIATA_USER,
            giataPassword: process.env.GIATA_PASSWORD
        });
    }
}

export default exportConfig;
