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
        observer.unobserve(entry.target);
        debouncedFetchData(nextPage, keyword)
          .then(() => {
            observer.observe(entry.target);
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      } else {
        observer.unobserve(entry.target);
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
    return new Promise((resolve, reject) => {
      timer = setTimeout(async () => {
        try {
          const data = await func.apply(context, args);
          setParameter(data.nextPage, keyword);
          appendCard(data, cardList);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  };
}
