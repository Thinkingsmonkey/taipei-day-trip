// index.html fetch variables
let nextPage = null;
let keyword = "";

// set Page、keyword
const setParameter = (newNextPage, newKeyword = "") => {
  nextPage = newNextPage;
  keyword = newKeyword;
}

// fetch function
async function getFetch (url) {
  try {
    const response = await fetch(url);
    if (response.ok !== true)
      throw new Error(`data fetch not successed, ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error; 
  }
}

async function getAttractions(page = 0, keyword = "") {
  // const url = "http://54.65.247.64:3000/api/attractions"  + `?page=${page}&keyword=${keyword}`;  // 部署
  const url = "/api/attractions"  + `?page=${page}&keyword=${keyword}`;
  return getFetch(url)
}

async function getMrts() {
  // const url = "http://54.65.247.64:3000/api/mrts"; // 部署
  const url = "/api/mrts";
  return getFetch(url)
}

async function getAttractionById(id) {
  // const url = "http://54.65.247.64:3000/api/attraction/" + `${id}`; // 部署
  const url = "/api/attraction/" + `${id}`;
  return getFetch(url)
}