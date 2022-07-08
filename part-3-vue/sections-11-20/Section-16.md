## Section 16: Find a coach web app project

## Day 85 - 2022-07-03

#### <b>Planning the project / web app</b>

Some general musings on what we need to create this project. It's a general plan so far, we'll get into details when we get to them.

#### <b>Registering routes</b>

Extract instructors example project. As this is a code-along project, there won't be much notes here, unless there is something I feel wasn't clear to me before which I need to revisit.

#### <b>Adding route page components</b>

See code changes.

#### <b>Working on the main layout and styling</b>

See code changes.

#### <b>Wiring up pages</b>

See code changes.

#### <b>Adding Vuex and coach data</b>

See code changes.

## Day 86 - 2022-07-04

#### <b>Adding some base components</b>

Just setting 'link' as a prop on a component sets it as true

#### <b>Building the coach detail component</b>

By setting 'props' to true in the route config for a dynamic route, that dynamic value will be passed in as a prop with that name to the component.

#### <b>Add filtering logic</b>

Remember that we can set a property dynamically like this. First we spread an object into this object, then we override one of the values dynamically:

```JS
const isActive = event.target.checked;
const updatedFilters = {
  ...this.filters,
  [inputId]: isActive
};
```
#### <b>Adding coaches to vuex</b>

Using `this.$router.push('route')` allows us to redirect the user to a new page. Using `this.$router.replace(route)` instead does the same, except now the user can't go back to the page they came from.

The 'some' function checks if some coach matches a criteria: `return coaches.some(coach => coach.id === userId);` This returns true if at least one coach has a matching user id.

#### <b>Showing a loading spinner</b>

Dispatch can also return something to the component where you call it: A promise, if the function it is in is async. That means we can wait it and only continue with the next steps once the promise resolves.

## Day 87 - 2022-07-05

The firebase responsedata will have a 'name' property that contains an ID for the data that was posted.