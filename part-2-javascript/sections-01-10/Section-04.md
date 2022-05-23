## Section 4: Working with control structures

## Day 44 - 2022-05-23

#### <b>If statements and boolean comparison operators</b>

Important for conditional code: return true or false.

For comparing strings, uppercase characters are considered to be smaller than lowercase characters.

#### <b>Using if statements </b>

Don't add semicolon after if statement or the curly brace closing the function definition.

If you only have one expression you want to execute after the if statement, you can write it all on one line without the curly braces, but for readability reasons curly braces should perhaps be used anyway.

#### <b>Bewaring when comparing objects and arrays</b>

If you compare two objects to each other, you will get false as result, even if they look identical.

```JS
({ name: 'Joe' } === { name: 'Joe' })
```

It's the same with identical looking arrays, because arrays are also objects. We will dive deeper into this later. I'm looking forward to seeing if my thinking about pointers to memory addresses holds true.

#### <b>The logical AND and OR operators and operator precedence</b>

AND operations are grouped together, OR is an alternative. Not sure I got that, and I think experimentation is needed here. But parenthesis lets us decide how we want to group the operations in any case.

```JS
if (cond1 && cond2 || cond3)
```

Cond1 and cond2 are evaluated together and returns true if both conditions return true. Cond3 is evaluated as an alternative. This entire expression then returns true if part 1 (cond1 && cond2) returns true OR cond3 returns true.

MDN has documentation on [operaor precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence).

For the 'calculator' example shown, it is adviced to do the negative check first, and then return if none of the conditions are met. That avoids nesting a level by having the rest of the code inside the if block if one of the checks are true.

#### <b>Beyond true and false - truthy and falsy values</b>

This works:

```JS
const name = 'Joe';
if (name === 'Joe') // evalutes to a boolean which returns true
```

So does this:

```JS
const name = 'Joe';
if (name) // This is a string, not a boolean, but still returns true
```

In the latter example, JavaScript tries to coerce values to a boolean value if a boolean is requires, as it is with an if statement. The last if check will return true if 'name' is a non-empty variable. (Though with a caveat of course.)

A variable containing the number 0 will be treated as false, while positive and negative numbers will be treated as true when checking like this. This is useful though in case you don't want to divide by zero, you can perform this check before you divide by this variable.

Arrays and objects will be treated as true even if they are empty, while null, undefined or NaN will be treated as false.


## Day 45 - 2022-05-24

#### <b>Setting up a bigger example project - the monster killer</b>

