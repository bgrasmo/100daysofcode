## Section 8: Component communication

## Day 75 - 2022-06-23

#### <b>Introducing props - parent to child communication</b>

Props, short for properties, are needed if we want to create reusable components where we have some common markup and logic, but some data needs to be received from the app. Currently if we use the component twice, we get the same data twice, which isn't what we want.

Props can be thought of us custom HTML attributes, though I guess not exactly? It seems like props is the thing receiving data from the custom HTML element with custom attributes and makes them work. With the HTML element set up like this:

```HTML
<friend-contact
  name="Joe Schmoe"
  phone-number="0123 45678 90"
  email-address="joe@example.com"
></friend-contact>
<friend-contact
  name="Jane Schmoe"
  phone-number="0123 45901 23"
  email-address="jane@example.com"
></friend-contact>
```

Add props to the Vue file containing the definition for that friend-contact element by adding the 'props' property to it. In it's simplest form this takes an array, which we'll use now, but learn about more advanced methods later. Now these props are available in the custom component and we can access them in our methods with for instance `this.name` or we can use them in the template with just the props name. The code first:

```JS
export default {
  props: [
    'name',
    'phoneNumber',
    'emailAddress'
  ],
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: "joe",
        name: "Joe Schmoe",
        phone: "0123 45678 90",
        email: "joe@example.com",
      },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    }
  }
};
```

Notice how we need to convert between kebab-case and camel-case, since - is invalid in certain settings in JavaScript.

Now the template where 'friend.name' can be replaced with just 'name' and so on.

```HTML
<h2>{{ name }}</h2>
<button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show' }} Details</button>
<ul v-if="detailsAreVisible">
  <li>
    <strong>Phone:</strong>
    {{ phoneNumber }}
  </li>
  <li>
    <strong>Email:</strong>
    {{ emailAddress }}
  </li>
</ul>
```

Be aware of name conflicts between properties, data, methods and computed properties.

#### <b>Props behaviour and changing props</b>

Props should not be mutated, and it will cause compilation of the app to fail if that is attempted because Vue uses 'unidirectional data flow'. Basically if the parent (App.vue) sends some data down to the child (FriendContact.vue), then FriendContact can't change that data. The way to handle this is to let the parent know you want to change the prop, and then have the parent do it and then send the changed data down to the child.

Another way to handle this is to just change the data locally in the child by creating a new property in data, set it equal to the received prop, and then use that property instead of the prop directly.

#### <b>Validating props</b>

Instead of using props in the simplest form as we've done so far with an array, we can instead specify them in an object. In this object the props will be the keys, as JavaScript property names, and the most basica value that can be provided is the type of data that is expected:

```JS
export default {
  props: {
    name: String,
    phoneNumber: String,
    emailAddress: String,
    isFavorite: String
  }
}
```

To be more specific we can instead provide an object as the value, and then we can specify if the property is required or not:

```JS
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    isFavorite: {
      type: String,
      required: false,
      default: '0',
      validator: function(value) {
        return value === '1' || value === '0';
      }
    }
  }
}
```

In case where a prop isn't required we can provide a default value which doesn't have to be a simple value but could be a function to handle more complex logic. We can also add a validator function that receives the value provided for the prop as input, and this should receive true or false. Here we only allow it to be either 1 or 0.

If a prop is required but missing the code still compiles, but we get a warning in the developer console when we visit the page. The same happens if we provide an invalid value that doesn't pass the validator function.

All the supported prop values can be found in the official [Vue docs](https://v3.vuejs.org/guide/component-props.html). Note that type can also be a constructor function, like the built in Date or custom ones.

#### <b>Working with dynamic prop values</b>

Instead of having 'isFavorite' as string 1 or 0, or even number 1 or 0, we can use a boolean instead. But setting 'is-favorite="true"' won't work, since that will always be a string. Instead we have to bind the prop, and that is something we can do with all our props, just like any other HTML attribute:

```HTML
<friend-contact
  name="Joe Schmoe"
  phone-number="0123 45678 90"
  email-address="joe@example.com"
  :is-favorite="true"
></friend-contact>
```

Then we can also perform comparison logic here. Remember that 'friend data' wasn't removed from the data object (in App.vue) when it was added as props on the custom element? There's of course a reason for that, and that is that we'll now use v-for (you can also use v-if and so on) to loop through that data array and output it that way, instead of having it hardcoded in the template. Adding a key is mandatory when using v-for on custom components though it doesn't have to be specified in the actual custom component itself, just where you use that component:

```HTML
<friend-contact
  v-for="friend in friends"
  :key="friend.id"
  :name="friend.name"
  :phone-number="friend.phone"
  :email-address="friend.email"
  :is-favorite="true"
>
</friend-contact>
```

Now we only need this element once, as v-for will create as many as needed for us.

#### <b>Emitting custom events - child to parent communication</b>

What we've done so far has just happened inside the component. The toggle for is favorite only happens inside the component, and isn't sent back to the main app. We could set it in the data section there, but again the toggle switch would only act on the data local to the component. If the data came from a database we would probably want to update it which we can't do yet.

Regular buttons in HTML emit a click event which we can listen to. Vue components can do the same thing, emit an event that the parent can listen for. So instead of the toggleFavorite method that just toggles the state inside the component:

```JS
methods: {
  toggleFavorite() {
    this.friendIsFavorite = !this.friendIsFavorite;
  }
}
```

We can use a built in method Vue knows which is '$emit()':

```JS
methods: {
  toggleFavorite() {
    this.$emit('toggle-favorite', this.id);
  }
}
```

The emit method wants at least one argument, and that is the name of the event. The convention is to use kebab-case in naming it.

Now in App.vue we can listen for this custom event, just like any other event with v-on or @event:

```HTML
<friend-contact
  v-for="friend in friends"
  :key="friend.id"
  :id="friend.id"
  :name="friend.name"
  :phone-number="friend.phone"
  :email-address="friend.email"
  :is-favorite="true"
  @toggle-favorite="toggleFavoriteStatus"
>
</friend-contact>
```

And then obviously we need to add code to handle that event in our App.vue file in methods:

```JS
methods: {
  toggleFavoriteStatus(friendId) {
    const identifiedFriend = this.friends.find(friend => friend.id === friendId);
    identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
  }
}
```

As can be noted, the event should carry some data so we know what to update, that is why an 'id' was suddenly added. It's also added in props without being shown here.

With that we're using the unidirectional data flow in both directions.

#### <b>Defining and validating custom events</b>

In props we define what properties we will receive. Similarly, we can add 'emits' to define the events the component can emit. This is done to 'document' the component, so it's easier to tell to what events you can listen. The alternative would be to search through the code, looking for `$emits` or looking for events that are custom.

```JS
emits: ['toggle-favorite']
```

Again this is using the simplest form, it can also be defined as an object:

```JS
emits: {
  'toggle-favorite': function(id) {
    if (id) {
      return true;
    } else {
      console.warn('ID is missing');
      return false;
    }
  }
}
```

This is done to make it clearn that 'toggle-favorite' should be handled by a function that expects an ID. We can also add validation here to make sure that the ID is not forgotten, and output a warning in the console to make it easier to debug. This is not required, but might make your life as a developer easier.

#### <b>Prop / event fallthrough and binding all props</b>

Due to prop and event fallthrough you can add custom props and events on a custom element, even though they are not defined in that custom element file. They automatically fall through to the root component in the template of that component. These fallthrough props can be accessed with 'this.$attrs'

[Documentation](https://v3.vuejs.org/guide/component-attrs.html)

To shorten the code a little we can bind all properties in one go if we have an object holding the props we want to set as properties:

```HTML
<template>
  <user-data v-bind="person"></user-data>
</template>

<script>
  export defauolt {
    data() {
      return {
        person: { firstname: 'Joe', lastname: 'Schmoe'}
      };
    }
  }
</script>
```

Instead of:

```HTML
<template>
  <user-data :firstname="person.firstname" :lastname="person.lastname"></user-data>
</template>
```

#### <b>Demo - adding components and connecting them</b>

If we now want a way to add and delete friends from the list, that should not be done in the FriendContact.vue file actually. That will easily make the file too big and cumbersome to work with. Instead a new component should be created for this purpose. This component doesn't need any props at the moment, because it doesn't need any external data. It will however emit data to the parent.

For delete friend, where we only emit the delete event, we don't have to do it like this with setting up a function to call when the button is pressed:

```HTML
<button @click="deleteFriend">Delete</button>
```

But we can instead directly call emit there:

```HTML
<button @click="$emit('delete')">Delete</button>
```

Now to delete something from an array in JavaScript, one way to do it is overwrite the array with the contents of the array run through the filter method:

```JS
this.friends = this.friends.filter(friend => friend.id !== friendId);
```

#### <b>Provide and inject</b>

In order to avoid having "pass-through" components, which only receives data and forwards them to another component, Vue has 'provide' and 'inject'. Provide some data, and inject them, which means to use them.

In App.vue:

```JS
provide: {
  topics: [
    {
      id: 'basics',
      title: 'the basics'
    },
    {
      id: 'advanced',
      title: 'the advanced'
    }
  ]
}
```

Now we need to listen for the provided data somewhere, and that is where we need to use them, which here is knowledge grid. There we don't receive 'topics' as props anymore, but use 'inject' instead.

```JS
inject: ['topics']
```

You can only inject from a parent component.

But obviously this isn't optimal. We now have 'topics' twice in App.vue, once in data and then again in provide. And they're different objects, so if the one in data is updated, that is not reflected in provide. To fix that we can change provide to be a method instead and return topics like this:

```JS
provide() {
  return {
    topics: this.topics
  };
}
```

Now a reference is passed instead and we're working on the same object in memory.

#### <b>Provide / inject for functions / methods</b>

We can't pass events around, but we can send functions! So add the function as a new key in provide, then listen for that key in inject. Then that injected function can be executed in the component that received it.

#### <b>Provide / inject vs props and custom events</b>

Provide / inject should not replace props and custom events. The latter should actually be the default communication method, and provide / inject should be considered if you end up with pass-through components.

Provide / inject might also make the code harder to read, as we can only see in App.vue that we provide something, we have to search through all the components to find where it is being used.
