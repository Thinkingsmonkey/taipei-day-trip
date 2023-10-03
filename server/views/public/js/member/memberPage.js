document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("token")) {
    window.location.href = '/'
    return
  }
  const memberMain = document.querySelector('.member__main');
  memberMain.classList.remove('d-none')
  const orders = await getMemberOrders()
  const orderList = document.querySelector('.member__orders')
  if (orders.length === 0) {
    const li = document.createElement("li");
    li.className =
      "d-flex justify-content-between align-items-center border-1px mb-1d375 p-1d25 rounded-5px border-gray-90 fz-19";

    const p = document.createElement("p");
    p.className = "order__number";
    p.textContent = '目前並無訂單';
    li.appendChild(p);
    orderList.appendChild(li);
  }
  orders.forEach(order => {
    orderList.appendChild(createOrderLi(order))
  });
});
