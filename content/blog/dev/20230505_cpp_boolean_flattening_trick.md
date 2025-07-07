---
title: "C++ Flatten integer to 0/1"
date: 2023-05-05T13:25:00+08:00
---

This is a quick trick to 'flatten' an integer into a 1 or 0.
This is probably a trick that only works in C/C++ because of how the not (!) operator works with integers.
While it's usefulness is dubious in C++, it might be useful in C.

<!--more-->

The trick is simply this:

```cpp
x = !!x;
```

When `x` is 0, x will remain 0. 
When `x` is any other number, x will be 'flattened' to 1.

You might ask, why not do something like this?

```cpp
x = x ? 1 : 0;
```

Does the statement above use more instruction because it is a conditional?

Don't worry, my friend.
I got you covered.
I'm a good engineer who at least have the decency to check against [Godbolt]():

```cpp
#include <stdio.h>

int g_fullscreen;

int foo3() {
  if (g_fullscreen)
    return 1;
  else 
    return 0;
}

int foo2() {
  return !!g_fullscreen;
}

int foo1() {
  return g_fullscreen ? 1 : 0;
}

int main() {
  foo1();
  foo2();
}
```

And turns out, in all relevant compilers today (GCC, Clang and MSVC), they all give the same instructions.

Here is Clang:
```asm
foo3():                               # @foo3()
        xor     eax, eax
        cmp     dword ptr [rip + g_fullscreen], 0
        setne   al
        ret
foo2():                               # @foo2()
        xor     eax, eax
        cmp     dword ptr [rip + g_fullscreen], 0
        setne   al
        ret
foo1():                               # @foo1()
        xor     eax, eax
        cmp     dword ptr [rip + g_fullscreen], 0
        setne   al
        ret
main:                                   # @main
        xor     eax, eax
        ret
g_fullscreen:
        .long   0                               # 0x0

```

MSVC
```asm
int g_fullscreen DD 01H DUP (?)                 ; g_fullscreen

int foo3(void) PROC                                 ; foo3, COMDAT
        xor     eax, eax
        cmp     DWORD PTR int g_fullscreen, eax ; g_fullscreen
        setne   al
        ret     0
int foo3(void) ENDP                                 ; foo3

int foo2(void) PROC                                 ; foo2, COMDAT
        xor     eax, eax
        cmp     DWORD PTR int g_fullscreen, eax ; g_fullscreen
        setne   al
        ret     0
int foo2(void) ENDP                                 ; foo2

int foo1(void) PROC                                 ; foo1, COMDAT
        xor     eax, eax
        cmp     DWORD PTR int g_fullscreen, eax ; g_fullscreen
        setne   al
        ret     0
int foo1(void) ENDP                                 ; foo1

_main   PROC                                      ; COMDAT
        xor     eax, eax
        ret     0
_main   ENDP
```

GCC:
```asm
foo3():
        cmp     DWORD PTR g_fullscreen[rip], 0
        setne   al
        movzx   eax, al
        ret
foo2():
        cmp     DWORD PTR g_fullscreen[rip], 0
        setne   al
        movzx   eax, al
        ret
foo1():
        cmp     DWORD PTR g_fullscreen[rip], 0
        setne   al
        movzx   eax, al
        ret
main:
        mov     eax, 0
        ret
g_fullscreen:
        .zero   4
```

It turns out that for this specific case, using the trick == conditional statement == tenary operator. 
That is, there is no performance difference!

In conclusion, just put this trick into your bag. 
Don't go around crusading other to use it :) 

