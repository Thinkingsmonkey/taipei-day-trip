let scrollAmount = mrtList.offsetWidth - 80; 

leftArrow.addEventListener('click', function() {
  mrtList.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

rightArrow.addEventListener('click', function() {
  mrtList.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});