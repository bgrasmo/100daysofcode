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

Extract instructors example project. Add event listeners to the buttons, Add logic to to "fight" a monster in a turn based game against the computer. A pretty big exercise with lots of steps learning to structure logic with if statements, though I won't detail it here.

Perhaps a better explanation of the or operator was given though: Since or looks for either the first or the second expression to be true (unless negated of course) it won't even look at the second expression if the first is true. Worth to remember!

#### <b>Conditional expressions - the ternary operator</b>

It's like "flattening" or straightening out an if statement:

```JS
if (something) {
  // return something if true
} else {
  // return something if false
}
```

The same expression can be written like this with the ternary operator:

```JS
const someResult = something ? returnIfTrue : returnIfFalse;
```

The expression can also checked can also contain a comparison:

```JS
const someResult = something === somethingElse ? returnIfTrue : returnIfFalse;
```

The difference from the if statement is that with the ternary operator you return something that will be stored in a variable, while the if statement doesn't do that.

Ternary expressions can be nested, but don't do that, that quickly becomes unreadable.

#### <b>Some theory - statements vs expressions</b>

Basically in JavaScript an expression is something that returns a value you could store in a variable, like the ternary expression above. Aparently it is also a statement.

An if statement on the other hand is only a statement and not also an expression. It can't be used on the right side of the equal side.

This might not be an official standard, see this discussion on [stackoverflow](https://stackoverflow.com/questions/12703214/javascript-difference-between-a-statement-and-an-expression).

#### <b>Logical operators "tricks" and shortcuts</b>

Double-bang: !!

This converts or coerces something into a proper boolean, instead of being truthy/falsy. The single exclamation mark converts a truthy value into a real false boolean. The second exclamation mark then negates this negation so it turns a truthy value into real true boolean. This can be used instead of letting JavaScript use its truthy / falsy comparison or coercion. Might be needed in some advanced cases. I certainly don't understand yet why you would need `if (!!'string')` rather than just `if(string)` given they both would enter the first part of the statement.

I think [this article](https://javascript.plainenglish.io/what-is-double-bang-operator-in-javascript-90fc67ead5a4) explains it better.

The or operator can be used to assign a default value. `const name = someInput || 'Joe';`. If someInput is falsy, 'Joe' will be set as name. 'Or' will here return the first truthy value without converting it to a boolean, or the last value if the first is falsy.

The and operator can be used to give us the last value if the condition is true. `const isLoggedIn && 'Joe';`. If isLoggedIn is true, 'Joe' is returned, if isLoggedIn is an empty string, that empty string will be returned. This && operator does not generate boolean values and always returns the first value if it is falsy. If the first value is truthy, it will always return the second one.

#### <b>The switch statement</b>

The switch statement takes in an expression that returns or contains a value.

```JS
switch (event) {
  case value1:
    // Do something if event === value1
    break; // Stop processing the rest of the cases
  case value2:
    // Do something if event === value2
  case value3:
    // Do something if event === value3
    // This will also be executed if value2 case was executed.
    // This can also be set like this, to execute the same code for two values:
  case value4:
  case value5:
    // Will be executed if event === value4 or value5
    break;
  default:
    // Do something if none of the other cases were met
}
```

