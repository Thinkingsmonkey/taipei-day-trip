// function sum() {
//   var sum = 0;
//   for (var i = 0; i < arguments.length; i++) {
//     sum += arguments[i];
//   }
//   return sum;
// }

// // 剩餘參數

// function sumAll(...nums) {
//   let result = 0;
//   nums.forEach((num) => {
//     result += num;
//   });
//   console.log(result);
// }
// sumAll(1, 2, 3, 4, 5, 6);

// var ninja1 = {
//   whoAmI: function () {
//     return this;
//   },
// };
// var ninja2 = {
//   whoAmI: ninja1.whoAmI,
// };
// var identify = ninja2.whoAmI;

// // ninja1.whoAmI
// // ninja2.whoAmI
// // identify
// // 都是賦予同一個 function 但都沒有調用
// // ninja1.whoAmI() 是 ninja1 調用，所以當前 this 是 ninja1
// // ninja2.whoAmI() 是 ninja2 調用，所以當前 this 是 ninja1
// // indetify() 在非嚴格模式下是 window 調用，所以當前 this 是 window

// function myFunction1() {
//   console.log("myFunction1 this: ", this);
// }

// function myFunction2() {
//   console.log("myFunction2 this: ", this);
//   myFunction1(); // 等同在全域環境調用
// }

// const test1 = {
//   naem: "test1",
//   methodTest1: myFunction2,
// };
// const test2 = {
//   naem: "test2",
//   methodTest2: test1.methodTest1,
// };
// test1.methodTest1();
// test2.methodTest2();

// class Employee {
//   constructor(name) {
//     this.name = name;
//   }

//   getEmployeeName() {
//     console.log("getEmployeeName 的 this:", this);
//     setTimeout(function () {
//       console.log("setTimeout 的回調的 this:", this);
//       console.log(this.name);
//     }, 1000);
//   }

//   getEmployeeNameArrow() {
//     console.log("getEmployeeNameArrow 的 this:", this);
//     setTimeout(() => {
//       console.log("setTimeout 的回調的 this:", this);
//       console.log(this.name);
//     }, 2000);
//   }
// }

// let firstEmployee = new Employee("John");
// firstEmployee.getEmployeeName();
// firstEmployee.getEmployeeNameArrow();

// var button = document.querySelector('.anchor');
// function Call () {
//     this.callThis = () => {console.log(this.constructor.name)}
// }
// const call = new Call();
// const test = { callThis: call.callThis }

// button.addEventListener('click', test.callThis);

// // click => Call

// function getThis () {
//   return function () { return this }
// }
// function getThisArrow () {
//   return () => this
// }
// function GetThisConstructor () {
//   this.nor = function () { return this }
// }
// function GetThisConstructorArrow () {
//   this.arrow = () => this
// }

// const test = { nor: getThis, arrow: getThisArrow }
// const test2 = { nor: getThis, arrow: getThisArrow() }

{
  /* <button class="get-time" >getTime</button> */
}
let btn = document.createElement("button");
btn.classList.add("get-time");
btn.innerText = "getTime";
btn.style.padding = "30px";
btn.style.backgroundColor = "#fa0";
document.body.appendChild(btn);
let perNum = 10;
function Time(number) {
  let result = 0;
  let timer = setInterval(() => {
    if (result < number) {
      result += perNum;
    } else {
      clearInterval(timer);
    }
  }, 1000);
  this.getResult = function () {
    console.log(result);
    
  };
}
let a = new Time(100);
document.querySelector(".get-time").addEventListener("click", a.getResult);
