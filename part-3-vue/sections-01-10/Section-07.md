## Section 7: Moving to a better development setup and workflow with Vue CLI

## Day 74 - 2022-06-22

#### <b>Introduction</b>

Some repeated lessons here as this was also taught in the web dev course. One point worth mentioning again is that we get better IDE autocompletion support when running our code from a local development server, and have Vue for instance installed as a node module and not just loaded in the HTML document.

Install vue-cli with `npm install -g @vue/cli` and then create a new project with `vue create <project-name>`.

The files ending in .vue contains the configuration for the app or a component as well as the template for that. The template we previously defined in the HTML document, or as an example as a template string in the object configuration, but now it's between the 'template' tags in the .vue file.

#### <b>Creating a first Vue app</b>

Add empty template and script tags to App.vue file, then create the app object stored in a constant as normal, with the data object in the script tags. Now we need to import this in our main.js file, and we'll use a default import where we just specify a name. The alternative would be a named import in curly braces where we specifically import some named functionality.

However, we shouldn't store it in a constant as then it'll only be available in the App.vue file, so we'll simply export the object instead:

```JS
export default {
  data() {
    return {
      friends: []
    }
  }
}
```

#### <b>Adding a component</b>

Again create the template and script tags, and then in main.js store the result from createApp in a constant so we can import and add the component:

```JS
import FriendContact from './components/FriendContact.vue';

const app = createApp(App);

app.component('friend-contact', FriendContact);
app.mount('#app')
```

#### <b>Add styling</b>

This is done with adding 'style' tags in the app or component file.

#### <b>Wrap up</b>

Alternatives to Vue CLI and Vetur is to initialize the Vue project like this: `npm init vue` and Volar is an alternative to Vetur. Npm init vue should walk you through the setup, and for a basic Vue project 'no' can be selected for all options.

