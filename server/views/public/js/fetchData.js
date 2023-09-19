// index.html fetch variables
let nextPage = null;
let keyword = "";
const SERVER_URL = "https://flask-react.to-do-app.com" // 部署 https 彈性 IP
// const SERVER_URL = "http://13.113.8.196:3000" // 部署
// const SERVER_URL = ""; // 開發

// set Page、keyword
const setParameter = (newNextPage, newKeyword = "") => {
  nextPage = newNextPage;
  keyword = newKeyword;
};

// fetch function
async function getFetch(url, option = null) {
  try {
    const response = await fetch(url, option);
    if (response.ok !== true) {
      throw new Error(`${(await response.json()).message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

function getAttractions(page = 0, keyword = "") {
  const url = SERVER_URL + "/api/attractions" + `?page=${page}&keyword=${keyword}`;
  return getFetch(url);
}

function getMrts() {
  const url = SERVER_URL +  "/api/mrts";
  return getFetch(url);
}

function getAttractionById(id) {
  const url = SERVER_URL +  "/api/attraction/" + `${id}`;
  return getFetch(url);
}
function checkMemberInfor() {
  const url = SERVER_URL +  "/api/user/auth";
  const token = localStorage.getItem("token");
  const headers = {
    "Content-type": "application/json"
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const option = {
    method: "GET",
    headers: headers
  };
  return getFetch(url, option);
}
function signin(data) {
  const url = SERVER_URL +  "/api/user/auth";
  const option = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return getFetch(url, option);
}

function signup(data) {
  const url = SERVER_URL +  "/api/user";
  const option = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return getFetch(url, option);
}
