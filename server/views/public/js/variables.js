// variable
const body = document.querySelector("body");
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');
const mrtList = document.querySelector(".mrt-list");
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const cardList = document.querySelector(".card_list");
const morning = document.querySelector('input[value="morning"]')
const aftermoon = document.querySelector('input[value="aftermoon"]')
const attractionPrice = document.querySelector('.attraction__price')
let nextPage = null;
let keyword = "";

// set Page、keyword
const setParameter = (newNextPage, newKeyword = "") => {
  nextPage = newNextPage;
  keyword = newKeyword;
}

// fetch function
async function getFetch (url) {
  try {
    const response = await fetch(url);
    if (response.ok !== true)
      throw new Error(`data fetch not successed, ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error; 
  }
}

async function getAttractions(page = 0, keyword = "") {
  url = "http://54.65.247.64:3000/api/attractions"  + `?page=${page}&keyword=${keyword}`;
  return getFetch(url)
}

async function getMrts() {
  url = "http://54.65.247.64:3000/api/mrts";
  return getFetch(url)
}

async function getAttraction(id) {
  url = "http://54.65.247.64:3000/api/attraction/" + `${id}`;
  return getFetch(url)
}

// create function
const createCard = (data) => {
  const liElement = document.createElement("li");
  liElement.classList.add("card", "card-index", "d-flex", "d-flex-column", "cursor-pointer");

  const divHeard = document.createElement("div");
  divHeard.classList.add("card__head", "grow-1", "por");

  const imgElement = document.createElement("img");
  imgElement.src = data.images;
  imgElement.alt = "attraction";
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


const createImage = (src) => {

  // const imageLi = document.createElement('li');
  // imageLi.classList.add("shrink-0", "w-100")
  const image = document.createElement('img');
  image.classList.add("w-100", "object-fit-cover", "shrink-0");
  image.setAttribute("src", src);
  image.setAttribute("alt", "attraction");
  // imageLi.appendChild(image)
  return image
}


const appendCard = (data, cardList) => {
  data.data.forEach((data) => {
    const cardData = {
      images: data.images[0],
      name: data.name,
      mrt: data.mrt,
      category: data.category,
      id: data.id,
    };
    const card = createCard(cardData);
    card.addEventListener('click', () => {
      window.location.href = "/attraction/" + `${data.id}`;
    })
    cardList.appendChild(card);
  });
};

