## Section 20: Reusing functionality - mixins and custom composition functions

## Day 90 - 2022-07-08

#### <b>Reusability concepts</b>

What can we reuse? The HTML structure and its styling, as well as some logic and events. This is why we have components and thanks to props and slots, we can still customize them to some extent. However, we might end up with components with similar logic, like search method, data and watcher and it might not be possible to create one component to avoid duplication. This is where mixins comes in, as it allows us to share data, methods, computed properties, watchers, lifecycle hooks and whatever we need across components.

#### <b>Using mixins</b>

Mixins are imported as regular components, but are added with the `mixins` property instead of components.

```JS
mixins: [alertMixin],
```

Special note, `components` configuration can not be shared in mixins, so anything in `components` has to stay and with that, their imports.

#### <b>Understanding mixin merging</b>

If we have some `data()` in the component and we import a mixin with some data as well, they are merged. So you can set a title in the component and then have something using that title in the mixin and it will work. If we have the same property in the component and the mixin, the property in the component overrides the mixin.

#### <b>Global mixins</b>

Mixins as we have added them so far has been local mixins. They can be added globally as well, though that propbably has a limited use-case.

It is added in main.js by importing it as normal, and then registering it with `app.mixin(mixin)`.

#### <b>Disadvantages of mixins</b>

In bigger project, mixins might make it harder to find out where some value is coming from. There's also the merging behaviour you have to take care of, and the default way can be overridden. With the composition API, we have custom composition functions that can be used instead

#### <b>Custom hooks / composables and the composition API</b>

With the composition API we have the setup method with a bunch of different steps. That was not the case with the options API where it was an object with different properties. So for the composition API we can 'outsource' data by creating new functions that returns some values to us, and that wasn't really an alternative with the options API.

The composition API functions are sometimes called hooks, composables or custom compostion functions. We'll name the directory hooks.

Naming the functions should start with the 'use' word, and then say something about what it is.

```JS
export default function useAlert() {
  const alertIsVisible = ref(false);
  function showAlert() {}
  function hideAlert() {}

  return {
    alertIsVisible,
    showAlert,
    hideAlert
  }
}
```

We can also return this as an array instead of an object.

```JS
setup() {
  const [alertIsVisible, showAlert, hideAlert] = useAlert();

  return {
    alertIsVisible,
    showAlert,
    hideAlert
  }
}
```

#### <b>More custom composition functions</b>

Our hooks, which are functions we define, may take any number of arguments, and then default values as well.

```JS
export default function useAlert(startingVisibility = false) {
  const alertIsVisible = ref(startingVisibility);
}
```

```JS
setup() {
  const [alertIsVisible, showAlert, hideAlert] = useAlert(true);
}
```

#### <b>Why hooks / composables beat mixins</b>

It is easier to see that alertIsVisible, showAlert and hideAlert is coming from the 'useAlert' hook, than mixins which silently and invisibly merges their code into the component code.

#### <b>Custom hooks gotchas</b>

Did not entirely catch this, need to rewatch.

