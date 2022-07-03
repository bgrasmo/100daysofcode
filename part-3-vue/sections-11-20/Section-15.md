## Section 15: Vuex

## Day 83 - 2022-07-01

#### <b>What and why</b>

Vuex is a library for managing global state, which is data. Local state is data in one component, for instance a boolean that is used when checking if a form is valid or not. Global state is data that is used in multiple components, or even the entire app, like authentication status.

As for why, Vuex helps us manage state so we don't have to write a lot of logic for that ourselves, which could make our components a lot bigger than they need be. Using a library, we likely get more consistent behavior as it isn't up to each individual developer how to implement state, but there are rules to follow.

#### <b>Creating and using a store</b>

There is one store per app though we can have different states. State is a method and looks similar to the data method in Vue as it also returns an object, which is the global state. We now get a new property we can access in our components, and that is `$store.state.counter`. As it's available globally we don't need injection or passing props around

#### <b>Connecting components to state</b>

Move the counter logic to it's own file and see that it still works due to the state being globally accessible.

#### <b>Mutations - a better way to change data</b>

We should not change state by directly changing the counter like above in individual components, as we could introduce errors with typos and so on. It also means if we update state in multiple components, we have to update multiple components if we want to change how we update that state. Instead use mutations to change state.

Mutations are added in the store object and is an object, much like methods in Vue where we can add methods to change state. In the components, we will however have to call the 'commit' method on the store with the mutation we want to call as a string argument, in the method.

#### <b>Passing data to mutations with payloads</b>

Some mutations might require arguments, which is what the second argument in the mutation method is for. What the payload is, is up to us. It can be a string, a number, an object or anything we want. To send the payload, simply add it as a second argument to the commit method as well. Alternatively we can just call the commit method with an object containing all the data we want to pass in. Mutation name should now be in the type property.

#### <b>Getters - a better way of getting data</b>

As changing state directly in components is not a good idea, neither is getting data. Add 'getters' in the store object, and again add methods in the getters object. It receives state as first argument and 'getters' as second, which could be other getters you could need to call in this getter. To access a getter, use `this.$store.getters.<getter name>`.

#### <b>Running async code with actions</b>

What if we have to send an HTTP request and wait for the response before we can update state? Mutations must be synchronous because if multiple of them execute, everyone should get the latest state. For that we have to use 'actions' which triggers mutations. It is considered good practice to always have actions between components and mutations, even though components could commit mutations themselves. This should help ensure that you never accidentally put async code in a mutation, as you can do that, but it won't work as expected.

Action is just another object in the store where we define methods. It receives 'context' as an argument, and this in turn has a commit method we use to commit a mutation. To call an action, we 'dispatch' it. Syntax is pretty much similar to commit.

#### <b>Understand the action context</b>

Log the context object to have a look at what it contains. For instance dispatch, meaning we can dispatch one action from another action.

#### <b>Use mapper helpers</b>

In a component we can import a map getter function. This can be used inside a computed property instead of defining said property on your own. It returns an object which we can spread into the computed property. The argument to it is an array containing the names of the computed properties you want to have in the component.

We can also map actions this way, though we can pass in an object instead if we're not happy with the default names. The same can be done for getters.

#### <b>Add more state example</b>

Add log in and log out buttons, connect to actions which call the mutations. Use v-if to only show the log out button and the first component if logged in, and only the log in button if not logged in.

#### <b>Organizing store with modules</b>

A store can be split up into multiple modules, for instance keeping the authentication in the root state, but moving the counter state to it's own. Create an object literal, and move everything counter related to it with the same structure.

Now in the store object, add a 'modules' property which is an object listing the modules that should be merged into this store. It will be added at the same level.

## Day 84 - 2022-07-02

#### <b>Understand local module state</b>

If we log the state object in one of the counterModule mutations, we don't see all of the states. We don't see the auth state for instance, because the state inside a module is treated as local state. Mutations, getters and actions are global though and can be accessed on the main store.

So a getter in the module can't access state that isn't in that module. Well, not the way we've done so until now at least. The getters for instance in the module also receive 'rootState' and 'rootGetters' to help with this.

#### <b>Namespacing modules</b>

The entire module can be made local with namespacing, this ensures that multiple modules are separate from each other, and avoids name clashes.

Add 'namespaced' property to the module and set it to true to enable namespacing. Then we need to specify the namespace when accessing getters, actions and so on, and the name is the one set in the store object where we load the modules. Access it with bracket notation on getters for instance, and `namespace/method`.

When using map getters, specify the namespace as the first argument, and then the array with the methods. For map actions it's the same. If we dispatch 'manually' we specify `namespace/method` in the string value of the type property.

#### <b>Structuring vuex and code files</b>

Our code is now a little messy, and the main.js file is quite big. So cut all logic related to store and move it to store.js. But it's normally taken further than that by having an index.js file with the store creation logic, then a store directory with separate files for actions, mutations and getters. Then separate subdirectories for the modules we have. In that directory again we can have actions, mutations and getters files as well and the index file to merge it all together. The convention would be to name it rootActions for things directly in the store object, and then the object name for things in the object module, so counterActions.

With multiple modules it could make sense to have a modules directory, and then a directory for each module in there.

#### <b>The challenge</b>

Extract instructors example project. Now migrate the globally managed state to Vuex. Rest of this section was spent solving this.
