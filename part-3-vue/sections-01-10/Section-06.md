## Section 6: Introducing Vue components

## Day 74 - 2022-06-22

#### <b>Introducing components</b>

```JS
const app = Vue.createApp({
  //...
});

app.component('friend-contact', {
  template: `<p>App component template`,
  data() {
      return { detailsAreVisible: false};
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    }
  }
});

app.mount('#app');
```

We should always use a dash in component name to avoid conflict with built in HTML elements. This needs a config object as well, as it is essentially just another Vue app, and it then also needs the template. We'll learn about a better way to create these templates later.

Now we can use this component in the app as a normal HTML element.

```HTML
<section id="app">
  <ul>
    <friend-contact></friend-contact>
  </ul>
</section>
```
