## Section 30: Performance and optimizations

## Day 64 - 2022-06-12

#### <b>What is performance optimization about?</b>

Performance can be a lot of things.

| Startup time                                            | Runtime performance                                               |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| How long does it take to 'see' something on the screen? | How smooth does the application run, are there freezes or lag?    |
| How quickly is a user able to interact with the page?   | How smooth does animations play, is there any visual lag?         |
|                                                         | Are there any memory leaks? Is the page getting slower over time? |

This can be influenced by a lot of factors! CSS code, HTML code, JavaScript code for instance. As well as the speed / capacity of the server, or even the speed / capacity of the client.

For startup time, the question is how fast does the script load and execute? For runtime performance, how much work does the script do, and how efficiently does it do that? Also, how much memory does it use, and are there leaks increasing useage, and therefore possibly slowing down the application over time?

Startup time might primarily be a client side issue, as on the server the code is most likely already there and it doesn't need to be downloaded. Maybe. I wonder how serverless plays into this though.

Runtime performance affects both the browser and node.

#### <b>Optimization potentials</b>

For startup time, an important factor is the size of our scripts. Bigger scripts take longer to load and parse. Another factor may be the number of http requests that has to be made to load the page as there is a startup cost for each tcp connection. (But I guess http/2 improves this?)

For runtime performance, optimize code execution and DOM access. Avoid unnecessary code execution, especially unnecessary DOM operations / repaints. Also avoid memory leaks (though how is that a thing with a garbage collector?) and find code alternatives with better performance. This is especially important for 'high-frequency' code, or code that is used a lot. (How about optimization by engine though, does it not help?) We could also do micro-optimizations, which optimize for a very specific use-case, perhaps related to data-structures to frequent access / changes.

#### <b>Measure performance</b>

Obviously, don't guess. Instead measure the performance. Check roundtrips and script size. Perhaps set 'budgets' for this, how big can the scripts be, how many roundtrips can there be. Also measure performance with devtools, and explore best practices, patterns and benchmarks.

Remember to measure your production code, not your unoptimized development code.

In the browser: performance.now(), the devtools (lighthouse for instance), jsperf.com and webpagetest.com.

In devtools, have a look at the elements tab. When you click on the actual page, the parts that are touched/updated will be highlighted in elements. If one click touches a lot of elements, that might be a problem.

The network tab shows the size of the assets we are downloading, as well as the number of them. Also throttle speed to slow 3G for instance, to see how things are loading, and what would happen if clicking on the page before large assests have loaded. CPU can also be throttled.

See also the following pages for more information and further resources:<br>
[Performance features reference](https://developer.chrome.com/docs/devtools/evaluate-performance/reference/)<br>
[Optimize JavaScript execution](https://web.dev/optimize-javascript-execution/)

Turn on 'paint flashing' to see when something renders again. If 'everything' flashes green, there clearly is a problem.

#### <b>Wrap up</b>
[HTTP/2](https://web.dev/performance-http2/)<br>
[Google performance docs](https://developers.google.com/web/fundamentals/performance/rendering)<br>
[Chrome devtools performance docs](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)<br>
[Chrome devtools memory](https://developers.google.com/web/tools/chrome-devtools/memory-problems)
