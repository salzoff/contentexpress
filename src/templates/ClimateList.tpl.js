export default `
    climate.{
        "Kind": kind[0],
        "Id": id[0],
        "AverageDayTemperature": $each(day_temperature[0], function($v) {$v}),
        "AverageNightTemperature": $each(night_temperature[0], function($v) {$v}),
        "AverageWaterTemperature": $each(water_temperature[0], function($v) {$v}),
        "DaysSunshine": $each(sunshine[0], function($v) {$v}),
        "DaysRain": $each(rainday[0], function($v) {$v})
    }
`;
