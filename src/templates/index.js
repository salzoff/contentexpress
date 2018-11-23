import jsonata from 'jsonata';
import CatalogList from './CatalogList.tpl';
import CountryList from './CountryList.tpl';
import DestinationList from './DestinationList.tpl';
import CityList from './CityList.tpl';
import ProviderList from './ProviderList.tpl';
import LanguageList from './LanguageList.tpl';
import GeocodeList from './GeocodeList.tpl';
import ClimateList from './ClimateList.tpl';
import SpecialidList from './SpecialidList.tpl';
import HotelList from './HotelList.tpl';

export default {
    catalogList: jsonata(CatalogList),
    countryList: jsonata(CountryList),
    destinationList: jsonata(DestinationList),
    cityList: jsonata(CityList),
    providerList: jsonata(ProviderList),
    languageList: jsonata(LanguageList),
    geocodeList: jsonata(GeocodeList),
    climateList: jsonata(ClimateList),
    specialidList: jsonata(SpecialidList),
    hotelList: jsonata(HotelList)
};