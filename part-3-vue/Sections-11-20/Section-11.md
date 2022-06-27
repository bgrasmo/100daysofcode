## Section 11: Forms

## Day 78 - 2022-06-26

#### <b>v-model and input</b>

Extract instructors example project. We'll be using v-model this time as it also helps with resetting the form, in that it can overwrite what the user has input.

Another interesting thing is that v-model when used on input with type=number will convert the input to a number. When using refs, we'll get it as string as always. We can also force v-model to convert input by adding a modifier, so `v-model.number="userAge"` for instance.

Other modifiers are 'lazy' in case you don't want to update after every keystroke and 'trim' to remove leading and trailing whitespace.

#### <b>v-model and dropdowns</b>

With dropdowns, we don't want to set the initial value to an empty string most likely, but rather one of the selections. We do that by setting it to one of the values in the list.

#### <b>v-model with checkboxes and radio buttons</b>

With multiple checkboxes they are grouped and we will get the checked values in an array. With radio buttons we'll get the one that was selected. With just a single checkbox there is nothing to group, and we will get true or false depending on if it was checked or not.

#### <b>Basic form validation</b>

Add '@blur' to an input field, and call a method that can do some basic validation when user moves focus away from the field.

#### <b>Build a custom control component</b>

Add new component, import it in 'TheForm'. Add buttons used to set a rating.

#### <b>Using v-model on custom components</b>

As we have learned before, v-model can be used on custom components. It's also just a short for listening for the input event and binding the value attribute. (`@input="" :value=""`)

When using v-model on a custom component, Vue will set a specific prop on that component: modelValue. We should then add that prop in the RatingControl component. In other words, it's the same as binding 'model-value' on the custom component element.

Vue also emits a special event in this case: 'update:modelValue'.

So all in all, Vue listens for and updates like this behind the scenes: `@update:modelValue="" :model-value=""`. So by setting we expect this value in props, and setting that we will emit that value, we can use v-model.

To reset the status of the rating when the form is submitted now we don't want to use data() since that doesn't update everywhere. We could use computed (though that gives a warning in console about something being read-only), but perhaps the best option is to just use modelValue directly.

Might want to visit the last part of this chapter at some point, didn't exactly get everything about how this worked.
