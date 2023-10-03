document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("token")) {
    window.location.href = '/'
    return
  }
  const thankyouMain = document.querySelector('.thankyou__main');
  thankyouMain.classList.remove('d-none')
  const number = window.location.search.split("=")[1];
  const order = await getOrder(number);
  console.log(order);
  renderThankyouInfor(order);
  renderOrderBookingList(order);
});

function renderThankyouInfor(order) {
  const number = document.querySelector(".thankyou__number");
  const total = document.querySelector(".thankyou__total");
  const name = document.querySelector(".contact__name");
  const email = document.querySelector(".contact__email");
  const phone = document.querySelector(".contact__phone");
  number.textContent = order.data.number
  total.textContent = order.data.price
  name.textContent = order.data.contact.name
  email.textContent = order.data.contact.email
  phone.textContent = order.data.contact.phone
}

function renderOrderBookingList(order) {
  const bookingList = document.querySelector(".booking__list");

  let total = 0;
  bookingList.innerHTML = "";
  // 利用 bookingList 資料建立 booking li
  order.data.trip.forEach((booking) => {
    const bookingLi = createBookingLi(booking);
    const bookingContent = bookingLi.lastElementChild.lastElementChild;
    const bookingDelete = bookingContent.lastElementChild;
    bookingContent.removeChild(bookingDelete);
    bookingList.append(bookingLi);
    total += booking.price;
  });
  return true;
}
