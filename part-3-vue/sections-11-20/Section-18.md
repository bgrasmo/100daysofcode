## Section 18: Optimizing and deploying Vue apps

## Day 89 - 2022-07-07

#### <b>Using asynchronous components</b>

Or in other words, use lazy loading for components so they are only loaded when needed.

```JS
import { createApp, defineAsyncComponent } from 'vue';

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));
```

Otherwise everything should be the same. Async components can also be used for local components and for routes, though the latter is not recommended. Components can be loaded conditionally with v-if or similar though. So instead of an import similar to the above to this:

```JS
const CoachDetail = () => import('./pages/coaches/coachDetail.vue');
```

Install firebase-tools with npm globally to set up firebase hosting. Run `firebase login` to log in and then `firebase init` in your project directory. The public directory should be `dist` given that's where the compiled files are stored.

Since we've created a single-page app with all code really running in the browser, we should accept to configure the hosting as that. That means the server will always serve `index.html` no matter the path. We want to keep our index.html file should firebase ask about it.

Then finally `firebase deploy` to upload the code to firebase.
