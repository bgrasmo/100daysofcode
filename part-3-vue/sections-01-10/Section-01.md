## Section 1: Introduction

## Day 68 - 2022-06-16

#### <b>Introduction</b>

Some repeat of what was taught in the web dev course so not many notes here. This course is now for Vue 3, though the Vue 2 material is attached as downloadables.

Vue.js is a complete component-based UI framework.

In regular JavaScript we use an imperative approach where we define every single step which should be executed by the browser. Get access to the button, get access to the input element, get access to the list, and so on. With Vue the approach is different, there we define the desired end result and the data we need, and then Vue figures out what needs to be created, added or changed in the DOM as well as when this needs to be done. To do that we need to create a Vue app which takes control of our HTML document.

To create a vue app we use the Vue object we get from the import and call the createApp method on it. It takes an object as input, which is the configuration for the Vue app.

```JS
Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: ''
    };
  }
})
```

Now we can connect the data to the input field with a directive called the v-model attribute:

```HTML
<input type="text" id="goal" v-model="enteredValue">
```

To get the entered value and add it to goals we need to expand the createApp object with methods, functions, which can be called from inside the HTML document.

```JS
Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: ''
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue);
    }
  }
})
```

We then need to set that this method should be called when the button is clicked with another directive, called v-on. We need to specify the event to listen for, 'click' here, and then the method that should be called.

```HTML
<button v-on:click="addGoal">Add goal</button>
```

Now we want to output the goals in a list and here we use v-for to loop through the goals array for as many times as needed:

```HTML
<ul>
  <li v-for="goal in goals">{{ goal }}</li>
</ul>
```

Now this doesn't work yet because we haven't told Vue where on the page it should work. To do that we add .mount to the createApp method and pass in a string containing a CSS selector, selecting one element in the DOM. We've conventiently wrapped most of our HTML code in the body in a div with an id of app, so we'll select that.

```JS
Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: ''
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue);
    }
  }
}).mount('#app');
```

And then it works. To clear the input after we've hit enter, we can call `this.enteredValue = '';` after we've pushed it into the array, and Vue will clear it for us.
