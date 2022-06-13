## Section 26: Meta-programming

## Day 64 - 2022-06-12

#### <b>Symbols, iterators, generators, reflect API and proxy API</b>

| Symbols                                     | Iterators and generators                 | Reflect API                      | Proxy API                            |
| ------------------------------------------- | ---------------------------------------- | -------------------------------- | ------------------------------------ |
| Primitive values                            | Create your own 'loopable' values        | API to control objects           | Create 'traps' for object operations |
| Used as object property identifiers         | What arrays, strings etc. use internally | Standardized and grouped methods | Step in and execute code             |
| Built in symbols and creatable by developer |                                          | Control code usage / impact      | Control code usage / impact          |
| Uniqueness is guaranteed                    |                                          |                                  |                                      |

#### <b>Understanding symbols</b>

To create a new symbol:

```JS
const uid = Symbol('uid');
console.log(uid);
```

Now this can be used in an object, and it will protect against being changed:

```JS
const user = {
  [uid]: 'p1',
  name: 'Joe',
  age: 30
};
```

You don't have to add the identifier when creating the symbol, that is just helpful when debugging.

#### <b>Built in symbols</b>

The output from console.log on `user.toString()` will be `[object Object]`. We can actually change that by sort of giving the object a name with one of the built in symbols. Adding `[Symbol.toStringTag]: 'Users Object` will instead output `[object Users Object]`

Not sure how useful this will be though. Symbol [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) on MDN as always.

#### <b>Iterators</b>

We can add iterators to object by adding a method `next() {}`:

```JS
const company = {
  curEmployee: 0,
  employees: ['Joe', 'Jane', 'Anna'],
  next() {
    if (this.curEmployee >= this.employees.length) {
      return { value: this.curEmployee, done: true };
    }
    const returnValue = { value: this.employees[this.curEmployee], done: false };
    this.curEmployee++;
    return returnValue;
  }
}
```

Now we can console.log this object.next() a couple of times and we can see we'll get one employee per run until we're done. So this allows us to loop through any field of this object we want.

We can of course create a loop of that to go through all employees in the object, and we have our own iterator:

```JS
let employee = company.next();

while (!employee.done) {
  console.log(employee.value);
  employee = company.next();
}
```

We still can't use 'for of' loop on this though. Trying to do so would give error message that the object is not iterable, because JavaScript isn't looking for the next() method.

#### <b>Generators and iterable objects</b>

JavaScript is looking for a special symbol to check for iterables: `[Symbol.iterator]:`. The value here would be the method that iterats on this object, so our next method for instance. However, we don't have to create such methods ourselves, there are generators that do that for us.

To create a generator that returns an object with an iterator:

```JS
[Symbol.iterator]: function* employeeGenerator() {
  let employee = company.next();

  while (!employee.done) {
    yield employee.value;
    employee = company.next();
  }
}
```

This generates a new object which has a next method on its own. We can move all the logic from the next() method into this generator function as well:

```JS
[Symbol.iterator]: function* employeeGenerator() {
  let currentEmployee = 0;
  while(curremtEmployee < this.employees.length>) {
    yield this.employees[currentEmployee];
    currentEmployee++;
  }
}
```

Yield is a bit like return, as it returns or outputs what comes after it. This is used instead of return in generator functions.

Technically the function isn't executed like this, if that makes sense. When the generator function is executed an iterator object will be created, which is an object that has a next() method in it.

To test this we can add a method name instead of using 'Symbol' in the object, 'getEmployee' for instance. Then we can call this method with the 'invisible' next() method that we didn't define here, but that was generated for us: `console.log(company.getEmployee().next());` (Note, comment it out from the example to avoid confusion)

This however created a new iterator for every call, so it will only yield the first response every time it's called like that. So we again have to assign the result to a variable and call next on that: `const it = company.getEmployee();`

Switching back to the Symbol in the object, we can now use 'for of' on the object. This is kind of advanced JavaScript, and it lets us write our own looping logic, controlling what should be emitted. We can now also use the spread operator on the object, as that also behind the scenes looks for the iterator symbol.

#### <b>The reflect API</b>

```JS
const course = {
  title: 'Javascript - the complete guide'
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title
  }
});
```

This is an example of how the reflect API helps us work with objects, and here we've changed the toString method so instead of using the default one but our own. The regular toString() method would return [object Object] in this case, so here our method is an improvement.

Now why would we use Reflect instead of Object? There are some subtle differences. Object has been available a long time, while Reflect was introduced with ES6. If an Object method fails, it might return undefined or even fail silently. With the Reflect API you might get a better error message, or it returns true or false. As always, there is [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods) on this on MDN.

Additionally Reflect bundles all methods you need to work with objects, as it has a deleteProperty method we don't find on Object. Previously we had to use the 'delete' keyword and then the property we wanted to delete.

#### <b>The proxy API</b>

```JS
const courseHandler = {
  get(obj, propertyName) {
    console.log(propertyName); // Outputs 'title'
    return 'No access'; // returns no access for every read attempt. Correct return: obj[propertyName];
  }
};

const pCourse = new Proxy(course, courseHandler);
console.log(pCourse.title);
```

The proxy takes two arguments, the object it should proxy first and then an object containing handlers (or was it traps?) for the proxied object. The get() method on the handler is called whenever someone tries to access a property from the wrapped object. This method gets two arguments passed in, the object which the access happens and then the property name being accessed.

With that we can also use the or operator to return a value if found, if not, we can return some other message:

```JS
return obj[propertyName] || 'No value found';
```

This again is kind of advanced JavaScript, and maybe mostly useful for writing a library and then returning something else than 'undefined' if the user of the library tries to access a property that doesn't exist.

#### <b>Working with proxy traps</b>

Given we have a 'get trap' there's also a 'set trap' which is called whenever the user tries to add something to the object.

```JS
set(obj, propertyName, newValue) {
  obj[propertyName] = newValue;
}
```

The difference to getters and setters is that they are defined for a given property, get and set in proxy works for any property.

#### <b>Wrap up</b>

[More about symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)<br>
[Well known symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Well-known_symbols)<br>
[Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)<br>
[The Reflect API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)<br>
[The Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)<br>
[All Proxy API traps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#A_complete_traps_list_example)
