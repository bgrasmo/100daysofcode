## Section 12: Sending HTTP requests

## Day 79 - 2022-06-27

#### <b>Setup and adding a backend</b>

Extract instructors example project. Create firebase account and add a realtime-database.

Now add a POST request to LearningSurvey with fetch:

```JS
fetch(
  "https://redacted-vue-demo-address.firebase/surveys.json",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: this.enteredName,
      rating: this.chosenRating,
    }),
  }
);
```

Since we're now sending data to a backend, we can comment out the 'emit' since that was just for updating the frontend when we didn't have the backend. Since we're not managing the data in App.vue anymore, comment out the data and method related to it there as well. We also don't need to bind results and listen for the event on the custom elements so remove that as well. Which means we currently won't receive anything in the prop in UserExperiences, but that will be handled later.

To use Axios instead of fetch:

```JS
import axios from 'axios';

axios.post('https://redacted-vue-demo-address.firebase/surveys.json', {
  name: this.enteredName,
  rating: this.chosenRating,
});
```

So a lot less code to write at the expense of adding an extra package. At least for the browser where fetch is built in.

#### <b>Getting the data stored</b>

We won't receive the data as props anymore in UserExperiences so remove that. Instead add data() and a 'loadExperiences' method that will call fetch. Since GET is default we don't need the method, get requests doesn't have a body and then we don't need to set the header either. Since the get request can take some time (though probably in ms, like 300ms, 500ms) we don't want the application to halt while waiting for that, so it returns a promise. We get the data it returns in the .then block. There's a json method on that object, to have the data converted to a JavaScript object, and that again returns a promise. So by returning that promise, we can get it in the next .then block.

```JS
loadExperiences() {
  fetch(
    "https://redacted-vue-demo-address.firebase/surveys.json"
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
  .then((data) => {
    const results = [];
    for (const id in data) {
      results.push({
        id: id,
        name: data[id].name,
        rating: data[id].rating,
      });
    }
    this.results = results;
    });
  }
}
```

#### <b>Loading data when a component mounts</b>

For this we can utilize the 'mounted()' lifecycle method. Simply execute the loading function in it in the component:

```JS
mounted() {
  this.loadExperiences();
}
```

#### <b>Showing a 'loading' message</b>

Add 'isLoading' data property and set it to false initially. Then before fetch set it to true, and in the last .then block set it to false again. Now add a paragraph in the template stating data is loading, and check if it should be shown with v-if. The list containing the data can then be shown with v-else.

#### <b>Handle the 'no data' state</b>

Handle with v-if on the elements in the template.

```HTML
<p v-if="isLoading">Loading data, please hold</p>
<p v-else-if="!isLoading && (!results || results.length === 0)">
  No stored experiences found, want to add one?
</p>
<ul v-else-if="!isLoading && results && results.length > 0">
  <survey-result
    v-for="result in results"
    :key="result.id"
    :name="result.name"
    :rating="result.rating"
  ></survey-result>
```

#### <b>Handle technical / browser side errors</b>

Add a .catch method to catch errors, set an error message and then check for that in the template above.

#### <b>Handle error responses</b>

If an error occurs on the server, we do get a response, but it says something went wrong. That won't trigger the .catch block. We can provoke this by saying we'll send json, but instead send a regular JavaScript object. (In other words, not stringify it.)

To detect this when post'ing, we need a .then block there as well, even though we don't really care about the response. Given the response object we can check if response.ok is set, and if not, set an error message.

```JS
).then(response => {
  if (response.ok) {
    // Yay, but we don't really care about the result
  } else {
    throw new Error('Could not save data!');
  }
}).catch((err) => {
  this.error = err.message;
});
```

