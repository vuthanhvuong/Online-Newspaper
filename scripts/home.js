"use strict";

const loginModel = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

//Trường hợp đã có tài khoản đăng nhập thành công
if (currentAccountNo !== -1) {
  welcomeMessage.textContent = `Welcome ${currentAccountUser.firstName}`;
  mainContent.classList.remove("hide");
  loginModel.classList.add("hide");
} else {
  mainContent.classList.add("hide");
  loginModel.classList.remove("hide");
}

btnLogout.addEventListener("click", function () {
  currentAccountNo = -1;
  localStorage.removeItem("currentAccountNoStorage");
  localStorage.removeItem("currentAccountUserStorage");
  window.location.href = "../pages/login.html";
});
