const refs = {
  btnStart: document.querySelector("button[data-start]"),
  btnStop: document.querySelector("button[data-stop]"),
  body: document.querySelector("body"),
};
let color = "";

refs.btnStop.disabled = true;
refs.btnStart.addEventListener("click", onStart);
refs.btnStop.addEventListener("click", onStop);

function onStart(e) {
  color = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}
function onStop(e) {
  clearInterval(color);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
