import { getWeather } from "./getWeather";
import humidityPng from '../assets/humidity.png'
import rainPng from '../assets/rain.png'
import snowPng from '../assets/snow.png'
import windPng from '../assets/wind.png'
import { unity } from "./index";

const $main = document.querySelector('.main');

function formatDate(timestamp) {
    let newTimestamp = parseInt(`${timestamp}000`);
    const date = new Date(newTimestamp);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;

    return formattedDate;
}

function formatHour(timestamp) {
    let newTimestamp = parseInt(`${timestamp}000`);
    const date = new Date(newTimestamp);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (hour < 10) hour = '0' + hour;
    if (minutes < 10) minutes = '0' + minutes;

    const formattedHour = `${hour}:${minutes}hs.`
    return formattedHour;
}

export async function displayWeather(city,unity) {
    if (city === '') {
        return;
    }
    const weather = await getWeather(city);

    if (weather === 'error') {
        alert('Insert a valid city');
        return;
    }
    // Create current section
    const $current = document.createElement('section');
    $current.classList.add('current');

    // Create weather section
    const $currentWeather = document.createElement('div');
    $currentWeather.classList.add('current__weather');
    const formattedDate = formatDate(weather.timestamp);
    const formattedHour = formatHour(weather.timestamp);
    const temperature = (unity.active === 'celcius') ? `${weather.celcius}°C` : `${weather.fahrenheit}°F`;
    const opositeTemperature = (unity.active === 'celcius') ? '°F' : '°C';
    $currentWeather.innerHTML = `
        <p class="current__city">${weather.city}, ${weather.region} - ${weather.country}</p>
        <p class="current__date">${formattedDate}</p>
        <p class="current__hour">${formattedHour}</p>
        <p class="current__condition">${weather.condition}</p>
        <p class="current__temperature">${temperature}</p>
        <img src="${weather.conditionIcon}" alt="${weather.condition}" class="current__image">
        <button class="current_change-temperature current__btn">Display ${opositeTemperature}</button>
        `;
    $current.appendChild($currentWeather);

    // Creater extra data section
    const $currentExtra = document.createElement('div');
    $currentExtra.classList.add('current__extra');
    const wind = (unity.active === 'celcius') ? `${weather.windKPH} km/h` : `${weather.windMPH} mph`;
    $currentExtra.innerHTML = `
        <div class="current__extra-div">
            <img class="current__extra-img" src="${humidityPng}">
            <p class="current__extra-p">Humidity:</p>
            <p class="current__extra-date">${weather.humidity}%</p>
        </div>
        <div class="current__extra-div">
            <img class="current__extra-img" src="${rainPng}">
            <p class=current__extra-p"">Chance of rain:</p>
            <p class="current__extra-date">${weather.chanceOfRain}%</p>
        </div>
        <div class="current__extra-div">
            <img class="current__extra-img" src="${snowPng}">
            <p class="current__extra-p">Chance of snow:</p>
            <p class="current__extra-date">${weather.chanceOfSnow}%</p>
        </div>
        <div class="current__extra-div">
            <img class="current__extra-img" src="${windPng}">
            <p class="current__extra-p">Wind speed:</p>
            <p class="current__extra-date">${wind}</p>
        </div>
        `;
    $current.appendChild($currentExtra);

    // Create forecast section
    const $forecast = document.createElement('section');
    $forecast.classList.add('forecast');
    $forecast.innerHTML = `
        <form class="forecast__form">
            <input type="radio" id="days" name="forecast__radio" checked>
            <label class="days-label label-checked" for="days">Days</label>
            <input type="radio" id="hours" name="forecast__radio">
            <label class="hours-label" for="hours">Hours</label>
        </form>
        `;
    
        // Display each day
    const $forecastDays = document.createElement('div');
    $forecastDays.classList.add('forecast__days-container');
    $forecastDays.classList.add('forecast__container');
    $forecast.appendChild($forecastDays);
    for(let i = 1; i < weather.forecast.length; i++) {
        const day = weather.forecast[i];
        const $day = document.createElement('div');
        $day.classList.add('forecast__day');
        let dateDay = formatDate(day.date_epoch).split(',',1)[0];
        const minTemp = (unity.active === 'celcius') ? `${day.day.mintemp_c}°C` : `${day.day.mintemp_f}°F`;
        const maxTemp = (unity.active === 'celcius') ? `${day.day.maxtemp_c}°C` : `${day.day.maxtemp_f}°F`;
        $day.innerHTML = `
            <p class="forecast__date">${dateDay}</p>
            <p class="forecast__min-temperature">${minTemp}</p>
            <p class="forecast__max-temperature">${maxTemp}</p>
            <img class="forecast__img" src="http:${day.day.condition.icon}">
            `;
        $forecastDays.appendChild($day);
    }
        // Display each hour
    const $forecastHours = document.createElement('div');
    $forecastHours.classList.add('forecast__hours-container');
    $forecastHours.classList.add('forecast__container');
    $forecastHours.classList.add('hidden');
    $forecast.appendChild($forecastHours);
    const dayHours = weather.forecast[0].hour.length;
    for(let i = 0; i < dayHours; i++) {
        const hour = weather.forecast[0].hour[i];
        const $hour = document.createElement('div');
        $hour.classList.add('forecast__hour');
        const formattedHour = formatHour(hour.time_epoch);
        const hourTemperature = (unity.active === 'celcius') ? `${hour.temp_c}°C` : `${hour.temp_f}°F`;
        $hour.innerHTML = `
            <p class="forecast__hour">${formattedHour}</p>
            <p class="forecast__temperature">${hourTemperature}</p>
            <img class="forecast__img" src="http:${hour.condition.icon}">
            `;
        $forecastHours.appendChild($hour);
    }
    
    $main.innerHTML = '';
    $main.appendChild($current);
    $main.append($forecast);
}
