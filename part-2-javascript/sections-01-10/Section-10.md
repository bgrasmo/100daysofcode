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

#### <b>Binding class methods and working with 'this'</b>

