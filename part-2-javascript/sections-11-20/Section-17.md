## Section 17: Async JavaScript - promises and callbacks

## Day 58 - 2022-06-06

#### <b>Understanding synchronous code</b>

JavaScript is single-threaded which means it can only execute one task at a time, and so code is executed in sequence. That means if some piece of code, some function takes a long time to execute, then that blocks the rest of our code from executing. If JavaScript was multi-threaded all functions could execute at the same time, but that would give another set of problems if one function depends on another function having finished first before it can run. Not a problem in JavaScript though since order is guaranteed.

#### <b>Understanding asynchronouos code</b>

Some times we have code that doesn't finish executing immediately. What to do then, how do we avoid that code from blocking the rest of our code from running?

For that we have asynchronous code execution, which means we can 'offload' code that takes longer to run to the browser. For instance the setTimeout() example, we set a timer but hand handling of that over to the browser so the rest of our code can continue executing. That pretty much means we are using multiple threads after all, one for our code, one for the browser handling that timeout function.

In this example we add a callback function to setTimeout, and that is the function the browser should call once the operation is finished. That means our script can continue to run, but we can also do something when this longer-running operation is done.

addEventListener is another example where we have a callback function, and then we let it be up to the browser to detect when the event triggers and our function should be called, and in the meantime our script can continue.

#### <b>Blocking code and the event loop</b>

Given an event listener which we've handed off to the browser to handle, and then this long-running code:

```JS
let result = 0;
console.log(Date.now());
for (let i = 0; i < 100000000; i++) {
  for (let ii = 0; ii < 50; ii++) {
    result += ii;
  }
}
console.log(Date.now());
```

What happens is that the callback function actually won't execute before the code above is done. So if you click the button multiple times when the loop is running, multiple executions will be fired when the loop is done.

Now it's time to learn about the event loop, which helps us deal with asynchronous code and callback functions which are typically used in these scenarios.

Given this code which sets up two functions, sets up a timer and then calls a function:

```JS
const greet = () => console.log('Hi');

const showAlert = () => alert('Danger');

setTimeout(showAlert, 2000);

greet();
```

The two functions are set up, then the timer is pushed to the stack and it again offloads its job to the browser, the browser will manage the timer. This function is now done executing and it's popped off the stack. The timer might still be running, but that is managed by the browser. Now the greet function is pushed onto the stack and executed which means console.log is pushed onto the stack and executed. For this example, let's assume the timer finishes while console.log is still executing. Now we need a way to tell JavaScript what to do, that the show alert function should be executed, and for that a message queue is used.

The message queue is provided by the browser, but linked to JavaScript, and with it the browser registers any code that should execute once we have time for it. In our example, the showAlert function is pushed onto that queue, but it isn't actually executed yet, it's just registered as a 'to-do'.

Now imagine the 'console.log()' finally finished and it's popped off the stack, then greet() is also finished and is popped off the stack and the stack is empty. Now we need to get that function from the message queue onto the stack to be executed. Now the event loop is part of the host environment, the thing which uses the JavaScript engine so here it is part of the browser but it could also be part of Node if we ran our code that way.

The job of the event loop is to synchronize the callstack in the engine with our waiting messages, so it basically runs all the time checking if the stack is empty and if we have pending to-dos. When the stack is empty it pushes any pending messages or any to-do functions onto the stack. So now the showAlert function runs which causes alert to be pushed onto the stack, executed and popped off again, and with that showAlert is popped off and the stack is empty again.

#### <b>Sync and async code - execution order</b>

```JS
setTimeout(() => {
  console.log('setTimeout done');
}, 0);
console.log('The console log below');
```

Even though there is not timer in the setTimeout here so it will execute 'immediately', it still has to go through the event loop and the message queue, so the regular console.log here will actually execute first because of that. Also again because the second line gets pushed to the callstack and event loop only pushes things there when it's empty

In other words, this means that the time before the set timeout executes is the minimum time, it's not a guaranteed time.

#### <b>Getting started with promises</b>

Promises let us avoid callback hell, with only having one level of nesting. With callbacks:

```JS
getCurrentPosition(() => {
  setTimeout(() => {
    moreAsyncCalls(() => {
      evenMoreTasks(() => {
        //...
      })
    });
  }, 500);
}, ...);
```

With promises that would instead look like this:

```JS
getCurrentPosition()
  .then(() => {
    return setTimeout();
  })
  .then(() => {
    return moreAsyncCalls();
  })
  .then(() => {
    return evenMoreTasks();
  })
  .then(...);
```

When getCurrentPosition completes, then setTimeout will execute and when that completes, moreAsyncCalls will execute and so on.

We can build promises in our own functions with the 'new Promise()' constructor. The promise takes a function as an argument, and this function will be run immediately when the promise is created. It's how we set up what the promise should actually do, what functionality it should wrap itself around. This function again receives two arguments which are actually functions as well. The first function is the resolve function and the second is the reject function.

```JS
const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Timer done!');
    }, duration)
  });
  return promise;
};
```

We need to call this resolove() function in our code, and what that does is that it marks the promise object we created as resolved, as done.

Now we can call our setTimer function with a timeout of 2 seconds for instance. To execute something when that function is done, the timer is done and the promise is resolved, we can append .then to it:

```JS
setTimer(2000).then(date => {
  console.log(data); // Should be 'Timer done!'
});
```

This is called promisifying a built in API, as the setTimeout function while being async doesn't support promises.

#### <b>Chaining multiple promises</b>

This was shown in the intro to promises really, but here is a more concrete example. We have a page that asks for the users position, which the user can accept or deny and then we wait some seconds to do something else.

```JS
const getPosition = options => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success => {
      resolve(success);
    }, error => {
      reject(error);
    }, options);
    
  });
  return promise;
}

const trackUserHandler = () => {
  getPosition()
    .then(posData => {
      return setTimer(1000);
    })
    .then(date => {
      console.log(data);
    });
}
```

Since setTimer creates and returns a new promise, having it inside another promise like this will set the overall promise back to being pending. Actually, it seems it doesn't have to be a promise, we could just return a string and it would be wrapped into a promise automatically. Then we wait for that to finish, and if it isn't a promise (didn't he just say it would be, or at least wrapped in one?) it will finish immediately.

Having step after step like this instead of step inside step should make this easier for us to read.

#### <b>Promise error handling</b>

If the user denies position access the get position function will return an error, and we want to pass that error to our promise chain so we can handle it there. The reject function we receive marks the promise as failed when we call it, which is what we do for the 'error' case in get position.

So I guess the promise itself doesn't know if it failed or not, it just executed some code (for us) and then it's up to us to detect if the result was as expected or not and update accordingly. But what about built in functions, or libraries that returns promises? I guess we can control sucess / error logic there, so I guess we just haven't used error handling for that before?

The .then method actually takes two arguments, the first is the function to run on success, the second is any potential error handling function we might have. We can then extend our function like this:

```JS
const trackUserHandler = () => {
  getPosition()
    .then(posData => {
      return setTimer(1000);
    }, error => {
      console.log(error);
    })
    .then(date => {
      console.log(data);
    });
}
```

But this doesn't look all the readable to me anymore. Instead of using the second argument of the .then method, we can add .catch instead, and that can actually be added anywhere in the chain. We'll add it after getPosition for now, but I'll want to experiment with exactly that.

```JS
const trackUserHandler = () => {
  getPosition()
    .then(posData => {
      return setTimer(1000);
    })
    .catch(error => {
      console.log(error);
    })
    .then(date => {
      console.log(data);
    });
}
```

This .catch block works the same way as the second argument to .then in that they catch <b>any</b> errors or rejections produced anywhere in your promise chain prior to this catch block or prior to the place where you added it as a second argument to .then. What's interesting about that is if we have the .catch block last in the chain, and the error or rejection occurs on the first, then every .then block in between will be skipped. If .catch is somewhere in the middle, the next .then block after the catch will execute again, as the catch sets the promise back to pending apparently.

#### <b>Promise states and 'finally'</b>

When there are no more .then blocks left, the promise enters a final state: `Settled`. Once settled we can use .finally in case there is something we need to clean up after us or similar. This is always executed, no matter if the last status was resolved or rejected.

#### <b>Async / await</b>

Modern JavaScript has an alternative to using the .then and .catch blocks, and that is async and await which actually makes your code look a little like synchronous code.

For the time being async await can only be used in functions though top-level await is said to be on the way.

When async is added to a function, it automatically returns a promise. With that we get access to the await keyword which we can add in front of any promise. This waits for the promise to resolve (or fail) and the next codeline afterwards will only execute when that is the case. The data that might be resolved will be returned, so we typically want to store them in a variable.

That means we can change our code from the above to this:

```JS
const trackUserHandler = async () => {
  const posData = await getPosition();
  const timerData = await setTimer(1000);
}
```

Now this only looks like we 'break' JavaScript and block the thread waiting for code to finish executing, but we actually don't. This is turned into 'one big' promise behind the scene, and .then blocks are invisibly added for us. When they resolve, the result is returned to us, and that's what we can store in the variables.

A cruicial thing that wasn't explained though, with promises code was handed to the browser that was multi-threaded to execute. Where is this handed off to? Still the browser?

Now we are actually waiting in this function, but only in this function. Or in other words, in this function we are waiting for getPosition() to return before we execute the timer, but other functions can execute while we are waiting.

#### <b>Asyns / await and error handling</b>

What we 'lost' in the previous function was error handling. getPosition() might fail and we don't handle that. To add that back in we can use the regular try / catch blocks. So basically, add a 'try' block around what you are await'ing, and then catch any errors that might occurs. Just like we did for synchronous code earlier. Now we can actually have multiple 'await' lines in the try block, and if any one of them fails, the catch block executes.

```JS
const trackUserHandler = async () => {
  try {
    const posData = await getPosition();
    const timerData = await setTimer(1000);
  } catch (error) {
    console.log(error);
  }
  console.log('We are here, no matter what!');
}
```

If the first await fails, the second won't be executed but the catch block will be called. If the first await succeeds the second await will be called. Then if that fails the catch block will be executed, otherwise our code will continue with what's below. Now then, the code that comes after a try / catch block will always execute if we don't do anything to prevent it.

#### <b>Async / await vs raw promises</b>

Suspicion confirmed, functions with the async keyword are offloaded to the browser which is multi-threaded, and the browser then returns when the functions are done. Small side-note, async await might actually be a little better from a performance perspective as browsers can parse and execute it in a more optimized way!

One 'downside' of async / await is that you can't run tasks simultaneously inside the same function. With promises we could set up som function calls at the top, but then code further down would still execute while waiting for the promises to return. When the function has the async keyword, everything in it wil be wrapped in a promise and .then blocks, and execute one after another.

The confusing bit for me, from personal experience is that the order of this is not guaranteed when using asynchronous code:

```JS
function1();
function2();
function3();
```

If <b>all</b> functions are async the order they finish in depends on how long they take to run. So 3 might finish before 1 which finished before 2 or some other combination. Also calling some async function from within another async function might mean the one you're in finishes before the one you called and so on.

#### <b>Promise.all, promise.race and more</b>

What to do if you have multiple promises and you want to 'orchestrate' them. Let's say you have two promises and only want to execute the fastest one? For this we can use Promise.race() which takes an array of promises, and this returns the fastest promise you passed to it which you can handle with regular .then and .catch blocks. The special thing is that the data it will return will be the result of the fastest promise.

```JS
Promise.race([getPosition(), setTimer(1000)])
  .then(data => {
    console.log(data);
  });
```

So if the user denies position super fast, that will return, otherwise the result of the timer will be returned. It is important to note that the promise that didn't win wasn't cancelled, the result was just ignored.

In case you have some promises that should only execute after some other promises have resolved, an alternative (to async /await) is Promise.all(). This also takes an array of promises and the .then block will now get a combination of data from both promises in an array.

```JS
Promise.all([getPosition(), setTimer(1000)])
  .then(promiseData => {
    console.log(promiseData);
  });
```

Now if one of the promises fail, then the other promise is not executed. So it's all resolved, or at least one rejected. To wait for all resolved or all rejected we have 'Promise.allSettled();' This again takes an array of promises as arguments, and then returns an array with the status for each promise.

```JS
Promise.allSettled([getPosition(), setTimer(1000)])
  .then(promiseData => {
    console.log(promiseData);
  });
```

#### <b>Wrap up</b>

[More on promises](https://developers.google.com/web/fundamentals/primers/promises)<br>
[More on async / await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
