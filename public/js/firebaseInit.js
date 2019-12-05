console.log("hi from firebaseInit.js");

const dateToString = (date) => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

// Initialize Firebase
// Your web app's Firebase configuration
// create an own firebase project and connect it with this app
// or use another kind of database (sqlite / json server etc...)
var firebaseConfig = {
  apiKey: "...",
  authDomain: "yourappname.firebaseapp.com",
  databaseURL: "https://yourappname.firebaseio.com",
  projectId: "yourappname",
  storageBucket: "yourappname.appspot.com",
  messagingSenderId: "908224974039",
  appId: "..."
};
firebase.initializeApp(firebaseConfig);

// GLOBAL VARIABLES
const db = firebase.firestore();
const userId = ""; // save a document in a collection called "user" and put the document_id here
let dayData = {};
let selectedDate = dateToString(new Date());

// set date
const setDisplayDate = targetDateString => {
  let targetDate = new Date(targetDateString);
  let displayDateTitle = "";
  let displayDate = "";
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  if (targetDate.getYear() === new Date().getYear() &&
    targetDate.getMonth() === new Date().getMonth() &&
    targetDate.getDay() === new Date().getDay() ) {
    displayDateTitle = "Today";
    displayDate = weekday[new Date(targetDateString).getDay()] + ", " + targetDateString;
  } else {
    displayDateTitle = weekday[new Date(targetDateString).getDay()];
    displayDate = targetDateString;
  }
  document.querySelector(".inject-date").innerText = displayDate;
  document.querySelector(".inject-date-title").innerText = displayDateTitle;
};

const updateFirebase = () => {
  let target = {
    water: water.current,
    meditation: meditation.current,
    jogging: jogging.current,
    gym: gym.current,
    goals: goals.current()
  };
  dayData[selectedDate] = target;
  db.collection(`users/${userId}/days`).doc(selectedDate).set(target, {merge: true})
};

const decreaseDate = () => {
  let decreasedDate = changeDate(selectedDate, -1);
  selectedDate = dateToString(decreasedDate);
  setDisplayDate(selectedDate);
  syncData(selectedDate);
  updateProgressBar();
};

const increaseDate = () => {
  let increasedDate = changeDate(selectedDate, 1);
  selectedDate = dateToString(new Date(Math.min(new Date(), increasedDate))); // dont allow future dates
  setDisplayDate(selectedDate);
  syncData(selectedDate);
  updateProgressBar();
};

const changeDate = (startingDate, increment) => {
  return new Date(new Date(startingDate).getTime() + 1000*60*60*24*increment);
};

const syncData = selectedDate => {
  // check if current date is already stored?
  if (dayData[selectedDate] === undefined) {
    // initialize document in database
    water.current = 0;
    meditation.current = 0;
    jogging.current = 0;
    gym.current = 0;
    goals.vegan = false;
    goals.nocoke = false;
    goals.fasting = false;
  } else {
    water.current = dayData[selectedDate].water;
    meditation.current = dayData[selectedDate].meditation;
    jogging.current = dayData[selectedDate].jogging;
    gym.current = dayData[selectedDate].gym;
    goals.vegan = dayData[selectedDate].goals.vegan;
    goals.nocoke = dayData[selectedDate].goals.nocoke;
    goals.fasting = dayData[selectedDate].goals.fasting;
  }
};

// GET ALL USER DATA
db.collection(`users/${userId}/days`).get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    dayData[doc.id] = doc.data();
  });
}).then(() => {
  syncData(selectedDate);
  setDisplayDate(selectedDate);
  updateProgressBar();
})
