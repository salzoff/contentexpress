export default `
    data.{
        "HotelName": Hotelname[0],
        "GiataId": GiataID[0].v,
        "Category": Hotelkategorie[0],
        "CityName": Stadtname[0],
        "CityId": Stadtnummer[0],
        "DestinationName": Zielgebietsname[0],
        "DestinationId":  Zielgebietsnummer[0],
        "CountryName": Landname[0],
        "CountryCode": Landcode[0],
        "AddressData": AddressData[0].{
            "Address": Address[0],
            "CountryCode": CountryCode[0],
            "City": City[0],
            "ZIP": ZIP[0],
            "Street": Street[0],
            "Tel": Tel[0],
            "Fax": Fax[0]
        },
        "Map": Landkarte[0],
        "TourOperatorLogoSmall": provider_logo[0].provider_logo_url[0].v,
        "TourOperatorLogoMedium": provider_logo[0].provider_logo_url[1].v,
        "TourOperatorLogoLarge": provider_logo[0].provider_logo_url[2].v,
        "TourOperatorLogoXLarge": provider_logo[0].provider_logo_url[3].v,
        "TourOperatorCode": Veranstaltercode[0],
        "TourOperatorId": VeranstalterID[0],
        "ProductCode": Objectcode[0],
        "Language": Text[0].lang[0],
        "Description": Text[0].v,
        "CatalogName": Katalogname[0],
        "CatalogId": KatalogID[0],
        "StartDate": datestart[0],
        "EndDate": dateend[0],
        "SeasonType": KatalogSaisonTyp[0],
        "TravelType": TravelType[0].v,
        "CatalogCode": KatalogCode[0],
        "CatalogCodes": KatalogCodes.KatalogCode.[v],
        "CatalogHotelId": KatalogHotelId[0],
        "CatalogCoverSmall": catalog_cover[0].catalog_cover_url[0].v,
        "CatalogCoverMedium": catalog_cover[0].catalog_cover_url[1].v,
        "CatalogCoverLarge": catalog_cover[0].catalog_cover_url[2].v,
        "Climate": climate[0].{
            "Kind": kind[0],
            "Id": id[0],
            "AverageDayTemperature": $each(day_temperature[0], function($v) {$v}),
            "AverageNightTemperature": $each(night_temperature[0], function($v) {$v}),
            "AverageWaterTemperature": $each(water_temperature[0], function($v) {$v}),
            "DaysSunshine": $each(sunshine[0], function($v) {$v}),
            "DaysRain": $each(rainday[0], function($v) {$v})
        },
        "Images": {
            "Small": [$filter(Bildfile, function($v, $i) { $v.size[0] = '150' })].{
                "Type": typ[0],
                "Width": width[0],
                "Height": height[0],
                "Url": v
            },
            "Medium": [$filter(Bildfile, function($v, $i) { $v.size[0] = '320' })].{
                "Type": typ[0],
                "Width": width[0],
                "Height": height[0],
                "Url": v
            },
            "Large": [$filter(Bildfile, function($v, $i) { $v.size[0] = '800' })].{
                "Type": typ[0],
                "Width": width[0],
                "Height": height[0],
                "Url": v
            }
        }
    }
`;

