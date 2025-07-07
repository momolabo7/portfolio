---
title: "Always Open Parathesis On Newline!"
date: 2024-11-27T12:00:00+08:00
---

This post is my argument of preferring to open parathesis on a new line as opposed to putting in on the same line as a for or if statement.

<!--more-->

Basically, I'm arguing the case of preferring this:

```cpp
for(int i = 0; i < 10; ++i) 
{
  // logic here
}
```

over this: (which people might refer to as Java-style)

```cpp
for(int i = 0; i < 10; ++i) {
  // logic here
}
```

There isn't any real reason for doing the latter other than aesthetic reasoning, that the logic you write will be closer to the conditions that rule the scope. It's kind of reasonable; 0 lines away from the condition is arguably neater than 1 line away.

But there is a really good reason for the former method, and that is diabling the condition with line comments:

```cpp
// for(int i = 0; i < 10; ++i) 
{
  // logic here
}
```

You can even have ways to enable different conditions. This is especially useful for testing code:

```cpp
// for(int i = 0; i < 10; ++i)  // testing 10 loops
// for(int i = 0; i < 1; ++i)   // testing 1 loop
for(int i = 0; i < 10000; ++i)  // testing many loops
{
  // logic here
}
```

You can argue that the above method works for the Java-style method too:

```cpp
// for(int i = 0; i < 10; ++i) {  // testing 10 loops
// for(int i = 0; i < 1; ++i)  {  // testing 1 loop
for(int i = 0; i < 10000; ++i) { // testing many loops
  // logic here
}
```

but the issue is that you can't diable *all* conditions (which is a use case that happens often when testing code):

```cpp
// for(int i = 0; i < 10; ++i) {  // testing 10 loops
// for(int i = 0; i < 1; ++i)  {  // testing 1 loop
// for(int i = 0; i < 10000; ++i) { // testing many loops
  // logic here
}

// this gives error!
```

So that's it, a short explanation to just open parathesis and leave it at a line of its own.


