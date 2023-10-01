const sitemapBooking = document.querySelector('.sitemap__booking');
sitemapBooking.addEventListener('click', (e) => {
  const element = e.target;
  if (element.closest('li') !== sitemapBooking) return
  if (localStorage.getItem('token')) {
    window.location.href = "/booking";
    return
  }
  memberCard.parentElement.style.visibility = 'visible';
  memberCard.style.top = '80px';
})