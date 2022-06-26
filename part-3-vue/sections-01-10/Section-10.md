## Section 10: Practice project - learning resources app

## Day 77 - 2022-06-25

#### <b>Setup and first steps</b>

Extract the instructors example. Writing some commentary along the way but focus is on the code.

Tip: If you need to run through some elements with v-for, the elements shown should probably be in a component. It's also considered good practice to name the component the same as the file it resides in.

Remember that you send values to props by setting custom attributes on the custom element, LearningResource in this case.

Apparently it is better to use kebab case instead of pascal case for custom elements, as my `<BaseCard></BaseCard>` didn't work, but changing it to `<base-card></base-card>` with no other changes did. It could be that is necessary for global components, as I believe I've used pascal case with success before in this course.

By not adding a prop with 'caption' for the button, we give ourselves more flexibility later, as we can then send in icons instead of just text if we want that.

When you add props or event listeners on custom components they by default fall through to the root level element in that custom component template. In other words, we're adding a click listener on base-button which isn't actually a button but a custom component, and there is not click listener on the button itself in that component. But it still works because of this.

What if a dynamic component requires a prop? Move the stored resources array from App.vue to the resources.vue which uses the stored resources component and Use provide/inject. Provide as we learned provides resources to all lower level components. This does mean we have to change 'resources' from 'props' to 'inject' in the StoredResources file.

We previously added 'type' to the button, but since there is this fall-through functionality that can actually be removed.

To get the input data there are two main ways, adding data- properties and using v-model or an input listener to update it with every keystroke. Or we can just use refs.

With this app, a resource can't be removed like we did before by setting the array to the same array but with a filter function to remove an element. That is because we are overriding the stored resources array with a brand new array, and the provide function still points at the old one. Or in other words, the new array is not re-provided to all the other components. Instead get the index of the element we want to delete
with findIndex, and then use splice to remove the element at that index. This manipulates the original array instead of creating a new one.

