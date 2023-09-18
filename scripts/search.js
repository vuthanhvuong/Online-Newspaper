"use strict";

const inputQuery = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const apiKey = "1b7021542cc6425ba1ec8fd36a4eacb3"; //key lấy từ trang chủ
const newsContainer = document.getElementById("news-container");
const navPageNum = document.getElementById("nav-page-num");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

//Hàm validate
const validate = function () {
  if ((inputQuery.value = "")) {
    alert("Please input query before");
    return false;
  } else {
    return true;
  }
};

//Hàm hiển thị tin tức
const renderNews = function (data) {
  const html = `
    <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src=${data.urlToImage}
              class="card-img"
              alt=${data.description}
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                ${data.title}
              </h5>
              <p class="card-text">
                ${data.content}
              </p>
              <a
                href=${data.url}
                >View</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

  newsContainer.insertAdjacentHTML("beforeEnd", html);
};

//Hàm xóa dữ liệu cũ
const deleteNews = function () {
  newsContainer.textContent = "";
};

//Hàm lấy tin tức từ API
const getNewsSearch = async function (page) {
  try {
    const resSearch = await fetch(
      `https://newsapi.org/v2/everything?q=${inputQuery.value}&pageSize=${currentAccountUser.newsPerPage}&page=${page}&apiKey=${apiKey}`
    );
    if (!resSearch.ok) throw new Error("Problem getting News data");

    const dataAPISearch = await resSearch.json();

    console.log(dataAPISearch);
    console.log(dataAPISearch.articles);
    saveToStorage("dataAPISearchStorage", JSON.stringify(dataAPISearch));
    dataAPISearch.articles.forEach((element) => {
      renderNews(element);
    });
  } catch (err) {
    console.log(err);
  }
};

navPageNum.classList.add("hide");
let pageNumber = 1;

btnSearch.addEventListener("click", function () {
  if (inputQuery.value === "") {
    alert("Please input query");
  } else {
    deleteNews();
    getNewsSearch();
    navPageNum.classList.remove("hide");
    if (pageNumber === 1) {
      btnPrev.classList.add("hide");
    }
  }
});

//Khi ấn nút Next
btnNext.addEventListener("click", function () {
  pageNumber++;
  pageNum.textContent = pageNumber;
  deleteNews();
  getNewsSearch(pageNumber);
  btnPrev.classList.remove("hide");
  if (pageNumber >= dataAPI.totalResults / currentAccountUser.newsPerPage) {
    btnNext.classList.add("hide");
  }
});

//Khi ấn nút Previous
btnPrev.addEventListener("click", function () {
  pageNumber--;
  pageNum.textContent = pageNumber;
  deleteNews();
  getNewsSearch(pageNumber);
  if (pageNumber === 1) {
    btnPrev.classList.add("hide");
  }
  btnNext.classList.remove("hide");
});
