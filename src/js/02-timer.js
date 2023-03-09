import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector("button[data-start]");
const datePointed = document.querySelector("#datetime-picker");
const dateRest = document.querySelector("span[data-days]");
const hoursRest = document.querySelector("span[data-hours]");
const minsRest = document.querySelector("span[data-minutes]");
const secRest = document.querySelector("span[data-seconds]");

btnStart.disabled = true;

btnStart.addEventListener("click", onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      btnStart.disabled = true;
      window.alert("Please choose a date in the future");
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr("input#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function onStartClick(e) {
  let timer = setInterval(() => {
    let counter = new Date(datePointed.value) - new Date();
    btnStart.disabled = true;
    // console.log(counter);
    if (counter >= 0) {
      let steps = convertMs(counter);
      // console.log(steps.minutes);
      dateRest.textContent = steps.days;
      hoursRest.textContent = steps.hours;
      minsRest.textContent = steps.minutes;
      secRest.textContent = steps.seconds;
    }
    // else return;
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
