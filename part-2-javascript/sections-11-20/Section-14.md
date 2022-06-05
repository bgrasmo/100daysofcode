## Section 14: Working with events

## Day 57 - 2022-06-05

#### <b>Event listeners</b>

Since there is an addEventListener() there is also an removeEventListener().

Both the add and the remove will have to have the same function as the second argument, so it has to be a named function for remove to work. You also can't use bind in the add event listener, as that creates a new function object so the remove won't be the same. The bind will have to be called on the function itself instead.

#### <b>The event object</b>

Again check out the MDN documentation for detailed information of all properties and methods available.

One important property to remember is 'target'. It tells what caused this event, so for a button click, it will be the button element. The button can then be disabled for instance with `event.target.disabled = 'true';` in the function handling the click event.

#### <b>Supported event types</b>

Another event is for instance 'mouseenter' which triggers when the mouse enters the area of the element. Kinda spooky I think, couple this with ajax and we can track how the user moves the mouse on the page. There's also a 'mouseleave' which triggers when the mouse leaves said element. relatedTarget in the event object let's us see what element the mouse was on before it triggered the event, so where it was comming from. There is some delay on this however, so if the mouse is moved very fast this might not be correct.

We can also listen for a 'scroll' event, which triggers when the user scrolls on the page. This will trigger a lot though, so should be used with care. This event object is rather short so we might not get a lot out of it, but we can use it to calculate how far the user is from the bottom so we can add more content, and thus create an infinite scroll.

#### <b>Working with preventDefault()</b>

Add event.preventDefault() to the event handler function to prevent the default browser behavior, like submitting the form to the server or getting a link. With this we can instead implement our own logic.

#### <b>Understanding 'capture' and 'bubbling' phases</b>

With a section containing a div containing a button, when we click the button the browser will first run through the capturing phase then the bubbling phase. Capturing goes from outside to inside, bubbling from inside to outside.

The event listener can't only be added to the button, it can also be added on the section. So that's why the browser then starts with the section to see if there is a listener registered there that should be executed.

All event listener are by default registered in the bubbling phase. So if we have an event listener on the button and on the section, the button event listener will run first, then the section event listener will run second.

This behavior can be changed though.

#### <b>Event propagation and stopPropagation()</b>

Adding a third argument 'true' to the event listener which is false by default tells the browser that the event should be part of the capturing phase.

In short, no third argument to any event listener and they are added to section and button. When a click is registered, the button event will execute first, then the section event. By setting third argument to true on the section event listener however, that will execute that event before the button.

That the event does not just occur on one given element is called propagation, the event propagates or bubbles up from the inside to the outside in the bubbling phase, or goes from outside to inside in the capturing phase.

If you want only the button event to trigger, set event.stopPropagation() in the event handler function for the button given the bubbling flow.

If you should have multiple event listeners on the same element, the others can be stopped with event.stopImmediatePropagation().

The event object has a 'bubbles' property which indicates wheter an event bubbles up or not.

#### <b>Using event delegation</b>

For a list with multiple elements, let's say we should be able to click on each item and toggle some highlight color on or off. Selecting all list items and then looping through the array to add an event listener to each item can be cumbersome, and possibly be bad for performance. (We could end up with a lot of event listeners.)

Instead we can take advantage of event propagation by adding the event listener on the list, as 'event.target' will be the actual element we clicked. (`event.target.classList.toggle('highlight);` will toggle the class on the list item.)

However if we have a more complex list with a header perhaps and a paragraph of text within each list item, this does not work so well. If we click the header, only that will be highlighted, if we click the paragraph only that will be highlighted, and if we manage to click outside of both of those, only then will the entire element be highlighted. Event.target is the actual element clicked, and that is the lowest possible element.

There is also a 'currentTarget' on the event object, but that is the element you added the event listener on, so in this example the entire list.

So to highlight the entire list item we can use event.target in combination with DOM traversal and the 'closest' method which traverses up the ancestor tree and lets us select the closest element with a CSS selector. Since we know that event.target will be some element inside our list item, we can use closest to simply select the actual list item, and we're done. Closest includes the element on which you call it, itself, so if you manage to click the list item, it will still be selected and we're good to go.

So there you have it, we've delegated the event and still made sure to highlight the right element.

#### <b>Triggering DOM elements programatically</b>

Let's say we want to submit a form not only when we click the button, but also when something else happens on the page. That can be done! We can trigger one event through another event! Basically, get access to the form element and then call `formEl.submit();`. That works for any DOM element, and a lot of the events you can listen for can be triggered programatically.

Some things worth noting though, calling formEl.submit(); does not trigger the event listener for the form, and as such the event.preventDefault() method is not called. However, if you call `button.click();` the button event listener will be triggered, though with some 'fake' mouse data as can be seen in the event object, all coordinates will be 0 for instance. So in other words, to trigger the form event listener, simulate a click on the form button instead.

#### <b>Event handler functions and 'this'</b>

So to repeat, when you add an event listener and use regular functions instead of arrow functions, 'this' will be currentTarget, or in other words, the element you added the event listener to.

#### <b>Drag and drop</b>

To make an element 'draggable' it has to be marked as such and that is done by adding the draggable attribute or setting the draggable property on the DOM element to true. Next you have to listen for the "drag start" event on the element that is draggable. We can interact with the event object to describe the drag operation, and set if we are copying or moving which affects how this is shown to the user. Data can also be appended to the event.

Now we need to tell JavaScript where the element can be dropped by adding an event listener for that since we typically don't support drag and drop to anywhere, but mark a certain destination area. We can add 'drag enter' and 'drag over' events for that, while we can skip 'drag enter' we definately need the 'drag over' event. Both will trigger whenever an element is dragged onto the element with that listener, but 'drag over' also triggers for child elements. We also always have to use 'preventDefault()' because the default is to cancel such events.

Optionally there's also a 'drag leave' event which triggers when the element is dragged away from the element which it was 'dragged over'. Hmm, now the language is confusing again. Wasn't 'drag over' the destination? So the scenario is that the user drags element to destination, but then removes it again? From the name I would guess it affected the original position of the element, that this triggered when it left that area.

Then we also have to listen to the drop even, which will only trigger if we did the mandatory 'preventDefault()' as was mentioned.

Then optionally there is a 'drag end' event which you can listen for on the element that was dragged, and not the place where it was dropped. This is always triggered even if the drop is cancelled, but you will get some properties which will say if the drop was successul or not.

#### <b>Configuring draggable elements</b>

The draggable HTML element will have to have set `draggable="true"` on it. Possible visual bug here, if we drag an element that is only partially visible, it seems part of the next element is dragged as well? So the full size of the draggable element seems to be selected, it's just that part of that size is another element.

Now add event listener to the draggable element: `addEventListener('dragstart', function)`. We can change the preview image of the element being dragged, but we'll not do that now. We do want to set an id however, so we can identify the element later.

```JS
document.getElementById(this.id).addEventListener('dragstart', event => {
  event.dataTransfer.setData('text/plain', this.id);
  event.dataTransfer.effectAllowed = 'move';
});
```

Documentation on MDN: [Recommended drag types](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types) and [possible effect allowed](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/effectAllowed)

#### <b>Marking the drop area</b>

Add both dragenter and dragover events now, the difference when they are triggered are nested child elements. For dragover preventDefault is needed, for dragenter that is optional.

We can't access the data we set on the object, only the types of data. We've only set up draggable on text/plain elements, but that is to show we can check for various types if we want. To give a feedback to the user that it is possible to drag an element there add style 'droppable' to it. To remove that style from where the element was dragged from we can use the 'dragleave' event. This is slightly tricky though, because that means the class will also be removed if we enter a child item of the list. To fix this, add an if check that checks if the event triggered because we really left into a non-child item. event.relatedTarget holds the element where the cursor is now, and we can check if that's inside the list or not.

```JS
const list = document.querySelector('ul');

list.addEventListener('dragenter', event => {
  if (event.dataTransfer.types[0] === 'text/plain') {
    list.parentElement.classList.add('droppable');
    event.preventDefault();
  }
});

list.addEventListener('dragover', event => {
  event.preventDefault();
});

list.addEventListener('dragleave', event => {
  if (event.relatedTarget.closest('ul') !== list) {
    list.parentElement.classList.remove('droppable');
  }
})
```

#### <b>Dropping and moving elements</b>

To react to a drop we have to add another event listener where we want the drop to be possible. In our example that's still the list as we'll only allow drag and drop within it. That event is simply called 'drop', and here we can extract any data we added in 'dragstart'. What isn't clear from the code here is that we have to lists on our page, and if we drag an element from one list to the other, we'll want to remove it from the first list and then add it to the other. If we 'let go' in the original list we don't want to do anything. Since we also have buttons that can accomplish the same as we attempt to do with drag and drop, we can just simulate clicks on them to move the elements. (Which begs the question though, how to handle this if we don't have the buttons? Given we need to pass data around and we might not have access to the previous list in the current list and so on.)

```JS
list.addEventListener('drop', event => {
  const projectId = event.dataTransfer.getData('text/plain');
  if (this.projects.find(p => p.id === projectId)) {
    return; // Do nothing, we're in the starting list
  }
  document
    .getElementById(projectId)
    .querySelector('button:last-of-type')
    .click();
    list.parentElement.classList.remove('droppable');
    event.preventDefault(); // Not required, but can be used in case there was some default behavior for dropping something here, typically images could be loaded full-screen by the browser.
});
```

Not needed for this simple project, but here's how we could use the dragend event:

```JS
const item = document.getElementById(this.id);
item.addEventListener('dragstart', event => {
  event.dataTransfer.setData('text/plain', this.id);
  event.dataTransfer.effectAllowed = 'move';
});

item.addEventListener('dragend'), event => {
  console.log(event);
}
```

In dataTransfer in the dragend event object we have the effectAllowed property which we set to move. Then there's the dropEffect which is also set to 'move' which shows the drop succeeded. If it didn't succeed the dropEffect would be 'none'.

Events [building blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)<br>
Events [reference](https://developer.mozilla.org/en-US/docs/Web/Events)<br>
Events [object](https://developer.mozilla.org/en-US/docs/Web/API/Event)<br>
[Drag and drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
