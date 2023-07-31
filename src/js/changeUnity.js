import { displayWeather } from "./displayWeather";
import { unity } from "./index";

export function changeUnity() {
    if (unity.active === 'celcius') unity.active = 'fahrenheit';
    else unity.active = 'celcius';
    const city = document.querySelector('.current__city');

    displayWeather(city.textContent, unity);
}