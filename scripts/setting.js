"use strict";

const inputNumberPerPage = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSaveSetting = document.getElementById("btn-submit");

inputNumberPerPage.value = currentAccountUser.newsPerPage;
inputCategory.value = currentAccountUser.category;

btnSaveSetting.addEventListener("click", function () {
  currentAccountUser.newsPerPage = inputNumberPerPage.value;
  currentAccountUser.category = inputCategory.value;

  saveToStorage(
    "currentAccountUserStorage",
    JSON.stringify(currentAccountUser)
  );
});
// userArr[currentAccountNo].newsPerPage = currentAccountUser.newsPerPage;
// userArr[currentAccountNo].category = currentAccountUser.category;
// saveToStorage("userArrStorage", JSON.stringify(userArr));
