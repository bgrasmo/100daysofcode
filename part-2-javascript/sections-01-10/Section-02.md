## Section 2: Basics: Variables, data types, operators and functions

## Day 43 - 2022-05-22

This was taught in the web development bootcamp course as well, so I skipped through most of this.

Template literal (backticks) already introduced though. Nice. (Lesson 25, more on strings)

#### <b>Code styles and conventions</b>

I expect the auto-formatter (prettier) will help a lot, but in case: Semicolons should be placed after every expression, but not after functions or similar code snippets where you use {}. Though object is an exception from this. As a rule of thumb, you can keep in mind that a semicolon is used after {} if the {} is on the right side of the equal sign!

#### <b>Converting data types</b>

parseInt and parseFloat will try to parse a string, as number of the corresponding type and return that. So if you have `const string = '1024'` you can convert this to a number with `const number = parseInt(string)`. Another way is to add a + directly in front of the value you want to convert from a string to a number.

#### <b>Undefined, null, NaN</b>

Undefined is the default state for variables that haven't been initialized yet. I wonder if it is correct to say that the name is added, but it doesn't point to anything in memory yet? So reference to pointers would perhaps be helpful. This is also a type

Null is never assumed by default, but is something you can set if you want to reset or clear a variable. It again sounds like comparison to pointers would be helpful, as I think this points to an address in memory, but that address is empty. This is also a type

NaN stands for Not a Number and isn't its own type, but rather part of type number and so can be used in calculations when working with numbers. This can perhaps be thought of as an error code, which would be returned if you try to multiply some text with a number.

#### <b>Importing scripts "correctly" with defer and async</b>

Go to devtools and the performance tab, click the record button, reload the page, and then stop the recording. In the top 'graph', select the beginning of the 'scrambled' area. Then in the middle and bottom window you should see what networks requests were sent and what the browser did. One rather long request is getting fonts from google, so comment that out to more easily see other things happening.

First index.html is loaded, then quickly parsed (but not finished), then app.css is requested, then shortly after vendor.js and app.js. The JavaScript script tags in this project is at the bottom of the HTML page so this is a natural order. Then only after the scripts are downloaded are they executed, and only when they can be executed can the HTML finish parsing. That was in other words blocked by the scripts loading. What we want instead is our scripts to be executed after the HTML is parsed, not then start downloading and then execute after that.

By adding the 'defer' keyword to the script tags we see that parsing HTML is not blocked while the scripts are downloaded, as it was before.

Another keyword that can be used on the script tags is 'async' which tells the browser to download the scripts as soon as possible, and then executes them as soon as they have downloaded, which means parsing the HTML could be blocked while this is going on. With async, scripts will be executed as early as possible so then order of execution can't be guaranteed. If the last script loads faster, then it will be executed before the script listed before it. With defer, orer is guaranteed by the browser.

