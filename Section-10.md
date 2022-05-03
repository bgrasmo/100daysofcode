## Section 10: Adding forms to websites
### Going through course content for day 26:
<b>Adding forms to websites</b><br>
What are web forms? A way for the user to enter input, as most websites are not just about presenting/showing content. For example a contact form, checkout forms for address and so on, login form, comment form.

There are special HTML elements for getting and handling user input. The most important one that will be used all the time is input: ```<input type="...">```. The type attribute controls which type of input will be shown, for instance single line text input, only numbers input, email-address input and so on. Another important one is ```<textarea>``` which is a multi-line text input field. ```<select>``` is for dropdown multiple-choice or multi-select input. ```<button>``` is not for taking input, but for resetting or submitting the form.

Notice how input and button are both inline elements. Devtools shows it as display: inline-block as default, so margin and padding works as for block elements.

<b>The form element, submission and different types of requests</b><br>
We have the input and we have the button, but we're missing the actual form element. This is not an element for fetching user input, but should wrap around your inputs and should mark the overall form. So if our input and button together should create a form so the user can enter and submit their data, we add the form element around it.

Pressing the button before the form element was added did nothing. After, it clears the input field and a question mark is added to the url. But nothing was actually sent yet. We need the action and method attributes for that. Action specifies where to send the data, ```/user-data```for instance, method specifies the method to use, like POST or PUT.

```Input``` can take a name property, and setting it like this: name="user-name" will send "user-name" as key, with the content of the input field as value for that key when using POST method. If GET method is used, the data will be set as query parameters on the URL.

### Going through course content for day 27:
<b>Styling the form element</b><br>
Just like with any other element:

```CSS
body {
  background-color: rgb(31, 31, 31);
}

form {
  width: 30rem;
  margin: 3rem auto;
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
}

input {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

button {
  display: block;
}
```

The input field was using the wrong box sizing, so the space after the element was less than in front of it. Setting it to border-box fixed that issue.

<b>Adding labels</b><br>
The form so far is missing some critical information, namely what input is expected. We can use the label element for this:

```HTML
<label for="your-name">Your name</label>
<input type="text" name="user-name" id="your-name">
```

The for attribute connects the label to a given input, otherwise screen readers wouldn't know what belongs where if there are many input fields. To connect it, the input needs an id. That can be the same as name. The name identifier only matters for the form submission and is meant for the server receiving the request.

Connecting the label to an input fields is mainly for assistive technologies, but it also changes something on the page, though not visibly: You can now click the label, and the corresponding input field will be activated for typing! I did not know that!

<b>More detailed form styling</b><br>
Setting a fony-family on the body tag does not affect the input font, or the button font! This is because they have a font set by the user agent (the browser) and specificity overrides the global body font-family. Because of that, we need to override it again.

Instead of just setting just font-family, we can also use the ```font``` property to override all font properties: ```font: normal 1 rem 'Roboto', sans-serif;``` If we just want to use the same font settings as we have in the rest of the document, we can just use inherit. The same will have to be done for input if you want it to follow the document style.

We can change the cursor on hover for instance, to change to the hand icon.
```CSS
button {
  cursor: pointer;
}
```
Notice how we don't have to specify the :hover pseudo-selector for this

<b>Understanding different input types</b><br>
```<input type="text">``` A single-line input field, can't enter multiple lines easily. Can be as long as we want, unless restricted to a given number.<br>
```<input type="email">``` Looks the same as single-line, but is optimized for email input on mobile. We also get some input validation so if it doesn't look like a valid email address a warning will be shown.<br>
```<input type="number">``` Optimized for numbers on mobile. Also restricts user from inputting anything but numbers. Gives an arrow selector to increase or decrease the number. Can set a step value to control the increments. step="10" would increment/decrement by 10 when clicking the arrows. We can also set max and minimum value.<br>
```<input type="password">``` Character input is hidden.<br>
```<input type="date">``` Opens a date picker when clicked, making it easier to input dates<br>
```<input type="radio">``` Can be used to present multiple options where only one option can be selected at a time.<br>
```<input type="checkbox">``` Can be used to present a toggle (yes/no) option to agree to terms or not.<br>
```<input type="file">``` Allows the user to pick a file to upload.<br>

See more [input types](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) on MDN. Note that not all options are supported equally well in all browsers.

<b>Working with radio buttons</b><br>
To force the user to only select one of the options, all radio button choices have to have the same name. They will have different IDs, but the name must be the same. We also have to set the value to be sent when a given radio button is selected.

Note that value can be set for all input types, and will function as something pre-selected or pre-entered or a default value shown.

### Going through course content for day 28:
<b>Using checkboxes</b><br>
For a single checkbox, like agree to terms, there is one special thing to note: If the checkbox is checked, it's name will be sent to server with value on. If it isn't checked, the name won't be sent.

For a group of checkboxes (having the same name property) where you can select from none to many options, value is necessary to discern what the user checked or not. Curious minds wants to know, couldn't we just have different name for the checkboxes? Given they would then send =on if check.

<b>Textarea for longer input</b><br>
The textarea element has a closing tag, separating it from the input element which does not. Typically it will not have any content between the opening and closing tag though.
```HTML
<textarea name="" id="" cols="30" rows="10"></textarea>
```
It also doesn't have a type, as it is always for long standard text.

Note: cols and rows was added by VS Code when it created the element and the teacher did not go through these. It seems they set some default size of the text area in rows and columns, though it doesn't seem to match with 30 character columns and 10 rows. Also in new browsers the text area can be resized by clicking the bottom right corner. To disable this set resize: none; on the element.

<b>Adding a dropdown</b><br>
A dropdown menu is created with two elements, ```select``` for the container and ```option``` for the different options to select from.
```HTML
<label for="favoritecolor">Favorite color?</label>
<select name="favorite-color" id="favoritecolor">
  <option value="blue">My favorite color is blue</option>
  <option value="black">My favorite color is black</option>
  <option value="red">My favorite color is red</option>
</select>
```

By default the value that is submitted is the text shown to the end-user, unless you add a value property.

<b>Forms and semantics (structuring forms)</b><br>
Our huge form is a bit hard to read when looking at the code, so let's see if we can't organize it a little better. We can start by grouping similar items into sections. Then adding titles with h2 makes it easier to digest as a user as well, as it's more clear what it's about. Then add a list for the sections with more than one element.

Removing all padding and margin from lists gives us the semantic value of having a list, but we don't get any (unwanted) visual effects from it

<b>More about form buttons</b><br>
The button, when placed inside a form, submits that form. Then it depends on the attributes set, action and method, how the form is submitted.

Button behavior can be overridden with JavaScript which we'll dive into soon. It is also worth mentioning that buttons can be added outside forms. You don't have to use them in forms. It's just that inside of a form they have a default behavior of submitting the form. Outside of a form you will always have to use JavaScript to do anything when a button is clicked.

Inside a form, if you want to override the default behavior, you can do that with the type attribute. The default for type for a button is submit, so you don't have to set this, but you can to be more explicit. If you sett button type to button, it will not submit the form.

We can add a second button which we can use to reset or clear the form. For this to work, we can set the type to reset.

<b>Validation attributes</b><br>
We can override validation on variour input types by setting the "novalidate" attribute on the form. No value needed, it acts as a boolean. This might be needed if you bring your own validation logic, say because you have written that in JavaScript.

Adding "required" to any input element makes the content required. Meaning, it might not matter what we enter, but we have to enter something. Like novalidate this is a boolean.

We can also add another attribute to require a certain minimum length of the input, for passwords for example: ```minlength="15"```. There is also an option to restrict the input with maxlength.

Notice, we have to set the required attribute for the input to actually be required. If we set a minlength, but not required, we can actually skip the element. It's only if we've typed something in the element that doesn't meet the criteria that it will complain.

To add restrictions on age, simply set the min and max attributes. ```min="18"``` if minimum allowed age is 18 for instance, and ```max="120"``` if maximum allowed age is 120.

Date can also be required, and min here will not be a number, but a date expressed in a certain format. It should look like this: ```min="1921-01-01"``` which would say that the minimum date is january 1 1921. Max for date can be set the same way: ```max="2022-12-31"``` for end of year 2022. The date picker pics up on this, and if max date is less than todays date, it might set max date as default selected date.

Vaølidation can also be added on radio buttons, but adding require to them, and by them it means all of them. It does not mean all of them are required, but one of them.

<b>More input and form attributes</b><br>
You can add placeholders to your input fields. This will be done with the placeholder attribute, instead of entering something as a default value as was mentioned before. The advantage of the placeholder is that it shows in light grey text, and vanish as soon as the element is activated. Meaning the user doesn't have to delete the text first, to start typing. Another way to look at this is that the value will be treated as if the user entered it. (And that might be useful to pre-fill forms later) This should not replace the label, as it does not have the same accessibility value as the label has.

For textarea we have an additional attribute, rows. Rows set how many rows are displayed, how big that textarea is. As for the resize that was mentioned earlier, it can also be set to horisontal, vertical or both, to decide how the area can be resized, if at all.

### Going through course content for day 29:
Challenge time, finished page shown, can you recreate it?

Basically a copy of the form teacher had already walked through, so a walk in the park, just minor variations though time-consuming.
