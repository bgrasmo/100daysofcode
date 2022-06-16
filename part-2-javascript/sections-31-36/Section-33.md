## Section 33: Bonus - Data structures and algorithms introduction

## Day 65 - 2022-06-13

#### <b>What are data structures and algorithms?</b>

Example, find the minimum number in an array. How do we do that? That is what the algorithm does, describes the sequence of steps we need to get to the desired output. This is also an example of a data structure, the array is one. It is a piece of data that follows certain rules, it has some order to its elements and they have an index we can work with.

Why, or when is this needed? Complex programs might need more sophisticated or complex data storage solutions as well as logic to handle it.

In the end this is about logic and being able to think logically about how to solve a problem which is what development is all about.

#### <b>A first example</b>

Given this array: `[3, 1, 2]` we want to find the minimum value in it, which here is 1. One way to achieve this would be to create a loop that iterates through all the elements, keeping track of the smallest value it has seen. It would have to check the current value to the minimum value to check if a smaller value has been found:

```JS
const getMin = numbers => {
  if (!numbers.length) throw new Error('Array can not be empty!');

  let currentMin = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < currentMin) currentMin = numbers[i];
  }

  return currentMin;
}
const testNumbers = [];

const min = getMin(testNumbers);
console.log(min); // Should be 1
```

#### <b>Solving the problem differently</b>

If we sort the array we get the smallest value at the beginning and could just return that. Except that seems like more work though, doesn't it? Given the nested loop, where you run through the entire array for each element in the array.

```JS
const getMin = numbers => {
  if (!numbers.length) throw new Error('Array can not be empty!');

  for (let i = 0; i < numbers.length; i++) {
    let outerElement = numbers[i];
    for (let ii = i + 1; ii < numbers.length; ii++) {
      let innerElement = numbers[ii];

      if (outerElement > innerElement) {
        // Swaps the position of the numbers
        numbers[i] = innerElement;
        numbers[ii] = outerElement;

        outerElement = numbers[i];
        innerElement = numbers[ii];
        console.log('DEBUG: ', numbers[i], numbers[ii]);
      }
    }
  }
  return numbers[0];
}
```

#### <b>Performance and the big O notation</b>

How do we compare different algorithms? In the end it comes down to runtime performance, which is the fastest to execute. This is expressed in a generalized form and not time units, but in mathematical terms.

Imagine a graph where you have time on the Y axis and items on the X axis, and then a diagonal line going from point 0,0, increasing so that it goes through 1,1 and 2,2 and 3,3 and so on. This is called big O notation. Or O(n) where n = number of affected elements. Or perhaps time complexity, and this is some linear function that increases time cost by 1 for each time element increases by 1.

#### <b>More time complexities and comparing algorithms</b>

As guessed, our sort algorithm is bad. Our first comparison algorithm takes O(n) times, which means if you add one item it takes one more time unit, but our sort algorithm takes O(n^2) time. The reason is if the array contains 10 items it will loop through each item, and then for each item, will lopp through it 10 times again, for 100 times total.

#### <b>More on big O</b>

It's about the average case, not the best case or worst case. The average case is about the big case where you have perhaps 1000 or 100000 iputs.

#### <b>More examples</b>

Pushing an item onto an array takes 'constant time'. Meaning it doesn't matter how many items there are on the array already, pushing another items always takes the same time.

Then there's linear complexity where 1000 items takes 1000 times more time than 1 item, as well as logarithmic time complexity (O(log n)) where time complexity increases more at the beginning and less at the end, so a slower increase than linear time complexity for instance. (In other words, for a 1000 items it doesn't take 1000 times longer than 1 item).

#### <b>Wrap up</b>

[More on Algorithms & Data Structures](https://adrianmejia.com/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/)<br>
[Understanding Time Complexity & Big O (incl. Examples)](https://adrianmejia.com/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)<br>
[More on Data Structures](https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/)<br>
[A Comprehensive Collection of Examples](https://github.com/trekhleb/javascript-algorithms)
