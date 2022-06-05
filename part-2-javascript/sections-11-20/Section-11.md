## Section 11: Deep dive: constructor functions and prototypes

## Day 55 - 2022-06-03

#### <b>Introducing constructor functions</b>

A class will behind the scenes typically be a function with the same name as you gave the class. This 'constructor' function will construct the object.

```JS
function Person() {
  this.age = 30;
  this.name = 'Joe';
  this.greet = function() {
    console.log(
      'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'
    );
  };
}
```

Apparently this isn't exactly how it works, but we'll learn more about that later. This function have to be called the same way as with a class, with the 'new' keyword.

#### <b>Constructor functions vs classes and understanding 'new'</b>

Where does the object come from though, given the function above doesn't return anything? The 'new' keyword takes care of that with executing the function by adding an empty object `this = {};`, adding everything in the function (or class) to that object and returns it.

The class is called 'syntactical sugar' for the constructor function, because creating blueprints with functions can be both cumbersome and confusing, since it looks like a function but doesn't behave like one. Also in other languages people might be used to having classes, so that's why they were introduced in JavaScript, to make it easier for us to write the blueprint definitions.

Behind the scenes classes do more than just setting up these constructor functions, they also help with a concept called prototypes which we'll learn more about later. But in the end, the class definition really only creates something similar to the function shown above.

In a constructor function like the function above it is clear that all the code is executed, all the logic is run, that it is initialized, set up, reaches out to a server or doing other things. In a similar class, there is no such place except for in the constructor method which as we've learned also gets executed when the object gets created. Methods you create in a class though are treated a bit differently (than the constructor method or the Person constructor function) but we'll see that soon.

#### <b>Prototypes</b>

Prototypes are very important in JavaScript, as it is a prototype-based language. What that means is that it uses prototypical inheritance. What does this mean then?

The class syntax is just syntactic sugar for the constructor functions and also for working with prototypes because that can be confusing. Constructor functions and prototypes power JavaScript objects.

Every constructor function we build has a special prototype property which is not added to the objects you create, but is a property of that function object. I guess? This was not clear. It seems it is automatically assigned as a prototype to the objected created when instantiating the constructor function. So when you create an object with the 'new' keyword, that new object gets this prototype thing.

A prototype is an object, and every object has sucn a prototype. (But not the ones we created ourselves?)

Some testing ensued and my conclusions are: 'function Person() {}' and 'class Person {}' does not seem to have this prototype object available. 'const p = new Person();' however does, and it doesn't matter if it was created from the function or the class. The object literal also has prototype attached, as it seems to have inherited from the Object object. And it turns out my testing was flawed. Creating a class in the browser console and then typing the name of the class doesn't show any prototypes attached to it, but with `console.dir(Person);` the prototype is shown.

The idea behind prototypes is how JavaScript shares code, and the prototypes can be thought of as fallback objects. JavaScript will search these prototypes when it can't find a property or a method on the object it started looking at. I wonder how that can happen though. The person object does not have sayHello method, so if person.sayHello is called, JavaScript will look to persons prototype. It can then be that this prototype has this sayHello method, but why wasn't it inherited?

The prototype can be thought of as the base class and we can reach out to that for properties and methods. So I guess the thing about sharing code kinda makes sense now, the prototype object is there and contains some code we can use without duplicating it. Now sure about methods we define on our own though, how they end up in a prototype and aren't inherited.

'Dunder', short for double under(score). So dunder proto dunder = __proto__. Be aware of the difference from the property actually called 'prototype' which only exists on function objects. __proto__ is the prototype on everything (?) else. Except:

```JS
function Person() {
  ...
}
const p = new Person();
console.log(p.__proto__ === Person.prototype); // Returns true, they are identical!
```

Now then, we can add properties or methods to a prototype. (Though when do we want to do that I wonder.)

```JS
Person.prototype = {
  printAge() {
    console.log(this.age);
  }
};
```

In the end, prototypes are what class and extends does for you when you create a class that extends something. It's a way of telling JavaScript that you want to set the prototype to a new object or add some new methods and properties to that prototype. Or in other words, what we did 'manually' above with adding printAge is done for us when extending some class.

#### <b>Working with prototypes</b>

Ok, it all becomes clear. (Or at least a little less muddy)

```JS
class AgePerson {
  printage() {
    console.log(this.age);
  }
}

class Person extends AgePerson {
  name = 'Joe';
  constructor() {
    super();
    this.age = 30;
  }
  greet() {
    console.log(
      'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'   
    );
  }
}
console.dir(Person);
const p = new Person();
console.log(p.__proto__);
```

It seems my understanding of inheritance was wrong, so good to have that cleared up. There is no 'printAge' on Person or p, it's found in the prototype. I guess it seems to make sense now. It should not be possible to see that the prototype of the person object was set to the AgePerson object. That should also explain why we have to call super(), it creates an object based on AgePerson and sets it as a prototype of the object built on that class (Person extends AgePerson).

What we did when setting Person.prototype to a new object is we replaced what was there. So it's better to extend the prototype with `Person.prototype.printAge = ` and then set our method there.

#### <b>The prototype chain and the global 'Object'</b>

With every object having a prototype and prototypes themselves are prototypes, it means that a prototype also has a prototype object. This is called the prototype chain.

Objects are based on Objects, which doesn't directly have the toString() method, but it can be found on the prototype on Objects. So, lego. Small building blocks used to build a whole.

Static methods are added on the function object itself.

#### <b>Classes and prototypes</b>

In the example above, the 'greet' method doesn't actually seem to be on the Person object, but it is in __proto__ which seems to come from AgePerson. How can that be? "We have an extra prototype added by JavaScript when working with classes". Apparently. I don't see it.

#### <b>Methods in classes and in constructors</b>

One argument is that for properties you want to have different values for each new object, but for methods you want to reuse it as it likely doesn't change from object to object. So for this JavaScript does a little optimization for us (or itself I would say), by adding the method to a prototype. Whenever we now create a new person object we use the same prototype "fallback" object. This means less objects needs to be created, which reduces memory usage, and less setup time.

If a function is created in the constructor method in the class, JavaScript will perform some optimizations for us and make it be part of a prototype object, so it's not recreated every time a new object is created. If however the function is defined in the class, then it will be recreated every time a new object is created based on that class, costing us time (to recreate) and memory.

Speaking of performance, aparently this + bind will yield better performance than using an arrow function to avoid the 'this' problem. So this is perferred performance wise, apparently:

```JS
class Person {
  greet() {
    console.log('Hi!');
  }
}
const p = new Person();

const button = document.getElementById('button');
button.addEventListener('click', p.greet.bind(p));
```

The code above should then be added to the prototype of Person and be shared across all instances.

This is worse:

```JS
class Person {
  greet = () => {
    console.log('Hi!');
  }
}
const p = new Person();

const button = document.getElementById('button');
button.addEventListener('click', p.greet);
```

`greet = function() {}` is equally bad compared as the arrow function. The same would be adding it to the constructor method in the class: `this.greet = function() {}`

#### <b>Built in prototypes in JavaScript</b>

We've used prototypes already, sort of without knowing. For arrays for instance, we've used 'concat' or 'filter' which are actually part of array.prototype. In other words, these methods are defined on the fallback object, the prototype every array is connected to. Again, legos. Small pieces or building blocks to build up a whole.

When you create an array with the square brackets you automatically get an array object which has the array prototype and the methods from it. This also applies to strings.

#### <b>Setting and getting prototypes</b>

How do you change the prototype of an object which was already created, or which you didn't create with your own constructor function? Or you created a new object without your own constructor function and you want to set your own prototype?

This is all nieche use cases and very advanced use cases but something you can encounter.

Having created an object literal we can use the global Object and call method getPrototypeOf:

```JS
const car = {
  brand: 'Audi',
  model: 'RS5'
}

console.log(Object.getPrototypeOf(car));
```

We can access things directly with dunder proto dunder, but that was apparently something implemented by all browsers 'unofficially' and wasn't meant to be the way to work with prototypes in JavaScript. So the more official way is shown above.

Given 'getters' and 'setters', there's also a setPrototypeOf which is more interesting to us now:

```JS
Object.setPrototypeOf(car, {
  printCar: function() {
    console.log(`${this.brand} ${this.model}`);
  }
});
car.printCar();
```

This would overwrite the original prototype. If we only want to add something to it we can use the spread operator to copy existing prototype into it before adding our extension:

```JS
Object.setPrototypeOf(car, {
  ...Object.getPrototypeOf(car),
  printCar: function() {
    console.log(`${this.brand} ${this.model}`);
  }
});
car.printCar();
```

We've already looked at the example where we are using our own constructor function and how to extend the prototype, but how about if we don't have a constructor:

```JS
const student = Object.create({
  printProgress: function() {
    console.log(this.progress);
  }
});

student.name = 'Joe';

Object.defineProperty(student, 'progress', {
  configurable: true,
  enumerable: true,
  value: 0.55,
  writable: true
});
```

Object.create creates an empty object, but does so with the prototype of your choice. This also takes a second argument where you could add a 'property descriptor map' where you can add properties for the creation process.

```JS
const student = Object.create({
  printProgress: function() {
    console.log(this.progress);
  }
}, {
  name: {
    configurable: false,
    enumerable: false,
    value: 'Joe',
    writable: true
  }
});
```

Some finishing words on constructor functions vs classes:

|Constructor functions|Classes|
|---------------------|-------|
|Blueprint for objects|Blueprint for objects|
|Properties and methods|Properties and methods|
|Can be called with new|Must be called with new|
|All properties and methods are enumerable|Methods are non-enumerable by default|
|Not in strict mode by default|Always in strict mode|

Some documentation on MDN:

[Constructor functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Using_a_constructor_function)<br>
[Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
