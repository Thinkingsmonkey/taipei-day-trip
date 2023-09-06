const options = {
  root: null,
  threshold: 0.5,
};

const observer = new IntersectionObserver(handleIntersection, options);
const debouncedFetchData = debounced(getAttractions, 300);

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (nextPage !== null) {
        debouncedFetchData(nextPage, keyword);
      } else {
        const footer = document.querySelector("footer");
        observer.unobserve(footer)
      }
    }
  });
}

function debounced(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    const context = this;
    const args = arguments;
    timer = setTimeout(async () => {
      const data = await func.apply(context, args);
      setParameter(data.nextPage, keyword)
      appendCard(data, cardList);
    }, delay);
  };
}
