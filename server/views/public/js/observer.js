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
        observer.unobserve(entry.target);
      }
    }
  });
}

function debounced(func, delay) {
  let timer;
  return function (...args) {
    const footer = document.querySelector("footer");
    observer.unobserve(footer);
    clearTimeout(timer);
    
    timer = setTimeout(async () => {
      const data = await func(...args);
      observer.observe(footer);
      setParameter(data.nextPage, keyword);
      appendCard(data, cardList);
    }, delay);
  };
}
