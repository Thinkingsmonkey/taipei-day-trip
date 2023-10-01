// 原始數據 = 小圓點，從 1 開始
// 無限輪播 = imgs = index，從 0 開始，相對原始數據頭尾各添加一個 li
// 相對位置：原始數據 = 無限輪播 -2 -1

// 渲染輪播圖
function updateCarousel(currentIndex) {
  if (currentIndex > cardImgs.children.length - 1) {
    currentIndex = cardImgs.children.length - 1;
  }
  // 設定圓點位置
  setCurrentRadio(currentIndex, cardImgs);

  // 因為 li 寬度 = 輪播圖畫面寬度，利用 currentIndex 移動整個 imgs
  const transformValue = -currentIndex * 100;
  cardImgs.style.transform = `translateX(${transformValue}%)`;
}

// 建立輪播圖下方圓點，並設置點擊後重新渲染輪播圖
const createRadioByImgs = (state) => {
  // 原始數據 = 小圓點，從 1 開始
  for (let i = 1; i <= cardImgs.children.length; i++) {
    // 更改位置再添加無限輪播前渲染小圓點，當前為原始數據
    const radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "navigation");
    radio.classList.add("navigation-radio", "mr-d25");
    navigations.appendChild(radio);

    // 每次點擊圓點 => 更新顯示的圖片
    radio.onclick = () => {
      state.currentIndex = i;
      cardImgs.style.transition = "transform 0.3s ease-in-out";
      updateCarousel(state.currentIndex);
    };
  }
};

// 渲染輪播的小圓點位置
function setCurrentRadio(currentIndex) {
  const radios = document.querySelectorAll('input[name="navigation"]');
  if (currentIndex > cardImgs.children.length - 1) {
    currentIndex = cardImgs.children.length - 1;
  }
  // if (當前位置 === 無限輪播版第一張 或 當前位置 === 原始數據版最後一張)
  if (currentIndex === 0 || currentIndex === cardImgs.children.length - 2) {
    // radios 是 array 從 0，開始，所以從 1 開始算的 cardImgs.children.length 要多減 1
    // 設定原始數據最後一個圓點為確認狀態
    radios[cardImgs.children.length - 3].checked = true;
    return;
  }

  // if (當前位置 === 原始數據第一張 或 當前位置 === 無限輪播版最後一張)
  if (currentIndex === 1 || currentIndex === cardImgs.children.length - 1) {
    // 設置原始數據的第一個圓點為確認狀態
    radios[0].checked = true;
    return;
  }
  radios[currentIndex - 1].checked = true;
}

// 將 img li 添加進 imgs
function appendImages(data) {
  data.data.images.forEach((src, index) => {
    const imageLi = createImageLi(src);
    cardImgs.appendChild(imageLi);
  });
}

// 設置無線輪播的頭尾 li
const addItemForInfiniteCarousel = () => {
  const clonedFirstLi = cardImgs.firstElementChild.cloneNode(true);
  const clonedLastLi = cardImgs.lastElementChild.cloneNode(true);
  cardImgs.insertAdjacentElement("afterbegin", clonedLastLi);
  cardImgs.insertAdjacentElement("beforeend", clonedFirstLi);
};

// 過度完成後的回調函數
function getHandleTransitionEnd(state) {
  return () => {
    // 過渡結束，設置回 false
    state.isTransitioning = false;
    // 過度"結束"事件觸發執行此函數
    if (state.currentIndex > cardImgs.children.length - 1) {
      state.currentIndex = cardImgs.children.length - 1;
    }

    // if (位置 === 0)，即從原始數據中圖片第一張要移動到最後一張
    if (state.currentIndex === 0) {
      // A：先取消過渡，讓使用者感覺不到跳轉過渡
      cardImgs.style.transition = "none";

      // currentIndex 設定為原始數據的最後一張
      state.currentIndex = cardImgs.children.length - 2;

      // 利用修正的 currentIndex 更新渲染
      updateCarousel(state.currentIndex);

      // 強制重繪，讓 css 效果套用當前設定，使前後 transform 也就是 A、B 都能有作用而不是被合併
      cardImgs.offsetHeight;

      // B：將被 A 的移除過渡效果添加回去
      cardImgs.style.transition = "transform 0.3s ease-in-out";

      // 若else if 位置 === 添加後的總長，即從原始數據中圖片最後一張要移動到第一張
    } else if (state.currentIndex === cardImgs.children.length - 1) {
      // A：先取消過渡，讓使用者感覺不到跳轉過渡
      cardImgs.style.transition = "none";

      // currentIndex 設定為原始數據的第一張
      state.currentIndex = 1;

      // 利用修正的 currentIndex 更新渲染
      updateCarousel(state.currentIndex);

      // 強制重繪，讓 A、B 皆有效果
      cardImgs.offsetHeight;

      // B：將被 A 的移除過渡效果添加回去
      cardImgs.style.transition = "transform 0.3s ease-in-out";
    }
  };
}

// 自動輪播
function autoCarousel(state) {
  let autoTimer = setInterval(() => {
    cardImgs.style.transition = "transform 0.3s ease-in-out";
    state.currentIndex++;
    state.isTransitioning = true;
    updateCarousel(state.currentIndex);
  }, 2000);
  return autoTimer
}

// 渲染 carousel
function createAttractionCarousel(data) {
  // 渲染 images、設定狀態變數
  appendImages(data);
  const state = {
    isTransitioning: false,
    currentIndex: 1
  };

  // 先利用原始長度添加小圓點
  createRadioByImgs(state);

  // 設置無線輪播的頭尾 li
  addItemForInfiniteCarousel();

  // 初始化輪播位置，當前為位置 1，整個 imgs array 的第二個元素
  updateCarousel(state.currentIndex);

  // 自動輪播
  let autoTimer = autoCarousel(state);

  // event
  // 利用當前狀態建立回調函數，當過渡完成時若是移動到 imgs(無限輪播版) 第一張、最後一張處理畫面的函數
  cardImgs.addEventListener("transitionend", getHandleTransitionEnd(state));

  // 向左移動按鈕點擊
  prevButton.addEventListener("click", function () {
    // 重置自動輪播
    clearInterval(autoTimer)
    autoTimer = autoCarousel(state)
    //  如果正在進行過渡，則直接返回
    if (state.isTransitioning) return;

    // 開始過渡，設置為 true，讓使用者無法再次點擊，類似 obsever 開啟關閉
    state.isTransitioning = true;

    // 設置過渡效果，因為要無限輪播所以預設是沒有設定過渡效果，若用戶直接使用左右按鈕，會無過渡效果
    cardImgs.style.transition = "transform 0.3s ease-in-out";

    // 更新位置
    state.currentIndex--;

    // 利用位置重新渲染輪播畫面
    updateCarousel(state.currentIndex);
  });

  // 向右移動按鈕，如向左
  nextButton.addEventListener("click", function () {
    clearInterval(autoTimer)
    autoTimer = autoCarousel(state)
    if (state.isTransitioning) return; // 如果正在進行過渡，則直接返回
    state.isTransitioning = true; // 開始過渡，設置為 true
    cardImgs.style.transition = "transform 0.3s ease-in-out";
    state.currentIndex++;
    updateCarousel(state.currentIndex);
  });
}

// event
window.addEventListener("DOMContentLoaded", async () => {
  // 取得當前網址中的 id，以此 fetch 資料
  const path = window.location.pathname;
  const parts = path.split("/");
  const id = parts[parts.length - 1];
  const data = await getAttractionById(id);

  createAttractionPageInfor(data);

  createAttractionCarousel(data);
});

afternoon.addEventListener("click", () => {
  attractionPrice.textContent = "新台幣 2500 元";
});

morning.addEventListener("click", () => {
  attractionPrice.textContent = "新台幣 2000 元";
});
