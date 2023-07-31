
export class Weather {
    constructor(
        city, 
        region, 
        country, 
        timestamp,
        celcius,
        fahrenheit,
        condition,
        condition_icon,
        wind_kph,
        wind_mph,
        chance_of_rain,
        chance_of_snow,
        humidity,
        forecast) {
            this._city = city;
            this._region = region;
            this._country = country;
            this._timestamp = timestamp;
            this._celcius = celcius;
            this._fahrenheit = fahrenheit;
            this._condition = condition;
            this._condition_icon = condition_icon;
            this._wind_kph = wind_kph;
            this._wind_mph = wind_mph;
            this._chance_of_rain = chance_of_rain;
            this._chance_of_snow = chance_of_snow;
            this._humidity = humidity;
            this._forecast = forecast;
    }

    get city() {
        return this._city;
    }
    get region() {
        return this._region;
    }
    get country() {
        return this._country;
    }
    get timestamp() {
        return this._timestamp;
    }
    get celcius() {
        return this._celcius;
    }
    get fahrenheit() {
        return this._fahrenheit;
    }
    get condition() {
        return this._condition;
    }
    get conditionIcon() {
        return this._condition_icon;
    }
    get windKPH() {
        return this._wind_kph;
    }
    get windMPH() {
        return this._wind_mph;
    }
    get chanceOfRain() {
        return this._chance_of_rain;
    }
    get chanceOfSnow() {
        return this._chance_of_snow;
    }
    get humidity() {
        return this._humidity;
    }
    get forecast() {
        return this._forecast;
    }
}