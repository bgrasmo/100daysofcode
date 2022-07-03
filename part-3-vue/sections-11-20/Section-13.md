## Section 13: Routing - building multi-page single-page applications

## Day 80 - 2022-06-28

#### <b>What and why</b>

Extract instructors example project. It has two buttons that functions as tabs and clicking them changes the content shown on screen, but it does not change the URL. Routing is about making the URL change.

The benefit of having the URL change is that we can share a specific part of our page, instead of having to give instructions how to get there.

#### <b>Routing setup</b>

Add the vue router to the project: `npm install --save vue-router@next`. Then import it and set it up:

```JS
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: []
});
```

History is for having Vue remember the users navigation so that if the back button is clicked, Vue knows what to show. Routes is where we set up the routes by telling Vue what component to load for what route.

#### <b>Registering and rendering routes</b>

We will also have to import the components we want to add to the router to register them, and then 'use' the router for Vue to become aware of it:

```JS
routes: [
  { path: '/teams', component: TeamsList},
  { path: '/users', component: UsersList}
]

const app = createApp(App);

app.use(router);
```

But we're not telling Vue what to load those components on. Replace the dynamic component in App.vue since we're not using that now and put `<router-view></router-view>` in its place.

#### <b>Navigating with router-link</b>

Remove everything related to dynamic linking since we won't use that anymore. Instead of buttons in TheNavigation add `<router-link></router-link>`. HTML can be added between the tags since slots are being used behind the scenes. It also needs the 'to' prop to know what page to go to when clicked:

```HTML
<router-link to="/teams">Teams</router-link>
```

To style this we should actually style an anchor tag, because that is what this will render under the hood. Vue sets two classes on the link which we can also use for styling, 'router-link-active' and 'router-link-exact-active'

#### <b>Styling active links</b>

The difference between the two classes is that 'router-link-active' would also apply to nested links, so '/teams/id' for instance, while 'exact-active' is only applied to the item that fully matches the current path. In other words, the first one just needs something to be a part of the path, while the latter needs an exact match.

These classes can be changed through configuration of the router, where we can set linkActiveClass and linkExactActiveClass.

#### <b>Programmatic navigation</b>

Sometimes we need to navigate away when some task has finished. With router in the project, we got access to 'this.$router' that can help us with this. It has a 'push' method that pushes a new path to the routing history. (?)

```JS
this.$router.push('/teams');
```

#### <b>Passing data with route parameters</b>

We can add a dynamic route like this:

```JS
{ path: '/teams/:teamId', component: TeamMembers }
```

This will match /teams/anything by the way, so the order in our file matters. Should we add a route for /teams/new after this, it won't ever match since the dynamic route here would catch it instead.

In the 'created' lifecycle hook we get access to the injected data we just added to the file, but also the routing data, so the dynamic part after /teams/. That's available through `this.$route`. The 'params' method is what we want here, and it will be stored in the name we gave it, which is 'teamId' here: `this.$route.params.teamId`

#### <b>Navigation and dynamic paths</b>

Change the anchor tag to router-link, and bind the to prop so it can pass an id in the link. Add id in props in the file, and then send it in from the TeamList component. Now the links will contain the team id and that team will be shown.

#### <b>A Vue bug</b>

In case this is encountered: `Uncaught (in promise) TypeError: Cannot read property 'members' of undefined` see this discussion: https://www.udemy.com/course/vuejs-2-the-complete-guide/learn/#questions/12619882/

## Day 81 - 2022-06-29

#### <b>Updating parameter data with watchers</b>

If you are on the page that was loaded for a dynamic parameter and with a router link want to go to a different page, that won't work. (So a link from /teams/t1 to /teams/t2.) However, the URL changes but new content isn't actually loaded.

Vue router does not destroy and rebuild the components that were loaded when you navigate around as they are cached for efficiency reasons. We're also loading team data when the component is created, and as was just explained, components aren't recreated with this approach.

When the URL changes, as it did here, $route changes as well as it holds information about the route. In comes watchers:

```JS
watch: {
  $route(newRoute) {
    this.loadTeamMembers(newRoute);
  }
}
```

#### <b>Passing parameters as props</b>

One disadvantage now is that our team members are only available through routing. (Don't know what that means.) We rely on $route for loading teams members. Ok, the problem is if we embed this component in another component because we change the application or we want to use it in different places, then it won't work. So the better approach would be to get the team id through props.

However, the router doesn't send anything as props. Unless explicitly told to do so, which is what we'll do next:

```JS
{ path: '/teams/:teamId', component: TeamMembers, props: true }
```

#### <b>Redirecting and catch all routes</b>

Our main page has no content. We want to show the team list but we don't want to also load that component for the / route. To solve that we can redirect to that page:

```JS
{ path: '/', redirect: '/teams' },
```

Another option would be to set an alias on the route you want to load, but that means the URL doesn't change:

```JS
{ path: '/teams', component: TeamsList, alias: '/' },
```

To catch any other route (path) the user might randomly enter add a catch all as the last route:

```JS
{ path: '/:notFound(.*)', component: NotFound }
```

#### <b>Using nested routes</b>

In some applications you might want to have nested routes, or a router within another router. To do so, add 'children:' to the route where you want to have nested routes. We can do that with /teams and /teams/:teamId. Then we don't have to specify /teams/ in front of the second route:

```JS
{
  path: "/teams",
    component: TeamsList,
    children: [
      { path: ":teamId", component: TeamMembers, props: true },
    ],
}
```

Now that this teamid route is no longer at the root level, it can no longer be rendered there. Instead it has to be added to the component where the route is defined as the child component. Here that's the teams list component and it needs to have `<router-view></router-view>` added in the template. Now the team members will be shown above the list of teams on the teams list page. With nested routes, 'teams' is still highlighted when we load team members. It wasn't before.

#### <b>Named routes and location objects</b>

The 'to' in router-link doesn't only accept a computed method that returns a string path, it also accepts an object where we can do the same, return a path and the string. That doesn't give us much, it simply adds an object to the mix. To fully utilize that object, we can add a name property to the path in routes:

```JS
{
  name: 'teams',
  path: '/teams',
  component: TeamsList,
  children: [
    { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
  ],
},
```

Now we can use the name of the path in the object instead. With a dynamic link, we also need a 'params' object for the expected parameters:

```JS
computed: {
  teamMembersLink() {
    // return '/teams/' + this.id;
    return { name: 'team-members', params: { teamId: this.id } };
  }
}
```

Now if we change the path we only do that in once place, and we don't have to remember to update the component as well, as long as the name doesn't change.

The same object can be provided to 'this.$router.push' for navigating programmatically.

#### <b>Using query parameters</b>

Add a 'query' property to the object returned to router-link which contains an object with the query parameters:

```JS
teamMembersLink() {
  return {
    name: 'team-members',
    params: { teamId: this.id },
    query: { sort: 'asc' },
  };
},
```

The destination, which is team members here can access these query parameters with 'this.$route.query'.

#### <b>Rendering multiple routes with named router views</b>

Multiple routes on the same level, for instance some in the header, some in main and some in the footer of the page. If router-view is added multiple times, the same content will loaded as many times as the element is added, which isn't too useful. Instead we want one footer to load for the teams area and another for users.

It is possible to add multiple components per path by changing to the plural form of the word like that. Now we can name our router views with 'name=', and as with slots, we are allowed to have one unnamed which will be the default.

```HTML
<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <router-view name="footer"></router-view>
  </footer>
</template>
```

```JS
{
  name: 'teams',
  path: "/teams",
  components: { default: TeamsList, footer: TeamsFooter },
  children: [
    { name: 'team-members', path: ":teamId", component: TeamMembers, props: true },
  ],
},
{ path: "/users", components: { default: UsersList, footer: UsersFooter } },
```

Routes with only one component goes to the default router-view, though I get an error when I try that so maybe something has changed since the course was recorded.

#### <b>Controlling scroll behaviour</b>

If we've scrolled down on the page, click a link that updates something at the top of the page, the content changed but we have to scroll up to see it. We can add scrollBehavor where we create the router, which gets 3 parameters. Where we are going to, where we came from, and savedPosition which only seems to be set if we use the back button, and contains the position we had on the page. This method should return an object describing where to scroll to on the page change, so we can check if savedPosition exists and return that.

```JS
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition;
  return { left: 0, top: 0 };
}
```

How to know where on the page the content that updated is?

#### <b>Navigation guards</b>

This can be useful if you have routes a user should only be able to access if they are authenticated, or a user shouldn't be able to navigate away if they have unsaved changes on the page.

The router object has a beforeEach method that will be called before each navigation and this in turn expects a function that should accept 3 arguments: to, from and next. Next is a function we have to cancel or confirm this navigation action.

Side note, to indicate that you have to accept 2 arguments you don't want to use in order the reach the third one, add _ as first argument and _2 as second.

Calling the 'next' function with 'false' will cancel the navigation, while 'true' would confirm it, but that's the default action and doesn't have to be added.

The third option we can use with 'next' is where to navigate to. Either a string containing the path, or an object where we can call a named route. This allows us to set query parameters as well:

```JS
router.beforeEach((to, from, next) => {
  console.log('Global beforeEach');
  console.log(to, from);
  // next({name: 'team-members', params: {teamId: 't2'}});
  next();
});
```

Added in main.js like that, it's a global guard which will be triggered for all routes.

#### <b>More about navigation guards</b>

To add a nagivation guard just for one route, that can be added with 'beforeEnter' on the path object. It works the same as the global beforeEach. It can also be added in a specific component and not directly on the route with `beforeRouteEnter() {}`. With Vue router, this will be called before navigation to this component is confirmed.

They are executed in this order, global first, route config second then component last.

There's also a `beforeRouteUpdate() {}` method that will be called whenever the user simply navigates between teams, but stay on the same page so the component is reused. This can be used to call loadTeamMembers, just as we did on created(), as an alternative to watching the teamId prop. Though using watchers is more flexible, since then we don't bind the component to be used with routing.

#### <b>The global afterEach guard</b>

This works mostly like beforeEach except it doesn't pass in 'next' to the function since navigation has already happened. Could maybe be used to send something to the server.

#### <b>Route leave guards</b>

The 'unmounted' lifecycle hook is called after navigation has been confirmed and gives us no way to cancel it. For that, we can call `beforeRouteLeave() {}` in a component. This will be called before all of 'beforeEach' and 'beforeEnter' guards. Here we get to, from and next again.

#### <b>Route metadata</b>

The 'meta' property can be added to any route object, like name. With meta you can set pretty much anything you want, for instance a string, an array or another object with key-value pairs. The meta data can be accessed anywhere you can access '$route', as well as in the route guards.

#### <b>Organizing route files</b>

Now some components are are loaded through the router while others are not. Then it could make sense to move the 'route loaded' components to its own directory, perhaps named 'pages'. For team members we also accept the team id as a prop, so it's not only loaded through the router, so it doesn't make sens for a separate directory in all cases.

It could also be useful to move all the router related logic from main.js to its own file as it takes up quite a bit of space.
