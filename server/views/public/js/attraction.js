// variable
let nextPage = null;

// fetch function
async function getAttractions() {
  url = "http://127.0.0.1:3000/api/attractions";
  page = 0;
  try {
    const response = await fetch(url + `?page=${page}`);
    if (response.ok !== true)
      throw Error(`data fetch not successed, ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

async function getMrts() {
  url = "http://127.0.0.1:3000/api/mrts";
  try {
    const response = await fetch(url);
    if (response.ok !== true)
      throw Error(`data fetch not successed, ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

// create function
const createCard = (data) => {
  const liElement = document.createElement("li");
  liElement.classList.add("card", "d-flex", "d-flex-column");

  const divHeard = document.createElement("div");
  divHeard.classList.add("card__heard", "grow-1");

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

function createMrt(data) {
  const mrtLi = document.createElement("li");
  mrtLi.classList.add("py-5px", "px-15px");

  const mrtName = document.createElement("p");
  mrtName.classList.add("text-gray-70", "fw-5");
  mrtName.textContent = data;

  mrtLi.appendChild(mrtName);
  return mrtLi;
}

// event
window.addEventListener("DOMContentLoaded", async () => {
  // mrtList
  const mrtList = document.querySelector(".mrt-list");
  const cardList = document.querySelector(".card_list");

  const mrtJSON = await getMrts();
  mrtJSON.data.forEach((mrtName) => {
    const mrt = createMrt(mrtName);
    mrtList.appendChild(mrt);
  });

  // cardList
  const data = await getAttractions();
  if (typeof data === "string") console.log(data);
  nextPage = data.nextPage;
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
});
