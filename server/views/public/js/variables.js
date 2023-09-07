// variable
const body = document.querySelector("body");
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');
const mrtList = document.querySelector(".mrt-list");
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const cardList = document.querySelector(".card_list");
let nextPage = null;
let keyword = "";

// set Page、keyword
const setParameter = (newNextPage, newKeyword = "") => {
  nextPage = newNextPage;
  keyword = newKeyword;
}

// fetch function
async function getAttractions(page = 0, keyword = "") {
  url = "http://54.65.247.64:3000/api/attractions";
  try {
    const response = await fetch(url + `?page=${page}&keyword=${keyword}`);
    if (response.ok !== true)
      throw Error(`data fetch not successed, ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error; 
  }
}

async function getMrts() {
  url = "http://54.65.247.64:3000/api/mrts";
  try {
    const response = await fetch(url);
    if (response.ok !== true)
      throw Error(`data fetch not successed, ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

// create function
const createCard = (data) => {
  const liElement = document.createElement("li");
  liElement.classList.add("card", "d-flex", "d-flex-column", "cursor-pointer");

  const divHeard = document.createElement("div");
  divHeard.classList.add("card__head", "grow-1");

  const imgElement = document.createElement("img");
  imgElement.src = data.images;
  imgElement.alt = "";
  imgElement.classList.add("card__img");
  const divCover = document.createElement("div");
  divCover.classList.add(
    "img__cover",
    "p-d625",
    "d-flex",
    "align-items-center"
  );

  const pElement = document.createElement("p");
  pElement.classList.add("card__title", "text-white");
  pElement.textContent = data.name;

  divCover.appendChild(pElement);
  divHeard.appendChild(imgElement);
  divHeard.appendChild(divCover);

  const ulElement = document.createElement("ul");
  ulElement.classList.add(
    "card__content",
    "p-d625",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "text-gray-50"
  );

  const liMrt = document.createElement("li");
  const pMrt = document.createElement("p");
  pMrt.textContent = data.mrt;
  liMrt.appendChild(pMrt);

  const liCategory = document.createElement("li");
  const pCategory = document.createElement("p");
  pCategory.textContent = data.category;
  liCategory.appendChild(pCategory);

  ulElement.appendChild(liMrt);
  ulElement.appendChild(liCategory);

  liElement.appendChild(divHeard);
  liElement.appendChild(ulElement);

  return liElement;
};

const createMrt = (data) => {
  const mrtLi = document.createElement("li");
  mrtLi.classList.add("mrt_item", "py-d25", "px-15px");

  const mrtName = document.createElement("p");
  mrtName.classList.add("text-gray-70", "fw-5", "cursor-pointer");
  mrtName.textContent = data;

  mrtLi.appendChild(mrtName);
  return mrtLi;
};

const createFooter = (data) => {
  const footer = document.createElement("footer");
  footer.classList.add("bg-gray-50", "text-center", "py-2d5", "w-100", "poa");
  const copyright = document.createElement("p");
  copyright.classList.add("text-white");
  copyright.textContent = "COPYRIGHT © 2023 台北一日遊";
  footer.appendChild(copyright);
  return footer;
};

const appendCard = (data, cardList) => {
  data.data.forEach((data) => {
    const cardData = {
      images: data.images[0],
      name: data.name,
      mrt: data.mrt,
      category: data.category,
    };
    const card = createCard(cardData);
    cardList.appendChild(card);
  });
};

