## Section 5: Behind the scenes, the weird past and the present of JavaScript

## Day 47 - 2022-05-26

#### <b>ES5 vs ES6+ - Evolution of JavaScript</b>

ES stands for Ecma Script, and one important version that was released was named ES5. This is just a term that was assigned to one specific version of the standard that was released. The most important thing with this was standardization, as browser before this pretty much did what they wanted to. So this was the first real big standard, though after Ecma script 3 which also worked on going in this standardization direction.

Another important major version was mainly finalized in 2015 and therefore is known as Ecma script 2015 or also ES6. This and later versions is considered to be modern JavaScript. Features are mostly added and not so much removed to avoid breaking backwards compatibility, so old syntax of writing JavaScript is still supported. But since we're working with modern browsers and Node for instance, there's no need for that.

#### <b>Block scope</b>

In the beginning there was only 'var', and it could be used both in function and global scope. With ES6 we got let and const, and it might seem like let is the same, but like const it works in block scope. If you define a variable with 'var' inside an if-statement, you can access the same variable outsite that if-statement since it works in global scope. With let you can't, since it will be cleared when you are outside the block it was created in.

#### <b>Hoisting</b>

Another difference is that 'var' is 'hoisted' to the top and set to undefined which let and const isn't. (It is technically hoisted though, just not set to anything.) What this means is that something like this:

```JS
console.log(userName);

var userName = 'Joe';
```

Actually prints 'undefined' and does not give an error, because internally the code is changed to look like this:

```JS
var userName;

console.log(userName);

userName = 'Joe';
```

With let and const you get an "cannot use before initialization" error message.

Function definitions are also hoisted, and I guess arrow functions (function expressions) technically also are, but again the latter gives the cannot use before initialization.

#### <b>Strict mode and writing good code</b>

Variables defined with var can be redeclared, which let and const can't, and this isn't something you should do anyway. (var name = 'Joe'; var name = 'Anna';)

JavaScript also allows you to define a variable without using either var, let or const, and just assigning some value to it. Again something that shouldn't be done, because it would look like the variable was defined somewhere else.

To avoid this forgiving behavior JavaScript has a 'strict' mode introduced with ES5 that can be used:

```JS
'use strict';
```

This can be used where you want it, so at the top of the page and apply to everything, or just inside a function.

MDN documentation on changes with [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#changes_in_strict_mode).

#### <b>How code is parsed and compiled</b>

When the browser encounters JavaScript, either through loading it from a file or inline, it executes it. That means to read in the script, parse it, have the interpreter translate it to bytecode and then the interpreter will start executing it. This however is not optimized, as it will execute it line-by-line.

The interpreter also hands off the bytecode to the compiler which is typically of the JiT (Just-in-Time) type, which compiles the bytecode to machinecode. Just in time means that the compiler starts compiling and executing the compiled code while it is being read in and executed.

Not sure I got that right, and I definately wonder about how the bytecode is executed given machinecode is the only thing the computer/cpu understands.

The exact details of the above depends on the JavaScript engine being used. Chromium browsers and Node use the [V8 engine](https://hackernoon.com/javascript-v8-engine-explained-3f940148d4ef), while FireFox uses it's own engine called [SpiderMonkey](https://firefox-source-docs.mozilla.org/js/index.html).

#### <b>How code gets executed</b>

Introducing heap and stack. The heap is where the browser does its memory allocation. The stack is for execution context, for managing your program flow. Heap is "long term" memory, while stack is "short term" memory.

A script is wrapped in an anonymous function which is the first thing pushed onto the stack. Then the next thing to execute and so on are pushed onto the stack as well. They are popped off the stack when they are finished and not needed anymore. So I guess the entire script is one execution context, while each function call has its own execution context.

While I feel I get the gist of this, it isn't explained so well that I can actually re-tell it properly here. For instance there was no mention whatsoever of what happened to the constant which stored the name asked for in the prompt.

Perhaps a better explanation and other learning sources in this [stackoverflow discussion](https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap).

From this I guess that variables like strings, numbers and booleans which are 'primitive' values are created on the stack (though it feels wrong intuitively) while arrays and objects which are 'reference' values are created in the heap.

#### <b>Primitive vs reference values</b>

Primitive values: Strings, numbers, booleans, null, undefined, symbol. Normally stored on the stack because these are short living. they can end up in the heap for long running operations, but this is up to the browser to decide and it doesn't really matter to us.

However what is important, if you copy a primitive value from one variable to another, the actual value is copied. Meaning you can change the first value without the second being affected.

Now guess what happens when you do the same for reference values?

But first, what are reference values? All other objects than the ones mentioned in primitive values. These are more expensive to create, and as such are handled differently. These are typically stored on the heap, but again it's up to the browser to actually decide that. We're finally getting the pointer reference I've wanted: The variable stores a pointer (address) to a location in memory, and not the value itself.

When you copy a reference value you only copy the pointer and not the values themselves. So you can have two or more variables pointing to the same place in memory, and changing the values changes it for all the variables. Or perhaps more correctly, the value for reference values is the pointer. The actual values you see and use in your program are stored at the address this pointer points to. That's why you can manipulate arrays and objects created with const, the value or the pointer doesn't change.

To actually make a second copy of the same data in a new object/array, you can use the spread operator.

An article on this by [Academind](https://academind.com/tutorials/reference-vs-primitive-values) themselves.

#### <b>Garbage collection and memory management</b>

How is the memory in the heap managed? By the JavaScripts engine garbage collector. How does it do it? By periodically checking the heap for unused objects, which are objects without references. Why does it do it? To avoid the memory from overflowing, being used up, filled up by 'garbage' data.

We can intentionally dereference an object if we create it with let, and then later changes it to a primitive value.

Memory leaks would be unused objects that you still hold the reference to.

Some issue with adding event listeners and using anonymous functions, if you add another event listener from the first function called, but using an anonymous function the second time. This would cause JavaScript to create more and more event listeners, as these functions are objects and they take up space in memory.

[Memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management) documentation on MDN.<br>
[V28 garbage collection](https://v8.dev/blog/free-garbage-collection) article on v8.dev.
