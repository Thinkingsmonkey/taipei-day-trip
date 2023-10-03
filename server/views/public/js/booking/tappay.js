TPDirect.setupSDK(APP_ID, APP_KEY, "sandbox");
  TPDirect.card.setup({
    fields: {
      number: {
        element: ".form-control.card-number",
        placeholder: "**** **** **** ****",
      },
      expirationDate: {
        element: document.getElementById("tappay-expiration-date"),
        placeholder: "MM / YY",
      },
      ccv: {
        element: document.querySelector(".form-control.ccv"),
        placeholder: "CVV",
      },
    },
    styles: {
      input: {
        color: "gray",
        'font-size': '16px',
        'font-weight': '500'
      },
      ":focus": {
        color: "black",
      },
      ".valid": {
        color: "#448899",
      },
      ".invalid": {
        color: "#d65350",
      },
      "@media screen and (max-width: 400px)": {
        input: {
          color: "orange",
        },
      },
    },
    // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
      beginIndex: 6,
      endIndex: 11,
    },
  });
  // listen for TapPay Field
  TPDirect.card.onUpdate(function (update) {
    /* Disable / enable submit button depend on update.canGetPrime  */
    /* ============================================================ */

    // update.canGetPrime === true
    //     --> you can call TPDirect.card.getPrime()
    // const submitButton = document.querySelector('button[type="submit"]')
    if (update.canGetPrime) {
      // submitButton.removeAttribute('disabled')
      document
        .querySelector('button[type="submit"]')
        .removeAttribute("disabled");
    } else {
      // submitButton.setAttribute('disabled', true)
      document
        .querySelector('button[type="submit"]')
        .setAttribute("disabled", true);
    }

    /* Change form-group style when tappay field status change */
    /* ======================================================= */
    const cardNumber = document.querySelector(".card-number-group");
    const cardExp = document.querySelector(".expiration-date-group");
    const cardCcv = document.querySelector(".ccv-group");
    changeStatus(cardNumber, update.status.number);
    changeStatus(cardExp, update.status.expiry);
    changeStatus(cardCcv, update.status.ccv);
  });

  document.querySelectorAll('.booking__input').forEach(function (input) {
    input.addEventListener("click", () => {
      input.classList.remove("has-error");
      document.querySelector('.booking__error').textContent = "";
    });
  });


  document.querySelector('.booking__submit').addEventListener('click', function (event) {
    event.preventDefault();

    // fix keyboard issue in iOS device
    forceBlurIos();

    // 檢查聯絡資訊
    let check = true;
    document.querySelectorAll('.booking__input').forEach((input, index) => {
      if (index > 2 || !check) return
      if (!input.value) {
        switch (index) {
          case 2:
            document.querySelector('.booking__error').textContent = "請輸入電話號碼";
            check = false
            setNumberFormGroupToError(input)
            break;
          default :
            document.querySelector('.booking__error').textContent = "請輸入完整訊息";
            setNumberFormGroupToError(input)
            check = false
            break;
        }
      }
    })
    if (!check) return


    // 取得 tappay 欄位狀態
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("can not get prime");
      return;
    }

    // Get prime
    TPDirect.card.getPrime(async result => {
      if (result.status !== 0) {
        alert("get prime error " + result.msg);
        return;
      }
      // 成功取得 prime，整理訂單資料並傳給後端
      let orderData = {
        "prime": result.card.prime,
        "order": {
          "price": bookingsData.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0),
          "trip": bookingsData,
          "contact": {
            "name": document.querySelectorAll('.booking__input')[0].value,
            "email": document.querySelectorAll('.booking__input')[1].value,
            "phone": document.querySelectorAll('.booking__input')[2].value
          }
        }
      }

      const response = await orderSend(orderData)
      if (!response.data.payment.status === 0) {
        document.querySelector('.booking__error').textContent = "輸入或連線錯誤，請重新嘗試";
        return
      }
      window.location.href = '/thankyou?number=' + response.data.number
    });
  });

  
  function forceBlurIos() {
    if (!isIos()) {
      return;
    }
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    // Insert to active element to ensure scroll lands somewhere relevant
    document.activeElement.prepend(input);
    input.focus();
    input.parentNode.removeChild(input);
  }

  function isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  
  function changeStatus(element, number){
    switch(number) {
      default:
        setNumberFormGroupToNormal(element)
        break;
      case 0:
        setNumberFormGroupToSuccess(element)
        break;
      case 2:
        setNumberFormGroupToError(element)
        break;
    }
  }

  function setNumberFormGroupToError(element) {
    element.classList.add("has-error");
    element.classList.remove("has-success");
  }

  function setNumberFormGroupToSuccess(element) {
    element.classList.remove("has-error");
    element.classList.add("has-success");
  }

  function setNumberFormGroupToNormal(element) {
    element.classList.remove("has-error");
    element.classList.remove("has-success");
  }