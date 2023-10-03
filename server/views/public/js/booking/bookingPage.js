document.addEventListener('DOMContentLoaded', async () => {
  const result = await renderBookingList()
  
  renderBookingInfor(result)
})
