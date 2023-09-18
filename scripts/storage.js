"use strict";

//Check Storage support
if (typeof Storage !== "undefined") {
  // Code for localStorage/sessionStorage.
  console.log("Web Storage support");
} else {
  // Sorry! No Web Storage support..
  console.log("Sorry! No Web Storage support");
}

//Hàm lưu dữ liệu vào Storage và lấy ra dữ liệu từ Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}

//Do khi lưu xuống LocalStorage,
// bạn chỉ có thể lưu được các JS Object chứ không phải Class Instance
//(chỉ lưu được các thuộc tính chứ các hàm trong class đó sẽ không lưu được).
//Bạn sẽ cần viết một hàm để chuyển từ JS Object sang Class Instance như sau:

function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );
  return user;
}

function parseTodoData(todoData) {
  const todo = new Task(todoData.task, todoData.owner, todoData.isDone);
  return todo;
}

//Lấy ra dữ liệu từ Storage
let userArr = JSON.parse(getFromStorage("userArrStorage", "[]"));

for (let i = 0; i < userArr.length; i++) {
  userArr[i] = parseUser(userArr[i]);
}

let currentAccountNo = JSON.parse(
  getFromStorage("currentAccountNoStorage", "-1")
);
let currentAccountUser = JSON.parse(
  getFromStorage("currentAccountUserStorage", "{}")
);

let dataAPI = JSON.parse(getFromStorage("dataAPIStorage", "{}"));

let dataAPISearch = JSON.parse(getFromStorage("dataAPISearchStorage", "{}"));
// let todoArr = JSON.parse(getFromStorage("todoArrStorage", "[]"));
