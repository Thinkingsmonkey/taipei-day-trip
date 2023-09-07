
// event
window.addEventListener("DOMContentLoaded", async () => {
  // mrtList
  const mrtJSON = await getMrts();
  mrtJSON.data.forEach((mrtName) => {
    const mrt = createMrt(mrtName);
    mrtList.appendChild(mrt);
  });

  // cardList
  const data = await getAttractions();
  if (data instanceof Error) {
    console.log(data.message);
  } else {
    setParameter(data.nextPage, keyword);
    appendCard(data, cardList);
  }

  // footer
  body.appendChild(createFooter());
  const footer = document.querySelector("footer");
  observer.observe(footer);
});
