## Section 5: Vue - behind the scenes

## Day 73 - 2022-06-21

#### <b>An introduction to Vues reactivity</b>

Proxies are used behind the scenes to make Vue reactive. JavaScript by default is not reactive. Example given where we define one variable, then another which is set equal to the first one, and then we change the first variable. The second variable is not updated.

```JS
const data = {
  message: 'Hello!',
  longMessage: 'Hello, world!'
};

const handler = {
  set(target, key, value) {
    console.log(target);
    console.log(key);
    console.log(value);
    if (key === 'message') {
      target.longMessage = value + ' World!';
    }
    target.message = value;
  }
};

const proxy = new Proxy(data, handler);

proxy.message = 'Hello!!!!';

console.log(proxy.longMessage);
```

This set 'trap' is triggered whenever a property is set to a new value on the proxy. We can use this to change the 'longMessage' whenever 'message' is changed. Or in other words, we've built our own reactive system for tracking one property and updating another property when the first property changes.

Very simplified this is what Vue does under the hood, when tracking changes in all the data properties.

#### <b>One app vs multiple apps</b>

Vue.createApp can be used to create multiple apps, with their respective objects stored in different constants and bound to different parts of the page. These will then be 'standalone', there is no connection between them.

#### <b>Understanding templates</b>

By mounting the app to a certain place in the DOM, in the HTML document, that part becomes the template of the Vue app.

A template can also be added to the Vue app configuration by specifying the 'template' property:

```JS
const app = Vue.createApp({
  template: `
    <p>{{ favoriteMeal }}</p>
  `,
  data() {
    return {
      favoriteMeal: 'hamBurger'
    };
  }
});

app.mount('#app');
```

It still has to be mounted, otherwise Vue wouldn't know where on the page to output this.

Not too relevant yet, we'll get back to it.

#### <b>Working with refs</b>

The way we've fetched input so far has been to listen all the time, for every keystroke. Instead of doing that, Vue has a way so we can get the values just when we need them instead.

```HTML
<!-- The 'old' way -->
<input type="text" @input="saveInput">

<!-- The new way with refs-->
<input type="text" ref="userText">
```

This attribute can be added to any HTML element, so it's not just restricted to input fields.

To get the value, use $refs which is an object of simple key-value pairs where the key is the ref identifier we set up in the template.

```JS
methods: {
  saveInput(event) {
    this.currentUserInput = event.target.value;
  },
  setText() {
    // this.message = this.currentUserInput;
    this.message = this.$refs.userText.value;
  }
}
```

`$refs.userText` will contain the entire element, so .value is needed to get the input-value we're after. And this way we don't have to log every keystroke to get the result we want.

#### <b>How Vue updates the DOM</b>

| Vue instance                                                            | Browser DOM                                                            |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Stores data, computed properties, methods                               | Vue-controlled template is rendered in the DOM                         |
| title: 'Hello',                                                         | `<h2>Hello</h2>`                                                       |
| text: 'Some text'                                                       | `<p>Some text</p>`                                                     |
| Data and computes properties may change, for instance due to user input | Updates should be reflected, but the entire page should not be updated |

As for the last point, how can that be achieved? One possible solution would be to compare old DOM values with new ones and only update where there is a difference. That's not done though, because reading the entire DOM which the browser renders all the time would be too slow and performance intensive.

Enter the virtual DOM, which is a copy of the entire DOM managed entirely in JavaScript in memory. It is a set of objects maybe looking something like this:

```JS
{el: 'h2', child: 'Hello'}
```

When data changes, Vue creates a new virtual DOM and compares the two and then only the difference is written to the real DOM. Doing this in memory is more efficient than working with the real DOM which is rendered on the screen.

Though this is again a simplification and Vue has performance optimizations in place so that it doesn't create new virtual DOMs all the time.

#### <b>Vue app lifecycle theory</b>

The Vue instance obviously starts its lifecycle when it is created and mounted to the DOM. Then, when it starts creating the app actually and bringing something onto the screen, comes a couple of lifecycle phases which are reflected in methods we can use to run code at certain points of time.

The first lifecycle phase is actually `beforeCreate`, followed by `created`. The first method is called before the app is fully initialized, while the second is called after. After created we still have nothing on the screen and Vue is only aware of the data properties and the general configuration.

Then the template is compiled, and that means all the placeholders are removed and replaced with actual values.

Then the next lifecycle phase is `beforeMount`. This is just before something will be shown on the screen.

The lifecycle phase after that is 'mounted' which means we see something on the screen.

Now when data changes, the lifecycle phase is `beforeUpdate` and then `updated` afterwards.

A vue app can also be unmounted, which means all its content will be removed from the screen. The lifecycle phases for when this happens is `beforeUnmount` and `unmounted`.

#### <b>Vue app lifecycle practice</b>

```JS
const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: '',
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      // this.message = this.currentUserInput;
      this.message = this.$refs.userText.value;
    },
  },
  beforeCreate() {
    console.log('beforeCreate ran');
  },
  created() {
    console.log('created ran');
  },
  beforeMount() {
    console.log('beforeMount ran');
  },
  mounted() {
    console.log('mounted ran');
  },
  beforeUpdate() {
    console.log('beforeUpdate ran');
  },
  updated() {
    console.log('updated ran');
  },
  beforeUnmount() {
    console.log('beforeUnmount ran');
  },
  unmounted() {
    console.log('unmounted ran');
  },
});

app.mount('#app');

setTimeout(() => {
  app.unmount();
}, 3000);
```

We can find beforeCreate in sources in dev tools, and set a breakpoint so we halt rendering before Vue is fully initialized.

We don't have a usecase for unmount yet, but will learn that later.
