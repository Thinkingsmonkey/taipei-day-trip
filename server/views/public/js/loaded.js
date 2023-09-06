
// event
window.addEventListener("DOMContentLoaded", async () => {
  // mrtList
  const mrtJSON = await getMrts();
  mrtJSON.data.forEach((mrtName) => {
    const mrt = createMrt(mrtName);
    mrtList.appendChild(mrt);
  });
  console.dir(mrtList);

  // cardList
  const data = await getAttractions();
  if (typeof data === "string") console.log(data);
  setParameter(data.nextPage, keyword)
  appendCard(data, cardList);

  // footer
  body.appendChild(createFooter());
  const footer = document.querySelector("footer");
  observer.observe(footer);
});
