## Section 36: Working with frontend JavaScript frameworks and introducing Vue.js

## Day 42 - 2022-05-21

### Going through course content for day 98:

#### <b>Why would you use frontend JavaScript frameworks?</b>

Writing your own entire solution would be too complex, cumbersone and error prone. We would end up writing imperative code, which is step by step instructions. That would be code to select the element, then add an event listener, then add the functions to act on the events and so on and so forth. Or in other words if we have to describe the user interface and the changes that should be performed in such a step by step mapper, it would be easy to forget a step or even mix up the order of steps making for a bad solution.

Third-party solutions are give us a declarative approach where we define our interface and the different states we want to have, and when these states should change and switch. Third-party solutions are also 'battle-tested' by having thousands of users, as oposed to us trying to think of everything ourselves.

#### <b>React vs Vue vs Angular - which one should you use?</b>

* React:
  1. Extremely popular.
  1. A bit more complex to learn, introduces custom JS syntax.
  1. Requires solid JavaScript knowledge.
* Vue:
  1. Very popular.
  1. Very easy to learn, basically enhance existing HTML / JS code with Vue-specific features.
  1. Requires basic JavaScript knowledge.
* Angular:
  1. Very popular.
  1. A bit more complex to learn, uses typescript.
  1. Requires solid JavaScript knowledge

#### <b>Getting started with Vue</b>

Extract the instructors example site, which is the decoupled frontend from the previous lecture.

Remove the todos script tag in index.html, but keep the todos.js file to see how much easier this is to implement with Vue.

Go to the official [Vue.js](https://vuejs.org) site and click 'get started' for documentation on exactly that. Here the CDN approach will be used. The Vute site has changed since the tutorial was created so there is no 'installation' page like shown anymore. Instead I found you have to see the quick-start guide, and then 'without build tools' to see the script line to include. I found:

```HTML
<script src="https://unpkg.com/vue@3"></script>
```

Add that instead of the todos.js file that was removed in index.html. We'll want to add the defer keyword to it. Now add the familiar 'app.js' file to the project, but to the scripts folder this time. We now have to include this file in our index, after the Vue include.

In app.js, add a constant named whatever you like, since we're working with a todo app here, we'll call it that. The convention is to start with a capital letter for this, though it's not required. What is required however, is creating a data method in the object, as Vue will look for this. This again is required to return an object.

```JS
const TodosApp = {
  data() {
    return {
      newTodo: 'Learn Vue.js!'
    };
  }
};
```

Then after this we use a Vue object provided to us by the Vue framework and call the createApp method on that. To this method again we pass our todo-app object, and on the result of that we call the 'mount' method. This method in return wants a CSS selector, typically an ID selector, which defines what Vue should work on. In our case from the main element and down.

The HTML we select with Vue:
```HTML
    <main id="todos-app">
      <section id="todo-management">
        <form>
          <label for="text">Todo text</label>
          <input type="text" id="text" name="text" required />
          <button>Save</button>
        </form>
      </section>
      <section id="todos">
        <ul id="todos-list">
        </ul>
      </section>
    </main>
```

Then the JavaScript selecting that with Vue:

```JS
Vue.createApp(TodosApp).mount('#todos-app');
```

Now we can add for instance an h2 element right after main, where we add double curly braces to inject something from Vue:

```HTML
<h2>{{ newTodo }}</h2>
```

That output there happens to be the 'newTodo' we returned in data in the TodosApp constant. How about that? Or in other words, about the same EJS did with the '<% %>' we put in the code. It replaced those special tags with some content.

This is called data binding or string interpolation. Some special text is being replaced by something else by the engine (EJS) or framework (Vue) we use. We bind some data to displace in our HTML document. For our Vue example this happens in the browser, and not on the server like for EJS.

This shows the declarative approach. We don't tell Vue to select the h2 element and then set the text sontent. Instead we have the desired end state which is the h2 element with some content inside it and we set up what content that should be, and then Vue figured out how to get there.

#### <b>Listening to events and updating data and the DOM with Vue</b>

Let's see how Vue handles listening to the submission of the form, preventing the default action and then taking the input text and showing on the page. To do that we add a property called methods to our TodosApp object, and in there we can add methods we want to execute with the help of Vue. This is typically for when certain events occur.

Using 'this' in a method in 'methods' will connect that keyword to the data object instead. 'this' can be bound to all kinds of things, but Vue here binds it to the object returned from data(). Data() is our way of managing data that should be managed and output by Vue. Often you want to manipulate this data from different places in your app, like we just did from inside the saveTodo method.

Without Vue we would have to select the form element, add an event listener, and then in the function called when that event triggered, prevented the default action and so on.

With Vue we use the @ symbol to say we want to listen for an event, and the word afterwards specifies the event we want to listen for. So here @submit is what we want, and then we add what function should be called on that event:

```HTML
<form @submit="saveTodo">
```

#### <b>Introducing two-way binding</b>

