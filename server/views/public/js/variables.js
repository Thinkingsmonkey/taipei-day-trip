// variable
const body = document.querySelector("body");
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');
const mrtList = document.querySelector(".mrt-list");
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const cardList = document.querySelector(".card_list");
const morning = document.querySelector('input[value="morning"]')
const afternoon = document.querySelector('input[value="afternoon"]')
const attractionPrice = document.querySelector('.attraction__price')
const nextButton = document.querySelector('.pagination-right');
const prevButton = document.querySelector('.pagination-left');
const cardImgs = document.querySelector(".card__imgs");
const navigations = document.querySelector(".navigations");

const APP_ID = 137035;
const APP_KEY = 'app_C96W1kzNVZHFO0O1ffPrc5W1Xcw9G4rN7BL3pmIel4PYoOQyLG5jhX595Cz2';

let memberName = '';
let memberEmail = '';
let bookingsData = null;