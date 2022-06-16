## Section 35: Bonus - Web components

## Day 67 - 2022-06-15

#### <b>Web components in action</b>

What are web components? Your own HTML element, not built into the browser but created by you. (Sounds like XML, doesn't it?)

Register your custom HTML element with `customElements.define('uc-modal', Modal);` in JavaScript. The script file containing this will obviously have to be loaded in our HTML document using this custom element, and we can then use it there just like any other HTML element: `<uc-modal></uc-modal>`

'Modal' is obviously a class containing the definition for what this element does.

And that's all I think I'm going to say about that I think. I'm not sure this caught on, it doesn't seem to be what the cool kids are using these days.

Some resoures for later though:

[Web components documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)<br>
[Templates and slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)<br>
[Custom elements](https://developers.google.com/web/fundamentals/web-components/customelements)<br>
[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom)
