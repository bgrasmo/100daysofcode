## Section 9: More on objects

## Day 50 - 2022-05-29

#### <b>What is an object?</b>

An object is something that typically reflects real world entities, for instance a button, a movie, a backpack. These are things to us, and people generally know what a button is (though context might help, is it a button in a shirt, the button you press to make a doorbell ring or a button on a webpage?) or what we have in mind when talking about a movie. So when we make an object for movies it then makes sense that it should have things like title, preview image, summary, rating and so on so we can think about this like we do for everyday objects.

Technically of course an object in JavaScript is made up of properties and methods, and this allows us to group related data together and split our code into logical pieces.

To put it another way, primitive values are numbers, strings, booleans, null, undefined and symbol. Reference values (or objects) is everything else.

#### <b>Adding, modifying and deleting properties</b>

```JS
const person = {
  name: 'Joe',
  age: 30,
  hobbies: ['Books', 'Music', 'Movies'],
  greet: function() {
    alert('Hi there!');
  }
};

person.isAdmin = true; // Adds this new property
person.age = 31; // Modifies age, sets this new value
delete person.greet;
```

#### <b>Special key names and square bracket property access</b>

To "break" the naming rules in JavaScript, keys in objects can be wrapped in quotes. Then almost anything goes: `'first name': 'Joe'` is actually accepted, but only here and not for variables defined with let or const. To access that then we have to use the square bracket notation: `person['first name'];` instead of dot notation.

We should not deliberately create objects with key names like that ourselves, but if we read in data from Json or similar, we might get keys that break the JavaScript naming rules and thus have to use this bracket notation to access it.

#### <b>Property types and property order</b>

Did not get what was said about property types. As for property order, it's the same order as you defined it in. Unless your keys for some reason are numbers, then they are sorted in ascending order. (Note, can only use numbers starting at 0 and increasing).

#### <b>Dynamic property access and setting properties dynamically</b>

Basically use bracket notation and have the key in a variable which is inside that bracket for lookups. To add a dynamic key to an object, again wrap the variable in square brackets.

#### <b>Shorthand property syntax</b>

When the key name is the same as the variable name holding the value, you don't have to add both separated by the colon after keyname, but just having the name is enough:

```JS
const firstName = 'Joe';
const lastName = 'Schmoe';
const age = 30;

const person = {
  firstName: firstName, // Instead of this
  lastName, // We can just do this
  age,
}
console.log(person);

{ firstName: 'Joe', lastName: 'Schmoe', age: 30 }
```

As can be seen, JavaScript added this correctly for us.

#### <b>For in loop</b>

For object we can use for in which looks quite similar to the for of loop for arrays, but since we're working with objects we only get the keys. To loop through some inner, nested object we can specify the path to that object with dot notation like normal: `person.address` for instance, if address was a nested object on person.

```JS
for (const key in person) {
  // Then person[key] to look up, change and so on
}
```

#### <b>The object spread operator</b>

Like spreadding an array, though now with curly braces:

```JS
const person2 = { ...person1 };
```

Though this only copies the given level, nested levels will still be referenced unless explicitly copied as well. What's new is that this can be used to copy the object structure and values, but then overwrite some of the values if wanted:

```JS
const person2 = { ...person1, age: 32, hobbies: [...person1.hobbies] };
```

This will copy the first person object and the first level values, but then overwrite age with 32. It will also copy the nested hobbies array.

#### <b>Object.assign()</b>

An older way of copying objects is by using Object.assign();

```JS
const person2 = Object.assign({}, person1);
```

It really takes two arguments, the first object is the target, which will be modified (!) and the second is the source. Then the target object is returned as well.

#### <b>Object destructuring</b>

The difference from array destructuring (aside from using curly braces of course) is that you have to specify an existing key to extract. So if person has a nested object containing an address, it can be extracted like this:

```JS
const { address } = person;
```

This gives us a constant named address that contains the key-value pairs from the person object. (And in this case it's a nested object.)

We can also use the rest operator to get a copy of the remaining properties in an object:

```JS
const { address, ...otherProperties } = person;
```

To extract a key but store it in a variable with a different name than the key name, we can extract it like this:

```JS
const { address: addressDetails } = person;
```

This will extract the address key and store it in the addressDetails variable.

#### <b>Checking for properties existence</b>

Use the 'in' keyword for instance like this: `if ('address' in person)`. Another way would be to check if a value is undefined: `if (person.address === undefined)`

#### <b>Introducing 'this'</b>

'this' is a special keyword in JavaScript which inside a function will refer to whatever called that function.

Given this movie object with a method:

```JS
const newMovie = {
  info: {
    title,
    actor,
    year,
  },

  getFormattedTitle: function() {
    return this.info.title.toUpperCase();
  }
};
```

Without the this keyword here, JavaScript would not look for the 'info' property in this object but would look for other variables and would fail if they did not exist. If they did exist we would probably get some strange behavior here since we as developers clearly want to get the title from the info property in the object, and it's likely whatever info variable JavaScript found would not have the expected structure.

So 'this' tells JavaScript to look into the object this method is part of, though to be precise, look at what is responsible for executing the function, which is typically the object it is part of.

An "easy" way to remember it is to look at what is in front of the function, and here we would call it with newMovie.getFormattedTitle, so newMovie is then what's calling it.

#### <b>Method shorthand syntax</b>

Instead of creating a method like above, there is a shorter way to do it:

```JS
getFormattedTitle() {
  return this.info.title.toUpperCase();
}
```

Aparently though the two ways are not exactly the same behind the scenes, but we'll come back to that later it sounds like.

#### <b>The this keyword and its strange behaviour</b>

Given this object:

```JS
const movies = [
  {
    info: {
      title: 'Some movie',
      actors: 'Some actor',
      year: 1998,
      summary: 'Best movie ever!',
    },
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    }
  }
];
```

If you try to extract the method to easily call it, that won't work. In other words, this doesn't work:

```JS
const { getFormattedTitle } = movie;
console.log(getFormattedTitle());
```

Add a `console.log(this);` to the method, and when running it in the browser you'll see it belongs to the window. Again if we look at what's in front of this method, what's calling it, there is nothing there and that means it's the global exectuin context that is reponsible from executing it. In non-strict mode, that belongs to the window object as shown above.

To fix this we can use the bind() method (though calling it with movies.getFormatteTitle() also works, so extracting the method doesn't actually seem needed here.)

With bind() we can not only preconfigure some arguments, but also what the this keyword refers to, what we want it to refer to inside the method. Then we can extract it again, and call bind() on it afterwards:

```JS
filteredMovies.forEach((movie) => {
  let { getFormattedTitle } = movie;
  getFormattedTitle = getFormattedTitle.bind(movie);
  console.log(getFormattedTitle());
});
```

#### <b>Call and apply</b>

The example above isn't optimal. We've learned that bind is used to preconfigure a function that should be run in the future, but we've used it to run the function right now. Bind returns a new function object which we store, and that is not needed here. Instead of bind then, we can use call() which goes ahead and executes the function right away, but with the added possibility of adding what 'this' refers to.

```JS
filteredMovies.forEach((movie) => {
  let { getFormattedTitle } = movie;
  console.log(getFormattedTitle.call(movie));
}
```

Then we also have apply which is quite similar to call, as it will also execute the function immediately. The first argument to apply is also 'this', but then apply only takes one more argument unlike call which like bind takes an "infinite" amount of them. The second argument to apply has to be an array, that should be your values for the different arguments.

#### <b>What browsers (sometimes) to do 'this'</b>

The 'what is in front of it' explanation only makes sense if you are executing the function. When indirectly executed from an event listener for example the first definition applies, and that is 'who is responsible for calling it'. In an event listener, that will be the event or the object the event listener is bound to. So browsers binds 'this' to the DOM element that triggered the event.

#### <b>What arrow functions do to 'this'</b>

Every function (created with the function keyword) and method have their own this binding which ensures that 'this' inside the function is bound to something, and what is responsible for executing the function. Arrow functions however does not bind this to anything, so 'this' inside an arrow function is that same as it would be outside the function.

```JS
const newMovie = {
  // ...
  getFormattedTitle: () => {
    console.log(this);
  }
}
```

We can't do something with 'this' in the object but outside the function, that's not a place where we can write code so arrow functions doesn't help us here. Revert to regular method for this example for now.

This behavior can be helpful in some cases. Given this object and method:

```JS
const members = {
  teamName: 'Blue',
  people: ['Joe', 'Jane'],
  getTeamMembers() {
    this.people.forEach(p => {
      console.log(p + ' - ' + this.teamName);
    });
  }};
```

Result:
```
Joe - Blue
Jane - Blue
```

This works as expected because the arrow function doesn't do anything with the this reference. If this function is changed to a regular function it doesn't work, because then the this reference is changed to what is calling it, and that is forEach calling it on our behalf:

```JS
const members = {
  teamName: 'Blue',
  people: ['Joe', 'Jane'],
  getTeamMembers() {
    this.people.forEach(function(p) {
      console.log(p + ' - ' + this.teamName);
    });
  }
};
```

Result:

```
Joe - undefined
Jane - undefined
```

#### <b>Getters and setters</b>

Sometimes we want to control how values can be set, or how we can get them. We do that by using the 'get' and 'set' keywords which allows us to write some logic, like setting a defaul value or throwing an error. 

Set takes an input, the value to be set, and when setting it we typically don't use the same name as after set, but rather prefix it with underscore to highlight it's an internal value.

If set is omitted so we only have get, we have a read-only property. If get is omitted so we only have set, we have an non-readable property.

Get functions the same was as set, except it doesn't take any input here, and we only return the value.

```JS
const newMovie = {
  info: {
    set title(value) {
      if (value.trim() === '') {
        this._title = 'No title set';
        return;
      }
      this._title = value;
    },
    get title() {
      return this._title;
    },
    actor,
    year,
  },
  getFormattedTitle() {
    return this.info.title.toUpperCase();
  }
};
```

This can then be used like a normal property. To set a value:

```JS
const title = document.getElementById('title').value;

newMovie.info.title = title;
```

To get a value:

```JS
console.log(newMovie.info.title);
```

There is of course some documentation on the [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) keyword on MDN that is worth looking at.

