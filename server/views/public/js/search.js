const search = async () => {
  const data = await getAttractions(0, searchInput.value)
  const footer = document.querySelector("footer");
  cardList.innerHTML = '';
  setParameter(data.nextPage, searchInput.value)
  if (typeof data === "string") {
    const text = document.createElement("p");
    text.classList.add("w-100", "text-center")
    text.textContent = "找無資料";
    cardList.appendChild(text);
    observer.unobserve(footer);
  }
  else {
    appendCard(data, cardList);
    observer.observe(footer);
  }
}
searchBtn.addEventListener('click', async () => {
  search()
})
searchInput.addEventListener('keydown', async (e) => {
  if (e.key === "Enter") {
    search()
  }
})