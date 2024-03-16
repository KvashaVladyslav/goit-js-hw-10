import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputField = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

let userSelectedDate;
let diffTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    diffTime = userSelectedDate - options.defaultDate;
    if (diffTime < 1000) {
      startBtn.disabled = true;
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      startBtn.disabled = false;
      inputField.disabled = false;
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const showCalendar = flatpickr('#datetime-picker', options);
const timerValues = document.querySelectorAll('.value');
// const days = document.querySelector('[data-days]');
// const hours = document.querySelector('[data-hours]');
// const minutes = document.querySelector('[data-minutes]');
// const seconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
startBtn.addEventListener('click', event => {
  const intervalTime = setInterval(() => {
    diffTime = userSelectedDate - new Date();
    event.preventDefault();
    inputField.disabled = true;
    if (diffTime < 1000) {
      inputField.disabled = false;
      clearInterval(intervalTime);
    }
    startBtn.disabled = true;
    const showTimer = convertMs(diffTime);
    timerValues[0].textContent = showTimer.days.toString().padStart(2, '0');
    timerValues[1].textContent = showTimer.hours.toString().padStart(2, '0');
    timerValues[2].textContent = showTimer.minutes.toString().padStart(2, '0');
    timerValues[3].textContent = showTimer.seconds.toString().padStart(2, '0');
    // days.textContent = showTimer.days.toString().padStart(2, '0');
    // hours.textContent = showTimer.hours.toString().padStart(2, '0');
    // minutes.textContent = showTimer.minutes.toString().padStart(2, '0');
    // seconds.textContent = showTimer.seconds.toString().padStart(2, '0');
  }, 1000);
});
