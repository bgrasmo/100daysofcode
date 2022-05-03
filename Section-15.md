## Section 15: Working with third party packages
## Day 17 - 2022-04-26
### Going through course content for day 45:

For many projects you will probably solve the same problems and have the same features you add over and over again. Maybe exactly the same or with only minor adjustments. Copy pasting from project to project can of course work, but might not be so easy to maintain. Given that others also experience this, there is a solution: Third-party packages which are solutions for common problems and features many experience, that is distributed online for everyone to use. This allows you to focus on the main parts of your specific website, the logic that is specific to your site and layout, as you can utilize pre-built features and styles built by others.

<b>What and why?</b><br>
What are third-party packages? Packages created by others that provide ready to use code which you can add into your projects.

Why should we use them? Because they can save you time and possibly avoid problems given you don't have to create everything from scratch every time, and can avoid copy paste mistakes and similar.

<b>Some examples of popular CSS pages and their use-case:</b><br>
<b>Bootstrap:</b> A very popular CSS framework (package) that provides dozens of pre-built component styles, for instante for buttons, alerts and so on.

<b>Materil UI:</b> A popular CSS framework similar to bootstrap in providing pre-built component styles, but it follows the Material design specification by Google.

<b>Tailwind CSS:</b> a popular CSS framework that also provides dozens of pre-built utility styles, which you can use to style your HTML code without writing a lot of CSS code.

<b>Popular JavaScript and their use-case</b><br>
Unlike for CSS, it's less about choosing one package for everything, but more about getting small pieces that solves the various small problems. Some examples:

Image carousel: Animated image gallery where images can be cycled through via page controls.

Scrollspy: An indicator, for instance in an outline, that shows the user where on the page he/she is.

Parallax effect: A visual scrolling effect where different elements are animated at different speeds or with different effects.

<b>Third party vs custom code (your own code)</b><br>
Third party:
* Less code to write, can see results quickly
* But less control, more "default" behavior.

Custom code:
* More code to write, more work to do, possibly more error-prone
* Full control over the result and you can maybe make it stand out more

There is no right or wrong here, but typically you will use both approaches, so use third-party packages to solve some problems, while writing your own code to solve others.

<b>Introducing bootstrap</b><br>
https://getbootstrap.com/

See documentation, select components and maybe buttons to see what button look you can get, and what you would add to your HTML document to get that look.

<b>Adding bootstrap</b><br>
Go to getboostrap.com, click "get started" and then copy the link under CSS to load these styles in your HTML document. This will load the necessary styles, just like we've loaded google fonts so far. The same can also be done for JavaScript.

Go to documentation again, go to components and Navbar and copy all that code you see into the body part of your index.html. You might want to wrap in in a 'header' element.

<b>Adding a JavaScript package</b><br>
As you can see, the drop-down menu doesn't work. For this we also need some JavaScript code, even though Bootstrap is mainly for CSS. They have provided this for us as well, it is found under 'Bundle' where you found the CSS link. Their instructions state that the link should be added last in the HTML file, but we'll add it in the head section, and add property 'defer' to it. Now the drop-down menu works!

<b>Adding an image carousel</b><br>
Again under components, select carousel, and copy the code under 'with indicators'. Add it in the 'main' section in body. You can fine-tune this code of course, and we'll make a small change by changing the first div to section. Don't forget the closing element!

<b>Combining third-party packages with custom code</b><br>
Create a styles.css in your folder, and load it after the Bootstrap CSS in index.html.

Still in index.html we can change the id in the first div, provided we also change it everywhere else it is referenced. As can be seen, there are some data- attributes using it, so they will have to be changed as well.

Now we can add some of our own styling to this id we changed. For instance, to center, make the images smaller and the same size:

```CSS
#carousel-example {
  width: 100%;
  max-width: 50rem;
  height: 30rem;
  margin: 2rem auto;
}

#carousel-example img {
  height: 30rem;
  object-fit: cover;
}
```

<b>More bootstrap examples</b><br>
Adding a form, and this time we don't want to write it all ourselves. Styling buttons and checkboxes can be a pain, but a third-party package like bootstrap can help make that easy for us. Just copy the first example shown under Forms/Overview for now. We'll create a dummy newsletter signup form, so we can remove the div containing password.

<b>Make the navbar fixed</b><br>
We want the navbar to stay fixed at the top of the screen even if you scroll down on the page. We find documentation on how to do that in navbar under elements on the bootstrap pages, and again from 'placement' in the right-hand menu:

```HTML
<nav class="navbar fixed-top navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Fixed top</a>
  </div>
</nav>
```

We actually only need the 'fixed-top' class.


<b>Another example: Preparing a parallax page</b><br>
Just setting up a basic page with an image and some text to make the page scrollable, see parallax.html

### Going through course content for day 46:
<b>Adding a parallax effect package</b><br>
Search for parallax.js and you will see there are many parallax packages to select from. We'll use the one called simpleparallax.

Add the link from jsDelivr.com:
```HTML
<script src="https://cdn.jsdelivr.net/npm/simple-parallax-js@5.5.1/dist/simpleParallax.min.js"></script>
```

We will need to write a little bit of code ourselves to get this activated, so create a new file called parallax.js and link it after simple-parallax.

The we simply need to get the image we want the parallax effect on, and activate the parallax effect like this:

```JS
const imageElement = document.getElementById('main-image');
new simpleParallax(imageElement);
```

The effect can be configured, for instance we can change the inner scroll of the image to another direction. We'll try to speed it up a little, by sending an object as the second argument to the function, like this:
```JS
new simpleParallax(imageElement, {
  scale: 1.6,
  delay: 0.1,
});
```

<b>Viewing third-party packages source code</b><br>
These packages are typically open source, which means we can see the source that runs them. They are also typically hosted on github. If you search for 'github simpleparallax' you should be able to find it, and get an idea about the code behind it.
