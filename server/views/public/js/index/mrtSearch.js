mrtList.addEventListener('click', (e) => {
  const closestLi = e.target.closest('li');
  if (closestLi) {
    const mrtName = closestLi.children[0].textContent
    searchInput.value = mrtName
    search()
  }
})
