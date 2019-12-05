console.log("hi from initWebComponents.js");

const water      = document.querySelector("my-card#water");
const meditation = document.querySelector("my-card#meditation");
const jogging    = document.querySelector("my-card#jogging");
const gym        = document.querySelector("my-card#gym");
const goals      = document.querySelector("my-card-goals#goals");

water.title = "WATER";
water.unit = "liter";
water.color = "#10316b";
water.max = 3;
water.step = 0.25;
water.current = 0;

meditation.title = "MEDITATION";
meditation.unit = "min";
meditation.color = "#f47d31";
meditation.max = 20;
meditation.step = 5;
meditation.current = 0;

jogging.title = "JOGGING";
jogging.unit = "km";
jogging.color = "#efe61e";
jogging.max = 6;
jogging.step = 1;
jogging.current = 0;

gym.title = "GYM";
gym.unit = "min";
gym.color = "#efe61e";
gym.max = 45;
gym.step = 15;
gym.current = 0;

goals.vegan = false;
goals.noCoke = false;
goals.fasting = false;
