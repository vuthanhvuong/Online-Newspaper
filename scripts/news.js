"use strict";

const apiKey = "1b7021542cc6425ba1ec8fd36a4eacb3"; //key lấy từ trang chủ
const newsContainer = document.getElementById("news-container");

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

//Hàm hiển thị News
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

  // newsContainer.textContent = "";

  newsContainer.insertAdjacentHTML("beforeEnd", html);
};

//Hàm xóa news đang hiển thị
const deleteNews = function () {
  newsContainer.textContent = "";
};

//Hàm lấy data từ API
const getNews = async function (country, category, pageSize, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    if (!res.ok) throw new Error("Problem getting News data");

    const dataAPI = await res.json();

    console.log(dataAPI);
    console.log(dataAPI.articles);
    saveToStorage("dataAPIStorage", JSON.stringify(dataAPI));
    dataAPI.articles.forEach((element) => {
      renderNews(element);
    });
  } catch (err) {
    console.log(err);
  }
};

//Khởi tạo page đầu tiên là 1
let pageNumber = 1;
if (pageNumber === 1) {
  btnPrev.classList.add("hide");
}
getNews(
  "us",
  currentAccountUser.category,
  currentAccountUser.newsPerPage,
  pageNumber
);

//Khi ấn nút Next
btnNext.addEventListener("click", function () {
  pageNumber++;
  pageNum.textContent = pageNumber;
  deleteNews();
  getNews(
    "us",
    currentAccountUser.category,
    currentAccountUser.newsPerPage,
    pageNumber
  );
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
  getNews(
    "us",
    currentAccountUser.category,
    currentAccountUser.newsPerPage,
    pageNumber
  );
  if (pageNumber === 1) {
    btnPrev.classList.add("hide");
  }
  btnNext.classList.remove("hide");
});
