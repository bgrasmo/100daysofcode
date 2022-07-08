## Section 19: The composition API - replacing the options API

## Day 89 - 2022-07-07

#### <b>The composition API</b>

This is optional. If using it, how we write the JavaScript in components will change. It was introduced because we <b>might</b> encounter two issues when building bigger Vue apps:
* Code that belongs together logically is split up across multiple options, like data, methods and computed. Or in other words, we might have both searching and sorting in data, then again in methods and then again in computed which can make it a little harder to have an easy overview of what to change and where.
* Reusing logic across components can be tricky and cumbersome.

So instead of splitting this (with the options API?) we can bundle it together with the composition API and a setup method.

#### <b>Replacing data() with ref</b>

To start we need to import ref from Vue, and then execute it as a function in setup. It does all of the things, like update the DOM, watch for changes and so on.

The 'setup' method is executed very early, so before components are fully initialized and so on, so we don't have access to everything in 'this' as we're used to, so we store the result from ref in a variable. We then have to return in an object the things we want to expose.

```JS
import { ref } from 'vue';

export default {
  setup() {
    const uName = ref('Joe');

    return { userName: uName };
  }
}
```

For this example we don't really need ref, but ref make this a 'reactive' value so the DOM updates if the value updates. To do this updating, we have to access the value property on the object that was crated by ref: `uName.value = 'Schmoe';` We don't have to use value with the mustache syntax, as Vue will automatically find it and use it if we just reference `userName`.

An alternative syntax to `export default` and `setup() {}` above is provided by Vue: `<script setup>...</script>`. Then jjst the import is needed and code can be written directly after the import. Se [documentation](https://vuejs.org/api/sfc-script-setup.html) for more information.

#### <b>Building reactive objects</b>

Instead of creating multiple refs, we can create an object:

```JS
const user = ref({
  name: 'Joe',
  age: 30
});

setTimeout(() => {
  user.value.name = 'Schmoe';
  user.value.age = 31;
}, 2000);

return { user: user };
```

With this example we have a reactive object, but we now need to access user.name and user.age with the mustache syntax to show these values.

However, for objects like this there is a better alternative than ref: `reactive`. Ref works with anything but reactive only works with objects. Reactive doesn't wrap the object the same we with an extra object (value), so now we can access user.name directly, instead of through value:

```JS
import { reactive } from 'vue';

export default {
  setup() {
    const user = reactive({
      name: 'Joe',
      age: '30'
    });

    setTimeout(() => {
      user.name = 'Schmoe';
      user.age = 31;
    }, 2000);

    return { user: user };
  }
}
```

#### <b>Reactivity - a deep dive</b>

Just watched through this, will have to get back to this later. There are 'isRef' or 'isReactive' functions to check if they are. There is also a 'toRefs' function that can be imported which turns an object into reactive refs.

#### <b>Replacing methods with regular functions</b>

We can define functions inside setup(). It will have to be returned as normal with a key-value pair.

#### <b>Replacing computed properties with computed function</b>

```JS
const uName = computed(function() {
  return firstName.value + ' ' + lastName.value;
});
```

Vue will watch this function, see that we're using firstname and lastname and keep track of those. uName here as a computed property is just a ref, though read-only.

#### <b>Two-way binding and the composition API</b>

We can still use v-model, and they accept refs.

#### <b>Working with watchers</b>

Import the watch function. When calling it, the first parameter is what to watch, the second is the function to call. This function again receives two arguments, new value and old value.

We can have an array as the first parameter, so we can watch more than one property, for a bit more flexibility than with watchers of old. New values and old values will then also be arrays, so access them correctly. (Element 0 is the first watched dependency, element 1 is the second and so on.)

#### <b>Components, props and the composition API</b>

The option and composition APIs can be mixed, so we can use both, though perhaps in separate files.

Setup is a method that accepts two arguments, with the first one being 'props':

```JS
export default {
  props: ['firstName', 'lastName', age],
  setup(props) {
    const uName = computed(() => props.firstName + ' ' + props.lastName);
  }
}
```

If your component doesn't receive any props, it will be an empty object.

#### <b>Emitting custom events</b>

The second argument setup receives is 'context'. It's an object containing 'attrs', 'emit' and 'slots' properties.

`attrs` contains any fall-through attributes you might have.

`slots` gives you access to any slot data in case you need to access it programmatically.

`emit` is a function we can call to emit a custom event, but it's called on the context object now, not this.$emit like with options API.

#### <b>Working with provide / inject</b>

Instead of forwarding 'age' as a prop to the user-data component (the recommended way, by the way) we could provide it instead. To do that with the composition API we again need to import provide from vue and then call it as a method. We can then provide a ref, so everything automatically updates. To inject this we have to import inject from vue, and then call the inject method:

```JS
provide('userAge', uAge);

const age = inject('userAge);
```

Side-note, injected values should only be changed in the place where they are provided from.

#### <b>Lifecycle hooks in the composition API</b>

To summarize what's been learned so far first:

|Options API | Composition API|
|------------|----------------|
|data() { ... }| ref(), reactive()|
|methods: { doSomething() { ... } }|function doSomething() { ... }|
|computed: { value() { .. } }|const value = computed() { ... }|
|watch: { .. }|watch(dep, (newVal, oldVal) => { ... })|

Then these are changes to the lifecycle hooks:

|Options API | Composition API|
|------------|----------------|
|beforeCreate, created|Not needed, setup() replaces these|
|beforeMount, mounted|onBeforeMount, onMounted|
|beforeUpdate, updated|onBeforeUpdate, onUpdated|
|beforeUnmount, unmounted|onBeforeUnmount, onUnmounted|

The composition API lifecycle hooks have to be imported from vue, and when they are added in setup() you pass a function to them which will then be executed when due:

```JS
onBeforeMount(() => {
  console.log('onBeforeMount');
  return 'Whatever else should be done here';
});
```

A last note, props and emits should be added as before in the 'export default' block, before setup() is called.

#### <b>Routing, params and the composition API</b>

We can import something from vue (or more specifically vue-router) called hooks, composables or custom composition functions. These are special functions built for the composition API, and one of them is 'useRoute' which replaces this.$route. Storing the result of this function in 'route' we can then call `route.params.pid` to get the pid, which is the dynamic part of the route.

Another one is useRouter which replaces this.$router, and storing the result from the function call in 'router' we can call 'router.push' to change the route.

#### <b>Using vuex with the composition API</b>

The vuex package has something similar to vue-router as we just saw. It's called 'useStore' and imports from 'vuex'. We execute it and store the result in 'store' inside setup().
