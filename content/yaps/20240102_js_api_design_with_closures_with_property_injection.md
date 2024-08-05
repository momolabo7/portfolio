---
title: "[JS] API Design with Closures and Property Injection?"
date: 2024-01-02T12:00:00+08:00
nav: Blog
authors:
  - Gerald Wong
tags:
  - tech
---

This is probably one of the wierdest things I had to wrap my head around Javascript recently. 
It's a combination of how closures work, functions being first class objects and that you can add properties into objects.

<!--more-->

Consider this function `foo()`:

```js
function foo() {
  function boo() {
    this.goo();
  }
}

```

Now, logically if you run the code like so:

```js
let f = new foo();
f.boo(); // this won't run

```

`f.boo()` will give an error, naturally. 
There is really no reason to expect that `goo()` exists...unless someone 'injects' `goo` into `boo` somehow like so:

```js
let f = new foo();
f.boo.goo = function() {
  console.log("Hello");
}
f.boo(); // now this will run
```

At a glance, one might say that this seems dangerous, not useful, etc. 
Well, I haven't really thought much about it's implications, but it does suggest interesting approaches to API design that might not be possible in other languages.

The game engine Phaser 3 does this: it takes in an object and injects properties into its `preload()`, `update()` and `create()` functions.

For brevity, we will just talk about the `preload()` function.

```js
const game = new Phaser.Game({
  scene: { 
    preload() {
      // this.add technically does not exist
      // but Phaser will inject it upon 
      // initialization apparently...
      this.add.graphics(...); 
    }
  } 
})
```

This becomes interesting when we use closures like so:

```js
// Create a function foo() that has the preload() function, which
// Phaser will inject more properties into.
function foo() {
  let x = 10;
  let y = 20;

  function preload() {
    // Again, this.add will be avaliable
    // not within this class but later!
    //
    // Note that this function when called
    // at a later point will have access to
    // new properties like this.add, as well 
    // as x and y!!
    this.add.graphics(x, y);
  }

  return { preload };
}

const game = new Phaser.Game({
  scene: foo
})
```

Now we can not only use properties injected into our `preload()` function,
but we also have access to our own variables `x` and `y`.

Personally, as much as I hate javascript, I think this property of javascript is interesting to talk about. 

Whether I will eventually like it or not in practice...time will tell. 
For now, I do not immediately hate it, and I already hate a lot of things in javascript!





