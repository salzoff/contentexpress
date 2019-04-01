import 'dotenv/config';
import config from '../config/index';
import GiataService from '../service/GiataService';
const giataService = new GiataService(config);
import LogoStore from '../service/LogoStore';
const logoStore = new LogoStore();
giataService.getList({ list: 'provider' }).then(list => {
    logoStore.updateCacheUrls(list);
});
