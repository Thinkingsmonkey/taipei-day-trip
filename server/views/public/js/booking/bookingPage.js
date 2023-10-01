document.addEventListener('DOMContentLoaded', async () => {
  const result = await renderBookingList()
  
  renderBookingInfor(result)
})

async function renderBookingList() {
  const bookingsData  = (await getBookings()).data
  if (bookingsData.length === 0) {
    const bookingMain = document.querySelector('.booking__main');
    const bookingFooter = document.querySelector('.booking__footer');
    bookingMain.firstElementChild.classList.add('px-d625')
    bookingMain.lastElementChild.classList.add('mb-2d5', 'px-d625')
    bookingMain.lastElementChild.innerHTML = '目前沒有任何待預定的行程'
    bookingFooter.style.height = 'calc(100vh - 209px)';
    return false
  }
  const bookingList = document.querySelector('.booking__list');
  const checkoutTotal = document.querySelector('.checkout__total') ;

  let total = 0;
  bookingList.innerHTML = '';
  // 利用 bookingList 資料建立 booking li
  bookingsData.forEach(booking => {
    const bookingLi = createBookingLi(booking)
    bookingList.append(bookingLi)
    total += booking.price ;
  });
  checkoutTotal.textContent = '總價：新台幣 ' + total + '元';
  return true
}

function renderBookingInfor (result) {
  const inforTitle = document.querySelector('.infor__title') ;
  inforTitle.textContent = `你好，${memberName}，待預訂的行程如下：`;
  const bookingMain = document.querySelector('.booking__main') ;
  bookingMain.classList.remove('d-none')
  if (!result) return
  const memberInput = document.querySelectorAll('.booking__member .member__input') ;
  const memberNameInput = memberInput[0]
  const memberEmailInput = memberInput[1]
  memberNameInput.value = memberName
  memberEmailInput.value = memberEmail
}