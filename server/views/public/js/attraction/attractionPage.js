function updateCarousel(currentIndex) {
  setCurrentRadio (currentIndex, cardImgs)
  const transformValue = -currentIndex * 100;
  cardImgs.style.transform = `translateX(${transformValue}%)`;
}

function setCurrentRadio (currentIndex) {
  const radios = document.querySelectorAll('input[name="navigation"]')
  if (currentIndex === 0 || currentIndex === cardImgs.children.length - 2) {
    radios[cardImgs.children.length - 3].checked = true; 
    // radios 是 array 從 0，開始，所以從 1 開始的 cardImgs 要多減 1
    return
  }
  if (currentIndex === 1 || currentIndex === cardImgs.children.length - 1) {
    radios[0].checked = true;
    return
  }
  radios[currentIndex - 1].checked = true;
}

function appendImages (data) {
  data.data.images.forEach((src, index) => {
    const imageLi = createImageLi(src);
    cardImgs.appendChild(imageLi);
  });

  const clonedFirstLi = cardImgs.firstElementChild.cloneNode(true);
  const clonedLastLi = cardImgs.lastElementChild.cloneNode(true);
  cardImgs.insertAdjacentElement("afterbegin", clonedLastLi);
  cardImgs.insertAdjacentElement("beforeend", clonedFirstLi);
}


function getHandleTransitionEnd(state) {
  return () => {
    state.isTransitioning = false; // 過渡結束，設置回 false
    if (state.currentIndex === 0) {
      cardImgs.style.transition = "none";
      state.currentIndex = cardImgs.children.length - 2;
      updateCarousel(state.currentIndex);
      cardImgs.offsetHeight; // 強制重繪
      cardImgs.style.transition = "transform 0.3s ease-in-out";
    } else if (state.currentIndex === cardImgs.children.length - 1) {
      cardImgs.style.transition = "none";
      state.currentIndex = 1;
      updateCarousel(state.currentIndex);
      cardImgs.offsetHeight; // 強制重繪
      cardImgs.style.transition = "transform 0.3s ease-in-out";
    }
  }
}

// carousel 主要
function createAttractionCarousel(data) {
  appendImages (data)
  const state = {
    isTransitioning: false,
    currentIndex: 1
  };

  for (let i = 0; i <= cardImgs.children.length - 1; i++ ){
    if (i === 0 || i === cardImgs.children.length - 1 ) continue;
    const radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', 'navigation');
    radio.classList.add("navigation-radio", "mr-d25");
    radio.onclick = () => {
      state.currentIndex = i;
      cardImgs.style.transition = "transform 0.3s ease-in-out";
      updateCarousel(state.currentIndex);
    }
    navigations.appendChild(radio);
  }


  // 初始化輪播位置
  updateCarousel(state.currentIndex);


  
  const handleTransitionEnd = getHandleTransitionEnd(state);
  cardImgs.addEventListener("transitionend", handleTransitionEnd);

  prevButton.addEventListener("click", function () {
    if (state.isTransitioning) return; // 如果正在進行過渡，則直接返回
    state.isTransitioning = true; // 開始過渡，設置為 true
    cardImgs.style.transition = "transform 0.3s ease-in-out";
    state.currentIndex--;
    updateCarousel(state.currentIndex);
  });

  nextButton.addEventListener("click", function () {
    if (state.isTransitioning) return; // 如果正在進行過渡，則直接返回
    state.isTransitioning = true; // 開始過渡，設置為 true
    cardImgs.style.transition = "transform 0.3s ease-in-out";
    state.currentIndex++;
    updateCarousel(state.currentIndex);
  });
}


// event
window.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const parts = path.split("/");
  const id = parts[parts.length - 1];
  const data = await getAttractionById(id);

  createAttractionPageInfor(data)

  createAttractionCarousel(data) 
});

aftermoon.addEventListener("click", () => {
  attractionPrice.textContent = "新台幣 2500 元";
});

morning.addEventListener("click", () => {
  attractionPrice.textContent = "新台幣 2000 元";
});
