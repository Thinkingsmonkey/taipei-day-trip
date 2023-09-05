const options = {
  root: null,
  threshold: 0.5
}

const observer = new IntersectionObserver(handleIntersection, options);

const footer = document.querySelector('.footer');
observer.observe(footer);

const debouncedFetchData  = debounced(getAttractions, 300)
async function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      debouncedFetchData()
    }
  })
}

function debounced(func, delay) {
  let timer
  return function () {
    clearTimeout(timer);
    const context = this
    const args = arguments;
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
};
