import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';

const date = new Date();
const day = document.querySelector("[data-id='day-input']");
const month = document.querySelector("[data-id='month-input']");
const year = document.querySelector("[data-id='year-input']");
const submitBtn = document.querySelector("[data-id='submit-btn']");
const resultYears = document.querySelector("[data-id='result-years'] span");
const resultMonths = document.querySelector("[data-id='result-months'] span");
const resultDays = document.querySelector("[data-id='result-days'] span");
const errorDay = document.getElementById('error-day');
const errorMonth = document.getElementById('error-month');
const errorYear = document.getElementById('error-year');

function validateDay() {
  if (day.value === '') {
    errorDay.textContent = 'Field required';
    errorDay.style.display = 'block';
    day.style.border = '1px solid red';
    return false;
  }
  if (day.value > 31 || day.value < 1) {
    errorDay.textContent = 'Must be a valid day';
    errorDay.style.display = 'block';
    day.style.border = '1px solid red';
    return false;
  }
  errorDay.style.display = 'none';
  day.style.border = '1px solid #ced4da';
  return true;
}

function validateMonth() {
  if (month.value === '') {
    errorMonth.textContent = 'Field required';
    errorMonth.style.display = 'block';
    month.style.border = '1px solid red';
    return false;
  }
  if (month.value > 12 || month.value < 1) {
    errorMonth.textContent = 'Must be a valid month';
    errorMonth.style.display = 'block';
    month.style.border = '1px solid red';
    return false;
  }
  errorMonth.style.display = 'none';
  month.style.border = '1px solid #ced4da';
  return true;
}

function validateYear() {
  if (year.value === '') {
    errorYear.textContent = 'Field required';
    errorYear.style.display = 'block';
    year.style.border = '1px solid red';
    return false;
  }
  if (year.value > date.getFullYear()) {
    errorYear.textContent = 'Must be a valid year';
    errorYear.style.display = 'block';
    year.style.border = '1px solid red';
    return false;
  }
  errorYear.style.display = 'none';
  year.style.border = '1px solid #ced4da';
  return true;
}

submitBtn.addEventListener('click', () => {
  const isDayValid = validateDay();
  const isMonthValid = validateMonth();
  const isYearValid = validateYear();

  if (isDayValid && isMonthValid && isYearValid) {
    ageCalculator();
  }
});

function ageCalculator() {
  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();
  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let previousMonth = months[currentMonth - 2];

  if (day.value > currentDay) {
    currentDay += previousMonth;
    currentMonth -= 1;
  }

  if (month.value > currentMonth) {
    currentMonth += 12;
    currentYear -= 1;
  }

  if (day.value > months[month.value - 1]) {
    errorDay.textContent = 'Must be a valid day';
    errorDay.style.display = 'block';
    day.style.border = '1px solid red';
    return;
  }

  resultYears.innerHTML = currentYear - year.value + ' ';
  resultMonths.innerHTML = currentMonth - month.value + ' ';
  resultDays.innerHTML = currentDay - day.value + ' ';
}
