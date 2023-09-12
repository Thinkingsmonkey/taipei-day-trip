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

const createAttractionPageInfor = (data) => {
  const title = document.querySelector(".title");
  const category = document.querySelector(".category");
  const mrt = document.querySelector(".mrt");
  const description = document.querySelector(".infors__description");
  const address = document.querySelector(".infos__address");
  const transport = document.querySelector(".infos__transport");
  title.textContent = data.data.name;
  category.textContent = data.data.category;
  mrt.textContent = data.data.mrt;
  description.textContent = data.data.description;
  address.textContent = data.data.address;
  transport.textContent = data.data.transport;
}

const createImageLi = (src) => {
  const imageLi = document.createElement('li');
  imageLi.classList.add("shrink-0", "w-100", "attraction__imageLi")
  const image = document.createElement('img');
  image.classList.add("w-100", "object-fit-cover", "h-100");
  image.setAttribute("src", src);
  image.setAttribute("alt", "attraction");
  imageLi.appendChild(image)
  return imageLi
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