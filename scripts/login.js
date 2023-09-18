"use strict";

//Lưu biến từ id
const inputUserNameLogin = document.getElementById("input-username");
const inputPasswordLogin = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

//Hàm validate
const validateLogin = function () {
  if (inputUserNameLogin.value === "") {
    alert("Please fill User Name");
    return false;
  } else if (inputPasswordLogin.value === "") {
    alert("Please fill Password");
  } else {
    return true;
  }
};

//Hàm clear input sau khi login successed
function clearInputLogin() {
  inputUserNameLogin.value = "";
  inputPasswordLogin.value = "";
}

//Hàm check thông tin đăng nhập có đúng account hay không
// function(userArr){
//   if(inputUserNameLogin.value)
// }

//Sự kiện ấn nút Login
btnLogin.addEventListener("click", function () {
  if (validateLogin()) {
    //Kiểm tra thông tin đăng nhập
    const currentAccountNo = userArr.findIndex(
      (acc) => acc.userName === inputUserNameLogin.value
    );

    if (currentAccountNo !== -1) {
      //Lưu giá trị số thứ tự account user đã đăng nhập thành công
      saveToStorage(
        "currentAccountNoStorage",
        JSON.stringify(currentAccountNo)
      );

      //Lưu lại thông tin user đang đăng nhập
      const currentAccountUser = userArr[currentAccountNo];
      currentAccountUser.newsPerPage = 6;
      currentAccountUser.category = "general";
      saveToStorage(
        "currentAccountUserStorage",
        JSON.stringify(currentAccountUser)
      );
      alert("Login successed");
      clearInputLogin();
      window.location.href = "../index.html";
    } else {
      alert("User Name or Password incorrect, please refill");
    }
    console.log(currentAccountNo);
  }
});
