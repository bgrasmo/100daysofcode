## Section 15: Advanced function concepts

## Day 58 - 2022-06-06

#### <b>Pure functions and side effects</b>

What is a pure function? One that for a given input always produces the same output. It also does not trigger any side effects, meaning it does not change anything outside the function.

An impure function then would contain some randomness so it returns something different each time even though it gets the same input, or it changes something outside the function. Objects come to mind, given they are reference values.

A goal would be to try to keep the functions predictable and 'pure', so that someone else changing your code doesn't introduce some (nasty) side effects because they didn't know. Naming convention could help here, by for instance naming a function that sends data to a server exactly that: sendDataToServer(). Then it shouldn't be a surprise that it sends some data to something outside of the function that can change something.

#### <b>Factory functions</b>

The idea behind factory functions is that you have a function that produces another function.

```JS
const createTaxCalculator = (tax) => {
  const calculateTax = (amount) => {
    return amount * tax;
  }
  return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateIncomeTaxAmount(100)); // returns 25, but how?
```

#### <b>Closures</b>

Every function in JavaScript is a closure. Or the more technically correct term is that we have different lexical environments, and each function has its own lexical environment. When a function is created it creates a new lexical environment and registeres any variables it has access to inside this environment.

In the example above, the outer function has access to the tax variable in its lexical environment. The inner function has its own lexical environment with the amount variable but it also has access to the environment of the outer function with the tax variable.

When we call the outer function, then the inner function is created, not before, while the outer function is created when the script is parsed. When we call that outer function and the inner function is created, that locks in the value for tax at the state it had when it was created. Given the outer function returns a new function every time it is run it means the tax value can't be changed after it is set. However, if one of the functions depended on some global variable, that could be changed after the inner function was created.

In other words, each function registers its surrounding environment and the variables that are defined in there, and that is why it is called a closure. Every function 'closes over' the surrounding environment and the variables registered there and it 'memorizes' the value of these variables. That means variables in the outer function is not thrown away even though the outer function might not need it anymore, but it is remembered for the inner function.

So every function in JavaScript is a closure, and we can take that for granted here, but that might not be so in other programming languages.

#### <b>Closures and memory management</b>

One could think that this was bad for memory usage, especially in large programs where functions might register a lot of variables they never use. However, the JavaScript engine is smart enough to detect this and will get rid of values not used by anything.

#### <b>IIFEs</b>

This stands for Immediately Invoked Function Expression where a function is created and immediately executed:

```JS
(function() {
  var age = 30;
  console.log(age);
})()
```

Is mostly related to older JavaScript code before let and const, and was a way to control where variables were available. The outer parenthesis ensures function scope is used here.

#### <b>Recursion</b>

Let's make a 'to the power of' function, using the old way first:

```JS
const powerOf = (x, n) => {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
console.log(powerOf(2, 3));
```

Now let's do the same with recursion, where we have a function that calls itself:

```JS
const powerOf = (x, n) => {
  if (n === 1) return x;

  return x * powerOf(x, n - 1);
}
console.log(powerOf(2, 3));
```

Ouch. Browser devtools or similar with breakpoints might be of assistance here. In devtools, look at the call stack. This 'starts at the top' and then goes all the way down until the first return statement, so when n = 1, x is still 2 and that is returned to the function that called it. That in turn will return x (2) times the result it got back from the function (2) so it returns 4. Then the last function returns 2 * 4 and the final result of 8.

```
n = 1, return 2;
return x * powerOf(x, n - 1) = 2 * 2;
return x * powerOf(x, n - 1) = 2 * 4;
```

Because the 'powerOf()' is replaced by what the call returns.

To shorten this even more we can use a ternary expression instead:

```JS
const powerOf = (x, n) => {
  return n === 1 ? x : x * powerOf(x, n - 1);
}
console.log(powerOf(2, 3));
```

#### <b>Advanced recursion</b>

Given this structure where we might not know how many levels of nesting we have:

```JS
const myself = {
  name: 'Joe',
  friends: [
    {
      name: 'Jane',
      friends: [
        {
          name: 'Anna',
          friends: [
            {
              name: 'Amelia',
              friends: [
                {
                  name: 'Chris'
                }
              ]
            }
          ]
        }
      ]
    },
    {
     name: 'Julia' 
    }
  ]
}
```

This can't be solved with nested for loops, since we don't know how many levels of nesting we need.

```JS
const printFriendNames = (person) => {
  for (const friends of person.friends) {
    for (const friendsFriends of friends.friends) {
      // And we possible try to loop through someone that doesn't have friends and we don't know if we need another level
    }
  }
}
```

To use recursion for this problem, we still need one for loop:

```JS
const getFriendNames = (person) => {
  const collectedNames = [];

  if (!person.friends) return [];

  for (const friend of person.friends) {
    collectedNames.push(friend.name);
    collectedNames.push(...getFriendNames(friend));
  }
  return collectedNames;
}

console.log(getFriendNames(myself));
```

#### <b>Wrap up</b>

[More on closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)<br>
[Recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion)
