import moment from 'moment';
export default class Catalog {
    constructor(data) {

        this.name = data.cn[0];
        this.id = data.cid[0];
        this.startDate = data.datestart[0];
        this.endDate = data.dateend[0];
        this.seasonName = data.seasonname[0];
        this.seasonType = data.seasontype[0];
        this.tourOperatorCode = data.Veranstaltercode[0];
        this.catalogCoverSmall = data.catalog_cover[0].catalog_cover_url[0]._;
        this.catalogCoverMedium = data.catalog_cover[0].catalog_cover_url[1]._;
        this.catalogCoverLarge = data.catalog_cover[0].catalog_cover_url[2]._;
    }
    get hotelname() {
        return this['Name'];
    }
    set hotelnamename(name) {
        this['Hotelname'] = hotelname;
    }
    get id() {
        return this['Id'];
    }
    set id(id) {
        this['Id'] = id;
    }
    get startDate() {
        return this['StartDate'];
    }
    set startDate(startDate) {
        if (typeof startDate === 'string') {
            startDate = moment(startDate);
        }
        this['StartDate'] = startDate;
    }
    get endDate() {
        return this['EndDate'];
    }
    set endDate(endDate) {
        if (typeof endDate === 'string') {
            endDate = moment(endDate);
        }
        this['EndDate'] = endDate;
    }
    get seasonName() {
        return this['SeasonName']
    }
    set seasonName(seasonName) {
        this['SeasonName'] = seasonName;
    }
    get seasonType() {
        return this['SeasonType']
    }
    set seasonType(seasonType) {
        this['SeasonType'] = seasonType;
    }
    get lastChange() {
        return this['LastChange'];
    }
    set lastChange(lastChange) {
        if (typeof lastChange === 'string') {
            lastChange = moment(lastChange);
        }
        this['LastChange'] = lastChange;
    }
    get travelType() {
        return this['TravelType'];
    }
    set travelType(travelType) {
        this['TraavelType'] = travelType;
    }
    get language() {
        return this['Language'];
    }
    set language(language){
        this['Language'] = language;
    }
    get tourOperatorCode() {
        return this['TourOperatorCode'];
    }
    set tourOperatorCode(tourOperatorCode) {
        this['TourOperatorCode'] = tourOperatorCode;
    }
    get catalogCoverSmall() {
        return this['CatalogCoverSmall'];
    }
    set catalogCoverSmall(catalogCover) {
        this['CatalogCoverSmall'] = catalogCover;
    }
    get catalogCoverMedium() {
        return this['CatalogCoverMedium'];
    }
    set catalogCoverMedium(catalogCover) {
        this['CatalogCoverMedium'] = catalogCover;
    }
    get catalogCoverLarge() {
        return this['CatalogCoverLarge'];
    }
    set catalogCoverLarge(catalogCover) {
        this['CatalogCoverLarge'] = catalogCover;
    }
};
