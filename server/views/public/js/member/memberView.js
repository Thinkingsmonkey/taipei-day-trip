
function createErrorMessage(message) {
  const errorMessage = document.querySelector(".error-message");
  const classArray = ["mb-d625", "text-red"];
  errorMessage.classList.add(...classArray);
  errorMessage.textContent = message;
}

function changeSignCard(closed=false) {
  const memberTitle = document.querySelector(".member__title");
   // 清除錯誤訊息
  createErrorMessage("");

  nameInputs.forEach((input) => {
    input.value = "";
  });
  if (closed || !memberButton.classList.contains("login")) {
    console.log("closed");
    memberTitle.textContent = "登入會員帳號";
    memberButton.textContent = "登入帳戶";
    navigationLink.textContent = "點此註冊";
    navigationLink.previousElementSibling.textContent = "還沒有帳戶？";
    nameInputs[0].classList.add("d-none");
    memberButton.classList.add("login");
    return
  }
  if (memberButton.classList.contains("login")) {
    memberTitle.textContent = "註冊會員帳號";
    memberButton.textContent = "註冊新帳戶";
    navigationLink.textContent = "點此登入";
    navigationLink.previousElementSibling.textContent = "已經有帳戶了？";
    nameInputs[0].classList.remove("d-none");
    memberButton.classList.remove("login");
  } 
  // memberTitle.textContent = "登入會員帳號";
  // memberButton.textContent = "登入帳戶";
  // navigationLink.textContent = "點此註冊";
  // navigationLink.previousElementSibling.textContent = "還沒有帳戶？";
  // nameInputs[0].classList.add("d-none");
  // memberButton.classList.add("login");
  
}

function createSignBtn(logined) {
  signBtn.firstElementChild.textContent =
    logined === true ? "登出" : "登入/註冊";
  if (logined) {
    signBtn.classList.add("logined");
    return;
  }
  signBtn.classList.remove("logined");
}

function reloadPage() {
  const path = window.location.pathname;
  window.location.href = path;
}