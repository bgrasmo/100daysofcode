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

Add 'enteredTodoText' and v-model will connect any input, form elements, selects and check boxes with a piece of data in your data method in the Vue app object. V-model will listen for every keystroke for instance in that input and update the data stored in that variable. It's called two-way binding because if you had another place in the app that would update enteredTodoText, the latest value would be shown in the input. We can see this by setting a default value in app.js for enteredTodoText as that would show when we load the page, but immediately be updated when we start typing.

Then we can use this two-way binding to clearn the input field after submitting by setting it back to an empty string.

### Going through course content for day 99:

#### <b>Outputting lists of data</b>

Will have to go through the logic and order of what happens when again. Something about the empty array being defined in data because we wanted to use it elsewhere and thus it couldn't be defined in methods.

The desired end state is that we have many list items in the unordered list. In every list item we want a paragraph and a div for the edit and delete buttons.

```HTML
<ul id="todos-list">
  <li>
    <p>{{ }}</p>
    <div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </li>
</ul>
```

We'll find out what to put in the paragraph content later. Since we should have many such list items, we want to tell Vue to create one list items per todo in the array. Vue has a special attributed for this called a directive. (Everything that starts with v- or @something is called directives.) Now we want to use the v-for directive:

```HTML
<li v-for="todo in todos">
```

The 'todos' is the name of our data property from app.js now:

```JS
data() {
    return {
      todos: [],
```

Look at how much simpler and cleaner the syntax is! I'll never write EJS again with the special opening and closing tags, having to add opening and closing curly braces and so on!

The 'flashing' of an item that happens when the page is reloaded is due to how we load Vue and is something that can be prevented, but will be dealt with later. (In another course probably, diving deeper into Vue.)

#### <b>Outputting content conditionally</b>

Another useful directive is v-if to check for some condition to device if we show the element/content or not. We can also use v-else, and that has to be added as a direct neighbour to the v-if:

```HTML
<p v-if="todos.length === 0">No todos added yet, want to add one?</p>
<ul v-else id="todos-list">
```

For this simple example the v-else is not needed, asn the paragraph with v-if won't be shown if there are no elements in the todos array.

#### <b>Updating data</b>

Instead of @sumbit used previously, we'll now use @click. I guess I missed that this is adding event listeners the first time around, but it sure looks like that is what this is. Normally in JavaScript with () after a function would indicate to execute the function immediately, without, not. But in Vue code in the HTML it doesn't matter. Also it seems like the () will be used to take input data sent to the function, and again, it won't be executed immediately by having it.

Very convenient that we get the id in the edit function.

JavaScript has a find() method which takes a function as input, and if this function returns true we've found the input we're looking for, if it returns false it means to continue looking.

```JS
const todo = this.todos.find((todoItem) => {
  return todoItem.id === todoId;
});
```

Connected to our edit button, this will now put the text into the input field for the button we clicked with the help of the two-way binding. If we change something though, we create a new todo which isn't what we want. Instead we can use the 'trick' we used in our backend code by checking if we have an id or not, and then update if we have an id.

By creating a new object updatedTodoItem we make sure that Vue definately picks up that there is a change. I guess it could be something worth looking out for later in case items don't update as we expect.

There is a gotcha with using 'this' which would be mapped to the data object, but if you use 'this' inside another function, Vue won't be able to do that for us. Instructor teaches a workaround for this, or we can just use arrow functions since they don't affect the 'this' keyword like regular functions does. (And so my code works without the workaround.)

In case it's needed at some point though:

```JS
if (this.editedTodoId) {
  const todoId = this.editedTodoId;
  const todoIndex = this.todos.findIndex(function(todoItem) {
    return todoItem.id === todoId; // instead of this.editedTodoId;
  });

  const updatedTodoItem = {
    id: this.todos[todoIndex].id,
    text: this.enteredtodoText
  };

  this.todos[todoIndex] = updatedtodoItem;
}
```

#### <b>Deleting data</b>

We will use 'filter' for this which returns a new array minus the elements that was filtered. It takes a function as an argument and filters items for which that function returns false.

```JS
deleteTodo(todoId) {
  this.todos = this.todos.filter((todoItem) => {
    return todoItem.id !== todoId;
  });
}
```

#### <b>Sending a POST request</b>

Basically copy the code from the todos.js file and put it in the saveTodo method in app.js. Minor midifications, or reordering of what happens. See code for solution.

#### <b>Loading data and managing loading states</b>

Life cycle methods or life cycle hooks is the name of the methods we've used in Vue.js, as they will be executed at some point in time.

We can now add a method, though it's not added to the methods object but after it, called created. This is a reserved name and something Vue will look for, and it will be called when our Vue app was created. This should happen right after Vue has loaded, executed and taken control of the page. another lifecycle hook that could be used is called 'mounted' and that would be called after Vue was created and it took control over the DOM, which means it added all the event listeners and so on. Created runs a little earlier, right before it took full control over the DOM.

Again, copy the code from todos, specifically the 'loadTodos' code and add it in created. With one small change at the end Vue will update the DOM:

```JS
// Instead of
const todos = responseData.todos;
// Use
this.todos = responseData.todos;  // This updates the todos array Vue is watching
```

One thing to note is that we have to add 'async' before created since we use 'await' in it, but Vue won't actually wait for that. This isn't a problem here, but it means there is a very brief period where Vue took over control, but the data isn't there yet

To handle this, we can add a loading state. We do that by adding 'isLoading: false' at the top, and then setting 'this.isLoading = true' to right before we start loading data. Then we set it to false when data has loaded, or we got an error.

Then we use that state in the HTML document to output a helpful message.

#### <b>Loading Vue differently</b>

We currently get a little flickering when loading the page, because we first download all the Vue code, then run all the Vue framwork code, then load and run our own code after the DOM has been parsed. We use the defer keyword to ensure that it works like this. To remove the flickering, remove the defer keyword from the Vue script tag. This means all the Vue code will be loaded, then the DOM parsed and then our code is executed.

#### <b>Send patch and delete requests</b>

Same as before, copy code from todos and paste it into the relevant functions. Though for edit, we paste it into the save function where we check for id to see if we update existing or create a new. Couldn't we also do it in the edit function itself, or is it because we don't make any fetch requests there?

