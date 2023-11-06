---
title: "Reflections on using Javascript in 2023"
date: 2023-11-06T08:00:00+08:00
nav: Blog
authors:
  - Gerald Wong
tags:
  - tech
---

Recently, I have been writing quite a bit of Javascript for a couple of side-projects. 
I was a little inspired to attempt to write simple webapps without the use of any frameworks. 
One of them is avaliable here: [FvF](https://momohoudai.github.io/fvf/).
This post is just some personal reflections going back to use vanilla Javascript/CSS in 2023.

<!--more-->

So just some context. 
I'm not unfamiliar with web development, which makes up a chunk of my professional career.
I'm not unfamiliar with Javascript pre and post ES6, having done projects in both versions. 
I'm not unfamiliar with the insanity that is Javascript frameworks, Typescript and all that.

I think one of the best and worst things about modern Javascript is that there are many ways to express something.
I feel like there is a lot of syntax bloat in it. 
There are new syntaxes, some of which kind of overlap with old syntax. 
One example of this is differences between `for in` vs `for of`. 


They both work for arrays...

```js
const arr = [1,2,3]

// Both of these print the same thing
for (const x in arr) console.log(x);
for (const x of arr) console.log(x);
```

...but not so for other data structures:

```js
const s = new Set([1,2,3]);

// Both of these print different things!
for (const x in s) console.log(x);
for (const x of s) console.log(x);
```

Suddenly when you loop through something like a Set, you will have to use `for of`. 
Now, I know the difference between them, but the question is whether it is right to have them both exist at the same time?
Backwards compatibility? Sure but...do you really need to take up a new keyword?

At some point, it feels eeriely similar to how I feel when I use modern C++. 
There are lots of ways to express one thing, with slight naunces and edge cases that works in one way but not in another.

One thing that I welcome and I think is interesting to note is Destructuring Assignments. 
I hated this in C++ where you can write code like this:

```cpp
#include <tuple>

auto foo() {
  struct wtf { int a, int b; };
  return wtf { 1, 2 };
}

int main() {
  auto [x, y] = foo();
  // do what you need with x,y 
}
```

...because you are losing type information in a statically typed language. 
It annoys me that without an IDE, I cannot immediately figure out what `x` and `y` is when I read them.
This goes into a rant about the introduction and usage of the `auto` in C++, which I won't go into in this post.

However, considering that the idea of `auto` is natural in Javascript (i.e. all variables are variant types), Destructuring Assignments at least *felt* more natural. 
I really like how it ties with the rest (...) operator.


```js
const many_things = [1,2,3,4,5,6,7,8,9,10];
let things [first, second, third, ...fourth] = many_things;

// first is 1
// second is 2
// third is 3
// fourth is [4,5,6,7,8,9,10]
```

Of course, there's more you can do with destructuring than just this, but generally I feel that Javascript's implementation feels more natural.
Perhaps it's the combination of how variant types are the base type of the language coupled with a consistent syntax.  
This made me wonder if there is a more natural way to do with in statically typed languages...

(PS: How destructuring works in Rust is probably better than C++ IMO but I also hated it. 
To be honest, I haven't given enough thought on how to do it on statically typed languages in a clean way).

One last thing to note is that it is actually not that hard to get things done in vanilla Javascript. 
Technically speaking, everything you need is already provided by the browser.
I was recommended to use some crazy library and framework to do an image gallery with a zoomable/draggable lightbox, but turns out it wasn't difficult to write one without any libraries. 
A few webapps later, I have written a small framework of my own that I will be bringing to different webapp projects. 
I like to give mad props to TSoding's incredibly simple [grecha.js](https://github.com/tsoding/grecha.js) which taught me a few interesting tricks despite the small amount of lines it has!


