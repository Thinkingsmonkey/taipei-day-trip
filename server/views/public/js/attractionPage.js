// event
window.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const parts = path.split("/");
  const id = parts[parts.length - 1];
  const data = await getAttraction(id);

  console.log(data);
  const title = document.querySelector(".title");
  const category = document.querySelector(".category");
  const mrt = document.querySelector(".mrt");
  const description = document.querySelector(".infors__description");
  const address = document.querySelector(".infos__address");
  const transport = document.querySelector(".infos__transport");
  const cardImgs = document.querySelector(".card__imgs");
  data.data.images.forEach((src) => {
    const image = createImage(src);
    cardImgs.appendChild(image);
  });
  title.textContent = data.data.name;
  category.textContent = data.data.category;
  mrt.textContent = data.data.mrt;
  description.textContent = data.data.description;
  address.textContent = data.data.address;
  transport.textContent = data.data.transport;
});

aftermoon.addEventListener("click", () => {
  attractionPrice.textContent = "新台幣 2500 元";
});

morning.addEventListener("click", () => {
  attractionPrice.textContent = "新台幣 2000 元";
});
