console.log("Hi from progressBarChecks.js");

const checkMarkIcons = document.querySelectorAll(".second-row > .fa-check-circle");

const setProgressBar = (stage) => {
  resetProgressBar();
  for (let i=0; i<stage; i++) {
    setActive(checkMarkIcons[i]);
  }
};

const resetProgressBar = () => {
  checkMarkIcons.forEach(checkMarkIcon => {
    setInactive(checkMarkIcon);
  })
};

const setActive = checkMarkIcon => {
  checkMarkIcon.classList.add("fas");
  checkMarkIcon.classList.remove("far");
  checkMarkIcon.classList.add("active");
};

const setInactive = checkMarkIcon => {
  checkMarkIcon.classList.remove("fas");
  checkMarkIcon.classList.add("far");
  checkMarkIcon.classList.remove("active");
};

const updateProgressBar = () => {
  let count = 0;
  count += water.reached() ? 1 : 0;
  count += meditation.reached() ? 1 : 0;
  count += jogging.reached() ? 1 : 0;
  count += gym.reached() ? 1 : 0;
  count += goals.reached() ? 1 : 0;
  setProgressBar(count);
};
