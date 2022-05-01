function greetUser(userName = 'user') {
  console.log('Hi there ' + userName + '!');
}
greetUser();

function sumUp(...numbers) {
  let result = 0;
  for (const number of numbers) {
    result += number;
  }
  return result;
}

console.log(sumUp(1, 5, 10, 11, 20, 31));

const inputNumbers = [1, 5, 10, 11, 20, 31];
console.log(sumUp(inputNumbers));
console.log(sumUp(...inputNumbers));
