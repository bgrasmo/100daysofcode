## Section 14: Animations and transitions

## Day 82 - 2022-06-30

#### <b>Animation basics and CSS transitions</b>

Extract instructors example project, though more of a playground this time than a project.

Add a method that sets a data property to true. Add a click listener to a button that sets a class if this variable is true. Then add the CSS to move the element with this class:

```CSS
.animate {
  transform: translateX(-50px);
}
```

This 'jumps' the block to the new position, which we'd be hard pressed to call an animation. To make CSS animate this we have to add the transition property on the 'block' class the block we want to animate is part of. It 'wants to know' what other property we want to animate (?) so we could add opacity. But since we're not changing that, that doesn't make sense. 'All' means all animatable properties, but we only use transform so we target that. Then add the duration of the animation (in seconds) and the acceleration of the animation.

```CSS
.block {
  transition: transform 0.3s ease-out;
}
```

#### <b>Understanding CSS animations</b>

To set up an animation with CSS, add a '@keyframes' block with a chosen name. This lets you define in detail the steps of the animation in %. So 0% would be at the start, 100% at the end.

```CSS
@keyframes jump-slide {
  0% {
    transform: translateX(0) scale(1);
  }
  70% {
    transform: translateX(-120px) scale(1.1);
  }
  100% {
    transform: translateX(-150px) scale(1);
  }
}
```

Then we need to remove the transition from the block and the animate class and instead have:

```CSS
.animate {
  animation: jump-slide 0.3s ease-out forwards;
}
```

The 'forwards' keyword at the end tells CSS that we want to keep the end state, otherwise it would go back to the initial state, so the block would jump back.

#### <b>Just CSS is not enough</b>

If you just want to define a starting state and an ending state, instead of 0% and then 100% you can just use 'from' and 'to'. Adding animation to the modal so it is animated when appearing works fine. But for disappearance we can't do it with CSS alone, since the element is removed from the DOM.

#### <b>Playing CSS animation with Vue</b>

Vue can delay the disappearance of the element, and thus we can animate it out as well.

Add the 'transition' element around what you want to animate, and there can for the time being only be exactly one child element in it. There is an exception we'll learn about later though.

An element basically has two states: not mounted and mounted. The transition element from Vue adds a couple of CSS utility classes to the element it wraps around: *-enter-from, *-enter-active and *-enter-to.

These are added in this order: enter-from first, but at the same time also enter-active. Then enter-from is removed and enter-to is added right when the animation finishes. Vue finds out how long the animation should take from these CSS classes, and it also looks for animations and transitions inside them.

Then when elements are removed, the states are reversed and Vue instead adds the classes: *leave-from, *-leave-active and *leave-to. Order is the same as above. With this Vue only removes the element once the animation is done.

#### <b>Using the transition component</b>

Add the classes described above for entering:

```CSS
.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}
```
And leaving:

```CSS
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-active {
  transition: all 0.3s ease-in;
}

.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```

#### <b>CSS animations with the transition component</b>

Given we have an animation, we don't need enter-from and enter-to, we can just use enter-active and call our animation there. We don't need 'forwards' for this since the class will be removed once the animation is over, and we're left with just the starting state through the regular styling. Didn't quite understand that, but seems like it can't jump back since the animation is gone.

#### <b>Using custom CSS class names</b>

If there are more animations or transitions on a page, having vue add v-enter-from on all of them doesn't cut it. Now we see the reason why they were called *-enter-from in the introduction, we can set a name there ourselves as a prop on the transition element/component.

```HTML
<transition name="paragraph">
  <p>This paragraph will be animated</p>
</transition>
```

This results in vue adding `paragraph-enter-from`.

We can also rename the classes entirely by adding the following props: `enter-to-class=""`, `enter-active-class=""` and you guessed it, `enter-from-class=""`.

#### <b>Animating the modal</b>

Due to fall-through this is not so easy. Wrapping transition around the modal is ok in theory since it has only one child element, but the modal component has two root elements, which this falls through to, so this doesn't work.

Two alternatives to solve this: Split the modal component into two, or add the transition element in the modal instead, so we can wrap it around the root element we need. However, now we also change how we open this component for the transition to work, since what we're doing with v-if won't have any effect.

Add :open prop to base-modal element with 'dialogIsVisible' which is true or false. Then add the v-if in base-modal on that prop.

#### <b>Transitioning between multiple elements</b>

The exception to the rule is this:

```HTML
<div class="container">
  <transition name="fade-button">
    <button @click="showUsers" v-if="!usersAreVisible">Show users</button>
    <button @click="hideUsers" v-if="usersAreVisible">Hide users</button>
  </transition>
</div>
```

To make that clear, the exception is that you can have multiple elements if only one is added to the DOM at a time. Here only one of the buttons will be visible at a time, so that's allowed. Question time, how does Vue know this? It turns out it doesn't analyze the if statements, so we have to use v-else on the second button.

There's more to this saga, the animation now is not pretty, and both buttons are actually shown on the page at the same time (though that's ok aparently because that's controlled by Vue) and they 'jump' which they shouldn't. To fix this add the mode prop to the transition component. It accepts to values: 'in-out' or 'out-in' which determines animation and add/removal order. 'In-out' animates in the new button while the old one is still there, then animates out the previous one. With 'out-in' Vue animates the old button out first, then the new button in afterwards, which looks better here.

#### <b>Using transition events</b>

The transition components emits certain events during the transition, like when it starts, when an elements is added or removed and when it ends.

`@before-enter` is emitted when the enter animation starts, so when the -enter-from CSS class is added. The method called when this event triggers receives an element, which is the element being acted on.

`@enter` for -enter-active, which is when before-enter is done.

`@after-enter` is for when animation finishes.

Then we hae the same for 'leave':

`@before-leave` for -leave-from.

`@leave` for leave-active, which is when before-leave is done.

`@after-leave` is for when the animation finishes.

These can be used to change or remove styling for instance.

#### <b>Building JavaScript animations instead of CSS</b>

There are third party libraries available for this, like ScrollTrigger from GreenSock.

We need all the events listed above when creating the animations with JavaScript instead of CSS, and they will still be called. Though not using CSS I don't think is strictly true, since we still have to change styiling on the elements with CSS, we just do it from JavaScript instead of the predefined CSS: `el-style-opacity = 0;` in beforeEnter for instance. Then in enter we can use setInterval to do something at some interval, like gradually increasing the opacity.

```JS
enter(el) {
  let round = 1;
  const interval = setInterval(() => {
    el.style.opacity = round * 0.1;
    round++;
    if (round > 10) {
      clearInterval(interval);
    }
  }, 20);
}
```

The problem here is of course that Vue doesn't know when to call afterEnter, so it's called right away. To fix that, we get a second parameter in enter which is 'done', a function we can call when we are done. Then Vue will know when we are done.

If the animation is cancelled for whatever reason, there are two more events to catch that:

`@enter-cancelled`

`@leave-cancelled`

They can be used to cancel the interval, to avoid the flickering we're seeing.

#### <b>Disable CSS transitions</b>

When we control the entire animation with JavaScript we can set `:css="false"` on the transition component to signal to Vue that we're not using CSS transitions or similar here. That means Vue won't have to spend time searching for CSS classes and so on.

#### <b>Animating lists with transition-group</b>

Unlike the 'transition' component, 'transition-group' renders elements on the DOM. Adding a tag of 'ul' means the ul element shouldn't be in the template, as Vue will add it for us. Any HTML element can be in the tag, even custom components.

Now while we can animate adding and removing list elements this way, the list 'snaps in place' after the change.

#### <b>Animating list item movement</b>

The 'transition-group' component adds another special class to help us here, when controlling multiple elements: `v-move` or if we add our own prefix like user-list: `user-list-move`. Vue will use 'transform' under the hood to move these elements, so we should add our transition of that transform.

When removing an element from the list, we have to add `position: absolute;` to the 'leave-active' element to make the remove animation work smoothly. The reason for this was not explained.

#### <b>Animating route changes</b>

Add the transition component around the router-view component. And this was again Max teaching the wrong way first, so don't do that. (Though he says it should be understood from the use of the 'could' keyword, but he <b>always</b> uses that for everything so that's impossible to discern when he means it.)

Vue gives this warning if you do it this way:

```HTML
<router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
```

So following the description above, we end up with this:

```HTML
<template>
  <router-view v-slot="slotProps">
    <transition name="route">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>  
```

One thing here though is that we see the animation when we first load the page, as technically the first act of route is an empty route, and then when the page 'starts' it switches to the route that should be used and thus triggers the animation. To fix this, we can change the mounting of the app so it only happens when the router is fully set up and 'aware' of the page that should be loaded:

```JS
router.isReady().then(() => {
  app.mount('#app');
});
```
