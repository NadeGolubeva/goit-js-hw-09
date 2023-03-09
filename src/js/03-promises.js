const form = document.querySelector(".form");

const formData = {};

form.addEventListener("input", onInput);
form.addEventListener("submit", onClick);

function onInput(e) {
  console.log(e.target.value);
  formData[e.target.name] = e.target.value;
  console.log(formData);
}

function onClick(e) {
  e.preventDefault();
  let startDelay = Number(formData.delay);
  let stepDelay = formData.step;
  let amountPromise = formData.amount;

  console.log(startDelay, stepDelay, amountPromise);
  for (let i = 0; i < amountPromise; i += 1) {
    createPromise(1 + i, startDelay + i * stepDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  form.reset();
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    // console.log("sd");
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
