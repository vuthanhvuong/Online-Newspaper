"use strict";

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

//Hàm validate dữ liệu input
const validate = function () {
  if (inputTask.value === "") {
    alert("Please fill task");
    return false;
  } else {
    return true;
  }
};

//Hàm clear Input
const clearInput = function () {
  inputTask.value = "";
};

//Hàm hiển thị dữ liệu todo ra màn hình
const renderTodoList = function (Obj, index) {
  if (Obj.isDone === false) {
    const html = ` <li id="${index}"><div onclick="checkedFunction(${index})" >${Obj.task}</div></li>`;
    todoList.insertAdjacentHTML("beforeEnd", html);
    const span = `<span class="close" onclick = "deleteFunction(${index})">x</span>`;
    document.getElementById(`${index}`).insertAdjacentHTML("beforeEnd", span);
  } else {
    const html = ` <li id="${index}" class="checked"><div onclick="checkedFunction(${index})" class="checked" >${Obj.task}</div></li>`;
    todoList.insertAdjacentHTML("beforeEnd", html);
    const span = `<span class="close" onclick = "deleteFunction(${index})">x</span>`;
    document.getElementById(`${index}`).insertAdjacentHTML("beforeEnd", span);
  }
};

//Hàm confirm khi thực hiện click vào todo list
const checkedFunction = function (index) {
  if (!document.getElementById(`${index}`).className.includes("checked")) {
    if (confirm("Have you done it?")) {
      document.getElementById(`${index}`).classList.add("checked"); //Thêm class checked vào các todo đã hoàn thành
      todoArrRender[index].isDone = true;
      const x = todoArr.findIndex(
        //Tìm ra index trong mảng todo tổng tương ứng
        (mov) => mov.task === todoArrRender[index].task
      );
      console.log(x);
      todoArr[x].isDone = true;
      saveToStorage("todoArrStorage", JSON.stringify(todoArr));
    }
  } else {
    if (confirm("You haven't finished it yet?")) {
      document.getElementById(`${index}`).classList.remove("checked"); //Thêm class checked vào các todo đã hoàn thành
      todoArrRender[index].isDone = false;
      const y = todoArr.findIndex(
        //Tìm ra index trong mảng todo tổng tương ứng
        (mov) => mov.task === todoArrRender[index].task
      );
      console.log(y);
      todoArr[y].isDone = false;
      saveToStorage("todoArrStorage", JSON.stringify(todoArr));
    }
  }
};

//Hàm xóa 1 todo ra khỏi list
const deleteFunction = function (index) {
  if (confirm("Are you sure?")) {
    const x = todoArr.findIndex(
      //Tìm ra index trong mảng todo tổng tương ứng
      (mov) => mov.task === todoArrRender[index].task
    );
    console.log(x);
    todoArr.splice(x, 1);
    // const y = todoArr.
    saveToStorage("todoArrStorage", JSON.stringify(todoArr));
    location.reload();
  }
};

//Tạo array lưu thông tin todo list
let todoArr = JSON.parse(getFromStorage("todoArrStorage", "[]"));

for (let i = 0; i < todoArr.length; i++) {
  todoArr[i] = parseTodoData(todoArr[i]);
}

//Tạo mảng lọc danh sách các todo của owner hiện tại
const todoArrRender = todoArr.filter(
  (element) => element.owner === currentAccountUser.userName
);
todoArrRender.forEach((element, index) => {
  renderTodoList(element, index);
  console.log(index);
});

//Sự kiện khi ấn nút Add
btnAdd.addEventListener("click", function () {
  if (validate()) {
    const task = new Task(inputTask.value, currentAccountUser.userName, false);
    console.log(task);
    todoArr.push(task);
    console.log(todoArr);
    saveToStorage("todoArrStorage", JSON.stringify(todoArr));
    const todoArrRender = todoArr.filter(
      (element) => element.owner === currentAccountUser.userName
    );
    location.reload();
    // todoArrRender.forEach((element, index) => {
    //   // renderTodoList(element, index);
    // });
    clearInput();
  }
});
// const btnClearStorage = document.querySelector("#clearStorage");
// btnClearStorage.addEventListener("click", function (e) {
//   localStorage.clear();
// });

// const test = document.getElementById("checkcheck");
// const testClass = test.className;
// console.log(testClass);
