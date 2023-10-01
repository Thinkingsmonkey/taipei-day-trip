const startBooking = document.querySelector('.card__button');

startBooking.addEventListener('click', async (e) => {
  const element = e.target;

  if (element.closest('button') !== startBooking) return
  if (localStorage.getItem('token')) {
    const attractionId = window.location.pathname.split('/')[2];
    const date = document.querySelector('.date__option').value;
    const price = document.querySelector('.attraction__price').textContent === "新台幣 2500 元" ? "2500" : "2000"
    const selectedRadio  = document.querySelector('input[name="time"]:checked');
    let time = ''
    const errorDate = document.querySelector('.card__date .error-message');
    const errorTime = document.querySelector('.card__time .error-message');
   
    if (date === "") {
      errorDate.classList.remove('d-none')
      return
    }
    errorDate.classList.add('d-none')

    if (!selectedRadio) {
      errorTime.classList.remove('d-none')
      return
    }
    errorTime.classList.add('d-none')
    time = selectedRadio.value;
    const data = {
      attractionId,
      date,
      price,
      time
    }
    const result = await createNewBooking(data)
    if (result.message) {
      const bookingError = document.querySelector('.booking_error');
      bookingError.textContent = "Booking is already exists!";
      return
    }
    window.location.href = "/booking";
    return
  }
  memberCard.parentElement.style.visibility = 'visible';
  memberCard.style.top = '80px';
})