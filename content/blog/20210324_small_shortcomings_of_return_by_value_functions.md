---
title: "Small shortcomings of return by value functions"
date: 2021-03-24T12:00:00+08:00
authors:
  - Gerald Wong
tags:
  - Documentation
---

Recently, while coding on my personal C/C++ game engine project, I ran into a surprising shortcoming of functions that returns an object by value. 

<!--more-->

There are generally two simple ways to modify an object in C/C++ through plain functions.

Returning by value:
```cpp
struct v2f {
    float x, y; 
};

v2f CreateV2f(float x, float y) {
    return v2f { x, y };
}

// Usage
v2f Vec = CreateV2f(1.f, 2.f);
```

Modifying by pointer:
```cpp
struct v2f {
    float x, y; 
};

void InitV2f(v2f* Vec, float x, float y) {
    Vec->x = x;
    Vec->y = y;
}

// Usage
v2f Vec = {};
InitV2f(&Vec, 1.f, 2.f);
```

We can spend hours arguing about which one is better, but optimization and code readability aside, we can all agree that both functions generally does the same thing, at a relatively good speed.

So I have been using both styles interchangably for awhile now. Some scenarios, I feel like the first method is better while other times, the second feels better. Generally, it felt like both methods are interchangable. 

However I found an interesting shortcoming of the 'Return by value method'. Consider the scenario:

```cpp
// Simple lightweight 'string' object.
struct string {
    char* Data;
    int Cap;
    int Count;
};
string CreateString(char* Buffer, int Cap) {
    
};

struct foo {
    u8 Buffer[256];
    string Str; 
};

foo CreateFoo() {
    foo Ret = {};
    Ret.Str = CreateString(Ret.Buffer, 256);

    return Ret;
    // Ret.Str.Data will be pointing to an invalid address 
    // after this function is called!
}
```

After calling `CreateFoo()`, the object's `Str.Data` member will be pointing at an invalid address. Thinking about it, C++ constructors will never have this issue because you are modifying `this` (However, I have a lot of things against C++ constructors, which I might go into another article when I can).   

Thankfully, the pointer version will not have the issue:

```cpp
// Simple lightweight 'string' object.
struct string {
    char* Data;
    int Cap;
    int Count;
};
string CreateString(char* Buffer, int Cap) {
    
};

struct foo {
    u8 Buffer[256];
    string Str; 
};

void CreateFoo(foo* Foo) {
    Foo->Str = CreateString(Foo->Buffer, 256);
}
```

It's interesting because I genuinely thought that both methods are interchangable in all situations, and that the differences between them only boils down to what I feel about low-level optimization and preferences in readability.
