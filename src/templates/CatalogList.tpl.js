export default `
    cr.{
        "CatalogName": cn[0],
        "CatalogId": cid[0],
        "StartDate": datestart[0],
        "EndDate": dateend[0],
        "SeasonName": seasonname[0],
        "SeasonType": seasontype[0],
        "TourOperatorCode": Veranstaltercode[0],
        "CatalogCoverSmall": catalog_cover[0].catalog_cover_url[0].v,
        "CatalogCoverMedium": catalog_cover[0].catalog_cover_url[1].v,
        "CatalogCoverLarge": catalog_cover[0].catalog_cover_url[2].v
    }
`;
