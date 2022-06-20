## Section 3: Rendering conditional content and lists

## Day 71 - 2022-06-19

#### <b>Rendering content conditionally with v-if</b>

Content hidden with v-if is actually gone from the HTML document, and in place there is a v-if comment as placeholder for where the content will be if it should be shown. Content is only rendered if the expression evaluates to a truthy value, and this applies to all child elements as well.

```HTML
<p v-if="goals.length === 0">No goals added yet</p>
```

#### <b>v-if, v-else and v-else-if</b>

For more advanced conditional rendering, there is also v-else, which has to be used on the direct neighbour element to the v-if:

```HTML
<p v-if="goals.length === 0">No goals added yet</p>
<ul v-else>
  <li>Goal</li>
</ul>
```

There is also v-else-if which lets you do another conditional check:

```HTML
<p v-if="goals.length === 0">No goals added yet</p>
<ul v-else-if="goals.length > 0">
  <li>Goal</li>
</ul>
<p v-else>Some explanatory text here if none of the above is true, which shouldn't be possible here</p>
```

This is about attaching and detatching elements from the DOM, which can be important to know about for performance reasons. Next up, how to simply hide or show items.

#### <b>Using v-show instead of v-if</b>

The v-show directive is 'standalone', so it doesn't work with v-else. It works like v-if by checking some condition, but instead of adding or removing elements to the DOM, it adds or removes the display: none style to or from it instead.

Typically v-if should be used first, and then v-show only if you have an element that changes visibility status a lot! The reason being, it's no good to have lots of elements on the DOM that isn't shown either.

#### <b>Rendering lists of data</b>

The v-for directive can be used to loop through data and output elements for every entry in the array. Though we use 'in' here instead of 'of' as we do with for loops on arrays in JavaScript:

```HTML
<p v-if="goals.length === 0">No goals added yet</p>
<ul v-else-if="goals.length > 0">
  <li v-for="goal in goals">{{ goal }}</li>
</ul>
```

Adding a new goal only appends that on the page, it doesn't regenerate the entire list every time an element is added. Nice.

#### <b>Digging deeper into v-for</b>

The example above with looping through an array is probably the most common usage of v-for. It has some more advanced abilities though, where we can also get the index of the element from the array. Simply add parenthesis around the element you extract and add a second element for the index of said element:

```HTML
<li v-for="(goal, idx) in goals">{{ idx }} - {{ goal }}</li>
```

To loop through objects works the same way as for arrays, though now you get the value as the first element, and optionally the key if you add the parenthesis and add the second variable for it. The index is also available as the third item, but probably not used much:

```HTML
<li v-for="(value, key) in {name: 'Joe', lastName: 'Schmoe', age: 30}">{{ key }}: {{ value }}</li>
```

To generate a list of numbers:

```HTML
<li v-for="num in 10">{{ num }}</li>
```

#### <b>Removing list items</b>

Add an event listener on a conditionally rendered element, and call a method that removes that element:

```JS
methods: {
  addGoal() {
    this.goals.push(this.enteredGoalValue);
  },
  removeGoal(idx) {
    this.goals.splice(idx, 1);
  }
}
```

```HTML
<li v-for="(goal, idx) in goals" @click="removeGoal(idx)">{{ idx }} - {{ goal }}</li>
```

As can be seen, Vue is reactive and updates the DOM when an element is removed from the array that was output with v-for.

#### <b>Lists and keys</b>

Some things to be aware of or there can be some strange bugs. With goal in a paragraph with an input field in the list item as well, we need to stop propagation on the input field otherwise clicking to type into it would remove it, given we click on the list item as well:

```HTML
<p v-if="goals.length === 0">No goals added yet</p>
<ul v-else-if="goals.length > 0">
  <li v-for="(goal, idx) in goals" @click="removeGoal(idx)">
    <p>{{ idx }} - {{ goal }}</p>
    <input type="text" @click.stop>
  </li>
</ul>
```

Add a couple of goals and then type something into the first input field and then click the element so it is removed. The text input is now shown for what was originally the second goal!

Now add some text in the second input field and again remove the first goal. Now the second goal is the first goal and the text input is gone.

This is because Vue doesn't regenerate everything, but reuses elements. To fix this there is a non-standard element supported by Vue called key which is a good idea to use when using v-for. We can't use index to uniquely idenfity elements in the list, because if we delete the first goal, the second goal will now have index 0 which is what causes the problem in the first place. Here we can use the goal text as key, given we probably don't enter to identical goals. More realisticly we would use an id gotten from a database perhaps.

```HTML
<p v-if="goals.length === 0">No goals added yet</p>
<ul v-else-if="goals.length > 0">
  <li v-for="(goal, idx) in goals" :key="goal" @click="removeGoal(idx)">
    <p>{{ idx }} - {{ goal }}</p>
    <input type="text" @click.stop>
  </li>
</ul>
```

If we now input something in the second field and delete the first goal, the input is moved with the goal because Vue can tell the different elements apart.
