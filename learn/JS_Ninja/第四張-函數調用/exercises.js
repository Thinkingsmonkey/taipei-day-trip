function sum() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

// 剩餘參數

function sumAll(...nums) {
  let result = 0
  nums.forEach(num => {
    result += num
  })
  console.log(result);
}
sumAll(1,2,3,4,5,6)