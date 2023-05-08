---
title: "Dirty C/C++"
date: 2021-09-24T12:00:00+08:00
authors:
  - Gerald Wong
tags:
  - tech
---

Here is a collection of cool snippets of C/C++ code. Updated regularly. Used to show superiority and implode the minds of my students. Also to use in my own code, of course, whenever viable. 

<!--more-->

## Offset of struct member
You can include a whole library to get the `offsetof` macro, or you can just do this!
```cpp
int offset = (int)&((StructName*)0)->Member;
```

## Checking endian-ness
Cute hack to check for endian-ness on run-time.
```cpp
int n = 1;
bool is_little_endian = (*(char*)&n == 1);
```
To be honest though, you should do this on compile time, and you should not be lazy and use for compiler specific defines.

## if x or y is less than zero
```cpp
bool is_either_less_than_zero = (x | y) < 0;
```

## Flatten to a boolean

In C, there are no booleans, so it is quite common to see 

