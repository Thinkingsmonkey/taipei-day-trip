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

const createBookingLi = (booking) => {
  const li = document.createElement('li');
  li.classList.add('booking__infor');

  const inforCard = document.createElement('div');
  inforCard.classList.add('infor__card', 'd-flex', 'por');

  const attractionImg = document.createElement('img');
  attractionImg.classList.add('card__img', 'mr-1d875');
  attractionImg.setAttribute('src', booking.attraction.image);
  attractionImg.setAttribute('alt', booking.attraction.name);

  const cardContent = document.createElement('div');
  cardContent.classList.add('card__content', 'lh-1d5');

  const title = document.createElement('h2');
  title.classList.add('content__title', 'fw-7', 'mb-1d25', 'text-primary');
  title.textContent = `台北一日遊：${booking.attraction.name}`;
  
  const createDate = document.createElement('div');
  createDate.classList.add('content__date', 'mb-d625');
  createDate.innerHTML = `<span class="fw-7 mr-5px">日期：</span><span class="fw-5">${booking.date}</span>`;
  
  const createTime = document.createElement('div');
  createTime.classList.add('content__time', 'mb-d625');
  createTime.innerHTML = `<span class="fw-7 mr-5px">時間：</span><span class="fw-5">${booking.time === "morning" ? "早上 9 點到下午 4 點" : "下午 4 點到晚上 9 點"}</span>`;
  
  const createPrice = document.createElement('div');
  createPrice.classList.add('content__price', 'mb-d625');
  createPrice.innerHTML = `<span class="fw-7 mr-5px">費用：</span><span class="fw-5">${booking.price === 2500 ? "新台幣 2500 元" : "新台幣 2000 元"}</span>`;
  
  const createAttraction = document.createElement('div');
  createAttraction.classList.add('content__attraction', 'mb-d625');
  createAttraction.innerHTML = `<span class="fw-7 mr-5px">地點：</span><span class="fw-5">${booking.attraction.address}</span>`;
  
  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', '../public/img/delete.png');
  deleteImg.addEventListener('click', async () => {
    const result = await deleteBooking(booking.id);
    renderBookingList()
  })
  deleteImg.classList.add('card__delete', 'poa', 'cursor-pointer');

  // 將所有子元件加入至 cardContent
  cardContent.appendChild(title);
  cardContent.appendChild(createDate);
  cardContent.appendChild(createTime);
  cardContent.appendChild(createPrice);
  cardContent.appendChild(createAttraction);
  cardContent.appendChild(deleteImg);
  
  // 將 attractionImg 和 cardContent 加入至 inforCard
  inforCard.appendChild(attractionImg);
  inforCard.appendChild(cardContent);

  // 最後將 inforCard 加入至 li
  li.appendChild(inforCard);

  return li;
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

