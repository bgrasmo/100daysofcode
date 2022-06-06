## Section 16: More on numbers and strings

## Day 58 - 2022-06-06

#### <b>How numbers work and behave in JavaScript</b>

Numbers in JavaScript are floating point numbers, meaning they always have decimals even if that decimal is 0. Internally numbers are stored as 64 bit floating points where one bit is reserved for telling if it's a positive or negative number, and some bits are reserved for the decimal points and telling where the comma is.

To find the limits of the numbers that can be used:

```JS
Number.MAX_SAFE_INTEGER; // 9007199254740991
```

That's about 9 quadrillion so a pretty big number, and about 2^53-1. We can calculate it with Math.pow like this:

```JS
Math.pow(2, 53)-1
```

Interestingly removing the -1 also shows a number, but calculations with such a number is not necessarily reliable or does not work. Adding 1 to that number does nothing for instance.

There's also a min safe integer which is the same as max but with a minus in front of it.

The biggest value we can work with in JavaScript is

```JS
Number.MAX_VALUE; // 1.7976931348623157e+308
```

The minimum number is however

```JS
Number.MIN_VALUE; // 5e-324
```

[Floating-point arithmetic](https://en.wikipedia.org/wiki/Floating-point_arithmetic)<br>
[How numbers are encoded in JavaScript](https://2ality.com/2012/04/number-encoding.html)<br>
[Dealing with float precision in Javascript](https://stackoverflow.com/questions/11695618/dealing-with-float-precision-in-javascript)

#### <b>Floating point (im)precision</b>

One popular example for this:

```JS
0.1 + 0.2 // 0.30000000000000004
```

And that is actually not equal to 0.3 if trying to compare it: `0.1 + 0.2 === 0.3` returns false.

This stems from the fact that the computer works in binary behind the scenes, and so have to convert numbers to and from decimal and binary.

Numbers with decimals are just represented as fractions of integers, so 0.2 could be represented as 1/5. An example of a 'problem' in the decimal system is 1/3 which we can't solve perfectly, and the result is 0.3333333.

Similar problems exist in binary. To see how numbers are represented in binary we can actually use the toString method. Enter a number, and if it's an integer wrap it in parenthesis to tell JavaScript we want to access a method and not add a decimal place to it. toString() takes an argument which defines the base to which you want to convert the number. So 2 would be binary.

```JS
(1).toString(2); // "1"
(5).toString(2); // "101"
```

So 1/5 is 1/101 in binary and the result of that is:

```JS
(1/5).toString(2); // "0.001100110011001100110011001100110011001100110011001101"
```

And we can see, 0.2 is represented the same way. Now we don't need the parenthesis since there is a decimal already so JavaScript understands we want to use a method:

```JS
0.2.toString(2); // "0.001100110011001100110011001100110011001100110011001101"
```

This imprecision can also be seen with toFixed, if we say that 0.2 should be shown with 20 digits after the decimal:

```JS
0.2.toFixed(20); // "0.20000000000000001110"
```

For an online shop and you want to charge 20.2 for some product, the number that is sent is actually 20.1999999999, so you're actually charging too little. The solution when perfect precision is needed is to multiply the number by 100 so you're only working with integers: 2020 can be perfectly represented in binary and as such there is no conversion problem. (Well it's actually 2020.0 since there are no integers in JavaScript, but still, this works.)

#### <b>The bigint type</b>

Bigint is an alternative to the normal number we've worked with so far, and its goal is to let you represent numbers bigger than the maximum safe integer. A bigint is created by adding an 'n' after the number and then we can represent arbitrarily large numbers, as they are actually converted to strings. as the 'int' in the name implies, there is no floating point calculation here, only whole numbers are supported.

```JS
Number.MAX_SAFE_INTEGER; // 9007199254740991

9007199254740991n * 9007199254740991n // 81129638414606663681390495662081n
```

We can use parseInt to parse a bigint back to a number (given that it's within the boundaries I guess) or BigInt(number) to convert a number to a bigint.

#### <b>Global Number and Math objects</b>

Dividing by zero in JavaScript doesn't return an error as could maybe be expected, but instead the number 'Infinity'. We can check for infinity with the 'isFinite' method available both globally and on the Number object. We also have isNaN as well as parseFloat and parseInt as has been mentioned before.

The Math object is perhaps more interesting. We have the number for E, for Pi, sqrt() to calculate the square root, sin for working with sinuses as well as the power of method 'pow', abs() to get an absolute number and much more. It could be recommended to scroll through this list and perhaps experiment a little with the various methods.

#### <b>Generate random numbers between min/max</b>

Math.random() provides a semi-random number from 0 to 1 exclusive. What do we do then when we need a random number between 10 and 20 or something else?

```JS
const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

Because if min is 5 and max is 10 and random returns 0 we get: 0 * (10 - 5 + 1) = 0 + 5 = 5. If random returns 0.99999 which is the maximum value it can return we get: 0.9999 * (10 - 5 + 1) = 5.9994 + 5 = 10.9994 which is too high, and that's why we have the Math.floor method wrapped around this.

#### <b>Exploring string methods</b>

Not going through them all in detail here, it is perhaps best to pursue the [String documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) on MDN.

#### <b>Tagged templates</b>

A tagged template is a function that works together with a template literal.

```JS
const productDescription = (strings, productName, productPrice) => {
  return 'This is a product';
}

const prodName = 'Development course';
const prodPrice = 149.99;

const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;
console.log(productOutput);
```

JavaScript will pass that template literal into the function, and will also split it up into three arguments here. While the productOut is only the returned string, inside the function 'strings' is actually an array consisting of 3 elements, split where we've added our variables:

```
0: "This product ("
1: ") is "
2: "."
```

Argument 2 and 3 to the function are the variables we passed in, so name and price.

I wasn't sold on why to use this, which is a case where you could change the text returned based on some logic in the function. You can still use the original text parts sent in, but modify it or swap it out in certain cases.

```JS
(...)
let priceCatory = 'pretty cheap';
if (productPrice > 30) {
  priceCategory = 'fairly priced';
}

return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
```

That should return: 'This product (Development course) is fairly priced.'

Obviously we don't have to return a string, we can instead return an object and by doing that we have a function that converts a string into an object.

#### <b>Introducing regular expressions (regexp)</b>

We can add and use a regular expression like this:

```JS
const email = 'test@example.com';
const regexp = /^\S+@\S+\.\S+$/;

regexp.test(email);
```

This returns true since the email matches the pattern.

#### <b>More on regular expressions</b>

A regular expression pattern can also be created like this: `const regexp = new Regexp();` with som pattern in the parenthesis. The example above is the literal notation.

I have some experience with this since I wrote Perl back in the day, so not too many notes here.

Protip though: Google 'email js regexp' to perhaps find better patterns than you can come up with yourself.

Instead of calling 'test' on the regexp, we can call 'exec'. This returns an array with some information about the pattern and where it matched.

Maximillian has some youtube videos about this as well: [Regular expressions introduction | regex demystified](https://www.youtube.com/watch?v=0LKdKixl5Ug&list=PL55RiY5tL51ryV3MhCbH8bLl7O_RZGUUE)

#### <b>Wrap up</b>

[More on numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)<br>
[Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)
