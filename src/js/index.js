import { changeForecast } from "./changeForecast";
import { displayWeather } from "./displayWeather";
import { changeUnity } from "./changeUnity";
import "../css/style.css";
import "../css/header.css";
import "../css/main.css";
import "../css/current.css";
import "../css/forecast.css";
import "../css/responsive.css";

export const unity = {
    'active': 'celcius',
};

// Display template weather
displayWeather('London', unity);

// Display weather of input.value
const $searchBar = document.querySelector('.header__search-bar');
const $searchButton = document.querySelector('.header__search-button');
$searchButton.addEventListener('click', () => displayWeather($searchBar.value, unity));

const $main = document.querySelector('.main');
$main.addEventListener('click', function(event) {
    const target = event.target;
    // Switch between forecast days and forecast hours
    if (target.classList.contains('days-label')) changeForecast('days');
    else if (target.classList.contains('hours-label')) changeForecast('hours');
    // Switch between celcius and fahrenheit
    else if (target.classList.contains('current__btn')) changeUnity();
})

