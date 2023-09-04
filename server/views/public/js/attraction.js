async function getAttractions() {
  url = "http://127.0.0.1:3000/api/attractions";
  page = 0;
  try {
    const response = await fetch(url + `?page=${page}`);
    if (response.ok !== true) throw Error(`data fetch not successed, ${response.status}`)
    const data = await response.json();
    return data
    
  } catch (error) {
    return error.message
  }
}

const addCard = (data) => {
  const card = `
    <li class="card">
      <div class="card__heard">
        <img src="${data.images[0]}" alt="" class="card__img">
        <div class="img__cover p-d625 d-flex align-items-center">
          <p class="card__title text-white">${data.name}</p>
        </div>
      </div>
      <ul class="card__content p-d625 d-flex justify-content-between align-items-center  text-gray-50">
        <li>
          <p>${data.mrt}</p>
        </li>
        <li>
          <p>${data.category}</p>
        </li>
      </ul>
    </li>
  `
}




window.addEventListener('DOMContentLoaded', async () => {
  const data = await getAttractions();
  if (typeof data === "string") console.log(data);
  console.log(data);


})