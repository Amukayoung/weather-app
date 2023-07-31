import { Weather } from "./Weather";

export async function getWeather(city) {
    const apiKey = '340019aa02124e398f8221444230707';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
    // Call the API
    const weather = fetch(url)
        .then(function(response) {
            // Transform to JSON
            return response.json();
        })
        .then(function(response) {
            // Create the Weather object
            const city = response.location.name;
            const region = response.location.region;
            const country = response.location.country;
            const timestamp = response.location.localtime_epoch;
            const celcius = response.current.temp_c;
            const fahrenheit = response.current.temp_f;
            const condition = response.current.condition.text;
            const condition_icon = `http:${response.current.condition.icon}`;
            const wind_kph = response.current.wind_kph;
            const wind_mph = response.current.wind_mph;
            const chance_of_rain = response.forecast.forecastday[0].day.daily_chance_of_rain;
            const chance_of_snow = response.forecast.forecastday[0].day.daily_chance_of_snow;
            const humidity = response.current.humidity;
            const forecast = response.forecast.forecastday;
            const weather = new Weather(
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
                forecast
            );
            return weather;
        })
        .catch(error => {
            return 'error';
        });

    return weather;
}