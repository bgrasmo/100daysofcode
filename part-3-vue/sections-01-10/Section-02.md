## Section 2: Basics and core concepts - DOM interaction with Vue

## Day 68 - 2022-06-16

#### <b>Creating and connecting Vue app instances</b>

We kinda already did this in the introduction, but let's do it slightly differently. Call createApp on the global Vue object available when Vue has been imported, and store the result of that. Then on that result, we call the mount method and specify the element we want Vue to control.

We can let Vue control whatever part of the page we want, only a section, a list or a paragraph if we want. Whatever Vue controls though, it will also controll all child elements of that element.

```HTML
<body>
  <header>
    <h1>Vue course goals</h1>
  </header>
  <section id="user-goal"></section>
</body>
```

```JS
const app = Vue.createApp({
  data() {
    return {
      courseGoal: 'Finish the course and learn Vue'
    };
  }
});

app.mount('#user-goal');
```

Data here wants a function as a value so we could simply have `data: function() {}` but we'll use the method shorthand: `data() {}`. This means the values stored in the data property is a function. This function will always have to return an object. In this object we can set up any key-value pair we want.

Using Vue2, connect the app either like this:

```JS
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});
```

or very much more advanced like this:

```JS
import App from './App.vue';

new Vue({
  render: h => h(App)
}).$mount('#app');
```

## Day 69 - 2022-06-17

#### <b>Interpolation and data binding</b>

Use the 'mustache' syntax (double curly braces) to have Vue replace something in the HTML document with values from JavaScript. It's also called interpolation. This can either be simple values or it can be function calls. Functions can either be 'pointed at' or they can be 'executed' in which we can pass in parameters to the function.

```HTML
<p>{{ courseGoal }}</p>
```

#### <b>Binding attributes with v-bind directive</b>

The mustache syntax only works for textContent, so to say. To have a dynamic link element use `v-bind:href="linkAddress"` on the anchor tag:

```HTML
<a v-bind:href="linkAddress">Go to {{ linkAddress }}</a>
```

The v-bind directive is used so much it can be shortened like this: `:href="linkAddress"`. This directive ca be used for any HTML property. (As far as I can tell.)

#### <b>Understanding 'methods' in Vue</b>

'Methods' allows you to define functions which should execute when something happens. It's an object where we define our functions.

```JS
methods: {
  outputGoal() {
    const randomNumber = Math.random();
    if (randumNumver < 0.5) {
      return 'Learn Vue';
    } else {
      return 'Learn JavaScript';
    }
  }
}
```

```HTML
<p>{{ outputGoal }}</p>
```

#### <b>Working with 'data' in Vue apps</b>

Remember 'this'. If a method references a value stored in 'data', it will have to be prefixed with 'this.' to work. That's because Vue takes all the data you return in the data method and merges it into the global Vue instance object.

#### <b>Output 'raw' HTML with the v-html directive</b>

If you have some HTML code you want output on the page you can't use the mustache syntax, as everything is output as text with that as a security measure.

Instead use v-html on the element you want, but interestingly inside the tag, not between the p tags for instance: `<p v-html="someHtmlContent"></p>`.

#### <b>Understanding event binding</b>

Use v-on:'event' to react to an event. Like v-bind it is uses so much it can be shortened to just @'event'. So to listen for click events it would be `@click="functionCall"`. Anything that can be added as an eventlistener can be called like this.

The function being called here can obviously update some data in the data object, and if we have that data on the page somewhere, with the mustache syntax, it will be updated when we call that click function. So:

#### <b>Events and methods</b>

```JS
data() {
  return {
    counter: 0
  }
},
methods: {
  functionCall(number) {
    if (number) {
      this.counter += +number;
    } else {
      this.counter++;
    }
  }
}
```

```HTML
<button @click="functionCall">Add One</button>
<button @click="functionCall(5)">Add Five</button>
<p>Result of button click: {{ counter }}</p>
```

#### <b>Using the native event object</b>

```
<input type="text" @input="setName">
<p>The set name: {{ name }}</p>

methods: {
  setName(event) {
    this.name = event.target.value;
  }
}
```

If we need to pass an argument from @input, and we also need the event object, we can send it in with $event as argument to the setName function.

#### <b>Exploring event modifiers</b>

To prevent the default browser action which is to submit a form for instance, we can as always call `event.preventDefault();` at the top of the function.

Another way is to use a Vue event modifier, which for the prevent action above is added like this in the HTML document instead of the JavaScript code: `<form @submit.prevent="submitForm"`. '.stop' can be used to stop propagation. (Interestingly, propagation was not explained here.)

Event modifiers can also be added to change when the event occurs, for instance it should only activate when the right mouse button is clicked: `<button @click.right="rightMenu">Try me</button>`. '.left' is the default and doesn't need to be specified.

When listening for key events, we can use these modifiers to specify for instance 'enter' so it only executes when the enter key is pressed. The same can be done for ctrl, shift, page-down and so on: `@keyup.enter="confirmChoice"`. Remember that you can have multiple event listeners on the same element so an input field can be submitted both on clicking a button and pressing enter.

#### <b>Locking content with v-once</b>

If some element should only be evaluated once, use the v-once directive: `<p v-once>Starting counter: {{ counter }}</p>`.

#### <b>Data binding + event binding = two-way binding</b>

Instead of updating some element 'manually' with function calls and multiple variables and what not, we can instead use v-model. (It's basically a shortcut for `v-bind:value and v-on:input`). V-model wants a variable in the data property as input:

```
<h2>Currently entered value: {{ theValue }}</h2> 
<input type="text" v-model="theValue">
```

This is called two-way binding, because it both listens for input, as well as outputting at the same time.

#### <b>Methods used for data binding - how it works</b>

Methods are not the best solution for outputting some dynamically calculated value, because Vue doesn't which one should actually be updated, so it updates every single one of them. Or in other words, if you have multiple functions on the page, they will all be executed whenever one of them is executed, say by reacting to a button click.

#### <b>Introducing computed properties</b>

'computed' is like methods, with the exception that Vue will be aware of their dependencies and only execute them when needed, so if one of their dependencies changed.

```JS
const app = Vue.createApp({
  data() {
    return {
      name: ''
    }
  },
  computed: {
    fullName() {
      console.log('fullName function called');
      if (this.name === '') return '';
      return this.name + ' ' + 'Schmoe';
    }
  },
  methods: {

  }
});
```

```HTML
<p>Your name: {{ fullName }}</p>
```

If fullName had been defined in methods, it would've been called everything something else on the page updated. Now it don't. Notice how we don't add parenthesis after the function name in the HTML document.

## Day 70 - 2022-06-18

#### <b>Working with watchers</b>

A watcher is a function you can tell Vue to execute whenever one of its dependencies changed. Which sounds awefully similar to computed. It should however be set up with a similar name as a data or computed property, and it will be executed whenever that property changes:

```JS
const app = Vue.createApp({
  data() {
    return {
      name: '',
      fullName: ''
    }
  },
  watch: {
    name(value) {
      this.fullName = value + ' ' + 'Schmoe';
    }
  },
  computed: {},
  methods: {}
});
```

Methods in watch recieve two arguments, the new value and the previous value if you want to compare the two.

The problem with using watchers instead of computes properties is if we have a property with more than one dependency. So if we have one for firstName and one for lastName for instance, we need two watchers instead of just one with computed property.

Watchers should instead be used if we want to react to some threshold, say if a counter exceeds some given number. Then we can send an http request, we can set a timer, or things like that.

#### <b>Methods vs computes vs watch</b>

|Methods|Computed|Watch|
|-------|--------|-----|
|Use with event binding OR data binding|Use with data binding|Not used directly in template|
|Data binding, method is executed for every re-render cycle of the component|Only re-evaluated if one of their 'usage values' changed|Allows you to run code in reaction to some changed data|
|Use for events or data that really needs to be re-evaluated all the time|Use for data that depends on other data|Use for any non-data update you want to make|

Watch will probably be used the least, will methods will be used the most with event binding and computed properties second for outputting data.

#### <b>Dynamic styling with inline styles</b>

For style and for class, when bound dynamically, Vue supports a special syntax where you can have an object where you can for instance use a ternary expression:

```HTML
<div
  class="demo"
  :style="{borderColor: boxASelected ? 'red' : '#ccc'}"
  @click="boxSelected('A')"
></div>
```

One disadvantage with inline styles is that they override all other styles. Sometimes that is what you want though, but use sparingly.

#### <b>Adding CSS classes dynamically</b>

As style can be bound dynamically, so can class. It can have a string as input, in which we need to add it like this: `:class="'demo'"` or without the string quotes to check a variable, or as for the style example above, a ternary expression

```HTML
<div
  :class="boxASelected ? 'demo active' : 'demo'"
  @click="boxSelected('A')"
></div>
```

However, a better way to do this with Vue is to pass in an object as with style, which lets us set a key-value pair where the key is your css class and value is true or false, or a truthy or falsy result, indicating if the class should be added or not:

```HTML
<div
  :class="{demo: true, active: boxASelected}"
  @click="boxSelected('A')"
></div>
```

In this example, the demo class is always set so we don't need to have it in the dynamic object. We can set it as normal with class= and then have the dynamic object in addition to it:

```HTML
<div
  class="demo"
  :class="{active: boxASelected}"
  @click="boxSelected('A')"
></div>
```

A toggle trick. Instead of hardcoding a value to be either true or false with if checks, set the value to the oposite:

```JS
methods: {
  boxSelected(box) {
    if (box === 'A') this.boxASelected = !this.boxASelected;
    if (box === 'B') this.boxBSelected = !this.boxBSelected;
    if (box === 'C') this.boxCSelected = !this.boxCSelected;
  }
}
```

#### <b>Classes and computed properties</b>

Having the simple class logic above in HTML is ok, but it can also be moved to a computed property:

```JS
computed: {
  boxAClasses() {
    return { active: this.boxASelected };
  }
}
```

And then change the HTML to use the computed property instead:

```HTML
<div
  class="demo"
  :class="boxAClasses"
  @click="boxSelected('A')"
></div>
```

This is of course optional and not needed in this simple example, but can be useful perhaps with lots of classes and with complex logic to determine which classes should be active or not.

#### <b>Dynamic classes - array syntax</b>

Another way to achieve all of the above is to use an array instead. Typically for the situation with some classes always present combined with some dynamic ones:

```HTML
<div
  :class="['demo', {active: boxASelected}]"
  @click="boxSelected('A')"
></div>
```
