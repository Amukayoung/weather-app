

export function changeForecast(tab) {
    const $radioDays = document.querySelector('.days-label');
    const $inputDays = $radioDays.previousElementSibling;
    const $radioHours = document.querySelector('.hours-label');
    const $inputHours = $radioHours.previousElementSibling;
    const $forecastDays = document.querySelector('.forecast__days-container');
    const $forecastHours = document.querySelector('.forecast__hours-container');

    if ((tab === 'days' && !$inputDays.checked)
        || (tab === 'hours' && !$inputHours.checked)) {
        $radioDays.classList.toggle('label-checked');
        $radioHours.classList.toggle('label-checked');
        $forecastDays.classList.toggle('hidden');
        $forecastHours.classList.toggle('hidden');
    }
}