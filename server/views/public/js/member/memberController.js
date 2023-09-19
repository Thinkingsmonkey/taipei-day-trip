const signBtn = document.querySelector(".sign-btn");
const memberCard = document.querySelector(".member__card");
const signForm = document.querySelector(".sign-form");
const memberButton = document.querySelector(".member__button");
const navigationLink = document.querySelector(".navigation__link");
const nameInputs = document.querySelectorAll(".member__input");


// 載入前先確認是否登入
window.addEventListener("DOMContentLoaded", async () => {
  const response = await checkMemberInfor();
  if (response.data === null) {
    // 渲染 登入/註冊
    createSignBtn(false);
    return;
  }
  // 渲染 登出按鈕
  createSignBtn(true);
});

// 登入狀態：點登出 清除 localStorage 重新渲染
// 未登入狀態：點登入/註冊 跳出輸入框
signBtn.addEventListener("click", (e) => {
  if (signBtn.classList.contains("logined")) {
    localStorage.clear();
    reloadPage();
    return;
  }
  memberCard.parentElement.classList.remove("d-none");
});

// 登入、註冊跳轉
navigationLink.addEventListener("click", () => {
  changeSignCard();
});

// 點 X、外部模糊區，關閉輸入框
signForm.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("member__close") ||
    e.target.classList.contains("card__cover")
  ) {
    memberCard.parentElement.classList.add("d-none");
  }
});

// 點登入帳戶 (login) 取得 input 資料整理後打 API 若成功重新渲染
// !點 "點此註冊" 取得 input 資料整理後 打 API 若成功按鈕下顯示 成功
memberButton.addEventListener("click", async (e) => {
  if (memberButton.classList.contains("login")) {
    try {
      const data = getUserInput("sigin");
      const response = await signin(data);
      if (response instanceof Error) throw new Error(response.message);
      localStorage.setItem("token", response.token);
      reloadPage();
    } catch (error) {
      // !將錯誤渲染在 button 下方
      createErrorMessage(error.message);
    }
    return;
  }

  // signup
  try {
    const data = getUserInput("sigup");
    const response = await signup(data);
    if (response instanceof Error) throw new Error(response.message);
    createErrorMessage("Successed!");
  } catch (error) {
    createErrorMessage(error.message);
  }
});

