## Section 3: Efficient development and debugging

## Day 43 - 2022-05-22

#### <b>Using shortcuts</b>

Mark something, then hit ctrl-d (on Linux) to mark the next matching occurance of it.

On a given line you want to move, press alt and then the up or down arrow key to move it in that direction. Keyboard shortcuts can be searched by text 'add next' or 'ctrl d' for instance.

#### <b>Working with auto-completion and IDE hints</b>

Ctrl-space is a shortcut to bring back an IDE hints menu if it should disappear.

Otherwise lots of info about auto-completion and these hints that I have been using already. Though I could probably investigate this closer and learn more about useful things I can take advantage of.

#### <b>Extensions</b>

Install extensions, but not too many. Only have one of a type, as they can interfere with each other.

#### <b>Tweaking editor settings</b>

Go to settings, search for tab width for instance, to find out how much space is added when tab key is pressed.

#### <b>Breakpoints</b>

Go to devtools and the sources and you'll find all the files the browser loaded for displaying the page. Under assests and scripts you can find the JavaScript files loaded, and as of now they should be exactly the same as if viewed in the editor, comments and all. Here you can add breakpoints by simply clicking on the line number where you want execution to halt. Multiple breakpoints can be added. Then you can see the value of variables for instance by hovering over them. Note that execution stops before the line where you set the breakpoint, so the line with the breakpoint won't be executed and variables on this line won't hold (any) updated values yet.

If you stop on a line that makes a function call, you can step into said function to see what it does.

The window at bottom also shows the call stack, which are the functions have have been called and you can use this to jump to lines that are connected. There is also a window for showing the scope of the variables, and values can be changed here. In addition you can set up a watcher for an expression you'd like to always see the value of. This can be either just a variable name, or the sum of two variables and more. This watcher is cleared when you reload the page or the function execution is finished though, so it's only temporarily.

Conditional breakpoints can be set by right-clicking on a line number, and setting an expression to match, and the breakpoint will only halt the code if the expression matches. In the window at the bottom there are also event listener breakpoints, so you can set a breakpoint on mouse clicks for instance, and you will then be taken to the first line of the function that handles that click.

I think this is best seen/experienced and not read about with what I've written here though.

#### <b>Testing code directly in devtools</b>

Code can also be directly changed in the sources tab, though that probably isn't very easy if the code was minified as was taught in the webdev bootcamp course.

#### <b>Debugging code directly inside VS Code</b>

An extension called 'debugger for chrome' can help us do the same as we just did in the browser, in vs code.

Breakpoints in vs code are set to the left of the line number and shows as a red dot. Then we can select 'start debugging' from the debug menu, which will create a launch.json file if one doesn't exist already. If we're just debugging html and don't have a local development server running where the code we want to debug runs we have to change the default url vs code suggests. Copy the url from the browser window where you were testing your html page.

