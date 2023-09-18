"use strict";

//Khai báo các biến để thao tác qua id
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
//Tạo mảng lưu giá trị các tài khoản

console.log(userArr);

//Hàm kiểm tra giá trị
const validate = function () {
  if (inputFirstName.value === "") {
    alert("Please input First Name");
    return false;
  } else if (inputLastName.value === "") {
    alert("Please input Last Name");
    return false;
  } else if (inputUserName.value === "") {
    alert("Please input User Name");
    return false;
  } else if (inputPassword.value === "") {
    alert("Please input Password");
    return false;
  } else if (inputPasswordConfirm.value === "") {
    alert("Please input Confirm Password");
    return false;
  } else if (inputPasswordConfirm.value !== inputPassword.value) {
    alert("Confirm Password is incorrect, please refill");
    return false;
  } else if (userArr.some((acc) => acc.userName === inputUserName.value)) {
    //check user name được nhập có trùng với user đã có trước đó không
    alert("User is already taken, please choose another user");
    return false;
  } else {
    return true;
  }
};

//Hàm xóa dữ liệu value của input khi đki thành công
const clearInput = function () {
  inputFirstName.value = "";
  inputLastName.value = "";
  inputPassword.value = "";
  inputUserName.value = "";
  inputPasswordConfirm.value = "";
};

//Sự kiện ấn nút Register
btnSubmit.addEventListener("click", function () {
  if (validate()) {
    const user = new User(
      `${inputFirstName.value}`,
      `${inputLastName.value}`,
      `${inputUserName.value}`,
      `${inputPassword.value}`,
      8,
      "general"
    );
    userArr.push(user);
    console.log(userArr);
    saveToStorage("userArrStorage", JSON.stringify(userArr)); //Lưu giá trị userArr vào Storage
    alert("Registration is complete, please return Home and Login");
    clearInput();
    //Chuyển trang sau khi đăng ký thành công
    window.location.href = "../pages/login.html";
  }
});
