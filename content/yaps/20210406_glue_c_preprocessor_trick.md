---
title: "[C/C++] The 'Glue' Preprocessor Trick"
date: 2021-04-06T12:00:00+08:00
nav: Blog
authors:
  - Gerald Wong
tags:
  - tech
---

Macro tricks are rare to find nowadays. 
Sometimes, I would code and _know_ of a trick but had forgotten how to go about implementing it because they can look as arcane as Template Metaprogramming. 
Hopefully, I can document some of my knowledge of these tricks in this blog. 
Here, I will introduce what I call the 'Glue' macro trick. 

<!--more-->

Let's start with a problem. 
I'll use a simple example from my project. 
Suppose I have a simple struct that represents a string, and provide a simple function that acts as a constructor:

```cpp
struct string_t {
    unsigned count;
    char *buffer;
};

string_t create_string(char* buffer, unsigned count) {
    string_t ret = {};
    ret.buffer = buffer;
    ret.count = Count;
}
```
And the way to easily initialize such a struct might be something like this:

```cpp
char temp_buffer[256] = {};
string_t str = create_string(temp_buffer, 256);
```

It's terribly unwieldy. We might end up in an ugly scenario where it looks like this:
```cpp
char temp_buffer1[256] = {};
string_t str1 = create_string(temp_buffer1, 256);

char temp_buffer2[128] = {};
string_t str2 = create_string(temp_buffer2, 128);

char temp_buffer3[64] = {};
string_t str3 = create_string(temp_buffer3, 64);

char temp_buffer4[32] = {};
string_t Str4 = create_string(temp_buffer4, 32);
```

But we see some hope! 
There is a pattern in the code so we decide to use macro concatenation to help us make the code look cleaner.
We hope to achieve something like below which will expand to the code above:

```cpp
create_stack_string(str1, 256);
create_stack_string(str2, 128);
create_stack_string(str3, 64);
create_stack_string(Str4, 32);
```

So now, we will try to implement the macro. 
We start off naively by trying to define a macro based on what we want to substitute.

```cpp
#define create_stack_string(name, num) \ 
char temp_buffer[Num] = {}; \ 
string_t name = create_string(temp_buffer, num)
```

This would be good for one call, but subsequent calls would cause an error because `temp_buffer` would be redefined. What we kind of want is some kind of unique id to attach to `temp_buffer`. A common way is to use the `__LINE__` macro definition that will evaluate to the document's line number. It might not work for all cases, but for this case, it is good enough because it's impossible to have two `temp_buffers` exist in the same line AND scope.

So we just concatenate `__LINE__` to `temp_buffer`. Simple right?

```cpp
 #define create_stack_string(Name, Num) char temp_buffer##__LINE__[Num] = {}; string_t Name = create_string(temp_buffer##__LINE__, Num)
```
Sadly, this does not work. 
According to be C99 specification in section 6.10.3.3, line 2:

`If, in the replacement list of a function-like macro, a parameter is immediately precededor followed by a ## preprocessing token, the parameter is replaced by the corresponding argument’s preprocessing token sequence;  however, if an argument consists of no preprocessing tokens, the parameter is replaced by a placemarker preprocessing token instead.`

That means that when `##` is encountered, any macros on the left and right of it will not be evaluated.
That means that this:

```cpp
 create_stack_string(str1, 256);
```

Would evaluate to something like this:

```cpp
 char temp_buffer__LINE__[256] = {}; string_t Name = create_string(temp_buffer__LINE__, 256)
```

Which means that we are back to square one. 
To solve this, a simple indirection trick can be used to **force** the `__LINE__` macro to evaluate (and by extension, any macro you want to evaluate that is part of an argument for the macro concatenation `##` syntax).

```cpp
#define glue_(a,b) a##b
#define glue(a,b) glue_(a,b)
```

Then we use the `glue` macro like this to solve our problem:

```cpp
#define create_stack_string(name, num) char glue(temp_buffer,__LINE__)[num] = {}; string_t name = create_string(glue(temp_buffer,__LINE__), num)
```

For clarity, the macro expansion is as follows:
```cpp
create_stack_string(str1, 256);
create_stack_string(str2, 128);
create_stack_string(str3, 64);
```

expands to:

```cpp
// Expand 1
char glue(temp_buffer,__LINE__)[256] = {}; string_t str1 = create_string(glue(temp_buffer,__LINE__), 256);
char glue(temp_buffer,__LINE__)[128] = {}; string_t str2 = create_string(glue(temp_buffer,__LINE__), 128)
char glue(temp_buffer,__LINE__)[64] = {}; string_t str3 = create_string(glue(temp_buffer,__LINE__), 64)
```

expands to:

```cpp
char glue_(temp_buffer,1)[256] = {}; string_t str1 = create_string(glue(temp_buffer,1), 256);
char glue_(temp_buffer,2)[128] = {}; string_t str2 = create_string(glue(temp_buffer,2), 128);
char glue_(temp_buffer,3)[64] = {}; string_t str3 = create_string(glue(temp_buffer,3), 64);
```

which will finally expand to:

```cpp
char temp_buffer1[256] = {}; string_t str1 = create_string(temp_buffer1, 256);
char temp_buffer2[128] = {}; string_t str2 = create_string(temp_buffer2, 128);
char temp_buffer3[64] = {}; string_t str3 = create_string(temp_buffer3, 64);
```

The trick is, in the end, not very complicated. 
It is just to get around the rather unintuitive specification in the C99 standard that states that arguments for `##` would not be evaluated. 
