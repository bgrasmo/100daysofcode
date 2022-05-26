## Section 6: More on functions

## Day 47 - 2022-05-26

#### <b>Function recap</b>

Omitted stuff I've already learned. One clarification about function parameters and arguments:

Parameters are the variables you specify when defining a function.<br>
Arguments are the values you pass to the functions

#### <b>Functions vs methods</b>

Functions are functions, or so I would say, but if they are created inside objects they are called methods.

```JS
const person = {
  greet: function greet(name) {
    console.log(`Hello there, ${name}`);
  }
}
person.greet('Joe');
```

So the method can be executed like a normal function, even though it's stored in a property in an object.

#### <b>Functions are objects</b>

In devtools in the browser having some code loaded that defines a function, call `console.dir(functionName)` on it. You should see that it is indeed an object, with some special properties attached to it. These would then typically be stored in the heap.

#### <b>Function expressions - storing functions in variables</b>

Creating a method (a function in an object) is a bit strange says Max, because we're creating a function on the right side of an assignment operator. It looks like we would do this with a normal function:

```JS
const person = function greet() {
  console.log('Hello there');
}
```

You are allowed to do this, but you can't call this function by the name 'greet', that is not recognized (not defined), you have to call it by `person();` as the function object is stored in that constant. The implication is that the function is not stored in the global scope anymore, but the scope the constant belongs to.

So the function here is an expression rather than a declaration. It also means we can omit the function name since it can't be used anyway, and we have an anonymous function:

```JS
const person = function() {
  console.log('Hello there');
};
```

We now also add the semicolon after the curly braces something we don't do with function declarations.

#### <b>Function expressions vs declarations</b>

With function declaration / function statement, JavaScript hoists it to the top and fully initializes it for you. Meaning it can be declared wherever and used wherever. Sounds messy if you ask me.

With function expressions it is still hoisted (but why though?) but not initialized or defined, so it can't be used untill after it is defined.

#### <b>Anonymous functions</b>

We've seen anonymous functions before, when we've added functions directly as callback functions for event listeners for instance. That is fine if we have a function we won't use anywhere else in our code, then it makes no sense to define it first and call it by name from just that one place.

Though one issue could be with debugging, as you won't get the function name which encountered the problem, but rather 'element.anonymous'. If we declare it with the name after all, the name that can't be used for calling the function, it will show up in errors.

#### <b>Arrow functions</b>

The syntax for anonymous functions can be simplified by removing the function keyword, and instead adding an arrow after the parameter definition: `=>`.

Documentation of [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) on MDN.

I think they become a bit hard to read at their simplest point. Example: An anonymous function that takes an input, adds 100 to it, and then returns the result:

```JS
a => a + 100;
```

If the function takes no input, you will have to use empty parenthesis first:

```JS
() => someExpression;
```

For these simple ones, the results are always returned with implicit return. In other words, you don't need to add the return keyword to return the result. For multiple expressions you will have to return the result yourself, if you want to.

If the function returns an object, it will have to be written like this as curly braces in the default way defines the block / marks the function body:

```JS
const loadPerson = pName => ({name: pName});
```

By wrapping the object in parenthesis we tell JavaScript that we want to return an object, and it's not the function body.

#### <b>Default arguments in functions</b>

Again JavaScript is quite forgiving, and we can call a function expecting two arguments but send any number of them and we won't get an error. It might make the function misbehave however, if we send in no arguments and the function expects two. To handle that case more gracefully, as in, not having 'undefined' set by default, we can add a default value ourselves by setting the parameter equal to what we want:

```JS
const name = (name = 'Joe') => expression;
```

This pretty much only handles the 'undefined' case though. Meaning if we send in 'undefined' by not sending in any arguments, the default value will be used. If we send in falsy values like null, an empty string or the number 0, that will actually be used instead of our default value. Worth keeping in mind.

Also parameters with default values will have to come last. If the function expects two arguments, we only send in one, and the default value is set on the first parameter, what to do? In JavaScript the first parameter will then have it's default value changed to whatever was sent in, while the second parameter will be undefined.

