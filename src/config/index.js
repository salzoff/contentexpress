const path = require('path');
try {
    require(path.resolve(__dirname, '.env'));
} catch(e) {
    console.error('Error: No Environment configuration found!');
    process.exit(1);
}

export default {
    giataBaseUrl: 'http://www.giata-xml.de',
    giataUser: process.env.GIATA_USER, //'132773',
    giataPassword: process.env.GIATA_PASSWORD, //'nec69',
    port: process.env.CONTENT_EXPRESS_PORT,
    defaultSearchShow: 'gid,hn,hk,sn,si,zn,zi,ln,lc,vc,vn,vid,oc,kn,katid,ks,ps,khid,kst,pics150,pics320,pics800,text,lk,cli,cld,ds,de,cv,vl,tt,ttc,katcode,geo,adr,fact'
};
