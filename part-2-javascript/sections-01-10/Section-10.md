## Section 10: Classes and object-oriented programming

## Day 51 - 2022-05-30

#### <b>What is object-oriented programming?</b>

Programming with objects! It's an approach, a way of writing and structuring your code, it's a way of thinking or reasoning about your code and planning your code. The idea behind OOP is that you work with "real-life" entities in your code. That's also how objects were described in the previous section, and further, we use this to group data together.

So OOP is all about embracing that logic, and by doing that we work almost exclusively with objects in our code as we put all our code into different objects, so different methods of objects.

An example could be an online shop where we have a list of products, and we would then build a product list component which holds all the data and in methods all the logic that is related to working with this list. Then we could have an object for working with a single object, see it's details and add the product to a shopping cart. Then again we would have a shopping cart object would would render the products in it and allow the user to order the products.

These would be linked, so that product list works with the single product and the single product works with the shopping cart.

#### <b>Getting started with OOP code</b>

Extract the instructors code. It is not in my Github for this course since the instructor doesn't share it publically but gives direct download link only available if you've purchased the course.

Created an object literal and put some render logic in it, but that is not the way. There is no reusability here, which is an important point.

#### <b>Classes and instances</b>

Objects are what we work with in the code. Classes are blueprints for objects (a theoretical definition) that allow us to easily recreate objects based on these blueprints. These obejcts are called instances of classes as it's the class that define what they look like (what properties and methods they have). This is an alternative to using object literals, and makes creating multiple similar objects quicker and easier.

When creating a class, what's called a property in objects is called a field, because it's not the concrete object we work with, it's just the blueprint for the object. Also default values are added with the equal sign and we end lines with semicolon and not comma:

```JS
class Product {
  title = 'DEFAULT';
  imageUrl;
  description;
  price;
}

console.log(new Product()); // Shows an object created from the blueprint
```

This is a little bit different from the web dev course where we didn't set fields at all, we just had the constructor method:

#### <b>The constructor method</b>

The constructor method is called by JavaScript for us when create an object from a blueprint with the 'new' keyword. This allows us to set arguments when we create a new object, and we can easily create multiple similiar-looking objects with different data. And they are pretty much guaranteed to always look the same, as it's impossible for us to mistype properties or ommit them, as we could have with object literals. Here they are all defined once in one place.

```JS
class Product {
  title = 'DEFAULT';
  imageUrl;
  description;
  price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

const productList = {
  products: [
    new Product(
      'A pillow',
      'link to a pillow image',
      'A soft pillow',
      19.99
    ),
    new Product(
      'A carpet',
      'link to a carpet image',
      'A squared carpet',
      199.99
    ),
  ],
}
```

#### <b>Fields vs properties</b>

Given the object above, `title = 'DEFAULT';` is a (public) class field while `this.title = title;` is a (public) class property. Or another way to say it, fields define properties for classes. The constructor which is the only method in this object is a (public) class method.

Since we overwrite all the fields in the class with the contructor method, we can actually remove them all. And it doesn't make sense to first define the fields and then immediately overwrite them with the constructor. As I thought, they will become important when we have fields we don't overwrite, but more on that later.

#### <b>Using and connecting multiple classes</b>

Convert the productList object to a class. What's not shown in my example is the render method but that is not too important, it's just about creating an unordered list and looping through the list of products to create the list items. What's changed now though is that we can't call it like before: `productList.render();`

We will have to instantiate an object based on the class first, then we can call the render method on that object:

```JS
const productList = new ProductList();
productList.render();
```

However, now the product list is responsible for rendering this, but as was said in the introduction, we want the product to do this. (And thus that productList should call product somehow.)

Create a new class called ProductItem and add the constructor method. It will take in the same information as the product class, so we can just send that object to it.

```JS
class ProductItem {
  constructor(product) {
    this.product = product;
  }
}
```

Move the render method here, and now a small issue. This method doesn't know what element to append the list to. There are two solutions, either take in the element in the render method and append to that, or return the created element so what called the method can append it.

## Day 52 - 2022-05-31

#### <b>Binding class methods and working with 'this'</b>

In the render method we have some innerHTML we output, and there's a button in it. We can access that button with query selector, since this code will be run once for each product there won't be a problem that the final result is many products with many buttons. When the code runs we are local to one button, and so that will be selected.

```JS
const addCartbutton = prodEl.querySelector('button');
addCartbutton.addEventListener('click', this.addToCart);
```

In the addToCart method we can now use an arrow function, otherwise 'this' would be bound to the button since that's what executed the function through the event listener, not us. So it's bound to the source of the event, which again is the button.

```JS
addToCart() {
  console.log('Adding product to shopping cart');
  console.log(this);
}
```

Results in `<button>Add to cart</button>` being logged in the console.

Or we can use bind with the existing 'this' like this:

```JS
addCartbutton.addEventListener('click', this.addToCart.bind(this));
```

#### <b>Adding a shopping cart and a shop class</b>

Add a class for the shopping cart, similar logic to product item with render method containing some innerHTML. Though change both these classes to return the element instead. Then create a new shop class which sets up the render hook (attaches to 'app') calls the shopping cart and product item classes and stores what they return, then appends that to 'app'. Then create the shop object with `const shop = new Shop();` and call the render method on it to set up the entire page.

#### <b>Communicating can be challenging</b>

So far each class is kind of standalone and they don't really interact much with each other. Now the explanation of why this was hard is hard to write down so you'll have to trust me on it. The problem boils down to the shopping cart class, and how that can't update/re-render other things it's not aware of, that exist in other classes.

#### <b>Static methods and properties</b>

Static fields/properties/methods are defined with the 'static' keyword. It is (only) accessible directly on the class itself, without instantiation. (So not an instance created with the 'new' keyword.) This is typically used in helper classes, for global configuration and things like that.

Instance fields/properties/methods are defined without the 'static' keyword and is only accessible on instances, in other words on objects based on a class. This is typically used for core re-usable logic.

Create a new class called 'App' and move the logic for starting the app functionality by creating the shop in there, in a static method called init. Now instead of starting the app with new Shop() and then shop.render() we can just call `App.init();`

To fix our shopping cart problem then, in the Shop class we store the new ShoppingCart() in a property instead of a field. Then we can create a cart property in the App class which refers to shop.cart.

The reason for doing that is that we can now add a static method in App which indirectly can call the addProduct() method in the shoppingcart, since we have that reference as a property.

Then finally we call App.addProductToCart(this.product); in addToCart method in ProductItem class. Phew. I think I'll have to draw that flow on paper to fully understand it.

Good practice would also be to add `static cart;` to the App class to make it clear we have a static cart property there. We refer to it with 'this.cart' and if you use 'this' in a static method it always refers to the class itself and it's helpful to show that with the static property, or field I guess it should be.

#### <b>When to use classes</b>

Object literals are still useful and should be used for general data grouping, with objects you only create once. They are also quick and easy to create with little overhead performance wise.

Classes are beneficial when you have some logic you want to reuse or if you need to create multiple instances of the same object. There is a little overhead initially in writing the class definition, but then it's easy to duplicate objects after that.

#### <b>Getters and setters</b>

Added to show how they can be utilized, by for instance adding a reduce function to get a total sum from the items in the cart.

## Day 53 - 2022-06-01

#### <b>Inheritance</b>

We have a couple of classes now, and they actually have on ething in common: They all have a render method. While the method does a few different things in the various classes, some things are also always the same. For this we have inheritance, and the idea is that we have a base class that contains some properties and methods we need in other classes, that they can somehow use or inherit.

Start by adding a new class called component and add the common render logic to it. Then to make that logic available in another class, add 'extends Component' after the name where the class is defined. In other words, this makes the logic we wrote in Component available in the class we extended, in addition to the logic already there of course. Now we can us logic from Component in the extended class, as if it was written there.

Not sure I got all of this, but it seems if the shoppincart class doesn't have a constructor, the constructor in component will be called. And we want it to be called, though now it's called without arguments. If we add a constructor to shoppingcart, that will be called, and constructor in component won't be called. And that is not what we want. To make both be called, in the constructor in shoppincart, execute super(). That will execute the constructor in component as well.

So the flow now is,<br>
`App.init();`<br>
-> `const shop = new Shop(); shop.render();`<br>
-> `this.cart = new ShoppingCart('app');`<br>
-> `constructor(renderHookId) { super(renderHookId); }`<br>
-> `class Component { constructor(renderHookId) { this.hookId = renderHookId; }`

When you add super to your constructor, make sure you don't rely on any field in that super constructor method. That will become important later. If you plan on adding fields in your constructor (you know with this.something = somethingElse;) then you have to do that after you call super. So before you use 'this' in your constructor, you have to call super first.

#### <b>Using inheritance everywhere</b>

Some render issue explained that I didn't follow. Somehow we try to append some items before they have been added to the DOM, but it was in no way, shape or form clear how that happened. Rushed explanation of something that probably feels trivial, I guess.

#### <b>Overriding methods and the super constructor</b>

We're first creating the new items and then calling render manually. That is a bit redundant, and render should be called as part of the creation process instead.

Remove render from all the places where it's not needed, and then in the component class call this.render() in the constructor. Then add the empty method render() to that class as well, as a visual clue why we're calling it there. What will happen now is that render() will be called after everything is fully initialized, and so it's the render method in the sub-class that will be run. It's because of 'this' again, because it always refers to what called it. When we create a new object with 'new' here, 'this' inside that constructor is set to that object.

#### <b>Super construction execution order and 'this'</b>

The fields in product list gets created automatically when the constructor gets called, but only after the parent constructor called with super has executed. And as was mentioned before, you can't use 'this' before super has been executed. So there's a bit of a conondrum here. By initializing the prodcts as an empty array and adding the field definitions to the constructor after super, the order is still wrong. (We call render before we have any values.) If we move super to below the value initializion, it fails since we're not allowed to use this before super has executed.

It's a common case that you want to do something, but the data you need for that is not there yet as they are likely not hardcoded as done here but fetched from a database. Or in other words, it's not loaded when we try to render.

A way to solve that is to render the empty page first and then create a new renderProducts method that will render the products when they have loaded. A simulated example of course.

Since we have this problem in product item as well, add a second argument 'shouldRender = true' to Component and send in false when it shouldn't try to render automatically or at this point in time. Then we call render ourselves when we know the products have been set.

## Day 54 - 2022-06-02

#### <b>Different ways of adding methods</b>

Adding an event listener which calls a function that uses 'this' gives us again a small challenge we need to fix. One way of doing it is actually to just define the function as before (no need to define it as an arrow function) but change the way it's called, though without using bind. Simply by changing the function argument to the event listener to an arrow function call to the pre-defined function works!

```JS
orderbutton.addEventListener('click', () => this.orderProducts());
```

If we were to define the function as an arrow function, because of super and render, we again have to tell super not to render and then define the arrow function in the constructor and then call render afterwards.

Something about 'it' that will be called before a property is created based on that field, because of super. The fields are translated to properties after the constructor ran.

And it seems to me we're back to having to call render manually a lot.

#### <b>Private fields, properties and methods</b>

Public: Accessible outside the class / object. What we've done so far really.

Private: Only accessible inside the class / object. Logic we need to make the class or object work, which probably won't make much sense to expose to be used outside the object.

To set that something should be private to the class / object, add a # symbol in front of it. On doing that, other's can't access this from elsewhere in the code, so they can't try to add values to an array in a class if that's only meant for internal use. You will then also have to set the # symbol when accessing it.

Now of course our base class doesn't have access to products anymore, so yet again we have to say that super shouldn't render, but that we'll do it ourselves and I feel the entire point of the super is gone. Yes, finally instructor admits that as well.

#### <b>Pseudo private properties</b>

Actual private properties are quite new in JavaScript so we might come accross pseudo private properties in existing codebases. We actually have in this course in the 'objects' section, and the getters and setters. There we added a property with _ in front, to indicate that it should only be used internally in the object.

#### <b>The instanceof operator</b>

Create a new object, create a new object based on that. When you then type in the object name of the last object in dev tools, the object it is based on will be shown before the object content. There is also a built in operator, instanceof, that lets us check if some object is based on another object (blueprint):

```JS
class Person {
  name = 'Joe';
}

const first = new Person();

console.log(first instanceof Person);
```

This returns true if 'first' is based on 'Person'.

Buttons in frontend JavaScript code is based on HTMLButtonElement as can be checked with instanceof when you've selected a button, and it's also based on HTMLElement.

Not sure yet what value knowing this has.

#### <b>The built-in object class</b>

Object is a built in base class, and you can create a new, empty object built on it: `const obj = new Object();` Not too useful right now, we'll learn more about it later.

#### <b>Understanding object descriptors</b>

Every property or method you add to an object has a descriptor. It can be accessed using the build in Object, and calling the method getOwnPropertyDescriptor with the object and property you want to look at as input. An alternative is to call getOwnPropertyDescriptor<b>s</b> and just give the object as argument to see all descriptors. What you get back in both instances are objects containing the descriptors.

```JS
const person = {name: 'Joe', greet() { console.log('Hello ' + this.name)}}

Object.getOwnPropertyDescriptor(person, 'name');

Object.getOwnPropertyDescriptors(person);
```

Of interest are the properties 'configurable', 'enumerable' and 'writable' which are all set to true here. Configurable means we can for instance delete the property, writable means we can assign a new value to the property, and enumerable means it appears in a 'for in' loop. The 'value' property is also of interest, since it holds the current value of this property.

In case you want to 'lock-down' some values so they can't be deleted/changed or appear in for in loops that can be done with 'Object.defineProperty();'. It needs the object, the property and then an object with the new configuration as input. Every value we don't set gets 'false' now, so we need to remember value as well, otherwise it would be set to false.

```JS
Object.defineProperty(person, 'name', {
  configurable: true,
  enumerable: true,
  value: person.name,
  writable: false
});
```

This returns the person object. If we now try to change the name with `person.name = 'Schmoe';` for instance, 'Schmoe' will be returned, but looking at 'person.name' again, nothing has changed, without us receiving any errors.

If we try to change the value again now with Object.defineProperty() however, that will actually fail and return an error.

To finish up, MDN documentation on [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
