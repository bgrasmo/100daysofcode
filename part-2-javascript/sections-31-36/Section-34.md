## Section 34: Bonus - Typescript introduction

## Day 66 - 2022-06-14

#### <b>What is typescript and why would you use it?</b>

It is a superset to JavaScript (so it extends JavaScript) and adds static types. TypeScript can't run in the browser, so TypeScript code is compiled to JavaScript. It can also compile new and modern JavaScript to older JavaScript for improved browser support.

#### <b>Working with types</b>

Extract the instructors example. Install TypeScript: `npm install -g typescript`.

Given this typescript code:

```TS
const add = (a: number, b: number) => {
  return a + b;
}

const result = add(5, 3);

console.log(result);
```

We specify that the input to the add function must be two numbers, not strings. To convert it to JavaScript, run `tsc app.ts`, which gives this result in app.js:

```JS
var add = function (a, b) {
    return a + b;
};
var result = add(5, 3);
console.log(result);
```

If we try to change the input to the add function to be strings instead, we have to recompile the code with 'tsc' again, but now we'll get an error. So it won't let use write that code. By the way, vs code will also alert about the same as we're writing it, as it's an IDE with built-in support for TypeScript.

#### <b>Core types and diving deeper</b>

The 'const result' above doesn't have a specified type, though in this case it should probably have 'number'. However, we don't actually need to do that here since TypeScript will infer the type from the rest of the code. Hovering over 'result' will show that TypeScript inferred it to be a number, and hovering over 'add' in the function shows that this function returns a number so it inferred that as well.

It is apparently good practice to not explicitly declare a type when TypeScript is able to infer it.

Other types are: string, object, boolean and so on.

The function type has to be added after the parameter list:

```TS
const add = (a: number, b: number): number => {
  return a + b;
}
```

For functions that doesn't return anything we can use type 'void'. We can also use type 'undefined' but then TypeScript actually expects an explicit return of 'undefined' in the function, even though that is what it returns if we don't specify anything...

Another important type is 'any' which works for any type.

Given the following HTML:

```HTML
<input type="text" id="num1">
<input type="text" id="num2">
<button>Add</button>
```

Which we then get in our TypeScript file like normally:

```TS
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const buttonElement = document.querySelector('button');

const printResult = result => console.log(result);

const add = (a: number, b: number) => a + b;

buttonElement.addEventListener('click', () => {
  const num1 = num1Input.value;
  const num2 = num2Input.value;
  const result = add(num1, num2);
  printResult(result);
});
```

Compiling this shows a lot of errors, but the JavaScript file is still generated. We're also left with concatenating instead of adding numbers. Perhaps one thing to fix first is that TypeScript claims there is no 'value' on the num?Input elements. But how can TypeScript know this? We only tell it that we select an element in the DOM by ID, but that element might not exist and it could be of any type, like paragraph, button, form or whatever.

Here we can use 'type caseting' to override the type inferred by TypeScript. It could only guess that type is HTMLElement, but we can let it know it is an HTMLInputElement. We don't do that by setting the type as we've done for number, but set it after what we've selected by using the 'as' keyword. This is maybe the most commonly used way. An alternative is the specify it before the thing you select, in angle brackets:

```TS
const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
```

Now we have a new error though, but one that is correct: num1 as input to the add function is a string, because as we know the value property on an input element always returns a string. So we need to convert the input to numbers by adding a + in front of them.

#### <b>Object, array and function types</b>

If we add an object to our event listener function we can specify that it is an object

```TS
const resultContainer: object = {
  res: result
};
printResult(resultContainer);
```

However, that is a very general object and doesn't give us auto-completion. Instead we can add the various types in the object like this:

```TS
const resultContainer: { res: number } = {
  res: result
};
printResult(resultContainer);
```

Now we can call `printResult(resultContainer.res);` and it won't show an error. But again this is redundant because TypeScript is correctly able to infer that this is indded a number.

Extend this to push the object into an array:

```TS
const results = [];

results.push(resultContainer);
```

Then we can push anything else into the array as well, '5' for instance. It works, but it's probably not what we want. For some reason it seems we still have to tell TypeScript this should be an array by adding [] after the object definition:

```TS
const results: { res: number }[] = [];
```

Now we want to add a method to this object, and then we get an error because we say nothing about that in the object type specification. We can then remove this again and let TypeScript infer the types and everything is fine. Pushing this object to the array is still also fine as TypeScript is simply happy it at least has one type definition for the object there. To actually add the function type there though, we do this:

```TS
const results: { res: number, print: () => void }[] = [];
```

This specifies a function that won't return anything and doesn't take any input.

#### <b>Advanced types, literal, union, enums</b>

The type definition for the results array above has gotten a bit long. To simplify it we can use a type alias:

```TS
type CalculationResults = { res: number, print: () => void }[]
const results: CalculationResults = [];
```

The advantage now is that we can reuse the calculation results type definition if we use the same thing elsewhere in our code.

If we only want to allow 2 values for instance, we can use the literal type:

```TS
const printResult = (result, printMode: 'console' | 'alert') => {
  if (printMode === 'console') console.log(result);
  if (printMode === 'alert') alert(result);
}

printResult(results, 'console');
```

The pipe symbol here creates a union type, which means multiple types of values are allowed. Here we accept either literal 'console' or literal 'alert', but we could allow for instance 'string | number' for such a print function. Again we could have used a type alias here for printMode.

Instead of the literal type here, we could have used enum:

```TS
enum OutputMode { CONSOLE, ALERT };

const printResult = (result, printMode: OutputMode) => {
  if (printMode === OutputMode.CONSOLE) console.log(result);
  if (printMode === OutputMode.ALERT) alert(result);
}
printResult(results, OutputMode.CONSOLE);
```

The list in the enum will be compiled to numbers behind the scenes, so console will be 0 and alert will be 1. The compiled result:

```JS
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["CONSOLE"] = 0] = "CONSOLE";
    OutputMode[OutputMode["ALERT"] = 1] = "ALERT";
})(OutputMode || (OutputMode = {}));
```

#### <b>Classes and interfaces</b>

For classes we could guess that we could do something like this:

```TS
class User {
  constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
  }
}
```

But we can't. We actually have to add the inputs to the constructor as fields outside of it and define the types there as well.

We can also add access modifiers, basically stating if a property should be usable from outside or only from inside of the class. Add 'private' to mark it as private to the class. The default is 'public' so that doesn't have to be set.

```TS
class User {
  name: string;
  private age: number;
  
  constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
  }
}

const user = new User('Joe', 30);
console.log(user.name, user.age);
```

There's a shorthand for this though where we don't have to define the types outside of the constructor first. If we set 'public|private' in the constructor, we can remove the fields. This is a special feature available to the constructor of the class, and it also means we can get rid of the code in the body of the constructor.

```TS
class User {
  constructor(public name: string, private age: number) {}
}
```

To extend a class:

```TS
class Admin extends User {
  constructor(name: string, age: number, private permissions: string[]) {
    super(name, age);
  }
}
```

Now onto a special feature called interface. In it you can define how your object should look, kind of like the blueprint creation in a class:

```TS
interface CalculationContainer {
  res: number;
  print(): void;
}
```

Apparently there are two ways to define a function type:

```TS
print: () => void;
print(): void;
```

We can't use 'new' with the interface but we can use it as a type:

```TS
interface CalculationContainer {
  res: number;
  print(): void
}

type CalculationResults = CalculationContainer[];
const results: CalculationResults = [];
```

Here the interface is really just an alternative to type, as we could have used type directly and skipped the interface part.

So this example was maybe not so useful, but interfaces can be used as contracts in classes:

```TS
interface Greetable {
  name: string;
}

class User implements Greetable {
  constructor(public name: string, private age: number) {}
}
```

This forces the class to have a public name property with type string. If name was removed from the constructor we would get an error that it incorrectly implements the interface. That is why they are called contracts. Classes can have more than the interface demands, but never less. This will be of assistance in bigger projects where it might be hard to keep track of what you want to do where. It can also be helpful in a team to force everyone to do something in a certain way so we have the same code style.

We can add other interfaces, and implement them all with a comma separated list. This forces us to implement a print method in the class as well:

```TS
interface Printable {
  print(): void;
}

class User implements Greetable, Printable {
  constructor(public name: string, private age: number) {}

  print() {
    console.log(this.name);
  }
}
```

#### <b>Generic types</b>

Array is a generic type in TypeScript. This means we both have to specify that we're working with an array, but since that can hold all kinds of different values we also have to specify those. To set that an array can contain anything, we can do this:

```TS
const results: Array<any> = [];
```

Or we can use the CalculationContainer from before. The way we did it before: `CalculationContainer[]` was just syntactic sugar for this notation where we use the generic array type to be very precise about the type of data inside of it:

```TS
const results: Array<CalculationContainer> = [];
```

There are other generic types like promise, which comes into play if we use fetch for example. That returns a promise, which will eventually resolve to a value and that value is of a type. So it's another example of two types working together, the promise type and the value the promise resolves to. We can also have generic classes and objects, but here we build a generic function:

```TS
function logAndEcho<T>(val: T) {
  console.log(val);
  return val;
}
logAndEcho<string>('Hi there!');
```

What this says that whoever uses this function should give the exact type of data in use, and then we know we get an argument of that type. Since we've specified string here, TypeScript understands that and we get autocompletion for strings in the editor.

#### <b>Configuring the TypeScript compiler</b>

Instead of manually recompiling every time we change a file, we can set tsc to enter watch mode by adding a -w: `tsc app.ts -w` and it will automatically recompile whenever we save the file.

But what if you have multiple TypeScript files you want to watch? Run `tsc --init` to make this a managed project, then you can run just `tsc` to recompile all files, or `tsc -w` to watch for all changes in the project.

Running --init creates a tsconfig.json file that lets us configure the compiler, so now we get some errors we didn't get before. One important thing is 'target' which is now set to 'es2016' meaning classes are not recompiled to old JavaScript code but more or less kept. Another important thing is 'strict' which is set to true, so it's stricter about compiling. It wasn't before.

To fix that a button fetched from HTML might be null, error, an exclamation point can be added at the end of the line, just before the ending semi-colon. This tells TypeScript we know this line will never be null, so it can ignore that check.

#### <b>Wrap up</b>

The official [TypeScript docs](https://www.typescriptlang.org/).
