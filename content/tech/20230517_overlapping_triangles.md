---
title: "Point on triangle algorithms"
date: 2023-05-18T11:16:00+08:00
---

A game I'm working on requires me to check if a point is overlapped by a triangle.
Being a dumb engineer who can't come up wiith his own algorithm, google gave me 3 algorithms.
Here I'm just going to share the algorithms and their performances.

<!--more-->
Parametric:

```cpp
b32_t parametric(v2f_t tp0, v2f_t tp1, v2f_t tp2, v2f_t pt) {
  f32_t denominator = (tp0.x*(tp1.y - tp2.y) + 
                     tp0.y*(tp2.x - tp1.x) + 
                     tp1.x*tp2.y - tp1.y*tp2.x);
  
  f32_t t1 = (pt.x*(tp2.y - tp0.y) + 
            pt.y*(tp0.x - tp2.x) - 
            tp0.x*tp2.y + tp0.y*tp2.x) / denominator;
  
  f32_t t2 = (pt.x*(tp1.y - tp0.y) + 
            pt.y*(tp0.x - tp1.x) - 
            tp0.x*tp1.y + tp0.y*tp1.x) / -denominator;
  
  f32_t s = t1 + t2;
  
  return 0 <= t1 && t1 <= 1 && 0 <= t2 && t2 <= 1 && s <= 1;
}
```


Dot Product: 

```cpp
b32_t dot_product(v2f_t tp0, v2f_t tp1, v2f_t tp2, v2f_t pt) {
  v2f_t vec0 = v2f_set(pt.x - tp0.x, pt.y - tp0.y);      
  v2f_t vec1 = v2f_set(pt.x - tp1.x, pt.y - tp1.y);      
  v2f_t vec2 = v2f_set(pt.x - tp2.x, pt.y - tp2.y);      
  
  v2f_t n0 = v2f_set(tp1.y - tp0.y, -tp1.x + tp0.x);
  v2f_t n1 = v2f_set(tp2.y - tp1.y, -tp2.x + tp1.x);
  v2f_t n2 = v2f_set(tp0.y - tp2.y, -tp0.x + tp2.x);
  
  b32_t side0 = v2f_dot(n0,vec0) < 0.f;
  b32_t side1 = v2f_dot(n1,vec1) < 0.f;
  b32_t side2 = v2f_dot(n2,vec2) < 0.f;
  
  return side0 == side1 && side0 == side2;
}
```

Barycentric:

```cpp
b32_t barycentric(v2f_t tp0, v2f_t tp1, v2f_t tp2, v2f_t pt) {
  
  f32_t denominator = ((tp1.y - tp2.y)*
                     (tp0.x - tp2.x) + (tp2.x - tp1.x)*
                     (tp0.y - tp2.y));
  
  f32_t a = ((tp1.y - tp2.y)*
           (pt.x - tp2.x) + (tp2.x - tp1.x)*
           (pt.y - tp2.y)) / denominator;
  
  f32_t b = ((tp2.y - tp0.y)*
           (pt.x - tp2.x) + (tp0.x - tp2.x)*
           (pt.y - tp2.y)) / denominator;
  
  f32_t c = 1.f - a - b;
  
  return 0.f <= a && a <= 1.f && 0.f <= b && b <= 1.f && 0.f <= c && c <= 1.f;
}
```

Of course, these could be written better but I'm just writing it as the algorithm suggested without too much care. 
I didn't care about which one was faster until one day I ran a scene with tons of triangles on my Surface Go, which I eventually experienced some slowdown.
That's when I decided to profile them.

These are the results on my Surface Book 2, with MSVC compiler:

| Algorithm   | Unoptimized | -O2 |
| ----------- | ----------- |-----|
| Barycentric | ~72 cycles  | ~27 cycles |
| Dot Product | ~262 cycles | ~27 cycles |
| Parametric  | ~100 cycles | ~37 cycles | 

It was interesting to see the results. 
At first I was surprised to see the Dot Product version so slow because it was what others claimed to be fast, but thankfully after optimization, it ended up being (one of the) fastest.

