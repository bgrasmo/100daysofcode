## Section 9: Diving deeper into components

## Day 76 - 2022-06-24

#### <b>Global vs local components</b>

When we register components in main.js with 'app.component' they end up being global components. In other words, we can use them as custom HTML elements anywhere in the app. This also mean they all have to be loaded when the app is initialized, and it wouldn't be clear where they are being used.

The alternative is to register the components where we intend on using them. So for instance the header which is only used in App.vue, we can remove the import and the 'app.component' from main.js and instead add the import in App.vue, at the top of 'script' there. To register the component it should be added to the default object exported by adding the 'components' property:

```JS
import TheHeader from './components/TheHeader.vue';

export default {
  components: {
    'the-header': TheHeader
  },
  data() {
    return {}
  }
}
```

And of course there's a better alternative to this, which is to just add the component as `TheHeader: TheHeader` and Vue will 'translate' so we can still use the HTML tag `<the-header></the-header>`. Or we can now also just use `<TheHeader />` if we want, as a self-closing tag as well. And that explains some code I've seen in some projects. And as always, when key and header is the same, the value can be removed so just the key, or either, who can tell? is left:

```JS
export default {
  components: {
    TheHeader
  },
  data() {}
}
```

#### <b>Scoped styles</b>

When adding styling with the 'style' tag in a component, or wherever really, it will always be treated as global styling. So if we style the 'h2' tag for instance in multiple places, that could perhaps lead to some unexpected results, as it would be the file loaded last that would 'win' the style competition.

Anything that should affect the entire app should be defined in App.vue, since that is the entry point.

To make a long story longer, add 'scoped' to the starting style tag in the component and the styles defined there will be scoped, isolated to that component.

Vue achieves this by adding a `data-v-[id]` attribute to the elements, and then changes the selectors to match that behind the scenes.

#### <b>Introducing slots</b>

Given two components that have something in common, like both having a section (though perhaps with different content) and the same styling, we've now ended up with duplicate code after we added scoped styling. We had to copy section styling from one component to another since they both used it, which worked when styles were global. (An alternative to solve this by the way.)

The solution would be to add a new component containing the section, and being flexible about the content it receives, and the styling for it. In other words, wrap one component around another component, and that is solved with the 'slot' element:

```HTML
<template>
  <div>
    <slot></slot>
  </div>  
</template>

<script>
export default {
}
</script>

<style scoped>
div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>
```

The component sending data to this component now looks like this:

```HTML
<base-card>
  <header>
    <h3>{{ fullName }}</h3>
    <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
  </header>
  <p>{{ infoText }}</p>
</base-card>
```

In other words, slots are flexible about the content they receive, as it now receives both HTML and vue features and it still ends up being rendered perfectly. (Something props couldn't do.)

We can add some logic in the component containing 'slots' if needed.

#### <b>Named slots</b>

In case we need more than one slot in a component we have to name them, so Vue knows what content goes where:

```HTML
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <slot></slot>
  </div>  
</template>
```

If a slot is left unnamed, that will be the default slot, but there can only be one of it.

To tell Vue where content should go with named slots, we have to add another template tag and use the v-slot directive on it. Any content inside base-card but not in a named slot will then go to the default slot.

```HTML
<template>
  <section>
    <base-card>
      <template v-slot:header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </template>
      <template v-slot:default>
      <p>{{ infoText }}</p>
      </template>
    </base-card>
  </section>
</template>
```

It's good practice to wrap the content that will go into the default slot in a template as well, and add 'v-slot:default' to it. That shows our intention, that we didn't forget to add something to a slot, but that we want it to go to the default one.

#### <b>Slot styles and compilation</b>

Styling is not sent with when content is sent from one component to a slot, so we have to define the style we want in the component where we define the slot. Props and so on are not sent with either, but Vue compiles this and sends the actual content to the slot

#### <b>More on slots</b>

We can add default content to slots by adding it between the slots elements. That will be visible if we don't send any content to the slot.

If we don't provide content to a slot and don't have fallback data on it, it will actually be an empty element on the DOM. Can be seen by inspecting the page. We can see more about this with the mounted() lifecycle hook, and logging `this.$slots`. This contains information the component receives for its different slots. So where you define the slots:

```JS
<script>
export default {
  mounted() {
    console.log(this.$slots);
  }
};
```

Since we have a slot named header, we can also access that directly with `$slots.header` or `$slots.default` for the default one. If we don't provide content for a slot, the value will be undefined. And that is of course something we can utilize:

```HTML
<template>
  <div>
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>
  </div>
</template>
```

There is also a shorthand for v-slots, and that is the # symbol. So we can instead use `<template #header>` and `<template #default>`

#### <b>Scoped slots</b>

Given a new component:

```HTML
<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <slot></slot>
    </li>
  </ul>
</template>
```

And App.vue:

```HTML
<template>
  <div>
    <TheHeader />
    <BadgeList />
    <UserInfo
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"
    />
    <CourseGoals>
      <h2>Goals not available here</h2>
    </CourseGoals>
  </div>
</template>
```

If we want some dynamic content in that list, how would we go about that? If we pass in some markup from App.vue which uses this component, it doesn't have access to the 'goal' variable here. For this scenario Vue has a feature called scoped slots where you can pass data from the component where you defined a slot to the component where you send the markup for the slot.

Add a prop where you define the slot and bind it:

```HTML
<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <slot :item="goal" another-prop="Some string"></slot>
    </li>
  </ul>
</template>
```

Now in App.vue we can use v-slot to get an object with everything we send from the slot. Then to get the values for the item and another-prop keys we can do this:

```HTML
<CourseGoals>
  <template  #default="slotProps">
    <h2>{{ slotProps.item }}</h2>
    <p>{{ slotProps.anotherProp }}</p>
  </template>
</CourseGoals>
```

At the time of recording this course Vue apparently didn't convert props with dash in them to camel case, but it seems to do that now as the only way I found to access another-prop was with camel case.

If we only target one slot we can remove the template tag and add the v-slot directly to the component tag. That is only allowed if everything between the opening and closing tag only goes into one slot.

#### <b>Dynamic components</b>

If you don't add an 'export default' because you have nothing to export, it will be created for you behind the scenes so you don't have to define it empty.

To build a page with different tabs, or actually buttons we can press to show different components like 'active goals' or 'manage goals' for instance, we can add those buttons in the template in App.vue. Then we need to add some data, for instance 'selectedComponent' and set it default to active goals. Add a method to set the selected method and bind that to the buttons with @click and then use v-if on the component tags to show which should be active:

```
data() {
  return {
      selectedComponent: 'active-goals',

methods: {
  setSelectedcomponent(cmp) {
      this.selectedComponent = cmp;

<button @click="setSelectedcomponent('active-goals')">Active goals</button>
<button @click="setSelectedcomponent('manage-goals')">Manage goals</button>
<ActiveGoals v-if="selectedComponent === 'active-goals'" />
<ManageGoals v-if="selectedComponent === 'manage-goals'" />
```

And of course that is the wrong solution again, as Vue has a better alternative to doing this with a special element called 'component'. This does not show anything on its own, but it has an attribute called 'is' which we use to specify which component we should display in place of it. Bind it and have the value be the selectedComponent:

```HTML
<component :is="selectedComponent"></component>
```

#### <b>Keeping dynamic components alive</b>

The components above was very simple, just having an h2 tag with some static text to demonstrate the concept. Now we'll make it a little more complex by adding an input field where the user can add some goal.

Now if we enter some text, but then go to another tab before we saved what we entered, it will be lost when we go back. The reason for this is what when we switch components the old component is destroyed and removed from the DOM.

To handle this better, Vue has an element simply called 'keep-alive' that can be wrapped around the dynamic component.

```HTML
<keep-alive>
  <component :is="selectedComponent"></component>
</keep-alive>
```

#### <b>Applying what we know and a problem</b>

Add a button to manage goals to set some goal and add a method to capture and set that data. We can either use v-model and two-way binding here, or we can use refs to capture the input. Check if the input is empty, and if so we want to show an error. Create a new error alert component for that with a slot so it's flexible about the content it receives. Now we want to show it if the user enters something invalid. That can be done with v-if.

Note, the dialg element used here needs the 'open' attribute to be shown, something we could toggle dynamically if we wanted of course, but here we use v-if to show or remove the entire component.

Now we can also add a button to this error component that simply sets the invalid input variable back to false, and it will be gone.

'alert' has been used a lot in the course, and that is not exactly a nice way to show errors to the user. It lacks the option to style and position it how we want, as well as adding and configuring any buttons we want.

So there is nothing new here, but it's a pattern it's nice to know about.

#### <b>Teleporting elements</b>

There is a problem in the current solution though, and we can see that if we inspect the page with the dialog open. It's below the button input and h2 tag, because that's where we put it. Visually everything is ok, but semantically and from the HTML perspective, having this element which is actually treated as an overlay to the entire page nested in our HTML code is not ideal. It works, but for accessibility it could be strange, and we could run into styling bugs this way. So it would perhaps make more sense if the dialog was inserted somewhere at the top, at the root of the tree and not deeply nested inside it.

We can solve this with Vue by using the build in teleport element, by simply wrapping the error element in teleport. This wants on prop: 'to'. Here you provide a CSS selector, and selecting an HTML element you want to teleport to. We can for instance select 'body' or an id selector like '#app'. This doesn't teleport the item to the top as I thought, but to the bottom. It is directly inside the body element now though, instead of nested inside our structure.

#### <b>Working with fragments</b>

In Vue 2 you were required to have one root element per template. In Vue 3 you can have multiple. So in Vue 2 there should perhaps be a div wrapped around all the content, while in Vue 3 we don't need to do that, but can have all of h2, input, button and so on directly inside the templete element.

So if you don't need a wrapping element for semantic or styling reasons, there is not reason to use one. That you are allowed to have multiple top level elements is called fragments.

#### <b>The Vue style guide</b>

There is an official Vue style guide which you can find on their page, under docs and style guide. It gives recommendations for folder structure, how to name components and so on. There are also essential rules that you have to follow.

The style guide for Vue 2 can be found [here](https://v2.vuejs.org/v2/style-guide/) and for Vue 3 [here](https://vuejs.org/style-guide/).

#### <b>Moving to a different folder structure</b>

For bigger projects the folder structure might be important. For now a simple src folder with a single components folder in it has worked. With mahy components it can be hard to manage this, so creating sub-folders grouping components with similar functionality (features) together could help.

We can also create folders to group on layout and user interface.
